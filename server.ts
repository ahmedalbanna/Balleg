import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";

// ---------------------------------------------------------
// Express Server adopting Bounded Contexts (Modular Monolith)
// ---------------------------------------------------------

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Domain: "Report" Module API Routes
  const reportRouter = express.Router();
  reportRouter.post("/create", (req, res) => {
    // Mock creating a report
    const { type, audioUrl, imageUrl } = req.body;
    const trackingNo = "BLG-" + Math.floor(100000 + Math.random() * 900000);
    console.log(`[Domain: Report] Received new report: ${trackingNo}`);
    res.json({ success: true, trackingNo, message: "تم تسجيل البلاغ بنجاح" });
  });

  reportRouter.get("/track/:id", (req, res) => {
    const trackingNo = req.params.id;
    // Mock finding report status
    res.json({ 
      trackingNo, 
      status: "قيد المراجعة", 
      createdAt: new Date().toISOString() 
    });
  });

  // Domain: "AI" Module API Routes
  const aiRouter = express.Router();
  aiRouter.post("/classify", async (req, res) => {
    const { text } = req.body;
    const OLLAMA_HOST = "http://185.190.140.93:11434";
    const MODEL = "qwen2.5:1.5b";

    if (!text) {
      return res.status(400).json({ error: "Text is required for classification" });
    }

    try {
      const prompt = `صنّف البلاغ التالي إلى أحد هذه الأصناف: (طرق، نظافة، كهرباء، مياه، إنساني، طارئ). 
      أريد الإجابة بكلمة واحدة فقط تمثل الصنف.
      البلاغ: "${text}"`;

      const response = await fetch(`${OLLAMA_HOST}/api/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: MODEL,
          prompt: prompt,
          stream: false,
          options: {
            temperature: 0.1
          }
        }),
      });

      const data: any = await response.json();
      const classification = data.response.trim();
      
      res.json({ success: true, classification });
    } catch (error: any) {
      console.error("[Domain: AI] Ollama Error:", error.message);
      res.status(500).json({ success: false, error: "فشل الاتصال بمحرك الذكاء الاصطناعي" });
    }
  });

  // Mount Domain APIs
  app.use("/api/domain/report", reportRouter);
  app.use("/api/domain/ai", aiRouter);

  // Health and Core API
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Vite integration for SPA
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
