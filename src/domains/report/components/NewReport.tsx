import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mic, Square, Camera as CameraIcon, UploadCloud, RefreshCcw, CheckCircle2, ChevronRight, AlertCircle, Loader2, Sparkles, EyeOff, ShieldCheck, MapPin } from "lucide-react";
import * as motion from "motion/react-client";
import { cn } from "../../core/utils/cn";
import { reportApi } from "../../core/services/reportApi";
import { aiService } from "../../core/services/ai";
import { mediaUtils } from "../../core/utils/media";
import { useRole } from "../../core/context/RoleContext";
import { auth } from "../../core/services/firebase";
import { toast } from "sonner";

export function NewReport() {
  const { currentRole } = useRole();
  const navigate = useNavigate();
  const [step, setStep] = useState<"capture" | "review" | "success">("capture");
  
  // Text state
  const [description, setDescription] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [isPrivateService, setIsPrivateService] = useState(false);

  // Media states
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null); // DataURL for preview
  
  // Recording states
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  
  // Camera states
  const videoRef = useRef<HTMLVideoElement>(null);
  const [cameraActive, setCameraActive] = useState(false);

  // Location states
  const [location, setLocation] = useState<[number, number] | null>(null);
  const [isLocating, setIsLocating] = useState(false);
  const [locationStr, setLocationStr] = useState<string>("");

  // Submit states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitProgress, setSubmitProgress] = useState("");
  const [trackingNo, setTrackingNo] = useState("");

  // AI results
  const [aiAnalysis, setAiAnalysis] = useState<any>(null);

  useEffect(() => {
    // Try to get location automatically on load
    getLocation();
    return () => stopCamera(); // Cleanup camera on unmount
  }, []);

  const getLocation = () => {
    setIsLocating(true);
    if (!navigator.geolocation) {
      toast.error("المتصفح لا يدعم تحديد الموقع");
      setIsLocating(false);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation([position.coords.latitude, position.coords.longitude]);
        setLocationStr(`${position.coords.latitude.toFixed(4)}, ${position.coords.longitude.toFixed(4)}`);
        setIsLocating(false);
      },
      (error) => {
        console.error(error);
        toast.error("تعذر تحديد الموقع تلقائياً. تأكد من تفعيل الـ GPS.");
        setIsLocating(false);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      const chunks: BlobPart[] = [];

      mediaRecorder.ondataavailable = (e) => chunks.push(e.data);
      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: "audio/webm" });
        setAudioBlob(blob);
      };

      mediaRecorder.start();
      setIsRecording(true);
      
      timerRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    } catch (err) {
      console.error("Microphone access denied:", err);
      toast.error("يرجى إعطاء صلاحية الميكروفون للتسجيل.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      if (timerRef.current) clearInterval(timerRef.current);
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
    }
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setCameraActive(true);
      }
    } catch (err) {
      console.error("Camera access denied:", err);
      toast.error("يرجى إعطاء صلاحية الكاميرا لالتقاط صورة.");
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      setCameraActive(false);
    }
  };

  const takePhoto = () => {
    if (videoRef.current) {
      const canvas = document.createElement("canvas");
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0);
        setImageSrc(canvas.toDataURL("image/jpeg"));
        stopCamera();
      }
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    // Limits check
    const currentUserId = auth.currentUser?.uid;
    if (currentUserId && (currentRole?.slug === 'displaced' || currentRole?.slug === 'citizen')) {
      try {
        const myReports = await reportApi.getMyReports(currentUserId);
        const openReports = myReports.filter((r: any) => ['pending_verification', 'pending_operator', 'pending_official', 'in_progress'].includes(r.status));
        if (openReports.length >= 3) {
          toast.error("عذراً، لديك ٣ بلاغات مفتوحة حالياً. يرجى الانتظار حتى معالجتها لتتمكن من تقديم بلاغ جديد.");
          setIsSubmitting(false);
          return;
        }
      } catch (err) {
        console.error("Failed to check open reports", err);
      }
    }

    setSubmitProgress("جاري تحليل البلاغ بالذكاء الاصطناعي...");
    try {
      // 1. AI Analysis
      const analysis = await aiService.analyzeImageAndText(description || "بلاغ وسائط", imageSrc || undefined);
      setAiAnalysis(analysis);

      // 2. Upload Image if exists
      let uploadedImageUrl = undefined;
      let uploadedAudioUrl = undefined;
      
      if (imageSrc) {
        setSubmitProgress("جاري رفع الصور...");
        const blob = await mediaUtils.urlToBlob(imageSrc);
        const uploadRes = await reportApi.uploadImage(blob);
        if (uploadRes.success) {
          uploadedImageUrl = uploadRes.imageUrl;
        }
      }

      if (audioBlob) {
        setSubmitProgress("جاري رفع التسجيل الصوتي...");
        // Fallback for audio upload logic if implemented, or omitted for simulation
      }

      // 3. Create Report
      setSubmitProgress("جاري حفظ البلاغ وتوجيهه...");
      const res = await reportApi.createReport({
        description: description || analysis.summary || "تم تقديم بلاغ عبر النظام",
        type: analysis.classification || "عام", 
        location: location || [24.7136, 46.6753], // Fallback to Riyadh
        imageUrl: uploadedImageUrl,
        aiAnalysis: analysis,
        isAnonymous: isAnonymous,
        role: currentRole?.slug,
        isPrivateService: isPrivateService
      });
      
      if(res.success) {
        // Create in-app notification
        import("../../core/services/notifications").then(({ notificationService }) => {
          notificationService.notifyUser(auth.currentUser?.uid || 'anonymous', {
            title: "تم تسجيل بلاغك بنجاح",
            message: `بلاغك رقم ${res.trackingNo} قيد المراجعة حالياً من قبل المشغل الاستراتيجي.`,
            type: "success"
          });
        });

        setTrackingNo(res.trackingNo);
        setStep("success");
      }
    } catch (error) {
      console.error(error);
      toast.error("حدث خطأ أثناء إرسال البلاغ. يرجى المحاولة لاحقاً.");
    } finally {
      setIsSubmitting(false);
      setSubmitProgress("");
    }
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <div className="max-w-2xl mx-auto pb-20">
      <div className="flex items-center justify-between mb-6 px-2">
        <Link to="/" className="inline-flex items-center text-sm font-bold text-slate-500 hover:text-blue-600 transition-colors bg-white px-4 py-2 rounded-full shadow-sm">
          <ChevronRight className="w-4 h-4 mr-1" />
          العودة للرئيسية
        </Link>
        <div className="text-sm font-black text-slate-800 bg-white px-4 py-2 rounded-full shadow-sm">
          تقديم بلاغ جديد
        </div>
      </div>

      <div className="bg-white/80 backdrop-blur-xl border border-slate-100 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] rounded-[2.5rem] p-6 sm:p-10 relative overflow-hidden">
        {/* Abstract Background Decoration */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl -z-10 -translate-x-1/2 translate-y-1/2" />

        {step === "capture" && (
          <motion.div initial={{opacity:0, y: 10}} animate={{opacity:1, y: 0}} className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-black text-slate-900 mb-2">كيف يمكننا المساعدة؟</h2>
              <p className="text-sm font-bold text-slate-500">تحدث عنها، اكتبها، أو التقط لها صورة. نحن هنا لدعمك.</p>
            </div>

            <div className="bg-white border border-slate-200 rounded-3xl p-1 shadow-sm focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-500/10 transition-all">
                <textarea 
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="اكتب وصفاً مختصراً للمشكلة أو اترك الذكاء الاصطناعي يستنتجها من الصورة/الصوت..."
                    className="w-full bg-transparent border-none outline-none resize-none h-28 p-5 text-sm font-bold text-slate-700 placeholder:text-slate-400"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Photo Area */}
              <div className="relative aspect-square sm:aspect-auto sm:h-56 rounded-3xl bg-blue-50/50 border-2 border-dashed border-blue-100 overflow-hidden flex flex-col items-center justify-center w-full transition-all hover:bg-blue-50/80 hover:border-blue-200">
                {imageSrc ? (
                  <>
                    <img src={imageSrc} alt="Preview" className="object-cover w-full h-full" />
                    <button 
                      onClick={() => setImageSrc(null)}
                      className="absolute top-3 right-3 p-2.5 bg-white/90 backdrop-blur text-slate-900 rounded-full hover:bg-white transition-colors border border-slate-200 shadow-sm"
                    >
                      <RefreshCcw className="w-4 h-4" />
                    </button>
                  </>
                ) : cameraActive ? (
                  <>
                    <video ref={videoRef} autoPlay playsInline muted className="object-cover w-full h-full" />
                    <button 
                      onClick={takePhoto}
                      className="absolute bottom-4 left-1/2 -translate-x-1/2 w-16 h-16 bg-white rounded-full border-4 border-blue-200 flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-[0_0_20px_rgba(59,130,246,0.3)]"
                    ></button>
                  </>
                ) : (
                  <button 
                    onClick={startCamera}
                    className="flex flex-col items-center justify-center text-slate-500 hover:text-blue-600 transition-colors gap-3 group w-full h-full"
                  >
                    <div className="w-16 h-16 rounded-3xl bg-white border border-slate-200 shadow-sm flex items-center justify-center group-hover:border-blue-200 group-hover:bg-blue-50 transition-colors group-hover:-translate-y-1 duration-300">
                      <CameraIcon className="w-7 h-7 group-hover:text-blue-600 transition-colors" />
                    </div>
                    <span className="font-bold text-sm tracking-wide">تصوير المشكلة</span>
                  </button>
                )}
              </div>

              {/* Audio Area */}
              <div className="h-56 rounded-3xl bg-red-50/30 border-2 border-dashed border-red-100 flex flex-col items-center justify-center p-6 relative w-full transition-all hover:bg-red-50/60 hover:border-red-200">
                {audioBlob ? (
                  <div className="flex flex-col items-center text-emerald-600 space-y-4">
                    <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-2">
                       <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <span className="font-black">مقطع مسموع ({formatTime(recordingTime)})</span>
                    <button 
                      onClick={() => { setAudioBlob(null); setRecordingTime(0); }}
                      className="text-xs font-bold px-4 py-2 bg-white rounded-full border border-slate-200 text-slate-600 hover:text-slate-900 shadow-sm"
                    >
                      إعادة التسجيل
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <button 
                      onClick={isRecording ? stopRecording : startRecording}
                      className={cn(
                        "w-20 h-20 rounded-3xl flex items-center justify-center transition-all duration-300 shadow-sm disabled:opacity-50",
                        isRecording 
                          ? "bg-red-500 text-white shadow-[0_0_30px_rgba(239,68,68,0.4)] animate-pulse" 
                          : "bg-white text-red-500 border border-slate-200 hover:border-red-200 hover:bg-red-50 hover:-translate-y-1"
                      )}
                    >
                      {isRecording ? <Square className="w-8 h-8 fill-current" /> : <Mic className="w-8 h-8" />}
                    </button>
                    <div className="mt-5 text-center">
                      <span className={cn("text-lg font-mono font-black", isRecording ? "text-red-500" : "text-slate-500")}>
                        {formatTime(recordingTime)}
                      </span>
                      <p className="text-xs font-bold text-slate-500 mt-1">
                        {isRecording ? "انقر للإيقاف" : "تسجيل صوتي للمشكلة"}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-3 pt-4">
              <div className="flex items-center justify-between p-4 bg-white border border-slate-200 rounded-2xl">
                 <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                       {isLocating ? <Loader2 className="w-5 h-5 animate-spin" /> : <MapPin className="w-5 h-5" />}
                    </div>
                    <div>
                        <h4 className="font-bold text-sm text-slate-800">تحديد الموقع الجغرافي</h4>
                        <p className="text-xs font-bold text-slate-500 mt-0.5">
                            {location ? locationStr : "سيتم إرفاق إحداثيات المشكلة"}
                        </p>
                    </div>
                 </div>
                 <button onClick={getLocation} className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-lg hover:bg-blue-100 transition">تحديث</button>
              </div>

              <div onClick={() => setIsAnonymous(!isAnonymous)} className={cn("p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between", isAnonymous ? "bg-slate-900 border-slate-900 shadow-md" : "bg-white border-slate-200 hover:border-slate-300")}>
                  <div className="flex items-center gap-3">
                      <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center transition-colors", isAnonymous ? "bg-slate-800 text-white" : "bg-slate-100 text-slate-500")}>
                          <EyeOff className="w-5 h-5" />
                      </div>
                      <div>
                          <h4 className={cn("font-bold text-sm", isAnonymous ? "text-white" : "text-slate-800")}>إخفاء هويتي (بلاغ سري)</h4>
                          <p className={cn("text-xs font-bold mt-0.5", isAnonymous ? "text-slate-400" : "text-slate-500")}>لن يعرف أحد أنك من قدم هذا البلاغ</p>
                      </div>
                  </div>
                  <div className={cn("w-12 h-6 rounded-full p-1 flex items-center transition-colors", isAnonymous ? "bg-emerald-500 justify-end" : "bg-slate-200 justify-start")}>
                      <div className="w-4 h-4 bg-white rounded-full shadow-sm"></div>
                  </div>
              </div>

              <div onClick={() => setIsPrivateService(!isPrivateService)} className={cn("p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between", isPrivateService ? "bg-indigo-600 border-indigo-600 shadow-md" : "bg-white border-slate-200 hover:border-slate-300")}>
                    <div className="flex items-center gap-3">
                        <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center transition-colors", isPrivateService ? "bg-indigo-500 text-white" : "bg-indigo-50 text-indigo-500")}>
                            <ShieldCheck className="w-5 h-5" />
                        </div>
                        <div>
                            <h4 className={cn("font-bold text-sm", isPrivateService ? "text-white" : "text-slate-800")}>أريد خدمة خاصة مدفوعة</h4>
                            <p className={cn("text-xs font-bold mt-0.5", isPrivateService ? "text-indigo-200" : "text-slate-500")}>لعطل داخل منزلك يطلب محترفين مستقلين</p>
                        </div>
                    </div>
                    <div className={cn("w-12 h-6 rounded-full p-1 flex items-center transition-colors", isPrivateService ? "bg-white/30 justify-end" : "bg-slate-200 justify-start")}>
                        <div className="w-4 h-4 bg-white rounded-full shadow-sm"></div>
                    </div>
              </div>
            </div>

            <div className="pt-8">
              <button
                onClick={() => setStep("review")}
                disabled={!audioBlob && !imageSrc && description.length < 5}
                className="w-full h-14 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-[0_10px_20px_-10px_rgba(37,99,235,0.5)] hover:shadow-[0_15px_30px_-10px_rgba(37,99,235,0.6)] hover:-translate-y-0.5 flex items-center justify-center gap-2"
              >
                متابعة البلاغ <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        )}

        {step === "review" && (
          <motion.div initial={{opacity:0, y: 10}} animate={{opacity:1, y:0}} className="space-y-6">
             <div className="text-center mb-8">
              <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-3xl mx-auto flex items-center justify-center mb-4 transform -rotate-6">
                <Sparkles className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-black text-slate-900 mb-2">مراجعة البلاغ</h2>
              <p className="text-sm font-bold text-slate-500">سيتولى الذكاء الاصطناعي تحليل المرفقات واستخراج البيانات</p>
            </div>

            <div className="bg-slate-50 rounded-3xl border border-slate-200 p-6 flex flex-col gap-5">
              <div className="flex gap-4">
                <div className="flex-1">
                  <h4 className="text-[10px] uppercase font-black tracking-wider text-slate-400 mb-2">الوصف النصي</h4>
                  <p className="text-sm font-bold text-slate-700 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm leading-relaxed min-h-[60px]">{description || "لا يوجد وصف مدخل"}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                      <CameraIcon className={imageSrc ? "" : "opacity-30"} />
                    </div>
                    <div>
                      <h4 className="font-black text-slate-900 text-xs mb-1">الصور</h4>
                      <p className="text-[10px] font-bold text-slate-500">{imageSrc ? "مرفق صورة ١" : "لا يوجد"}</p>
                    </div>
                  </div>

                  <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-red-50 text-red-500 flex items-center justify-center shrink-0">
                      <Mic className={audioBlob ? "" : "opacity-30"} />
                    </div>
                    <div>
                      <h4 className="font-black text-slate-900 text-xs mb-1">الصوت</h4>
                      <p className="text-[10px] font-bold text-slate-500">{audioBlob ? `مرفق تسجيل` : "لا يوجد"}</p>
                    </div>
                  </div>
              </div>

              {location && (
                  <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                      <MapPin className="" />
                    </div>
                    <div>
                      <h4 className="font-black text-slate-900 text-xs mb-1">الإحداثيات الجغرافية</h4>
                      <p className="text-[10px] font-bold text-slate-500 dir-ltr text-right">{locationStr}</p>
                    </div>
                  </div>
              )}
            </div>

            <div className="flex pt-6 gap-4">
              <button
                onClick={() => setStep("capture")}
                className="flex-1 h-14 bg-white border-2 border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300 font-black rounded-2xl transition-all shadow-sm"
                disabled={isSubmitting}
              >
                رجوع وتعديل
              </button>
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="flex-[2] h-14 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-2xl transition-all shadow-[0_10px_20px_-10px_rgba(37,99,235,0.5)] hover:shadow-[0_15px_30px_-10px_rgba(37,99,235,0.6)] hover:-translate-y-0.5 flex items-center justify-center"
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-3">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span className="text-sm opacity-90">{submitProgress}</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                     <UploadCloud className="w-5 h-5" />
                     إرسال واعتماد البلاغ
                  </div>
                )}
              </button>
            </div>
          </motion.div>
        )}

        {step === "success" && (
          <motion.div initial={{opacity:0, scale:0.95}} animate={{opacity:1, scale:1}} className="text-center py-10 space-y-8">
            <div className="relative w-32 h-32 mx-auto">
               <div className="absolute inset-0 bg-emerald-100 rounded-full animate-ping opacity-50" />
               <div className="relative w-full h-full rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shadow-inner">
                 <CheckCircle2 className="w-16 h-16" />
               </div>
            </div>
            
            <div>
                <h2 className="text-3xl font-black text-slate-900 mb-3">تم الإرسال بنجاح!</h2>
                <p className="text-slate-500 max-w-sm mx-auto text-sm font-bold leading-relaxed">
                شكراً لمساهمتك، سيقوم المحلل الآلي بتصنيف البلاغ وتوجيهه لأكثر فرق البلدية ملاءمةً للتدخل خلال دقائق.
                </p>
            </div>

            <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-3xl p-8 max-w-xs mx-auto">
              <span className="block text-xs font-black uppercase tracking-wider text-slate-400 mb-3">رقم تتبع البلاغ</span>
              <span className="block text-4xl font-mono tracking-widest text-slate-900 font-black">
                {trackingNo}
              </span>
            </div>

            <div className="pt-6 w-full max-w-xs mx-auto space-y-3">
              <button onClick={() => navigate('/track')} className="w-full h-14 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-2xl transition-all shadow-[0_10px_20px_-10px_rgba(37,99,235,0.5)]">
                تتبع حالة البلاغ
              </button>
              <button onClick={() => {
                setDescription("");
                setAudioBlob(null);
                setImageSrc(null);
                setTrackingNo("");
                setStep("capture");
              }} className="w-full h-14 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 font-black rounded-2xl transition-all shadow-sm">
                تقديم بلاغ جديد
              </button>
            </div>
          </motion.div>
        )}

      </div>
    </div>
  );
}

