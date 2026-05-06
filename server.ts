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

  // ---------------------------------------------------------
  // In-Memory Database for Reports (Workflow Demo)
  // ---------------------------------------------------------
  const reportsDatabase: any[] = [
    {
      id: "BLG-829104",
      description: "هناك ماسورة مياه مكسورة في وسط الطريق تسبب في إعاقة حركة السير وتسرب كميات هائلة من المياه العذبة. الموقع يحتاج تدخل سريع לפני غرق المحلات المجاورة.",
      type: "مياه",
      status: "pending_operator",
      createdAt: new Date().toISOString(),
      location: [33.5138, 36.2765]
    },
    {
      id: "BLG-381920",
      description: "القمامة متراكمة في تقاطع الشارع الرئيسي منذ أسبوع والرائحة لا تحتمل.",
      type: "نظافة",
      status: "pending_official",
      department: "نظافة",
      createdAt: new Date(Date.now() - 86400000).toISOString(),
      classification: "نظافة",
      location: [33.5100, 36.2700]
    }
  ];

  // Domain: "Report" Module API Routes
  const reportRouter = express.Router();
  
  // 1. Citizen submits report
  reportRouter.post("/create", (req, res) => {
    const { description, type, audioUrl, imageUrl, location } = req.body;
    const trackingNo = "BLG-" + Math.floor(100000 + Math.random() * 900000);
    
    const newReport = {
      id: trackingNo,
      description,
      type: type || "عادي",
      audioUrl,
      imageUrl,
      status: "pending_operator",
      createdAt: new Date().toISOString(),
      location: location || [33.5138, 36.2765] // Default generic location
    };
    
    reportsDatabase.push(newReport);
    console.log(`[Domain: Report] Received new report: ${trackingNo}`);
    res.json({ success: true, trackingNo, report: newReport, message: "تم تسجيل البلاغ بنجاح" });
  });

  // 2. Citizen tracks report
  reportRouter.get("/track/:id", (req, res) => {
    const trackingNo = req.params.id;
    const report = reportsDatabase.find(r => r.id === trackingNo);
    if (!report) return res.status(404).json({ error: "Report not found" });
    res.json({ report });
  });

  // 3. Operator fetches unrouted reports
  reportRouter.get("/operator/pending", (req, res) => {
    const pending = reportsDatabase.filter(r => r.status === "pending_operator");
    res.json({ reports: pending.sort((a,b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()) });
  });

  // 4. Operator routes the report to a department
  reportRouter.post("/:id/route", (req, res) => {
    const { department, classification } = req.body;
    const report = reportsDatabase.find(r => r.id === req.params.id);
    if (!report) return res.status(404).json({ error: "Report not found" });

    report.status = "pending_official";
    report.department = department;
    if (classification) report.classification = classification;

    res.json({ success: true, report });
  });

  // 5. Official fetches their department's reports
  reportRouter.get("/official/:department", (req, res) => {
    const { department } = req.params;
    const tasks = reportsDatabase.filter(r => r.department === department && r.status !== "resolved");
    res.json({ reports: tasks.sort((a,b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()) });
  });

  // 6. Official updates status (e.g. IN_PROGRESS, RESOLVED)
  reportRouter.post("/:id/status", (req, res) => {
    const { status } = req.body;
    const report = reportsDatabase.find(r => r.id === req.params.id);
    if (!report) return res.status(404).json({ error: "Report not found" });

    report.status = status;
    res.json({ success: true, report });
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
