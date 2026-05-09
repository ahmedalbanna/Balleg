import React from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Landmark, 
  Settings, 
  LogOut, 
  ChevronRight,
  FileCheck,
  TrendingUp,
  MapPin,
  ClipboardList,
  CheckCircle,
  Clock,
  Briefcase
} from 'lucide-react';
import { useAuth } from '../../core/context/AuthContext';
import { useRole } from '../../core/context/RoleContext';

export const OfficialProfile: React.FC = () => {
  const { profile, signOut } = useAuth();
  const { currentRole } = useRole();

  if (!profile) return null;

  const themeColor = currentRole?.themeColor || '#059669';

  const activityLogs = [
    { type: 'approval', text: 'اعتمدت بلاغ صيانة رقم #٤٣٢١', time: 'منذ ساعتين' },
    { type: 'directive', text: 'أصدرت تعميماً لفرق الطوارئ', time: 'أمس' },
    { type: 'review', text: 'تم مراجعة تقرير الأداء الشهري', time: 'قبل ٣ أيام' },
  ];

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8" dir="rtl">
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-[2.5rem] border border-slate-200 overflow-hidden shadow-2xl"
      >
        <div className="h-48 bg-emerald-800 relative">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
            <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/20 to-transparent" />
        </div>

        <div className="px-8 md:px-12 -mt-16 relative">
            <div className="flex flex-col md:flex-row items-end gap-6 mb-8">
                <div className="w-32 h-32 rounded-[2rem] border-8 border-white bg-white shadow-xl overflow-hidden shrink-0">
                    {profile.profileImageUrl ? (
                        <img src={profile.profileImageUrl} alt="" className="w-full h-full object-cover" />
                    ) : (
                        <div className="w-full h-full bg-emerald-50 flex items-center justify-center text-emerald-600">
                            <User size={48} />
                        </div>
                    )}
                </div>
                <div className="pb-2 flex-1 text-center md:text-right">
                    <h1 className="text-3xl font-black text-slate-900 mb-1">{profile.displayName}</h1>
                    <div className="flex items-center justify-center md:justify-start gap-4">
                        <span className="text-sm font-bold text-emerald-600 flex items-center gap-1.5">
                            <Briefcase size={14} />
                            مسؤول نطاق (القطاع الثالث)
                        </span>
                        <div className="w-1.5 h-1.5 rounded-full bg-slate-300 hidden md:block" />
                        <span className="text-sm font-bold text-slate-400">كود الموظف: OFF-9901</span>
                    </div>
                </div>
                <div className="flex gap-2 pb-2">
                    <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2 rounded-xl text-xs font-black transition-all shadow-lg shadow-emerald-600/20 active:scale-95">
                        تحميل بطاقة العمل
                    </button>
                    <button onClick={() => signOut()} className="bg-slate-100 hover:bg-red-50 hover:text-red-600 text-slate-600 p-2 rounded-xl transition-all">
                        <LogOut size={20} />
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 pb-12">
                <div className="lg:col-span-2 space-y-10">
                    <section>
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                <TrendingUp size={14} />
                                مؤشرات الأداء الوظيفي
                            </h3>
                            <button className="text-[10px] font-black text-emerald-600 hover:underline">عرض التقرير السنوي</button>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {[
                                { label: 'بلاغات منجزة', val: '٨٩', icon: CheckCircle, color: 'emerald' },
                                { label: 'تعاميم نشطة', val: '١٢', icon: ClipboardList, color: 'indigo' },
                                { label: 'ساعات ميدانية', val: '١٥٤', icon: Clock, color: 'amber' },
                                { label: 'دقة الاعتمادات', val: '٩٨٪', icon: FileCheck, color: 'sky' },
                            ].map((s, i) => (
                                <div key={i} className="bg-slate-50 border border-slate-100 p-4 rounded-2xl">
                                    <s.icon size={16} className={`text-${s.color}-600 mb-2`} />
                                    <p className="text-lg font-black text-slate-900 leading-none">{s.val}</p>
                                    <p className="text-[9px] font-bold text-slate-400 mt-1 uppercase">{s.label}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="bg-slate-900 rounded-3xl p-8 text-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                        <h3 className="text-sm font-black mb-6 relative z-10">تحديثات النطاق الجغرافي</h3>
                        <div className="space-y-4 relative z-10">
                            {[
                                { name: 'المسح الميداني لمنطقة النصر', progress: 75 },
                                { name: 'توزيع فرق النظافة - حي السلام', progress: 100 },
                                { name: 'متابعة أعطال الإنارة - شارع المطار', progress: 40 },
                            ].map((p, idx) => (
                                <div key={idx} className="space-y-2">
                                    <div className="flex justify-between text-[11px] font-bold">
                                        <span className="text-slate-300">{p.name}</span>
                                        <span className={p.progress === 100 ? 'text-emerald-400' : ''}>{p.progress}%</span>
                                    </div>
                                    <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                                        <motion.div 
                                            initial={{ width: 0 }}
                                            animate={{ width: `${p.progress}%` }}
                                            className="h-full bg-emerald-500 rounded-full"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                <div className="space-y-8">
                    <div>
                        <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">نشاطك الأخير</h3>
                        <div className="space-y-1 relative before:absolute before:right-3 before:top-2 before:bottom-2 before:w-px before:bg-slate-100 italic">
                            {activityLogs.map((log, i) => (
                                <div key={i} className="relative pr-8 py-3 group cursor-default">
                                    <div className="absolute right-2 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full border-2 border-white bg-emerald-500 shadow-sm z-10" />
                                    <p className="text-xs font-bold text-slate-700 group-hover:text-emerald-600 transition-colors">{log.text}</p>
                                    <p className="text-[9px] text-slate-400 mt-0.5">{log.time}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="p-6 bg-slate-50 border border-slate-100 rounded-[2.5rem]">
                        <h4 className="text-xs font-black text-slate-900 mb-4">روابط سريعة</h4>
                        <div className="space-y-3">
                            {[
                                { label: 'تعديل الصلاحيات', icon: Settings },
                                { label: 'خريطة النطاق الكاملة', icon: MapPin },
                                { label: 'دليل المستخدم الرسمي', icon: Landmark },
                            ].map((link, j) => (
                                <button key={j} className="w-full flex items-center justify-between p-3 bg-white rounded-xl text-[11px] font-black hover:bg-emerald-50 border border-transparent hover:border-emerald-100 transition-all">
                                    <div className="flex items-center gap-3">
                                        <link.icon size={14} className="text-slate-400" />
                                        {link.label}
                                    </div>
                                    <ChevronRight size={12} className="text-slate-300" />
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </motion.div>
    </div>
  );
};
