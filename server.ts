import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import multer from "multer";
import fs from "fs";

// ---------------------------------------------------------
// Express Server adopting Bounded Contexts (Modular Monolith)
// ---------------------------------------------------------

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Ensure uploads directory exists
  const uploadsDir = path.join(process.cwd(), "uploads");
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
  }

  app.use(express.json());
  app.use("/uploads", express.static(uploadsDir));

  // Configure Multer for file storage
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname));
    }
  });

  const upload = multer({ 
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
  });

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
  
  // 1. Image Upload Endpoint
  reportRouter.post("/upload", upload.single("image"), (req, res) => {
    if (!req.file) {
      return res.status(400).json({ error: "No image uploaded" });
    }
    const imageUrl = `/uploads/${req.file.filename}`;
    res.json({ success: true, imageUrl });
  });

  // 2. Citizen submits report
  reportRouter.post("/create", (req, res) => {
    const { description, type, audioUrl, imageUrl, location, aiAnalysis } = req.body;
    const trackingNo = "BLG-" + Math.floor(100000 + Math.random() * 900000);
    
    const newReport = {
      id: trackingNo,
      description,
      type: type || "عادي",
      audioUrl,
      imageUrl,
      status: "pending_operator",
      createdAt: new Date().toISOString(),
      location: location || [33.5138, 36.2765],
      aiAnalysis: aiAnalysis || null
    };
    
    reportsDatabase.push(newReport);
    console.log(`[Domain: Report] Received new report: ${trackingNo}`);
    res.json({ success: true, trackingNo, report: newReport, message: "تم تسجيل البلاغ بنجاح" });
  });

  // 3. Citizen tracks report
  reportRouter.get("/track/:id", (req, res) => {
    const trackingNo = req.params.id;
    const report = reportsDatabase.find(r => r.id === trackingNo);
    if (!report) return res.status(404).json({ error: "Report not found" });
    res.json({ report });
  });

  // 3. Update report status (Operator/Official action)
  reportRouter.patch("/update/:id", (req, res) => {
    const id = req.params.id;
    const { status, remarks } = req.body;
    const reportIndex = reportsDatabase.findIndex(r => r.id === id);
    
    if (reportIndex !== -1) {
      reportsDatabase[reportIndex].status = status;
      if (remarks) reportsDatabase[reportIndex].remarks = remarks;
      
      // Simulate Real-time external notification (SMS/WhatsApp)
      console.log(`[REAL-TIME NOTIFICATION] Informing citizen about status change of ${id} to ${status}`);
      
      res.json({ success: true, message: "تم تحديث حالة البلاغ بنجاح" });
    } else {
      res.status(404).json({ error: "Report not found" });
    }
  });

  // 4. Submit Citizen Feedback
  reportRouter.patch("/feedback/:id", (req, res) => {
    const id = req.params.id;
    const { rating, feedback } = req.body;
    const reportIndex = reportsDatabase.findIndex(r => r.id === id);
    
    if (reportIndex !== -1) {
      if (reportsDatabase[reportIndex].status !== 'resolved') {
        return res.status(400).json({ error: "لا يمكن تقييم بلاغ غير منجز" });
      }
      
      reportsDatabase[reportIndex].rating = rating;
      reportsDatabase[reportIndex].feedback = feedback;
      reportsDatabase[reportIndex].feedbackAt = new Date().toISOString();
      
      res.json({ success: true, message: "شكراً لتقييمك، تم استلام ملاحظاتك بنجاح" });
    } else {
      res.status(404).json({ error: "Report not found" });
    }
  });

  // 5. Operator/Official fetches reports
  reportRouter.get("/all", (req, res) => {
    res.json({ reports: reportsDatabase.sort((a,b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()) });
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
