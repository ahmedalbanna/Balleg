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
      priority: "critical",
      createdAt: new Date().toISOString(),
      location: [33.5138, 36.2765]
    },
    {
      id: "BLG-381920",
      description: "القمامة متراكمة في تقاطع الشارع الرئيسي منذ أسبوع والرائحة لا تحتمل.",
      type: "نظافة",
      status: "pending_official",
      priority: "high",
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
    const { description, type, audioUrl, imageUrl, location, aiAnalysis, userId } = req.body;
    const trackingNo = "BLG-" + Math.floor(100000 + Math.random() * 900000);
    
    const newReport = {
      id: trackingNo,
      userId: userId || "anonymous",
      description,
      type: type || "عادي",
      audioUrl,
      imageUrl,
      status: "pending_operator",
      priority: aiAnalysis?.priority || 'medium',
      createdAt: new Date().toISOString(),
      location: location || [33.5138, 36.2765],
      aiAnalysis: aiAnalysis || null
    };
    
    reportsDatabase.push(newReport);
    console.log(`[Domain: Report] Received new report: ${trackingNo}`);
    res.json({ success: true, trackingNo, report: newReport, message: "تم تسجيل البلاغ بنجاح" });
  });

  // 2b. Edit report (Citizen)
  reportRouter.patch("/edit/:id", (req, res) => {
    const id = req.params.id;
    const { description } = req.body;
    const report = reportsDatabase.find(r => r.id === id);
    if (!report) return res.status(404).json({ error: "البلاغ غير موجود" });
    if (report.status !== 'pending_operator') {
      return res.status(400).json({ error: "لا يمكن تعديل البلاغ بعد البدء في معالجته" });
    }
    report.description = description || report.description;
    res.json({ success: true, report });
  });

  // Get all reports (for merchant)
  reportRouter.get("/merchant/all", (req, res) => {
    res.json({ success: true, reports: reportsDatabase });
  });

  // Sponsor report
  reportRouter.patch("/merchant/sponsor/:id", (req, res) => {
    const id = req.params.id;
    const { sponsorId, sponsorName, sponsorDate } = req.body;
    const report = reportsDatabase.find(r => r.id === id);
    if (!report) return res.status(404).json({ error: "البلاغ غير موجود" });
    report.sponsorId = sponsorId;
    report.sponsorName = sponsorName;
    report.sponsorDate = sponsorDate;
    res.json({ success: true, report });
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

  // 5. Submit Citizen Feedback
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

  // 6. Analytics & Statistics for Admin
  reportRouter.get("/stats", (req, res) => {
    const total = reportsDatabase.length;
    const resolved = reportsDatabase.filter(r => r.status === 'resolved').length;
    const inProgress = reportsDatabase.filter(r => r.status === 'in_progress').length;
    const pending = total - resolved - inProgress;

    // Distribution by Type
    const typeDist: Record<string, number> = {};
    reportsDatabase.forEach(r => {
      const t = r.classification || r.type || "عام";
      typeDist[t] = (typeDist[t] || 0) + 1;
    });

    // Department Performance (Simulated delays)
    const deptPerformance = [
      { name: 'نظافة', active: reportsDatabase.filter(r => r.department === 'نظافة' && r.status !== 'resolved').length, score: 92 },
      { name: 'مياه', active: reportsDatabase.filter(r => r.department === 'مياه' && r.status !== 'resolved').length, score: 85 },
      { name: 'طرق', active: reportsDatabase.filter(r => r.department === 'طرق' && r.status !== 'resolved').length, score: 64 },
      { name: 'كهرباء', active: reportsDatabase.filter(r => r.department === 'كهرباء' && r.status !== 'resolved').length, score: 78 }
    ];

    // Trends (Last 7 days simulated)
    const last7Days = [...Array(7)].map((_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      return {
        date: dateStr,
        received: Math.floor(Math.random() * 10) + 2,
        resolved: Math.floor(Math.random() * 8) + 1
      };
    }).reverse();

    res.json({
      summary: { total, resolved, inProgress, pending, resolutionRate: total > 0 ? (resolved / total * 100).toFixed(1) : 0 },
      typeDistribution: Object.entries(typeDist).map(([name, value]) => ({ name, value })),
      deptPerformance,
      trends: last7Days
    });
  });

  // 7. Get reports for a specific user
  reportRouter.get("/user/:userId", (req, res) => {
    const userId = req.params.userId;
    // In actual production, we filter by authenticated UID. 
    // Here we simulate by looking at userId field in reports
    const userReports = reportsDatabase.filter(r => r.userId === userId || r.id.includes(userId));
    res.json({ reports: userReports.sort((a,b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()) });
  });

  // 8. Operator/Official fetches reports
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
