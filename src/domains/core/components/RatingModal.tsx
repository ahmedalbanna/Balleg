import { useState, useRef } from "react";
import { Star, Mic, Square, X, Loader2, MessageSquare, CheckCircle2 } from "lucide-react";
import * as motion from "motion/react-client";
import { cn } from "../utils/cn";
import { reportApi } from "../services/reportApi";
import { toast } from "sonner";

interface RatingModalProps {
  reportId: string;
  onClose: () => void;
  onSuccess: () => void;
}

export function RatingModal({ reportId, onClose, onSuccess }: RatingModalProps) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

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
      setRecordingTime(0);
      timerRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    } catch (err) {
      console.error(err);
      toast.error("يرجى إعطاء صلاحية الميكروفون");
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

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const handleSubmit = async () => {
    if (rating === 0) {
      toast.error("يرجى اختيار التقييم بالنجوم");
      return;
    }

    setIsSubmitting(true);
    try {
      let audioUrl = "";
      if (audioBlob) {
        const res = await reportApi.uploadAudio(audioBlob);
        if (res.success) audioUrl = res.audioUrl;
      }

      await reportApi.submitFeedback(reportId, {
        rating,
        feedback: comment,
        audioUrl
      });

      toast.success("شكراً لك على تقييمك");
      onSuccess();
    } catch (err) {
      console.error(err);
      toast.error("فشل إرسال التقييم");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="bg-white rounded-[2.5rem] w-full max-w-lg overflow-hidden shadow-2xl relative"
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 bg-slate-100 text-slate-500 rounded-full hover:bg-slate-200 transition-colors"
        >
          <X size={20} />
        </button>

        <div className="p-10">
          <div className="text-center mb-10">
            <div className="w-20 h-20 bg-amber-50 text-amber-500 rounded-3xl mx-auto flex items-center justify-center mb-6 transform -rotate-12 border border-amber-100 shadow-sm">
              <Star size={40} className="fill-current" />
            </div>
            <h2 className="text-3xl font-black text-slate-900 mb-2">تقييم الخدمة</h2>
            <p className="text-sm font-bold text-slate-500">رأيك يهمنا لتحسين جودة الخدمات في منطقتك</p>
          </div>

          <div className="flex justify-center gap-2 mb-10">
            {[1, 2, 3, 4, 5].map((s) => (
              <button
                key={s}
                onClick={() => setRating(s)}
                className="p-1 transition-transform active:scale-90"
              >
                <Star
                  size={42}
                  className={cn(
                    "transition-all duration-300",
                    s <= rating ? "text-amber-500 fill-current scale-110" : "text-slate-200 hover:text-amber-200"
                  )}
                />
              </button>
            ))}
          </div>

          <div className="space-y-6">
            <div className="bg-slate-50 border border-slate-200 rounded-3xl p-1 focus-within:border-blue-500 transition-all">
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="اكتب تعليقك هنا (اختياري)..."
                className="w-full bg-transparent border-none outline-none resize-none h-32 p-5 text-sm font-bold text-slate-700 placeholder:text-slate-400"
              />
            </div>

            <div className="flex items-center justify-center gap-4 py-4 border-2 border-dashed border-slate-100 rounded-3xl">
              {audioBlob ? (
                <div className="flex items-center gap-4 bg-emerald-50 px-6 py-3 rounded-2xl border border-emerald-100">
                  <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center">
                    <CheckCircle2 size={24} />
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-black text-emerald-900">تم تسجيل تعليقك ({formatTime(recordingTime)})</p>
                    <button onClick={() => setAudioBlob(null)} className="text-[10px] font-black text-emerald-600 underline">إعادة التسجيل</button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-4">
                  <button
                    onClick={isRecording ? stopRecording : startRecording}
                    className={cn(
                      "w-16 h-16 rounded-2xl flex items-center justify-center transition-all shadow-md",
                      isRecording ? "bg-red-500 text-white animate-pulse" : "bg-white border border-slate-200 text-red-500 hover:bg-red-50"
                    )}
                  >
                    {isRecording ? <Square size={24} /> : <Mic size={24} />}
                  </button>
                  <div className="text-right">
                    <p className={cn("text-lg font-mono font-black", isRecording ? "text-red-500" : "text-slate-400")}>
                      {formatTime(recordingTime)}
                    </p>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider">تعليق صوتي (اختياري)</p>
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={handleSubmit}
              disabled={isSubmitting || rating === 0}
              className="w-full h-16 bg-slate-900 hover:bg-black text-white font-black rounded-2xl transition-all shadow-xl shadow-slate-900/20 flex items-center justify-center gap-3 disabled:opacity-50 disabled:grayscale"
            >
              {isSubmitting ? <Loader2 size={24} className="animate-spin" /> : "إرسال التقييم"}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
