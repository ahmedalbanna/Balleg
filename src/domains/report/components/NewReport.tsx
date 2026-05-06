import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Mic, Square, Camera as CameraIcon, UploadCloud, RefreshCcw, CheckCircle2, ChevronRight, AlertCircle, Loader2, Sparkles, EyeOff, ShieldCheck } from "lucide-react";
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

  // Submit states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitProgress, setSubmitProgress] = useState("");
  const [trackingNo, setTrackingNo] = useState("");

  // AI results
  const [aiAnalysis, setAiAnalysis] = useState<any>(null);

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
    
    if (currentRole?.slug === 'displaced') {
      try {
        const myReports = await reportApi.getMyReports(auth.currentUser?.uid || 'anonymous');
        const openReports = myReports.filter((r: any) => ['pending_operator', 'pending_official', 'in_progress'].includes(r.status));
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
      if (imageSrc) {
        setSubmitProgress("جاري رفع الصور...");
        const blob = await mediaUtils.urlToBlob(imageSrc);
        const uploadRes = await reportApi.uploadImage(blob);
        if (uploadRes.success) {
          uploadedImageUrl = uploadRes.imageUrl;
        }
      }

      // 3. Create Report
      setSubmitProgress("جاري حفظ البلاغ وتوجيهه...");
      const res = await reportApi.createReport({
        description: description || analysis.summary || "تم تقديم بلاغ عبر النظام",
        type: analysis.classification || "عام", 
        location: [33.5138, 36.2765],
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
    <div className="max-w-2xl mx-auto">
      <Link to="/" className="inline-flex items-center text-sm text-slate-500 hover:text-blue-600 mb-8 transition-colors">
        <ChevronRight className="w-4 h-4 mr-1" />
        العودة للرئيسية
      </Link>

      <div className="bg-white border border-slate-200 shadow-xl rounded-3xl p-6 sm:p-10">
        
        {step === "capture" && (
          <motion.div initial={{opacity:0}} animate={{opacity:1}} className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold font-readex text-slate-900 mb-2">إضافة المشكلة</h2>
              <p className="text-slate-500">تحدث عنها، اكتبها، أو التقط لها صورة. نحن هنا للمساعدة.</p>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 shadow-inner">
                <textarea 
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="اكتب وصفاً مختصراً للمشكلة هنا..."
                    className="w-full bg-transparent border-none outline-none resize-none h-24 text-sm font-bold text-slate-700 placeholder:text-slate-400"
                />
            </div>

            {currentRole?.slug === 'displaced' && (
              <div onClick={() => setIsAnonymous(!isAnonymous)} className={cn("p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between mt-4", isAnonymous ? "bg-slate-900 border-slate-900" : "bg-white border-slate-200 hover:border-slate-300")}>
                  <div className="flex items-center gap-3">
                      <div className={cn("w-10 h-10 rounded-full flex items-center justify-center transition-colors", isAnonymous ? "bg-slate-800 text-white" : "bg-slate-100 text-slate-500")}>
                          <EyeOff className="w-5 h-5" />
                      </div>
                      <div>
                          <h4 className={cn("font-bold text-sm", isAnonymous ? "text-white" : "text-slate-800")}>تبليغ مجهول بالكامل</h4>
                          <p className={cn("text-xs font-bold mt-1", isAnonymous ? "text-slate-400" : "text-slate-500")}>لن يتم تسجيل هويتك أو مشاركتها، ستحصل فقط على رقم تتبع.</p>
                      </div>
                  </div>
                  <div className={cn("w-12 h-6 rounded-full p-1 flex items-center transition-colors", isAnonymous ? "bg-emerald-500 justify-end" : "bg-slate-200 justify-start")}>
                      <div className="w-4 h-4 bg-white rounded-full"></div>
                  </div>
              </div>
            )}

            <div onClick={() => setIsPrivateService(!isPrivateService)} className={cn("p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between mt-4", isPrivateService ? "bg-indigo-900 border-indigo-900" : "bg-white border-slate-200 hover:border-slate-300")}>
                  <div className="flex items-center gap-3">
                      <div className={cn("w-10 h-10 rounded-full flex items-center justify-center transition-colors", isPrivateService ? "bg-indigo-800 text-white" : "bg-indigo-50 text-indigo-500")}>
                          <ShieldCheck className="w-5 h-5" />
                      </div>
                      <div>
                          <h4 className={cn("font-bold text-sm", isPrivateService ? "text-white" : "text-slate-800")}>أريد خدمة خاصة (عطل داخل المنزل)</h4>
                          <p className={cn("text-xs font-bold mt-1", isPrivateService ? "text-indigo-200" : "text-slate-500")}>سيوجه الطلب للفنيين المحليين المستقلين بدلاً من البلدية.</p>
                      </div>
                  </div>
                  <div className={cn("w-12 h-6 rounded-full p-1 flex items-center transition-colors", isPrivateService ? "bg-indigo-500 justify-end" : "bg-slate-200 justify-start")}>
                      <div className="w-4 h-4 bg-white rounded-full"></div>
                  </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Photo Area */}
              <div className="relative aspect-square sm:aspect-auto sm:h-64 rounded-2xl bg-blue-50/50 border border-slate-200 overflow-hidden flex flex-col items-center justify-center w-full">
                {imageSrc ? (
                  <>
                    <img src={imageSrc} alt="Preview" className="object-cover w-full h-full" />
                    <button 
                      onClick={() => setImageSrc(null)}
                      className="absolute top-2 right-2 p-2 bg-white/80 backdrop-blur text-slate-900 rounded-full hover:bg-white transition-colors border border-slate-200"
                    >
                      <RefreshCcw className="w-4 h-4" />
                    </button>
                  </>
                ) : cameraActive ? (
                  <>
                    <video ref={videoRef} autoPlay playsInline muted className="object-cover w-full h-full" />
                    <button 
                      onClick={takePhoto}
                      className="absolute bottom-4 left-1/2 -translate-x-1/2 w-14 h-14 bg-white rounded-full border-4 border-blue-200 flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-lg"
                    ></button>
                  </>
                ) : (
                  <button 
                    onClick={startCamera}
                    className="flex flex-col items-center justify-center text-slate-500 hover:text-blue-600 transition-colors gap-3 group"
                  >
                    <div className="w-16 h-16 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center group-hover:border-blue-200 group-hover:bg-blue-50 transition-colors">
                      <CameraIcon className="w-8 h-8 group-hover:text-blue-600 transition-colors" />
                    </div>
                    <span className="font-medium">التقط صورة</span>
                  </button>
                )}
              </div>

              {/* Audio Area */}
              <div className="h-64 rounded-2xl bg-red-50/30 border border-slate-200 flex flex-col items-center justify-center p-6 relative w-full">
                {audioBlob ? (
                  <div className="flex flex-col items-center text-emerald-600 space-y-4">
                    <CheckCircle2 className="w-12 h-12" />
                    <span className="font-medium">تم التسجيل بنجاح ({formatTime(recordingTime)})</span>
                    <button 
                      onClick={() => { setAudioBlob(null); setRecordingTime(0); }}
                      className="text-sm text-slate-500 hover:text-slate-900 underline underline-offset-4"
                    >
                      إعادة التسجيل
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <button 
                      onClick={isRecording ? stopRecording : startRecording}
                      className={cn(
                        "w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 shadow-sm",
                        isRecording 
                          ? "bg-red-100 text-red-600 border border-red-200 animate-pulse" 
                          : "bg-white text-red-500 border border-slate-200 hover:border-red-200 hover:bg-red-50"
                      )}
                    >
                      {isRecording ? <Square className="w-8 h-8 fill-current" /> : <Mic className="w-8 h-8" />}
                    </button>
                    <div className="mt-6 text-center">
                      <span className={cn("text-lg font-mono font-bold", isRecording ? "text-red-500" : "text-slate-500")}>
                        {formatTime(recordingTime)}
                      </span>
                      <p className="text-sm text-slate-500 mt-2">
                        {isRecording ? "جاري التسجيل... انقر للإيقاف" : "انقر للتسجيل الصوتي"}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="pt-8 flex justify-end">
              <button
                onClick={() => setStep("review")}
                disabled={!audioBlob && !imageSrc && description.length < 5}
                className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-md"
              >
                متابعة
              </button>
            </div>
          </motion.div>
        )}

        {step === "review" && (
          <motion.div initial={{opacity:0}} animate={{opacity:1}} className="space-y-8">
             <div className="text-center mb-8">
              <h2 className="text-2xl font-bold font-readex text-slate-900 mb-2">مراجعة البلاغ</h2>
              <p className="text-slate-500">تأكد من أن المعلومات واضحة قبل الإرسال.</p>
            </div>

            <div className="bg-[#F8FAFC] rounded-2xl border border-slate-200 p-6 space-y-4 shadow-inner">
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <h4 className="font-bold text-slate-900 text-lg mb-2">الوصف النصي</h4>
                  <p className="text-sm text-slate-600 bg-white p-3 rounded-xl border border-slate-100 leading-relaxed min-h-[60px]">{description || "لا يوجد"}</p>
                </div>
              </div>
              <div className="w-full h-px bg-slate-200"></div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 shadow-sm flex items-center justify-center shrink-0">
                  <CameraIcon className={imageSrc ? "text-blue-600" : "text-slate-400"} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">الصورة المرفقة</h4>
                  <p className="text-xs text-slate-500">{imageSrc ? "تم إرفاق صورة بنجاح" : "لم يتم إرفاق صورة"}</p>
                </div>
              </div>
              <div className="w-full h-px bg-slate-200"></div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 shadow-sm flex items-center justify-center shrink-0">
                  <Mic className={audioBlob ? "text-blue-600" : "text-slate-400"} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">التسجيل الصوتي</h4>
                  <p className="text-xs text-slate-500">{audioBlob ? `مرفق تسجيل مدته ${formatTime(recordingTime)}` : "لم يتم تسجيل صوت"}</p>
                </div>
              </div>
            </div>

            <div className="flex pt-6 gap-4">
              <button
                onClick={() => setStep("capture")}
                className="flex-1 px-8 py-3 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-slate-900 font-medium rounded-xl transition-colors shadow-sm"
                disabled={isSubmitting}
              >
                رجوع وتعديل
              </button>
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="flex-1 px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors flex flex-col items-center justify-center min-h-[64px] shadow-md"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin mb-1" />
                    <span className="text-xs opacity-90">{submitProgress}</span>
                  </>
                ) : (
                  <>
                    <div className="flex items-center gap-2">
                       <UploadCloud className="w-5 h-5" />
                       إرسال البلاغ
                    </div>
                  </>
                )}
              </button>
            </div>
          </motion.div>
        )}

        {step === "success" && (
          <motion.div initial={{opacity:0, scale:0.95}} animate={{opacity:1, scale:1}} className="text-center py-8 space-y-6">
            <div className="w-24 h-24 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-12 h-12" />
            </div>
            
            <h2 className="text-3xl font-bold font-readex text-slate-900">تم إرسال بلاغك بنجاح!</h2>
            <p className="text-slate-500 max-w-md mx-auto">
              شكراً لمساهمتك. سيتم توجيه المشكلة تلقائياً للقسم المختص عبر مركز الاستقبال المدعوم بالذكاء الاصطناعي.
            </p>

            <div className="bg-[#F8FAFC] border border-slate-200 rounded-2xl p-6 mt-8 w-full max-w-sm mx-auto shadow-sm">
              <span className="block text-sm text-slate-500 mb-2">رقم المتابعة الخاص بك:</span>
              <span className="block text-3xl font-mono tracking-widest text-blue-600 font-bold selection:bg-blue-100">
                {trackingNo}
              </span>
              <div className="mt-4 flex items-center justify-center gap-2 text-amber-600 text-xs font-medium">
                <AlertCircle className="w-4 h-4" />
                يرجى الاحتفاظ بهذا الرقم لمتابعة حالة بلاغك
              </div>
            </div>

            <div className="pt-8 w-full max-w-sm mx-auto flex">
              <button onClick={() => {
                setDescription("");
                setAudioBlob(null);
                setImageSrc(null);
                setTrackingNo("");
                setStep("capture");
              }} className="flex-1 text-center justify-center px-8 py-3 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 hover:text-slate-900 font-medium rounded-xl transition-colors shadow-sm cursor-pointer">
                تقديم بلاغ آخر
              </button>
            </div>
          </motion.div>
        )}

      </div>
    </div>
  );
}
