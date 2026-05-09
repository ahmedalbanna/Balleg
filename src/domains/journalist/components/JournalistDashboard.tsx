import { Newspaper, TrendingUp, Clock, Share2, FileVideo, Download, Filter, Search, MoreVertical, MessageSquare, ThumbsUp, AlertCircle, ExternalLink, ShieldCheck, FolderPlus, Send, RotateCw, CheckCircle2, Timer, MessageSquarePlus, Activity, MapPin, Globe, Mic, Camera, BarChart3, Archive, User, Zap, Settings, Tent, ClipboardList, Users, Stethoscope, History, Bell } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { collection, query, onSnapshot, doc, setDoc, orderBy, addDoc, serverTimestamp } from "firebase/firestore";
import { db, handleFirestoreError, OperationType } from "../../core/services/firebase";
import { Report } from "../../core/services/reportApi";
import { toast } from "sonner";
import { useAuth } from "../../core/context/AuthContext";
import { cn } from "../../core/utils/cn";
import JournalistMapView from "./JournalistMapView";
import { Link } from "react-router-dom";

export interface JournalistRequest {
  id: string;
  reportId: string;
  journalistId: string;
  targetDepartment: string;
  content: string;
  status: 'pending' | 'replied';
  officialReply?: string;
  repliedBy?: string;
  repliedAt?: any;
  deadline: any;
  createdAt: any;
}

export function JournalistDashboard() {
  const { currentRole, userProfile } = useAuth();
  const [activeFilter, setActiveFilter] = useState("supported");
  const [reports, setReports] = useState<Report[]>([]);
  const [journalistRequests, setJournalistRequests] = useState<JournalistRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const [showRequestModal, setShowRequestModal] = useState<Report | null>(null);
  const [isGeneralCommentModalOpen, setIsGeneralCommentModalOpen] = useState(false);
  const [targetDepartment, setTargetDepartment] = useState("");
  const [targetReportId, setTargetReportId] = useState("");
  const [commentRequestText, setCommentRequestText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Investigation folders (Local state for prototype)
  const [investigationFolder, setInvestigationFolder] = useState<string[]>([]);

  useEffect(() => {
    const qReports = query(collection(db, 'reports'), orderBy('createdAt', 'desc'));
    const unsubReports = onSnapshot(qReports, (snapshot) => {
      const docs = snapshot.docs.map(d => ({ id: d.id, ...d.data() } as Report));
      setReports(docs);
      setLoading(false);
    }, (error) => handleFirestoreError(error, OperationType.LIST, 'reports'));

    const qReq = query(collection(db, 'journalist_comment_requests'), orderBy('createdAt', 'desc'));
    const unsubReq = onSnapshot(qReq, (snapshot) => {
      setJournalistRequests(snapshot.docs.map(d => ({ id: d.id, ...d.data() } as any as JournalistRequest)));
    });

    return () => {
      unsubReports();
      unsubReq();
    };
  }, []);

  const handleCreateRequest = async () => {
    if (!showRequestModal || !commentRequestText.trim()) return;
    
    setIsSubmitting(true);
    try {
      const deadlineDate = new Date();
      deadlineDate.setHours(deadlineDate.getHours() + 48); // 48 hour deadline

      await addDoc(collection(db, 'journalist_comment_requests'), {
        reportId: showRequestModal.id,
        journalistId: userProfile?.uid,
        targetDepartment: showRequestModal.department || "البلدية والإدارة العليا",
        content: commentRequestText,
        status: 'pending',
        deadline: deadlineDate,
        createdAt: serverTimestamp()
      });

      toast.success("تم إرسال طلب التعليق الرسمي بنجاح");
      setShowRequestModal(null);
      setCommentRequestText("");
    } catch (err) {
      console.error(err);
      toast.error("فشل إرسال الطلب");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCreateGeneralCommentRequest = async () => {
      if (!targetDepartment || !commentRequestText.trim()) {
          toast.error("الرجاء تحديد الجهة وكتابة الاستفسار");
          return;
      }
      setIsSubmitting(true);
      try {
        const deadlineDate = new Date();
        deadlineDate.setHours(deadlineDate.getHours() + 48);

        await addDoc(collection(db, 'journalist_comment_requests'), {
            targetDepartment,
            reportId: targetReportId || "تحقيق عام",
            journalistId: userProfile?.uid,
            content: commentRequestText,
            status: 'pending',
            deadline: deadlineDate,
            createdAt: serverTimestamp()
        });

        toast.success("تم إرسال طلب التعليق الرسمي بنجاح للجهة المعنية");
        setIsGeneralCommentModalOpen(false);
        setTargetDepartment("");
        setCommentRequestText("");
        setTargetReportId("");
      } catch (err) {
          handleFirestoreError(err, OperationType.CREATE, 'journalist_comment_requests');
      } finally {
          setIsSubmitting(false);
      }
  };

  const getDeadlineStatus = (deadline: any) => {
    if (!deadline) return null;
    const now = new Date();
    const dDate = deadline.toDate ? deadline.toDate() : new Date(deadline);
    const diff = dDate.getTime() - now.getTime();
    
    if (diff < 0) return { label: "تجاوز المهلة", color: "text-rose-600", isExpired: true };
    
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    return { 
      label: `متبقي ${hours} ساعة و ${mins} دقيقة`, 
      color: hours < 12 ? "text-amber-600" : "text-emerald-600",
      isExpired: false 
    };
  };

  const pendingCount = reports.filter(r => !r.status.startsWith('resolved')).length;
  
  const now = new Date();
  const delayedReports = reports.filter(r => {
    if (r.status.startsWith('resolved') || r.status === 'rejected') return false;
    const diffMs = now.getTime() - new Date(r.createdAt).getTime();
    return diffMs > 7 * 24 * 60 * 60 * 1000;
  });

  const statistics = [
    { label: "بلاغات مفتوحة للرأي العام", value: pendingCount.toString(), color: "text-purple-600" },
    { label: "متوسط وقت الاستجابة", value: "٧٢ ساعة", color: "text-slate-600" }, // Simulated
    { label: "بلاغات مهملة ومتأخرة", value: delayedReports.length.toString(), color: "text-rose-600" },
  ];

  let filteredReports = [...reports];
  if (searchQuery) {
      filteredReports = filteredReports.filter(r => r.description.includes(searchQuery) || (r.department && r.department.includes(searchQuery)));
  }

  if (activeFilter === 'supported') {
      // Sort by community interactions (comments as proxy)
      filteredReports.sort((a, b) => (b.communityComments?.length || 0) - (a.communityComments?.length || 0));
  } else if (activeFilter === 'slowest') {
      // Sort by response time (for resolved) or current delay (for active)
      filteredReports.sort((a, b) => {
        const getDuration = (r: Report) => {
            const start = new Date(r.createdAt).getTime();
            const end = r.resolvedAt ? new Date(r.resolvedAt).getTime() : new Date().getTime();
            return end - start;
        };
        return getDuration(b) - getDuration(a);
      });
  }

  const handleExportCSV = () => {
    try {
      const headers = ["ID", "Department", "Status", "Created At", "Resolved At", "Response Time (Hours)", "Interactions", "Priority", "Description", "Location"];
      const csvRows = [headers.join(',')];
      
      reports.forEach(r => {
        const start = new Date(r.createdAt).getTime();
        const end = r.resolvedAt ? new Date(r.resolvedAt).getTime() : null;
        const responseHours = end ? Math.round((end - start) / (1000 * 60 * 60)) : 'N/A';

        const row = [
          r.id,
          r.department || 'غير مصنف',
          r.status,
          r.createdAt,
          r.resolvedAt || '',
          responseHours,
          r.communityComments?.length || 0,
          r.priority || '',
          `"${(r.description || '').replace(/"/g, '""')}"`,
          r.location ? `${r.location[0]};${r.location[1]}` : ''
        ];
        csvRows.push(row.join(','));
      });

      const csvData = csvRows.join('\n');
      const blob = new Blob(['\uFEFF' + csvData], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute("download", `journalist_investigation_data_${new Date().toISOString().split('T')[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      toast.success("تم تصدير البيانات بنجاح");
    } catch (e) {
      toast.error("حدث خطأ أثناء التصدير");
    }
  };

  const handleCreateCommentRequest = async () => {
      if (!targetDepartment || !commentRequestText.trim()) {
          toast.error("الرجاء تحديد الجهة وكتابة الاستفسار");
          return;
      }
      setIsSubmitting(true);
      try {
        const newRef = doc(collection(db, 'clarifications'));
        await setDoc(newRef, {
            department: targetDepartment,
            text: `[طلب تعليق صحفي - بخصوص البلاغ ${targetReportId || 'عام'}]\n${commentRequestText}`,
            status: 'open',
            type: 'journalist_comment_request',
            createdAt: new Date().toISOString()
        });
        toast.success("تم إرسال طلب التعليق الرسمي بنجاح للجهة المعنية");
        setIsGeneralCommentModalOpen(false);
        setTargetDepartment("");
        setCommentRequestText("");
        setTargetReportId("");
      } catch (err) {
          handleFirestoreError(err, OperationType.CREATE, 'journalist_comment_requests');
      } finally {
          setIsSubmitting(false);
      }
  };

  const toggleInvestigationFolder = (id: string) => {
      if (investigationFolder.includes(id)) {
          setInvestigationFolder(investigationFolder.filter(x => x !== id));
          toast.success("تم إزالة البلاغ من مجلد التحقيق");
      } else {
          setInvestigationFolder([...investigationFolder, id]);
          toast.success("تم إضافة البلاغ لمجلد التحقيق");
      }
  };

  return (
    <div className="flex flex-col gap-8 w-full p-2 sm:p-10 bg-slate-50/20 min-h-[85vh] rounded-[3rem] border border-slate-200/50 shadow-sm relative overflow-hidden">
      
      {/* Map Overview Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full h-[350px] bg-slate-50 rounded-[3rem] border border-slate-100 overflow-hidden relative group z-10 shadow-sm"
      >
        <div className="absolute top-6 left-6 z-10 bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl border border-slate-200 shadow-sm flex items-center gap-2">
            <MapPin size={14} className="text-rose-600" />
            <span className="text-[10px] font-black text-slate-900 tracking-tight">رصد ميداني لمناطق التغطية والأحداث النشطة</span>
        </div>
        <JournalistMapView 
          points={reports.slice(0, 15).map(r => ({
            lat: r.location?.[0] || 15.3694,
            lng: r.location?.[1] || 44.1910,
            intensity: r.priority === 'critical' ? 0.9 : 0.5,
            label: r.department || 'حدث ميداني',
            type: r.priority === 'critical' ? 'incident' : 'report',
            status: r.priority === 'critical' ? 'urgent' : 'draft',
            verified: true
          }))}
          center={[15.3694, 44.1910]}
          zoom={13}
        />
      </motion.div>
      
      {/* Quick Navigation Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-9 gap-4 relative z-10 w-full">
        {[
          { name: 'مناطق التغطية', icon: MapPin, path: "/journalist/coverage-areas", color: "bg-teal-50 text-teal-600" },
          { name: 'المسودات والمقالات', icon: Newspaper, path: "/journalist/articles", color: "bg-indigo-50 text-indigo-600" },
          { name: 'المقابلات الصوتية', icon: Mic, path: "/journalist/interviews", color: "bg-rose-50 text-rose-600" },
          { name: 'المعرض المرئي', icon: Camera, path: "/journalist/visual-gallery", color: "bg-blue-50 text-blue-600" },
          { name: 'إحصائيات القراء', icon: BarChart3, path: "/journalist/reader-stats", color: "bg-emerald-50 text-emerald-600" },
          { name: 'الأرشيف الصحفي', icon: Archive, path: "/journalist/archive", color: "bg-slate-100 text-slate-800" },
          { name: 'الملف المهني', icon: User, path: "/journalist/profile", color: "bg-amber-50 text-amber-600" },
          { name: 'عواجل الصحافة', icon: Zap, path: "/journalist/breaking-news", color: "bg-rose-100 text-rose-700" },
          { name: 'الإعدادات', icon: Settings, path: "/journalist/settings", color: "bg-gray-100 text-gray-800" },
        ].map((item, idx) => (
          <Link
            key={idx}
            to={item.path}
            className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl hover:scale-[1.02] transition-all flex flex-col items-center justify-center text-center gap-4 group"
          >
            <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:rotate-12 shadow-sm", item.color)}>
              <item.icon className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-black text-slate-800 uppercase italic tracking-tighter leading-none">{item.name}</span>
          </Link>
        ))}
      </div>

      <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 rounded-[2rem] bg-purple-900 text-white flex items-center justify-center shadow-xl shadow-purple-900/20">
            <Newspaper className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-3xl font-black text-slate-900 font-readex tracking-tight">غرفة أخبار الشفافية</h2>
            <p className="text-slate-500 mt-1 font-bold">بوابة الصحافة الاستقصائية لرصد قضايا المجتمع والمساءلة</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
            <button onClick={handleExportCSV} className="px-6 py-3 bg-white border border-slate-200 rounded-2xl flex items-center gap-2 text-xs font-black text-slate-700 hover:bg-slate-50 transition-all shadow-sm">
                <Download className="w-4 h-4" />
                تحميل البيانات الخام (CSV)
            </button>
        </div>
      </header>

      {/* Media Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
        {statistics.map((stat, i) => (
          <motion.div 
            key={stat.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-md transition-shadow"
          >
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">{stat.label}</p>
            <p className={`text-3xl font-black ${stat.color}`}>{stat.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
        {/* Investigative Feed */}
        <div className="lg:col-span-8 flex flex-col gap-6">
            <div className="bg-white rounded-[3rem] border border-slate-200 shadow-sm overflow-hidden h-[600px] flex flex-col">
                <div className="p-8 border-b border-slate-50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <button 
                            onClick={() => setActiveFilter("supported")}
                            className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase transition-all ${
                                activeFilter === 'supported' ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/20' : 'text-slate-500 hover:bg-slate-50'
                            }`}
                        >
                            <TrendingUp className="w-3 h-3 inline-block ml-2" />
                            أعلى البلاغات تأييداً
                        </button>
                        <button 
                            onClick={() => setActiveFilter("slowest")}
                            className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase transition-all ${
                                activeFilter === 'slowest' ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/20' : 'text-slate-500 hover:bg-slate-50'
                            }`}
                        >
                            <Clock className="w-3 h-3 inline-block ml-2" />
                            أبطأ البلاغات استجابة
                        </button>
                    </div>
                    <div className="relative">
                        <Search className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-slate-300" />
                        <input 
                            type="text" 
                            placeholder="ابحث في البلاغات المسجلة..." 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pr-10 pl-4 py-2 bg-slate-50 border border-slate-100 rounded-xl text-[10px] font-bold outline-none focus:ring-2 focus:ring-purple-100 transition-all w-full sm:w-48" 
                        />
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto custom-scrollbar p-8 space-y-4 bg-slate-50/50">
                    {filteredReports.length === 0 && <p className="text-center text-slate-400 font-bold py-10">لم يتم العثور على بلاغات مطابقة للبحث</p>}
                    {filteredReports.map((story) => (
                        <div key={story.id} className="p-6 rounded-[2rem] border border-slate-200 bg-white shadow-sm hover:border-purple-200 hover:shadow-md transition-all group">
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex relative">
                                    <div className="w-10 h-10 shrink-0 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600 font-black ml-3">
                                        <TrendingUp className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h4 className="font-black text-slate-800 text-sm group-hover:text-purple-700 transition-colors leading-relaxed">{story.description}</h4>
                                        <div className="flex items-center gap-3 mt-2">
                                            {activeFilter === 'supported' && (
                                                <span className="text-[9px] font-black text-purple-600 flex items-center gap-1 bg-purple-50 px-2 py-0.5 rounded-md">
                                                    <TrendingUp className="w-3 h-3" />
                                                    تأييد شعبي: {story.communityComments?.length || 0}
                                                </span>
                                            )}
                                            {activeFilter === 'slowest' && (
                                                <span className="text-[9px] font-black text-rose-600 flex items-center gap-1 bg-rose-50 px-2 py-0.5 rounded-md">
                                                    <Clock className="w-3 h-3" />
                                                    التأخير الحسابي: {(() => {
                                                        const start = new Date(story.createdAt).getTime();
                                                        const end = story.resolvedAt ? new Date(story.resolvedAt).getTime() : new Date().getTime();
                                                        const hours = Math.round((end - start) / (1000 * 60 * 60));
                                                        return hours > 24 ? `${Math.round(hours/24)} يوم` : `${hours} ساعة`;
                                                    })()}
                                                </span>
                                            )}
                                            <span className="text-[9px] font-bold text-slate-400 flex items-center gap-1 bg-slate-50 px-2 py-0.5 rounded-md">
                                                <AlertCircle className="w-3 h-3" />
                                                {story.department || 'غير مصنف'}
                                            </span>
                                        </div>

                                        {/* Journalist Requests Display */}
                                        {(() => {
                                            const req = journalistRequests.find(jr => jr.reportId === story.id);
                                            if (!req) return (
                                                <button 
                                                    onClick={() => setShowRequestModal(story)}
                                                    className="mt-4 flex items-center gap-2 bg-purple-50 text-purple-700 px-4 py-2 rounded-xl text-[10px] font-black uppercase hover:bg-purple-100 transition-all border border-purple-100"
                                                >
                                                    <MessageSquarePlus className="w-3 h-3" />
                                                    طلب تعليق رسمي من {story.department || "الجهة المعنية"}
                                                </button>
                                            );

                                            const deadlineStatus = getDeadlineStatus(req.deadline);

                                            return (
                                                <div className="mt-4 space-y-3">
                                                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 relative group">
                                                        <div className="flex items-center justify-between mb-2">
                                                            <div className="flex items-center gap-2 text-[10px] font-black text-purple-600 uppercase">
                                                                <Activity className="w-3 h-3" />
                                                                طلب تعليق صحفي معلق
                                                            </div>
                                                            {req.status === 'pending' && deadlineStatus && (
                                                                <div className={cn("text-[9px] font-black flex items-center gap-1", deadlineStatus.color)}>
                                                                    <Timer className="w-3 h-3" />
                                                                    {deadlineStatus.label}
                                                                </div>
                                                            )}
                                                        </div>
                                                        <p className="text-xs font-bold text-slate-500 italic">"{req.content}"</p>
                                                    </div>

                                                    {req.officialReply && (
                                                        <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-100 animate-in fade-in slide-in-from-top-2">
                                                            <div className="flex items-center gap-2 mb-2 text-[10px] font-black text-emerald-700 uppercase">
                                                                <CheckCircle2 className="w-3 h-3" />
                                                                الرد الرسمي للجهة:
                                                            </div>
                                                            <p className="text-xs font-black text-emerald-900 leading-relaxed">
                                                                {req.officialReply}
                                                            </p>
                                                            <div className="mt-2 text-[8px] font-black text-emerald-600/50 uppercase">
                                                                المتحدث باسم: {req.repliedBy}
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            );
                                        })()}
                                    </div>
                                </div>
                                <button className="p-2 text-slate-300 hover:text-slate-600 transition-colors">
                                    <MoreVertical className="w-4 h-4" />
                                </button>
                            </div>
                            
                            <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-100">
                                <div className="flex items-center gap-2">
                                    <span className={`w-2 h-2 rounded-full ${story.priority === 'critical' ? 'bg-rose-500 animate-pulse' : 'bg-amber-500'}`} />
                                    <span className="text-[10px] font-black text-slate-600">{story.status}</span>
                                    <span className="text-[10px] font-bold text-slate-400 mr-2 border-r border-slate-200 pr-2">{new Date(story.createdAt).toLocaleDateString('ar-SA')}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button 
                                        onClick={() => toggleInvestigationFolder(story.id)}
                                        className={`flex items-center gap-1 text-[10px] font-black px-3 py-1 rounded-full transition-colors ${investigationFolder.includes(story.id) ? 'bg-purple-100 text-purple-700' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                                    >
                                        <FolderPlus className="w-3 h-3" />
                                        {investigationFolder.includes(story.id) ? 'بالمجلد' : 'إضافة للتحقيق'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>

        {/* Investigative Tools */}
        <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="bg-slate-900 rounded-[3rem] p-8 text-white relative overflow-hidden group shrink-0">
                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:rotate-12 transition-transform duration-700">
                    <ShieldCheck className="w-32 h-32" />
                </div>
                <h3 className="text-xl font-black mb-4 font-readex relative z-10">إدارة التحقيقات</h3>
                <p className="text-[11px] font-bold text-slate-400 leading-relaxed mb-6 relative z-10">
                    مجلد التحقيق الحالي يضم <span className="text-purple-400 font-black px-1">{investigationFolder.length}</span> بلاغات لحفظها ومتابعتها لاحقاً.
                </p>
                <button className="w-full py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-2xl text-[10px] font-black uppercase tracking-widest relative z-10 transition-colors uppercase">
                    معاينة مجلد التحقيق ({investigationFolder.length})
                </button>
            </div>

            <div className="bg-white rounded-[3rem] p-8 border border-slate-200 shadow-sm flex-1 flex flex-col">
                <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest mb-6">طلبات التعليق الرسمي وحق الرد</h4>
                
                <div className="flex-1 space-y-4 overflow-y-auto mb-6 pr-1 custom-scrollbar">
                   <div className="p-5 rounded-3xl bg-amber-50 border border-amber-100">
                        <div className="flex items-center gap-2 mb-2 text-amber-600">
                            <Clock className="w-4 h-4" />
                            <span className="text-[10px] font-black">بانتظار الرد الرسمي</span>
                        </div>
                        <p className="text-xs font-black text-slate-800 mb-1">جهة: البلدية (قطاع النظافة)</p>
                        <p className="text-[10px] text-amber-700/80 font-bold">تم الاستفسار حول أسباب تأخير البلاغات لأكثر من ٣ أسابيع.</p>
                   </div>
                </div>
                
                <button 
                    onClick={() => setIsGeneralCommentModalOpen(true)}
                    className="w-full mt-auto py-4 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-800 transition-all flex items-center justify-center gap-2"
                >
                    <MessageSquare className="w-4 h-4" />
                    إرسال طلب تعليق رسمي
                </button>
            </div>
        </div>
      </div>

      <AnimatePresence>
        {showRequestModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <motion.div 
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
                    onClick={() => setShowRequestModal(null)}
                />
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    className="relative w-full max-w-lg bg-white rounded-[2.5rem] shadow-2xl p-8 flex flex-col gap-6"
                >
                    <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center">
                        <MessageSquarePlus className="w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="text-xl font-black text-slate-900 font-readex">طلب تعليق رسمي</h3>
                        <p className="text-xs font-bold text-slate-500 mt-2 leading-relaxed">
                            سيتم إرسال هذا الطلب بشكل رسمي إلى إدارة <span className="text-purple-600 font-black">({showRequestModal.department || "الجهة المعنية"})</span>. يمنح النظام مهلة 48 ساعة للرد الرسمي قبل تسجيل "غياب الشفافية".
                        </p>
                    </div>

                    <textarea 
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs font-bold outline-none focus:ring-2 focus:ring-purple-100 min-h-[150px] resize-none"
                        placeholder="اكتب سؤالك أو استفسارك الصحفي هنا..."
                        value={commentRequestText}
                        onChange={(e) => setCommentRequestText(e.target.value)}
                    />

                    <div className="flex gap-3">
                        <button 
                            onClick={handleCreateRequest}
                            disabled={isSubmitting}
                            className="flex-1 py-4 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-black transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                        >
                            {isSubmitting ? "جاري الإرسال..." : (
                                <>
                                    إرسال الطلب <Send className="w-4 h-4" />
                                </>
                            )}
                        </button>
                        <button 
                            onClick={() => setShowRequestModal(null)}
                            className="px-6 py-4 bg-slate-100 text-slate-500 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-200 transition-all"
                        >
                            إلغاء
                        </button>
                    </div>
                </motion.div>
            </div>
        )}

        {isGeneralCommentModalOpen && (
            <div className="fixed inset-0 z-50 flex justify-center items-center p-4">
               {/* Backdrop */}
               <motion.div 
                  initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
                  className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
                  onClick={() => setIsGeneralCommentModalOpen(false)}
               />
               {/* Modal */}
               <motion.div
                  initial={{scale:0.95, opacity:0, y:20}} animate={{scale:1, opacity:1, y:0}} exit={{scale:0.95, opacity:0, y:20}}
                  className="relative bg-white rounded-[2rem] p-8 w-full max-w-lg shadow-2xl border border-slate-100"
               >
                    <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center mb-4">
                       <MessageSquare className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-black text-slate-900 mb-2">طلب تعليق رسمي وحق الرد</h3>
                    <p className="text-xs font-bold text-slate-500 mb-6">
                        يرسل هذا الطلب للجهات المختصة بشكل مفتوح ويسجل في النظام لمتابعة استجابة الجهة للإعلام والجمهور.
                    </p>
    
                    <div className="space-y-4 font-bold text-sm">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-[10px] uppercase font-black text-slate-400 mb-1 pl-1">الجهة المستهدفة للرد</label>
                                <select 
                                    value={targetDepartment}
                                    onChange={(e) => setTargetDepartment(e.target.value)}
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-purple-500"
                                >
                                    <option value="">- اختر الجهة -</option>
                                    <option value="البلدية والإدارة العليا">البلدية والإدارة العليا</option>
                                    <option value="النظافة والمخلفات">النظافة والمخلفات</option>
                                    <option value="الإنارة والكهرباء">الإنارة والكهرباء</option>
                                    <option value="الطرق والجسور">الطرق والجسور</option>
                                    <option value="الصرف الصحي والمياه">الصرف الصحي والمياه</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-[10px] uppercase font-black text-slate-400 mb-1 pl-1">رقم البلاغ (اختياري)</label>
                                <input
                                    type="text"
                                    value={targetReportId}
                                    onChange={(e) => setTargetReportId(e.target.value)}
                                    placeholder="مثال: abc-123"
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-purple-500"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-[10px] uppercase font-black text-slate-400 mb-1 pl-1">نص الاستفسار والمطالبة</label>
                            <textarea
                                value={commentRequestText}
                                onChange={(e) => setCommentRequestText(e.target.value)}
                                placeholder="اكتب أسئلتك أو طلب التوضيح ليتم تسجيله في لوحات الإدارة..."
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-purple-500 min-h-[120px] resize-none"
                            ></textarea>
                        </div>
                    </div>
    
                    <div className="flex gap-3 mt-8">
                        <button disabled={isSubmitting} onClick={handleCreateGeneralCommentRequest} className="flex-1 bg-slate-900 text-white rounded-xl py-3 text-sm font-black shadow-lg shadow-slate-900/20 hover:bg-slate-800 transition flex items-center justify-center gap-2">
                            {isSubmitting ? <RotateCw className="w-4 h-4 animate-spin" /> : "إرسال وتوثيق الطلب"}
                        </button>
                        <button disabled={isSubmitting} onClick={() => setIsGeneralCommentModalOpen(false)} className="flex-1 bg-slate-100 text-slate-700 rounded-xl py-3 text-sm font-black hover:bg-slate-200 transition">
                            إلغاء
                        </button>
                    </div>
               </motion.div>
            </div>
        )}
      </AnimatePresence>

    </div>
  );
}

