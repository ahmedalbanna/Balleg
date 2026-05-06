import { Signal, Activity, Zap, Users, MessageSquare, PhoneCall, MapPin, AlertTriangle, TrendingUp, Cpu, Globe, BarChart3, Radio } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts";

export function TelecomDashboard() {
  const [networkStatus] = useState("stable");

  const uptimeData = [
    { name: "00:00", val: 99.9 },
    { name: "04:00", val: 99.8 },
    { name: "08:00", val: 99.9 },
    { name: "12:00", val: 99.7 },
    { name: "16:00", val: 99.1 },
    { name: "20:00", val: 99.9 },
  ];

  const recentTickets = [
    { id: 1, type: "network", title: "انقطاع الخدمة - برج رقم ٤٥ الصافية", priority: "critical", time: "١٥ دقيقة" },
    { id: 2, type: "customer", title: "شكوى انخفاض سرعة البيانات - المنطقة ب", priority: "medium", time: "١ ساعة" },
    { id: 3, type: "maintenance", title: "صيانة دورية - محطة الإرسال الغربية", priority: "low", time: "٣ ساعة" },
  ];

  return (
    <div className="flex flex-col gap-8 w-full p-2 sm:p-10 bg-sky-50/5 min-h-[85vh] rounded-[3rem] border border-sky-100/50 shadow-sm relative overflow-hidden">
      {/* Abstract Tech Background */}
      <div className="absolute -top-20 -left-20 w-80 h-80 bg-sky-100/30 rounded-full blur-3xl -z-10" />
      
      <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 rounded-[2rem] bg-sky-600 text-white flex items-center justify-center shadow-xl shadow-sky-600/20">
            <Signal className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-3xl font-black text-slate-900 font-readex tracking-tight">إدارة استدامة الشبكة</h2>
            <p className="text-slate-500 mt-1 font-bold">بوابة الشراكة الاستراتيجية: مراقبة الأداء وتجربة التغطية</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl border border-sky-100 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[10px] font-black text-slate-700 uppercase tracking-widest">Network Status: Online</span>
            </div>
            <button className="px-6 py-3 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/20">
                إطلاق حملة ترويجية
            </button>
        </div>
      </header>

      {/* Connectivity Vitals */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
            { label: "المشتركين النشطين", value: "١٢,٥٤٠", icon: Users, color: "text-blue-600" },
            { label: "كفاءة التغطية", value: "٩٩.٨٪", icon: Globe, color: "text-emerald-600" },
            { label: "شكاوى مفتوحة", value: "١٤", icon: MessageSquare, color: "text-amber-600" },
            { label: "أبراج قيد الخدمة", value: "٨٦", icon: Radio, color: "text-sky-600" },
        ].map((stat, i) => (
            <motion.div 
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-6 rounded-[2.5rem] border border-sky-50 shadow-sm group hover:border-sky-200 transition-all"
            >
                <div className="flex items-center justify-between mb-4">
                    <div className={`w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center ${stat.color} group-hover:scale-110 transition-transform`}>
                        <stat.icon className="w-5 h-5" />
                    </div>
                </div>
                <p className="text-[9px] font-black text-slate-400 capitalize tracking-widest mb-1">{stat.label}</p>
                <p className="text-xl font-black text-slate-900">{stat.value}</p>
            </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Network Pulse Graph */}
        <div className="lg:col-span-8 bg-white rounded-[3rem] border border-sky-100 shadow-sm overflow-hidden flex flex-col">
            <div className="p-8 border-b border-slate-50 flex items-center justify-between">
                <div>
                    <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest">نبض استقرار الشبكة (٢٤ ساعة)</h3>
                    <p className="text-[10px] text-slate-400 font-bold mt-1">تتبع جودة الإشارة والبيانات عبر جميع قطاعات المدينة</p>
                </div>
                <div className="flex gap-2">
                    <button className="px-3 py-1.5 bg-sky-50 text-sky-700 rounded-lg text-[9px] font-black border border-sky-100">Live View</button>
                    <button className="px-3 py-1.5 bg-slate-50 text-slate-400 rounded-lg text-[9px] font-black border border-slate-100">Reports</button>
                </div>
            </div>
            <div className="flex-1 p-8 h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={uptimeData}>
                        <defs>
                            <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.1}/>
                                <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} dy={10} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} domain={[99, 100]} />
                        <Tooltip />
                        <Area type="monotone" dataKey="val" stroke="#0ea5e9" strokeWidth={3} fillOpacity={1} fill="url(#colorVal)" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
            <div className="px-8 py-6 bg-slate-50/50 border-t border-slate-50 flex items-center justify-between">
                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full bg-sky-500" />
                        <span className="text-[10px] font-bold text-slate-600">4G / 5G Stability</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                        <span className="text-[10px] font-bold text-slate-600">Fiber Backbone</span>
                    </div>
                </div>
                <button className="text-[10px] font-black text-sky-600 hover:underline">مشاهدة التفاصيل الفنية ←</button>
            </div>
        </div>

        {/* Alerts & Service Queue */}
        <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="bg-white rounded-[3rem] p-8 border border-sky-100 shadow-sm flex-1">
                <div className="flex items-center justify-between mb-8">
                    <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest">تنبيهات البنية التحتية</h4>
                    <Activity className="w-4 h-4 text-sky-600 animate-pulse" />
                </div>
                <div className="space-y-4">
                    {recentTickets.map(ticket => (
                        <div key={ticket.id} className="p-5 rounded-3xl border border-slate-50 bg-slate-50/30 hover:bg-white hover:border-sky-100 transition-all cursor-pointer group relative overflow-hidden">
                            <div className="flex justify-between items-center mb-3">
                                <span className={`text-[8px] font-black px-2 py-0.5 rounded uppercase ${
                                    ticket.priority === 'critical' ? 'bg-rose-100 text-rose-700' : 
                                    ticket.priority === 'medium' ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-700'
                                }`}>
                                    {ticket.priority === 'critical' ? 'حرج' : ticket.priority === 'medium' ? 'متوسط' : 'عادي'}
                                </span>
                                <span className="text-[10px] font-black text-slate-400">{ticket.time}</span>
                            </div>
                            <h5 className="font-black text-xs text-slate-800 mb-1 group-hover:text-sky-600 transition-colors">{ticket.title}</h5>
                            <div className="flex items-center gap-2 mt-3">
                                <MapPin className="w-3 h-3 text-slate-400" />
                                <span className="text-[9px] font-bold text-slate-500">تم التوقيع الجغرافي عبر "بلّغ"</span>
                            </div>
                        </div>
                    ))}
                </div>
                
                <button className="w-full mt-8 py-4 bg-sky-50 text-sky-600 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-sky-100 transition-all border border-sky-100">
                    إدارة قائمة الانتظار
                </button>
            </div>

            <div className="bg-slate-900 rounded-[3rem] p-8 text-white shadow-2xl relative overflow-hidden group">
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-sky-600 rounded-full blur-3xl opacity-20 group-hover:scale-125 transition-transform duration-700" />
                <TrendingUp className="w-10 h-10 mb-6 text-sky-400" />
                <h4 className="text-xl font-black mb-3 font-readex capitalize">رؤى المشتركين</h4>
                <p className="text-xs font-bold text-slate-400 leading-relaxed mb-6">
                    استخدم بيانات "بلّغ" لتحديد المناطق التي تفتقر للتغطية الجيدة بناءً على البلاغات الصادرة منها، واستثمر في تحسين الشبكة هناك.
                </p>
                <button className="w-full py-4 bg-sky-600 text-white rounded-2xl text-[10px] font-black transition-all hover:bg-sky-500 shadow-xl shadow-sky-600/20">
                    توليد تقرير "خريطة الحرارة"
                </button>
            </div>
        </div>
      </div>
    </div>
  );
}
