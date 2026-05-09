import { Wrench, MapPin, Star, TrendingUp, DollarSign, MessageSquare, Bell, PenTool as Tool, Package, Users, Search, Filter, ArrowUpRight, CheckCircle2, Clock, ShieldCheck, Construction, History, FileBarChart, Truck, ListTodo, HandMetal, Settings, User } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { collection, query, onSnapshot, doc, updateDoc, arrayUnion } from "firebase/firestore";
import { db, handleFirestoreError, OperationType } from "../../core/services/firebase";
import { Report } from "../../core/services/reportApi";
import { toast } from "sonner";
import { useAuth } from "../../core/context/AuthContext";
import HandymanMapView from "./HandymanMapView";
import { Link } from "react-router-dom";

export function HandymanDashboard() {
  const { currentRole, user } = useAuth();
  const [activeTab, setActiveTab] = useState("leads");
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSubscribed, setIsSubscribed] = useState(true);
  const [subscribedCategories, setSubscribedCategories] = useState(['سباكة', 'كهرباء', 'تكييف']);
  const [subscribedDistricts, setSubscribedDistricts] = useState(['حي الروضة', 'حي النزهة']);

  const [selectedReportId, setSelectedReportId] = useState<string | null>(null);
  const [bidPrice, setBidPrice] = useState("");
  const [bidTime, setBidTime] = useState("");
  const [isSubmittingBid, setIsSubmittingBid] = useState(false);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);

  useEffect(() => {
    const q = query(collection(db, 'reports'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map(d => ({ id: d.id, ...d.data() } as Report));
      setReports(docs);
      setLoading(false);
    }, (error) => handleFirestoreError(error, OperationType.LIST, 'reports'));

    return () => unsubscribe();
  }, []);

  const privateLeads = reports.filter(r => r.isPrivateService || r.department === 'خدمات خاصة');
  const myContracts = privateLeads.filter(r => r.assignedTo === currentRole?.slug);
  
  // Nearby Leads: Filter based on subscription preferences if subscribed to "Ads/Contextual Leads"
  const openLeads = privateLeads.filter(r => {
    if (r.assignedTo || r.status === 'تم الإنجاز' || r.status === 'resolved') return false;
    
    // If subscribed, filter by preferences
    if (isSubscribed) {
        const matchesCategory = subscribedCategories.some(cat => r.description?.includes(cat) || r.type?.includes(cat));
        const matchesDistrict = subscribedDistricts.includes(r.district || '');
        return matchesCategory || matchesDistrict;
    }
    
    return true; // Show all if not subscribed (or maybe show less? Let's show all for now)
  });

  const displayReports = activeTab === 'leads' ? openLeads : myContracts;

  const adsPerformance = [
    { label: "ظهور الإعلانات", value: "١,٢٤٠", sub: "+١٢٪ هذا الأسبوع" },
    { label: "نقرات المهتمين", value: "٨٦", sub: "معدل تحويل ٧٪" },
    { label: "طلبات مباشرة", value: "١٢", sub: "قيمة تقديرية ٨٥٠$" },
  ];

  const handleSubmitBid = async () => {
    if(!selectedReportId || !bidPrice || !bidTime) return;
    setIsSubmittingBid(true);
    try {
        const repRef = doc(db, 'reports', selectedReportId);
        const newBid = {
            handymanId: currentRole?.slug,
            handymanName: "مؤسسة الصيانة السريعة", // Mock name
            price: bidPrice,
            timeEstimate: bidTime,
            status: 'pending',
            createdAt: new Date().toISOString()
        };
        await updateDoc(repRef, {
            bids: arrayUnion(newBid)
        });
        toast.success("تم إرسال عرض السعر للمواطن بنجاح!");
        setSelectedReportId(null);
        setBidPrice("");
        setBidTime("");
    } catch (error) {
        handleFirestoreError(error, OperationType.UPDATE, 'reports');
    } finally {
        setIsSubmittingBid(false);
    }
  };

  const handleUpdateStatus = async (reportId: string, newStatus: string) => {
    setIsUpdatingStatus(true);
    try {
        const repRef = doc(db, 'reports', reportId);
        await updateDoc(repRef, {
            status: newStatus,
            updatedAt: new Date().toISOString()
        });
        toast.success(`تم تحديث الحالة إلى: ${newStatus}`);
    } catch (error) {
        handleFirestoreError(error, OperationType.UPDATE, 'reports');
    } finally {
        setIsUpdatingStatus(false);
    }
  };

  return (
    <div className="flex flex-col gap-8 w-full p-2 sm:p-10 bg-indigo-50/5 min-h-[85vh] rounded-[3rem] border border-indigo-100/50 shadow-sm relative overflow-hidden">
      {/* Decorative Indico Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/5 rounded-full blur-[100px] -z-10" />
      
      <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 rounded-[2rem] bg-indigo-600 text-white flex items-center justify-center shadow-xl shadow-indigo-600/20 shrink-0">
            <Wrench className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-3xl font-black text-slate-900 font-readex tracking-tight">مركز الخدمات المحلية (الفنيين)</h2>
            <p className="text-slate-500 mt-1 font-bold">تلقي الطلبات المنزلية الخاصة، تقديم عروض الأسعار، وإدارة التقييم</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
            <div className="flex flex-col items-end">
                <div className="flex items-center gap-1 text-amber-500">
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 text-slate-300" />
                    <span className="text-xs font-black text-slate-700 mr-2">٤.٨ / ٥</span>
                </div>
                <p className="text-[9px] font-bold text-slate-400 capitalize">الموثوقية: عالية جداً</p>
            </div>
        </div>
      </header>
 
      {/* Quick Navigation Grid */}
      <div className="grid grid-cols-3 lg:grid-cols-9 gap-3 relative z-10 transition-all">
          {[
              { label: 'مواقع العمل', icon: Construction, path: '/handyman/work-sites', color: 'bg-amber-50 text-amber-600' },
              { label: 'صيانة المعدات', icon: Wrench, path: '/handyman/maintenance', color: 'bg-indigo-50 text-indigo-600' },
              { label: 'تقارير الإنجاز', icon: FileBarChart, path: '/handyman/reports', color: 'bg-emerald-50 text-emerald-600' },
              { label: 'الدعم اللوجستي', icon: Truck, path: '/handyman/logistics', color: 'bg-blue-50 text-blue-600' },
              { label: 'سجل العمليات', icon: History, path: '/handyman/ops-log', color: 'bg-slate-50 text-slate-800' },
              { label: 'الملف المهني', icon: User, path: '/handyman/profile', color: 'bg-slate-50 text-slate-800' },
              { label: 'التنبيهات', icon: Bell, path: '/handyman/alerts', color: 'bg-rose-50 text-rose-600' },
              { label: 'إرشادات السلامة', icon: HandMetal, path: '/handyman/safety', color: 'bg-rose-50 text-rose-600' },
              { label: 'الإعدادات', icon: Settings, path: '/handyman/settings', color: 'bg-slate-50 text-slate-800' },
          ].map((action, i) => (
              <Link 
                  key={i} 
                  to={action.path}
                   className="flex flex-col items-center justify-center p-4 bg-white rounded-2xl border border-slate-100 hover:shadow-lg transition-all hover:-translate-y-1 group"
              >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-2 ${action.color} group-hover:scale-110 transition-transform`}>
                      <action.icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-black text-slate-800 uppercase tracking-tighter text-center">{action.label}</span>
              </Link>
          ))}
      </div>

      {/* Ad & Business Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
        {adsPerformance.map((stat, i) => (
          <motion.div 
            key={stat.label}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-8 rounded-[2.5rem] border border-indigo-50 shadow-sm group hover:border-indigo-300 transition-all"
          >
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">{stat.label}</p>
            <p className="text-3xl font-black text-indigo-700">{stat.value}</p>
            <p className="text-[10px] font-bold text-slate-500 mt-2">{stat.sub}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
        {/* Local Leads / Requests */}
        <div className="lg:col-span-8 flex flex-col gap-6">
            <div className="bg-white rounded-[3rem] border border-slate-200 shadow-sm flex-1 flex flex-col overflow-hidden h-[600px]">
                <div className="p-8 border-b border-slate-50 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-indigo-600" />
                        <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest">سوق الطلبات المحلية</h3>
                    </div>
                    <div className="flex gap-2">
                        <button 
                            onClick={() => setActiveTab('leads')}
                            className={`px-4 py-2 rounded-xl text-[10px] font-black transition-all ${activeTab === 'leads' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' : 'bg-slate-50 text-slate-400 border border-slate-100 hover:bg-slate-100'}`}
                        >
                            طلبات قريبة مني (فرص)
                        </button>
                        <button 
                            onClick={() => setActiveTab('contracts')}
                            className={`px-4 py-2 rounded-xl text-[10px] font-black transition-all ${activeTab === 'contracts' ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/20' : 'bg-slate-50 text-slate-400 border border-slate-100 hover:bg-slate-100'}`}
                        >
                            عقودي النشطة
                        </button>
                    </div>
                </div>

                <div className="p-8 space-y-4 overflow-y-auto custom-scrollbar flex-1 bg-slate-50/50">
                    {displayReports.length === 0 && <p className="text-center text-slate-400 font-bold py-10">لا توجد طلبات في هذا القسم حالياً.</p>}
                    
                    {displayReports.map(lead => {
                        const hasMyBid = lead.bids?.some(b => b.handymanId === currentRole?.slug);
                        return (
                        <div key={lead.id} className="p-6 rounded-[2.2rem] bg-white border border-slate-200 hover:border-indigo-200 shadow-sm transition-all group flex flex-col gap-4">
                            <div className="flex items-start justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 shrink-0 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-100 group-hover:scale-110 transition-transform">
                                        <Tool className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <h4 className="font-black text-slate-900 text-sm leading-relaxed">{lead.description}</h4>
                                            {lead.status === 'new' && (
                                                <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                                            )}
                                        </div>
                                        <div className="flex items-center flex-wrap gap-4 mt-2">
                                            <span className="text-[10px] font-bold text-slate-500 flex items-center gap-1 bg-slate-50 px-2 py-0.5 rounded-md border border-slate-100">
                                                <MapPin className="w-3 h-3" />
                                                {lead.district || 'حي غير محدد'}
                                            </span>
                                            {isSubscribed && (subscribedDistricts.includes(lead.district || '') || subscribedCategories.some(c => lead.description?.includes(c))) && (
                                                <span className="text-[9px] font-black text-indigo-600 flex items-center gap-1 bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-100">
                                                    <TrendingUp className="w-3 h-3" />
                                                    مطابقة ذكية (قريب منك)
                                                </span>
                                            )}
                                            <span className="text-[10px] font-bold text-slate-500 flex items-center gap-1 bg-slate-50 px-2 py-0.5 rounded-md border border-slate-100">
                                                <Clock className="w-3 h-3" />
                                                {new Date(lead.createdAt).toLocaleDateString('ar-SA')}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-left shrink-0">
                                    {activeTab === 'leads' ? (
                                        hasMyBid ? (
                                            <span className="px-4 py-2 bg-amber-50 text-amber-600 border border-amber-200 rounded-xl text-[10px] font-black">
                                                بانتظار رد العميل
                                            </span>
                                        ) : (
                                            <button onClick={() => setSelectedReportId(lead.id)} className="px-5 py-2 bg-indigo-600 text-white rounded-xl text-[10px] font-black hover:bg-indigo-700 transition-colors shadow-sm">
                                                تقديم عرض سعر
                                            </button>
                                        )
                                    ) : (
                                        <span className={`px-3 py-1 rounded-full text-[10px] font-black ${['تم الحل', 'تم الإنجاز'].includes(lead.status) ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700'}`}>
                                            حالة العقد: {lead.status}
                                        </span>
                                    )}
                                </div>
                            </div>

                            {activeTab === 'contracts' && !['تم الحل', 'تم الإنجاز'].includes(lead.status) && (
                                <div className="flex gap-2 mt-2 pt-4 border-t border-slate-50">
                                    <button 
                                        disabled={isUpdatingStatus}
                                        onClick={() => handleUpdateStatus(lead.id, 'قيد التنفيذ - الفني في الموقع')}
                                        className="flex-1 bg-sky-50 text-sky-700 py-2 rounded-xl text-[10px] font-black border border-sky-100 hover:bg-sky-100"
                                    >
                                        المباشرة بالموقع
                                    </button>
                                    <button 
                                        disabled={isUpdatingStatus}
                                        onClick={() => handleUpdateStatus(lead.id, 'تم الإنجاز')}
                                        className="flex-1 bg-emerald-50 text-emerald-700 py-2 rounded-xl text-[10px] font-black border border-emerald-100 hover:bg-emerald-100"
                                    >
                                        إعلان إنجاز العمل
                                    </button>
                                </div>
                            )}

                        </div>
                    )})}
                </div>
            </div>
        </div>

        {/* Ad Management & Growth */}
        <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="bg-indigo-900 rounded-[3rem] p-8 text-white relative overflow-hidden group shrink-0">
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-3xl" />
                <Package className="w-10 h-10 mb-6 text-indigo-300 relative z-10" />
                <h4 className="text-xl font-black mb-4 font-readex tracking-tight relative z-10">ترويج "خدمة الجوار"</h4>
                <p className="text-xs font-bold text-indigo-100/70 leading-relaxed mb-6 relative z-10">
                    تظهر إعلاناتك كـ "اقتراحات إضافية" للمواطنين الذين يبلغون عن أعطال قريبة منك. الاشتراك الشهري متاح.
                </p>
                <div className="space-y-3 relative z-10">
                    <div className="flex items-center justify-between p-3 bg-white/10 rounded-2xl border border-white/5">
                        <div className="flex items-center gap-3">
                            <ShieldCheck className="w-4 h-4 text-emerald-400" />
                            <span className="text-[10px] font-bold">الحالة: {isSubscribed ? 'مشترك نشط' : 'غير مشترك'}</span>
                        </div>
                        <button 
                            onClick={() => setIsSubscribed(!isSubscribed)}
                            className="text-[9px] font-black underline text-indigo-300"
                        >
                            {isSubscribed ? 'إيقاف مؤقت' : 'تفعيل الآن'}
                        </button>
                    </div>
                </div>
                <div className="mt-6 p-4 bg-indigo-800/50 rounded-2xl border border-indigo-700">
                    <h5 className="text-[10px] font-black mb-3 text-indigo-200">تغطية الإعلانات السياقية:</h5>
                    <div className="flex flex-wrap gap-2">
                        {subscribedCategories.map(cat => (
                            <span key={cat} className="px-2 py-1 bg-indigo-600 rounded-lg text-[8px] font-bold">{cat}</span>
                        ))}
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2 border-t border-indigo-700/50 pt-3">
                        {subscribedDistricts.map(dist => (
                            <span key={dist} className="px-2 py-1 bg-indigo-500/50 rounded-lg text-[8px] font-bold flex items-center gap-1">
                                <MapPin size={8} /> {dist}
                            </span>
                        ))}
                    </div>
                </div>
                <button className="w-full mt-4 py-3 bg-white text-indigo-900 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-50 transition-all relative z-10">
                    تعديل مناطق التغطية
                </button>
            </div>

            <div className="bg-white rounded-[3rem] p-8 border border-slate-200 shadow-sm flex-1">
                <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest mb-8">تقييمات وثقة</h4>
                
                <div className="p-6 bg-slate-50 rounded-[2rem] border border-slate-100 flex flex-col items-center text-center h-full justify-center">
                    <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-4 text-indigo-600">
                        <MessageSquare className="w-6 h-6" />
                    </div>
                    <h5 className="text-[11px] font-black text-slate-900 mb-2 font-readex">آخر التقييمات</h5>
                    <p className="text-[9px] text-slate-400 font-bold mb-4 leading-relaxed">
                        يؤثر تقييم المواطنين لأدائك بعد إنجاز الأعمال على ترتيبك في إعلانات الجوار. 
                        أنت حاليا تملك نسبة إيجابية تفوق ٩٢٪.
                    </p>
                    <button className="text-[10px] font-black text-indigo-600 hover:underline">قراءة التقييمات الحديثة</button>
                </div>
            </div>
        </div>
      </div>

      {/* Map Overview Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full h-[400px] bg-slate-50 rounded-[3rem] border border-slate-100 overflow-hidden relative group z-10"
      >
        <div className="absolute top-6 left-6 z-10 bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl border border-slate-200 shadow-sm flex items-center gap-2">
            <MapPin size={14} className="text-blue-600" />
            <span className="text-[10px] font-black text-slate-900 tracking-tight">رصد المهام الميدانية والمواقع النشطة</span>
        </div>
        <HandymanMapView 
          points={reports.slice(0, 10).map(r => ({
            lat: r.location?.lat || 15.3694,
            lng: r.location?.lng || 44.1910,
            intensity: r.priority === 'critical' ? 0.8 : 0.4,
            label: r.department || 'موقع صيانة',
            type: r.priority === 'critical' ? 'repair' : 'maintenance',
            status: r.status === 'resolved' ? 'completed' : r.status === 'in-progress' ? 'in-progress' : 'pending',
            urgent: r.priority === 'critical'
          }))}
          center={[15.3694, 44.1910]}
          zoom={13}
        />
      </motion.div>

      <AnimatePresence>
        {selectedReportId && (
            <div className="fixed inset-0 z-50 flex justify-center items-center p-4">
               {/* Backdrop */}
               <motion.div 
                  initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
                  className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
                  onClick={() => setSelectedReportId(null)}
               />
               {/* Modal */}
               <motion.div
                  initial={{scale:0.95, opacity:0, y:20}} animate={{scale:1, opacity:1, y:0}} exit={{scale:0.95, opacity:0, y:20}}
                  className="relative bg-white rounded-[2.5rem] p-8 w-full max-w-md shadow-2xl border border-slate-100"
               >
                    <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mb-6 mx-auto">
                       <DollarSign className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-black text-slate-900 mb-2 font-readex text-center">تقديم عرض سعر للمواطن</h3>
                    <p className="text-[11px] font-bold text-slate-500 mb-8 leading-relaxed text-center">
                        يرجى تحديد السعر التقريبي والوقت المتراكم لإنجاز هذا العطل المنزلي. سيصل العرض للمواطن للموافقة.
                    </p>
    
                    <div className="space-y-4 mb-8">
                        <div>
                            <label className="block text-[10px] font-black text-slate-700 mb-2">التكلفة التقديرية (شاملة الفحص)</label>
                            <input 
                                type="text"
                                value={bidPrice}
                                onChange={e => setBidPrice(e.target.value)}
                                placeholder="مثال: ١٥٠ - ٢٠٠ ريال" 
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold focus:outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 transition-all"
                            />
                        </div>
                        <div>
                            <label className="block text-[10px] font-black text-slate-700 mb-2">الوقت المتوقع للوصول/الإنجاز</label>
                            <input 
                                type="text"
                                value={bidTime}
                                onChange={e => setBidTime(e.target.value)}
                                placeholder="مثال: أصل خلال نصف ساعة" 
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold focus:outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 transition-all"
                            />
                        </div>
                    </div>
    
                    <div className="flex gap-3">
                        <button 
                            disabled={isSubmittingBid || !bidPrice || !bidTime}
                            onClick={handleSubmitBid} 
                            className="flex-1 bg-indigo-600 text-white rounded-xl py-3.5 text-xs font-black shadow-lg shadow-indigo-600/20 hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isSubmittingBid ? 'جاري الإرسال...' : 'إرسال العرض'}
                        </button>
                        <button disabled={isSubmittingBid} onClick={() => setSelectedReportId(null)} className="flex-1 bg-slate-100 text-slate-700 rounded-xl py-3.5 text-xs font-black hover:bg-slate-200 transition">
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

