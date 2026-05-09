import { Store, TrendingUp, Award, Clock, MapPin, Plus, HeartHandshake, Zap, Trophy, ShieldCheck, Sun, AreaChart, ShoppingBag, Truck, CreditCard, Bell, Settings } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { auth, db, handleFirestoreError, OperationType } from "../../core/services/firebase";
import { collection, query, where, onSnapshot, getDocs, updateDoc, doc } from "firebase/firestore";
import { toast } from "sonner";
import { Report, reportApi } from "../../core/services/reportApi";
import MerchantMapView from "./MerchantMapView";

export function MerchantDashboard() {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // We fetch open reports for the neighborhood (simplified: status includes pending_operator, pending_official, in_progress, and resolved but we want to show anything sponsor-able)
    const q = query(
      collection(db, 'reports')
      // Note: In a real app we'd filter by geo and status, but here we just get some recent documents using onSnapshot
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map(d => ({ id: d.id, ...d.data() } as Report));
      setReports(docs);
      setLoading(false);
    }, (err) => {
      handleFirestoreError(err, OperationType.GET, 'reports');
      setLoading(false);
    });
    
    return () => unsubscribe();
  }, []);

  const handleSponsor = async (reportId: string) => {
    try {
      const toastId = toast.loading('جاري تسجيل الرعاية...');
      const reportRef = doc(db, 'reports', reportId);
      await updateDoc(reportRef, {
        sponsorId: auth.currentUser?.uid || 'merchant_1',
        sponsorName: auth.currentUser?.displayName || 'تاجر محلي',
        sponsorDate: new Date().toISOString()
      });
      
      toast.success('تم تسجيل رعايتك للبلاغ بنجاح! شارة "تاجر مشارك" أضيفت لحسابك.', { id: toastId });
    } catch (err) {
      console.error(err);
      handleFirestoreError(err, OperationType.UPDATE, 'reports');
      toast.error('حدث خطأ أثناء تسجيل الرعاية');
    }
  };

  const businessStats = [
    { label: "مستوى نظافة الشارع", value: "٨٥٪", icon: Zap, color: "text-emerald-600", trend: "+١٢٪" },
    { label: "إضاءة وتسوق ليلي", value: "ممتاز", icon: Sun, color: "text-amber-600", trend: "مستقر" },
    { label: "سهولة وصول الزبائن", value: "٩٢٪", icon: MapPin, color: "text-blue-600", trend: "+٥٪" },
  ];

  const sponsoredReports = reports.filter(r => r.sponsorId);
  const pendingNearby = reports.filter(r => !r.sponsorId).slice(0, 3); // Just show top 3 to sponsor

  return (
    <div className="flex flex-col gap-8 w-full p-2 sm:p-10 bg-[#F8FAFC] min-h-[80vh] rounded-3xl">
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
        <div className="flex items-center gap-5">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 shadow-lg shadow-emerald-600/20 flex items-center justify-center text-white relative">
            <Store className="w-10 h-10" />
            <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-1 shadow-sm border border-slate-100">
               <ShieldCheck className="text-emerald-600 w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-3 mb-1">
               <h2 className="text-3xl font-black text-slate-900 font-readex">لوحة أعمال التاجر</h2>
               <span className="bg-amber-100 text-amber-700 text-[10px] px-2 py-1 flex items-center gap-1 rounded-full font-bold border border-amber-200"><Trophy size={12}/> تاجر مشارك</span>
            </div>
            <p className="text-sm font-bold text-slate-500">متابعة أثر البلاغات على بيئتك التجارية والمساهمة المجتمعية</p>
          </div>
        </div>
        <div className="flex gap-3">
          <Link 
            to="/new" 
            className="px-6 py-4 bg-slate-900 text-white font-black rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all flex items-center gap-2 self-start sm:self-center"
          >
            <Plus className="w-5 h-5" />
            بلاغ في محيط العمل
          </Link>
        </div>
      </header>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
        {[
          { label: 'المنتجات', icon: ShoppingBag, path: '/merchant/products', color: 'bg-indigo-50 text-indigo-600' },
          { label: 'الطلبات', icon: Clock, path: '/merchant/orders', color: 'bg-emerald-50 text-emerald-600' },
          { label: 'الشحن', icon: Truck, path: '/merchant/shipping', color: 'bg-orange-50 text-orange-600' },
          { label: 'المالية', icon: AreaChart, path: '/merchant/financials', color: 'bg-blue-50 text-blue-600' },
          { label: 'المدفوعات', icon: CreditCard, path: '/merchant/payments', color: 'bg-rose-50 text-rose-600' },
          { label: 'الإشعارات', icon: Bell, path: '/merchant/notifications', color: 'bg-amber-50 text-amber-600' },
          { label: 'الدعم', icon: Award, path: '/merchant/support', color: 'bg-teal-50 text-teal-600' },
          { label: 'الإعدادات', icon: Settings, path: '/merchant/settings', color: 'bg-slate-50 text-slate-600' },
        ].map((action, i) => (
          <Link 
            key={i} 
            to={action.path}
            className="flex flex-col items-center justify-center p-4 bg-white rounded-2xl border border-slate-100 hover:shadow-lg transition-all hover:-translate-y-1 group"
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-2 ${action.color} group-hover:scale-110 transition-transform`}>
              <action.icon className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-black text-slate-800 uppercase tracking-tighter">{action.label}</span>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {businessStats.map((stat, i) => (
          <motion.div 
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center justify-between hover:shadow-md transition-all group"
          >
             <div className="flex items-center gap-4">
                <div className={`w-14 h-14 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center ${stat.color} group-hover:scale-110 transition-transform`}>
                   <stat.icon className="w-7 h-7" />
                </div>
                <div>
                  <p className="text-[11px] font-black text-slate-400 mb-1">{stat.label}</p>
                  <p className="text-2xl font-black text-slate-900">{stat.value}</p>
                </div>
             </div>
             <div className="text-left">
                <span className="text-xs font-black text-emerald-500 bg-emerald-50 px-2 py-1 rounded-lg">{stat.trend}</span>
             </div>
          </motion.div>
        ))}
      </div>

      <section className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-black text-slate-800 flex items-center gap-3">
            <AreaChart className="w-6 h-6 text-indigo-600" />
            نطاق العمليات التجارية
          </h3>
          <span className="text-[10px] font-bold text-slate-400 italic">مباشر الآن</span>
        </div>
        <div className="h-[350px] w-full rounded-3xl overflow-hidden border border-slate-100 relative grayscale hover:grayscale-0 transition-all duration-700">
           <MerchantMapView 
              points={[
                { lat: 15.3694, lng: 44.1910, intensity: 0.8, label: "المتجر الرئيسي", type: 'store', status: 'نشط' },
                { lat: 15.3800, lng: 44.2000, intensity: 0.5, label: "مستودع التوزيع", type: 'warehouse', status: 'ممتلئ' },
                { lat: 15.3500, lng: 44.1800, intensity: 0.4, label: "شحنة توريد", type: 'delivery', status: 'في الطريق' }
              ]}
           />
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 flex flex-col gap-6">
          <section className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-xl font-black text-slate-900 mb-1">بلاغات يمكنك رعايتها</h3>
                <p className="text-xs font-bold text-slate-500">تبنى إيجاد حل مشكلة قريبة من محلك لدعم الحي وحصد شارة التميز.</p>
              </div>
              <HeartHandshake className="text-teal-600 w-8 h-8 opacity-20" />
            </div>
            
            <div className="space-y-4">
              {loading ? (
                <div className="animate-pulse flex flex-col gap-4">
                  {[1,2,3].map(i => <div key={i} className="h-24 bg-slate-100 rounded-2xl w-full"></div>)}
                </div>
              ) : pendingNearby.length === 0 ? (
                <p className="text-center text-sm font-bold text-slate-500 py-10 bg-slate-50 rounded-2xl border border-dashed border-slate-200">لا توجد بلاغات معلقة قريبة في الوقت الحالي.</p>
              ) : (
                pendingNearby.map(report => (
                  <div key={report.id} className="p-5 rounded-2xl bg-[#F8FAFC] border border-slate-100 flex flex-col sm:flex-row justify-between gap-4 hover:border-teal-200 hover:bg-teal-50/30 transition-colors">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-[10px] font-black uppercase text-slate-400 bg-white border border-slate-200 px-2 py-0.5 rounded-md">ID: {report.id}</span>
                        <span className="text-[10px] font-black text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md">{report.type}</span>
                      </div>
                      <h4 className="font-bold text-slate-800 text-sm leading-relaxed">{report.description}</h4>
                    </div>
                    <button 
                      onClick={() => handleSponsor(report.id)}
                      className="shrink-0 px-4 py-2 h-fit bg-white border border-teal-200 text-teal-700 text-xs font-black rounded-xl hover:bg-teal-600 hover:text-white transition-all shadow-sm"
                    >
                      رعاية البلاغ
                    </button>
                  </div>
                ))
              )}
            </div>
          </section>

          <section className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
             <h3 className="text-xl font-black text-slate-900 mb-6">الأثر التجاري للبلاغات المنتهية</h3>
              <div className="space-y-4">
               <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-100 flex justify-between items-center">
                  <div>
                     <h4 className="font-bold text-slate-800">إصلاح الإضاءة بمدخل الشارع</h4>
                     <p className="text-xs text-slate-500 mt-1">مكتمل قبل يومين</p>
                  </div>
                  <div className="text-left">
                     <span className="bg-white text-emerald-600 text-xs font-black px-3 py-1.5 rounded-lg border border-emerald-100 shadow-sm">+ زيادة مرورية ليلية</span>
                  </div>
               </div>
               <div className="p-4 rounded-2xl bg-blue-50/50 border border-blue-100 flex justify-between items-center">
                  <div>
                     <h4 className="font-bold text-slate-800">سفلتة الرصيف الجانبي</h4>
                     <p className="text-xs text-slate-500 mt-1">مكتمل في ٣ مايو</p>
                  </div>
                  <div className="text-left">
                     <span className="bg-white text-blue-600 text-xs font-black px-3 py-1.5 rounded-lg border border-blue-100 shadow-sm">+ سهولة دخول الموردين</span>
                  </div>
               </div>
             </div>
          </section>
        </div>

        <div className="flex flex-col gap-6">
          <section className="bg-gradient-to-br from-emerald-600 to-teal-800 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-20 -mt-20"></div>
            <Award className="absolute -bottom-4 left-4 w-32 h-32 opacity-10 rotate-12" />
            
            <div className="relative z-10">
               <span className="text-[10px] font-black uppercase tracking-widest text-emerald-200 mb-2 block">السجل المجتمعي</span>
               <h3 className="text-3xl font-black mb-6">شاراتك التجارية</h3>
               
               <div className="space-y-5">
                  <div className="flex items-center gap-4 bg-white/10 p-3 rounded-2xl border border-white/10 backdrop-blur-sm">
                     <div className="w-12 h-12 bg-amber-400 rounded-xl flex items-center justify-center text-amber-900 shadow-inner">
                        <Trophy size={24} />
                     </div>
                     <div>
                        <p className="font-black text-sm text-white">تاجر مشارك فضي</p>
                        <p className="text-[10px] text-emerald-100 font-bold mt-0.5">٣ رعايات موثقة</p>
                     </div>
                  </div>
                  
                  <div className="flex justify-between items-center text-xs font-bold text-emerald-100 pt-2 border-t border-white/10">
                     <span>الهدف التالي: شريك ذهبي</span>
                     <span>تبقي ٢ رعاية</span>
                  </div>
               </div>
            </div>
          </section>

          <section className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
             <h4 className="font-black text-slate-900 mb-6">الرعايات التي قدمتها</h4>
             <div className="space-y-4">
                {sponsoredReports.length === 0 ? (
                  <p className="text-xs text-slate-400 font-bold text-center py-6">لم تقم برعاية أي بلاغات حتى الآن.</p>
                ) : (
                  sponsoredReports.map(r => (
                     <div key={r.id} className="flex items-start gap-3 pb-4 border-b border-slate-50 last:border-0 last:pb-0">
                        <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                           <HeartHandshake size={16}/>
                        </div>
                        <div>
                           <p className="text-xs font-bold text-slate-800 line-clamp-2 leading-relaxed">{r.description}</p>
                           <p className="text-[10px] text-slate-400 mt-1 font-bold">تاريخ الرعاية: {(r as any).sponsorDate ? new Date((r as any).sponsorDate).toLocaleDateString() : 'حديث'}</p>
                        </div>
                     </div>
                  ))
                )}
             </div>
          </section>
        </div>
      </div>
    </div>
  );
}
