import { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Mic, Square, Camera as CameraIcon, UploadCloud, RefreshCcw, CheckCircle2, ChevronRight, AlertCircle, Loader2, Sparkles, EyeOff, ShieldCheck, MapPin, X, ImagePlus, Save } from "lucide-react";
import * as motion from "motion/react-client";
import { cn } from "../utils/cn";
import { reportApi, Report } from "../services/reportApi";
import { aiService } from "../services/ai";
import { mediaUtils } from "../utils/media";
import { auth } from "../services/firebase";
import { toast } from "sonner";
import { MapContainer, TileLayer, CircleMarker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";

// Helper component for map location picking
function LocationPicker({ location, setLocation, setLocationStr }: { location: [number, number] | null; setLocation: (loc: [number, number]) => void; setLocationStr: (str: string) => void }) {
  useMapEvents({
    click(e) {
      setLocation([e.latlng.lat, e.latlng.lng]);
      setLocationStr(`${e.latlng.lat.toFixed(4)}, ${e.latlng.lng.toFixed(4)}`);
    },
  });
  return location ? <CircleMarker center={location} radius={8} fillColor="#3b82f6" color="white" weight={2} fillOpacity={1} /> : null;
}

export function EditReport() {
  const [searchParams] = useSearchParams();
  const reportId = searchParams.get('id');
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState<"capture" | "review" | "success">("capture");

  // Text state
  const [description, setDescription] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [isPrivateService, setIsPrivateService] = useState(false);

  // Media states
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [existingAudioUrl, setExistingAudioUrl] = useState<string | null>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null); // DataURL for preview
  const [existingImageUrl, setExistingImageUrl] = useState<string | null>(null);

  // Recording states
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Camera & Image states
  const videoRef = useRef<HTMLVideoElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [cameraActive, setCameraActive] = useState(false);

  // Location states
  const [location, setLocation] = useState<[number, number] | null>(null);
  const [isLocating, setIsLocating] = useState(false);
  const [locationStr, setLocationStr] = useState<string>("");
  const [showMapPicker, setShowMapPicker] = useState(false);

  // Submit states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitProgress, setSubmitProgress] = useState("");

  useEffect(() => {
    if (!reportId) {
      toast.error("لم يتم العثور على البلاغ");
      navigate('/reports/my');
      return;
    }

    const fetchReport = async () => {
      try {
        const userId = auth.currentUser?.uid;
        if (!userId) {
          navigate('/login');
          return;
        }

        const myReports = await reportApi.getMyReports(userId);
        const report = myReports.find((r: any) => r.id === reportId) as Report;

        if (!report) {
          toast.error("البلاغ غير موجود أو ليس لديك صلاحية تعديله");
          navigate('/reports/my');
          return;
        }

        if (report.status !== 'pending_operator' && report.status !== 'pending_verification') {
          toast.error("لا يمكن تعديل البلاغ بعد قبوله من قبل المشغل");
          navigate('/reports/my');
          return;
        }

        setDescription(report.description);
        setIsAnonymous(report.isAnonymous || false);
        setIsPrivateService(report.isPrivateService || false);
        if (report.imageUrl) {
          setExistingImageUrl(report.imageUrl);
          setImageSrc(report.imageUrl);
        }
        if (report.audioUrl) {
          setExistingAudioUrl(report.audioUrl);
        }
        if (report.location) {
          setLocation(report.location);
          setLocationStr(`${report.location[0].toFixed(4)}, ${report.location[1].toFixed(4)}`);
        }

        setLoading(false);
      } catch (err) {
        console.error(err);
        toast.error("حدث خطأ أثناء تحميل بيانات البلاغ");
        navigate('/reports/my');
      }
    };

    fetchReport();
    return () => stopCamera();
  }, [reportId]);

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
    if (!reportId) return;
    setIsSubmitting(true);

    setSubmitProgress("جاري حفظ التعديلات...");
    try {
      let uploadedImageUrl = undefined;
      let uploadedAudioUrl = undefined;

      // If image changed
      if (imageSrc && imageSrc !== existingImageUrl && imageSrc.startsWith('data:')) {
        setSubmitProgress("جاري رفع الصورة الجديدة...");
        const blob = await mediaUtils.urlToBlob(imageSrc);
        const uploadRes = await reportApi.uploadImage(blob);
        if (uploadRes.success) {
          uploadedImageUrl = uploadRes.imageUrl;
        }
      }

      // If audio changed
      if (audioBlob) {
        setSubmitProgress("جاري رفع التسجيل الصوتي الجديد...");
        const uploadRes = await reportApi.uploadAudio(audioBlob);
        if (uploadRes.success) {
          uploadedAudioUrl = uploadRes.audioUrl;
        }
      }

      // Re-analyze
      let analysis = undefined;
      if (description || imageSrc) {
        setSubmitProgress("إعادة تحليل البيانات بالذكاء الاصطناعي...");
        analysis = await aiService.analyzeReport(description, imageSrc || undefined);
      }

      const updateData: any = {
        description,
        isAnonymous,
        isPrivateService,
        location
      };

      if (uploadedImageUrl) updateData.imageUrl = uploadedImageUrl;
      if (uploadedAudioUrl) updateData.audioUrl = uploadedAudioUrl;
      if (analysis) updateData.aiAnalysis = analysis;

      await reportApi.editReport(reportId, updateData);

      setStep("success");
      toast.success("تم تحديث البلاغ بنجاح");
    } catch (error) {
      console.error(error);
      toast.error("حدث خطأ أثناء تحديث البلاغ");
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

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
        <p className="font-bold text-slate-500">جاري جلب بيانات البلاغ...</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto pb-20">
      <div className="flex items-center justify-between mb-6 px-2">
        <button onClick={() => navigate(-1)} className="inline-flex items-center text-sm font-bold text-slate-500 hover:text-blue-600 transition-colors bg-white px-4 py-2 rounded-full shadow-sm">
          <ChevronRight className="w-4 h-4 mr-1" />
          رجوع
        </button>
        <div className="text-sm font-black text-slate-800 bg-white px-4 py-2 rounded-full shadow-sm">
          تعديل بلاغ #{reportId}
        </div>
      </div>

      <div className="bg-white/80 backdrop-blur-xl border border-slate-100 shadow-sm rounded-[2.5rem] p-6 sm:p-10 relative overflow-hidden">
        {step === "capture" && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-black text-slate-900 mb-2">تعديل تفاصيل البلاغ</h2>
              <p className="text-sm font-bold text-slate-500">يمكنك تغيير أي من المعلومات المدخلة سابقاً طالما البلاغ جديد.</p>
            </div>

            <div className="bg-white border border-slate-200 rounded-3xl p-1 shadow-sm focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-500/10 transition-all">
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="اكتب وصفاً مختصراً للمشكلة..."
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
                      className="absolute bottom-4 left-1/2 -translate-x-1/2 w-16 h-16 bg-white rounded-full border-4 border-blue-200 flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-sm"
                    ></button>
                  </>
                ) : (
                  <div className="flex flex-col items-stretch w-full h-full p-3 gap-2">
                    <button
                      onClick={startCamera}
                      className="flex-1 flex flex-col items-center justify-center text-slate-500 hover:text-blue-600 transition-colors gap-2 group bg-white rounded-2xl border border-slate-100 shadow-sm"
                    >
                      <CameraIcon className="w-7 h-7" />
                      <span className="font-bold text-xs tracking-wide">التقاط صورة جديدة</span>
                    </button>
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="flex-1 flex flex-col items-center justify-center text-slate-500 hover:text-blue-600 transition-colors gap-2 group bg-white rounded-2xl border border-slate-100 shadow-sm"
                    >
                      <ImagePlus className="w-7 h-7" />
                      <span className="font-bold text-xs tracking-wide">تغيير الصورة</span>
                    </button>
                    <input
                      type="file"
                      accept="image/*"
                      ref={fileInputRef}
                      className="hidden"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          const reader = new FileReader();
                          reader.onload = (ev) => setImageSrc(ev.target?.result as string);
                          reader.readAsDataURL(e.target.files[0]);
                        }
                      }}
                    />
                  </div>
                )}
              </div>

              {/* Audio Area */}
              <div className="h-56 rounded-3xl bg-red-50/30 border-2 border-dashed border-red-100 flex flex-col items-center justify-center p-6 relative w-full">
                {audioBlob ? (
                  <div className="flex flex-col items-center text-emerald-600 space-y-4">
                    <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-2">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <span className="font-black">تسجيل جديد ({formatTime(recordingTime)})</span>
                    <button
                      onClick={() => { setAudioBlob(null); setRecordingTime(0); }}
                      className="text-xs font-bold px-4 py-2 bg-white rounded-full border border-slate-200 text-slate-600 shadow-sm"
                    >
                      إعادة التسجيل
                    </button>
                  </div>
                ) : existingAudioUrl ? (
                  <div className="flex flex-col items-center gap-4 w-full px-4 text-center">
                    <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center">
                      <Mic className="w-6 h-6" />
                    </div>
                    <p className="text-xs font-bold text-slate-500">يوجد تسجيل صوتي مسبق</p>
                    <audio src={existingAudioUrl} controls className="w-full h-8" />
                    <button
                      onClick={startRecording}
                      className="text-[10px] font-black px-4 py-2 bg-white rounded-xl border border-slate-200 text-slate-600 hover:text-red-600 hover:border-red-200 shadow-sm transition-all"
                    >
                      تغيير التسجيل
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <button
                      onClick={isRecording ? stopRecording : startRecording}
                      className={cn(
                        "w-20 h-20 rounded-3xl flex items-center justify-center transition-all duration-300 shadow-sm",
                        isRecording
                          ? "bg-red-500 text-white animate-pulse"
                          : "bg-white text-red-500 border border-slate-200 hover:bg-red-50"
                      )}
                    >
                      {isRecording ? <Square className="w-8 h-8 fill-current" /> : <Mic className="w-8 h-8" />}
                    </button>
                    <div className="mt-5 text-center">
                      <span className={cn("text-lg font-mono font-black", isRecording ? "text-red-500" : "text-slate-500")}>
                        {formatTime(recordingTime)}
                      </span>
                      <p className="text-xs font-bold text-slate-500 mt-1">
                        {isRecording ? "انقر للإيقاف" : "إضافة تسجيل صوتي"}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-3 pt-4">
              <div className="flex flex-col gap-2 p-4 bg-white border border-slate-200 rounded-2xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                      {isLocating ? <Loader2 className="w-5 h-5 animate-spin" /> : <MapPin className="w-5 h-5" />}
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-slate-800">الموقع الجغرافي</h4>
                      <p className="text-xs font-bold text-slate-500 mt-0.5 tracking-tighter">
                        {location ? locationStr : "لم يتم تحديد موقع"}
                      </p>
                    </div>
                  </div>
                  <button onClick={getLocation} disabled={isLocating} className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-lg hover:bg-blue-100 transition disabled:opacity-50">تحديث الموقع</button>
                </div>
                <button onClick={() => setShowMapPicker(true)} className="w-full text-xs font-bold border border-slate-200 text-slate-600 hover:text-blue-600 hover:border-blue-200 bg-slate-50 hover:bg-blue-50 py-2 rounded-xl transition-all">تغيير الموقع يدوياً</button>
              </div>

              <div onClick={() => setIsAnonymous(!isAnonymous)} className={cn("p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between", isAnonymous ? "bg-slate-900 border-slate-900 shadow-md" : "bg-white border-slate-200 hover:border-slate-300")}>
                <div className="flex items-center gap-3">
                  <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center transition-colors", isAnonymous ? "bg-slate-800 text-white" : "bg-slate-100 text-slate-500")}>
                    <EyeOff className="w-5 h-5" />
                  </div>
                  <h4 className={cn("font-bold text-sm", isAnonymous ? "text-white" : "text-slate-800")}>إخفاء هويتي</h4>
                </div>
                <div className={cn("w-12 h-6 rounded-full p-1 flex items-center transition-colors", isAnonymous ? "bg-emerald-500 justify-end" : "bg-slate-200 justify-start")}>
                  <div className="w-4 h-4 bg-white rounded-full shadow-sm"></div>
                </div>
              </div>
            </div>

            <div className="pt-8">
              <button
                onClick={() => setStep("review")}
                className="w-full h-14 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-2xl transition-all shadow-[0_10px_20px_-10px_rgba(37,99,235,0.5)] flex items-center justify-center gap-2"
              >
                مراجعة التعديلات <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {showMapPicker && (
              <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
                <div className="bg-white rounded-[2rem] w-full max-w-lg overflow-hidden flex flex-col h-[500px]">
                  <div className="p-4 border-b flex items-center justify-between">
                    <h3 className="font-bold text-slate-800">تحديد الموقع على الخريطة</h3>
                    <button onClick={() => setShowMapPicker(false)} className="bg-slate-100 p-2 rounded-full text-slate-500 hover:text-slate-900 transition-colors"><X className="w-5 h-5" /></button>
                  </div>
                  <div className="flex-1 relative">
                    <MapContainer center={location || [24.7136, 46.6753]} zoom={13} style={{ height: '100%', width: '100%' }}>
                      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                      <LocationPicker location={location} setLocation={setLocation} setLocationStr={setLocationStr} />
                    </MapContainer>
                  </div>
                  <div className="p-4 bg-slate-50 border-t border-slate-100">
                    <button onClick={() => setShowMapPicker(false)} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black h-12 rounded-xl transition-colors shadow-sm">تأكيد الموقع</button>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}

        {step === "review" && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-3xl mx-auto flex items-center justify-center mb-4 transform -rotate-6">
                <Sparkles className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-black text-slate-900 mb-2">مراجعة التحديثات</h2>
              <p className="text-sm font-bold text-slate-500">سيتم تحديث بيانات البلاغ وإعادة إرساله للمراجعة</p>
            </div>

            <div className="bg-slate-50 rounded-3xl border border-slate-200 p-6 flex flex-col gap-5">
              <div>
                <h4 className="text-[10px] uppercase font-black tracking-wider text-slate-400 mb-2">الوصف المعدل</h4>
                <p className="text-sm font-bold text-slate-700 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm leading-relaxed">{description || "لا يوجد وصف"}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                    <CameraIcon className={imageSrc ? "" : "opacity-30"} />
                  </div>
                  <div>
                    <h4 className="font-black text-slate-900 text-xs mb-1">الصور</h4>
                    <p className="text-[10px] font-bold text-slate-500">{imageSrc ? "موجودة" : "لا يوجد"}</p>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-red-50 text-red-500 flex items-center justify-center shrink-0">
                    <Mic className={(audioBlob || existingAudioUrl) ? "" : "opacity-30"} />
                  </div>
                  <div>
                    <h4 className="font-black text-slate-900 text-xs mb-1">الصوت</h4>
                    <p className="text-[10px] font-bold text-slate-500">{audioBlob ? `تسجيل جديد` : existingAudioUrl ? "الأصلي" : "لا يوجد"}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex pt-6 gap-4">
              <button
                onClick={() => setStep("capture")}
                className="flex-1 h-14 bg-white border-2 border-slate-200 text-slate-700 hover:bg-slate-50 font-black rounded-2xl transition-all shadow-sm"
                disabled={isSubmitting}
              >
                تغيير إضافي
              </button>
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="flex-[2] h-14 bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-2xl transition-all shadow-sm flex items-center justify-center"
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-3">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span className="text-sm">{submitProgress}</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Save className="w-5 h-5" />
                    حفظ واعادة إرسال
                  </div>
                )}
              </button>
            </div>
          </motion.div>
        )}

        {step === "success" && (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-10 space-y-8">
            <div className="w-32 h-32 mx-auto rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 className="w-16 h-16" />
            </div>

            <div>
              <h2 className="text-3xl font-black text-slate-900 mb-3">تم التحديث!</h2>
              <p className="text-slate-500 max-w-sm mx-auto text-sm font-bold">
                تم حفظ تعديلاتك بنجاح على البلاغ رقم #{reportId}. سيتم مراجعته مجدداً بالبيانات الجديدة.
              </p>
            </div>

            <div className="pt-6 w-full max-w-xs mx-auto space-y-3">
              <button onClick={() => navigate('/reports/my')} className="w-full h-14 bg-slate-900 text-white font-black rounded-2xl transition-all">
                العودة لبلاغاتي
              </button>
            </div>
          </motion.div>
        )}

      </div>
    </div>
  );
}
