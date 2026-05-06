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

  // Mount Domain APIs
  app.use("/api/domain/report", reportRouter);

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
