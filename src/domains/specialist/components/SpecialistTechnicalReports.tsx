import React from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, 
  TrendingUp, 
  Activity, 
  Search, 
  Filter, 
  CheckCircle2, 
  Zap, 
  AlertTriangle,
  Clock,
  ArrowUpRight,
  Download,
  ShieldCheck,
  ChevronDown
} from 'lucide-react';
import { cn } from '../../core/utils/cn';

const recentReports = [
  { id: 'TR-102', title: 'تقرير كفاءة محطة الصافية', date: '2024-05-08', author: 'م. أحمد علي', status: 'approved' },
  { id: 'TR-101', title: 'دراسة جدوى استبدال كابلات الستين', date: '2024-05-07', author: 'م. سارة خالد', status: 'pending' },
  { id: 'TR-100', title: 'تقرير معالجة الملوحة - بئر السبعين', date: '2024-05-05', author: 'م. خالد وليد', status: 'approved' },
];

export const SpecialistTechnicalReports: React.FC = () => {
  return (
    <div className="flex flex-col gap-10 w-full" dir="rtl">
      <header className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 px-2">
        <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 text-indigo-700 rounded-lg text-[10px] font-black uppercase tracking-widest mb-3 border border-indigo-100">
                <FileText size={12} />
                وحدة صياغة التقارير الفنية المعتمدة
            </div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-2">التقارير الفنية</h1>
            <p className="text-sm font-bold text-slate-400 italic">إصدار وإدارة التقارير الهندسية المعمقة حول الحالات الميدانية والبنية التحتية</p>
        </div>

        <button className="px-8 py-4 bg-slate-900 text-white rounded-2xl text-xs font-black hover:bg-slate-800 transition-all active:scale-95 flex items-center gap-3 shadow-xl">
            <FileText size={18} />
            إنشاء تقرير فني جديد
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           {[
               { label: 'تقارير معتمدة', val: '١٤٢', icon: ShieldCheck, color: 'emerald' },
               { label: 'قيد المراجعة', val: '٨', icon: Clock, color: 'blue' },
               { label: 'التطابق الفني', val: '٩٨٪', icon: Activity, color: 'indigo' },
           ].map((stat, i) => (
                <div key={i} className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm group">
                    <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110", `bg-${stat.color}-50 text-${stat.color}-600`)}>
                        <stat.icon size={28} />
                    </div>
                    <h4 className="text-4xl font-black text-slate-900 mb-1">{stat.val}</h4>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">{stat.label}</p>
                </div>
           ))}
      </div>

      <div className="bg-white rounded-[3.5rem] border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-8 border-b border-slate-50 bg-slate-50/20 flex flex-col sm:flex-row gap-6 items-center">
              <div className="relative flex-1 group">
                  <Search className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-slate-900 transition-colors" size={20} />
                  <input 
                    type="text" 
                    placeholder="البحث في سجل التقارير..." 
                    className="w-full pl-8 pr-16 py-5 bg-white border border-slate-100 rounded-3xl text-sm font-bold outline-none focus:ring-4 focus:ring-slate-900/5 transition-all"
                  />
              </div>
              <button className="flex items-center gap-3 px-8 py-5 bg-white border border-slate-100 rounded-3xl text-sm font-bold text-slate-600">
                  <Filter size={20} />
                  الفئة الفنية
              </button>
          </div>

          <div className="p-8 space-y-4">
              {recentReports.map((report) => (
                  <motion.div 
                    key={report.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="p-8 rounded-[3rem] bg-white border border-slate-50 hover:border-indigo-100 hover:shadow-xl hover:shadow-indigo-500/5 transition-all group flex flex-col md:flex-row items-center justify-between gap-6"
                  >
                      <div className="flex items-center gap-6 text-right w-full md:w-auto">
                          <div className={cn(
                              "w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 transition-all group-hover:scale-110",
                              report.status === 'approved' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                          )}>
                              <FileText size={28} />
                          </div>
                          <div>
                              <div className="flex items-center gap-3 mb-1">
                                  <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">#{report.id}</span>
                                  <span className="w-1 h-1 rounded-full bg-slate-200" />
                                  <span className="text-[10px] font-bold text-slate-400 italic">{report.date}</span>
                              </div>
                              <h3 className="text-lg font-black text-slate-900 group-hover:text-indigo-600 transition-colors">{report.title}</h3>
                              <p className="text-[11px] font-bold text-slate-400 italic">بواسطة: {report.author}</p>
                          </div>
                      </div>

                      <div className="flex items-center gap-3 w-full md:w-auto justify-end border-t md:border-t-0 pt-6 md:pt-0">
                          <span className={cn(
                              "px-3 py-1 rounded-lg text-[9px] font-black uppercase mr-4",
                              report.status === 'approved' ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"
                          )}>
                              {report.status === 'approved' ? 'معتمد' : 'قيد المراجعة'}
                          </span>
                          <button className="p-3 bg-slate-50 text-slate-400 rounded-xl hover:bg-slate-950 hover:text-white transition-all shadow-sm">
                              <Download size={20} />
                          </button>
                          <button className="p-3 bg-slate-50 text-slate-400 rounded-xl hover:bg-indigo-600 hover:text-white transition-all shadow-sm">
                              <ArrowUpRight size={20} />
                          </button>
                      </div>
                  </motion.div>
              ))}
          </div>
      </div>
    </div>
  );
};
