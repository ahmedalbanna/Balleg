import { Headset, Inbox, CheckCircle2, XCircle, Forward, Clock, Filter, Search, MoreHorizontal } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

export function OperatorDashboard() {
  const [activeTab, setActiveTab] = useState<'new' | 'processed'>('new');

  const stats = [
    { label: "بلاغات جديدة", value: "١٢", color: "text-indigo-600", bg: "bg-indigo-50" },
    { label: "متوسط وقت الرد", value: "٤ د", color: "text-emerald-600", bg: "bg-emerald-50" },
    { label: "بانتظار التوجيه", value: "٧", color: "text-amber-600", bg: "bg-amber-50" },
  ];

  const pendingReports = [
    { id: 'BLG-44595', title: "كابل كهرباء مكشوف", time: "منذ ٥ دقائق", type: "خطر حيوي", location: "حي الصافية" },
    { id: 'BLG-44594', title: "تكدس نفايات سوق الملح", time: "منذ ١٢ دقيقة", type: "نظافة", location: "صنعاء القديمة" },
    { id: 'BLG-44593', title: "حفرة في منتصف الطريق", time: "منذ ٢٠ دقيقة", type: "طرقات", location: "شارع تعز" },
  ];

  return (
    <div className="flex flex-col gap-6 w-full p-2 sm:p-10 bg-indigo-50/20 min-h-[85vh] rounded-[3rem] border border-indigo-100/50 shadow-sm">
      <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 rounded-[2rem] bg-indigo-600 text-white flex items-center justify-center shadow-xl shadow-indigo-600/20">
            <Headset className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-3xl font-black text-slate-900 font-readex">مركز استقبال البلاغات</h2>
            <p className="text-slate-500 mt-1 font-bold">إدارة منظمة وسريعة لخدمة المواطن</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
            <div className="bg-white border border-slate-200 rounded-2xl p-1 shadow-sm flex items-center">
                <button 
                  onClick={() => setActiveTab('new')}
                  className={`px-6 py-2 rounded-xl text-sm font-black transition-all ${activeTab === 'new' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' : 'text-slate-400 hover:text-slate-900'}`}
                >
                    الوارد (١٢)
                </button>
                <button 
                  onClick={() => setActiveTab('processed')}
                  className={`px-6 py-2 rounded-xl text-sm font-black transition-all ${activeTab === 'processed' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' : 'text-slate-400 hover:text-slate-900'}`}
                >
                    الأرشيف
                </button>
            </div>
        </div>
      </header>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <motion.div 
            key={stat.label}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex items-center gap-5"
          >
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.bg} ${stat.color}`}>
                <Inbox className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1.5">{stat.label}</p>
              <p className={`text-2xl font-black ${stat.color}`}>{stat.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Inbox View */}
        <div className="lg:col-span-8 flex flex-col gap-4">
            <section className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden flex flex-col h-[500px]">
                <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <Search className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input type="text" placeholder="بحث سريع..." className="pr-10 pl-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold w-64 focus:ring-2 focus:ring-indigo-100" />
                        </div>
                        <button className="p-2 bg-white border border-slate-200 rounded-xl text-slate-400 hover:bg-slate-50">
                            <Filter className="w-4 h-4" />
                        </button>
                    </div>
                    <button className="p-2 text-slate-400 hover:text-slate-900 transition-colors">
                        <MoreHorizontal className="w-5 h-5" />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto divide-y divide-slate-50">
                    {pendingReports.map(report => (
                        <motion.div 
                          key={report.id}
                          className="p-6 hover:bg-indigo-50/30 transition-colors group cursor-pointer"
                        >
                            <div className="flex items-center justify-between gap-4">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                                        <Inbox className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <h4 className="font-black text-slate-800">{report.title}</h4>
                                            <span className="text-[10px] bg-slate-100 px-2 py-0.5 rounded-lg text-slate-500 font-bold">{report.id}</span>
                                        </div>
                                        <div className="flex items-center gap-3 text-[10px] font-bold text-slate-400">
                                            <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {report.time}</span>
                                            <span className="flex items-center gap-1 underline">{report.location}</span>
                                            <span className="text-indigo-500">{report.type}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button className="p-2.5 bg-white border border-slate-200 rounded-xl text-emerald-600 hover:bg-emerald-50 hover:border-emerald-200 transition-all shadow-sm" title="قبول">
                                        <CheckCircle2 className="w-5 h-5" />
                                    </button>
                                    <button className="p-2.5 bg-white border border-slate-200 rounded-xl text-amber-600 hover:bg-amber-50 hover:border-amber-200 transition-all shadow-sm" title="تحويل">
                                        <Forward className="w-5 h-5" />
                                    </button>
                                    <button className="p-2.5 bg-white border border-slate-200 rounded-xl text-red-500 hover:bg-red-50 hover:border-red-200 transition-all shadow-sm" title="رفض">
                                        <XCircle className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
                
                <div className="p-4 bg-slate-50 text-[10px] text-center font-bold text-slate-400 border-t border-slate-100">
                    جاري التحديث تلقائياً للبلاغات الواردة...
                </div>
            </section>
        </div>

        {/* Shortcuts & Support */}
        <div className="lg:col-span-4 flex flex-col gap-6">
            <section className="bg-indigo-600 rounded-[2.5rem] p-8 text-white shadow-2xl shadow-indigo-900/20 relative overflow-hidden group">
                <Forward className="absolute -bottom-6 -right-6 w-32 h-32 opacity-10 rotate-12 group-hover:scale-110 transition-transform duration-700" />
                <h4 className="text-lg font-black mb-4">اختصارات لوحة المفاتيح</h4>
                <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs py-2 border-b border-white/10 opacity-80">
                        <span>قبول البلاغ</span>
                        <kbd className="bg-white/20 px-2 py-1 rounded font-mono">Alt + A</kbd>
                    </div>
                    <div className="flex items-center justify-between text-xs py-2 border-b border-white/10 opacity-80">
                        <span>تحويل للقسم</span>
                        <kbd className="bg-white/20 px-2 py-1 rounded font-mono">Alt + F</kbd>
                    </div>
                    <div className="flex items-center justify-between text-xs py-2 border-b border-white/10 opacity-80">
                        <span>رفض البلاغ</span>
                        <kbd className="bg-white/20 px-2 py-1 rounded font-mono">Alt + R</kbd>
                    </div>
                </div>
            </section>

            <section className="bg-white rounded-[2.5rem] p-7 border border-slate-100 shadow-sm">
                <h4 className="font-black text-slate-800 mb-5 text-sm uppercase tracking-widest">جهات التحويل النشطة</h4>
                <div className="space-y-3">
                    {['صندوق النظافة والتحسين', 'مؤسسة الكهرباء والطاقة', 'مؤسسة المياه والصرف الصحي', 'إدارة شرطة السير'].map(org => (
                        <div key={org} className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-100">
                            <span className="text-xs font-bold text-slate-600">{org}</span>
                            <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
      </div>
    </div>
  );
}
