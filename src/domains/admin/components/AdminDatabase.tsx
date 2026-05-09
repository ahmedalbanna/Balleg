import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Database, 
  Trash2, 
  RefreshCcw, 
  Download, 
  Upload, 
  ShieldAlert, 
  CheckCircle2, 
  Clock, 
  Activity,
  Server,
  Zap,
  HardDrive,
  Cpu,
  BarChart3
} from 'lucide-react';
import { DataSeeder } from './DataSeeder';
import { cn } from '../../core/utils/cn';

export const AdminDatabase: React.FC = () => {
  const [isBackingUp, setIsBackingUp] = useState(false);

  const stats = [
      { label: 'إجمالي السجلات', val: '٥٤,٣٠٠', icon: Database, color: 'indigo' },
      { label: 'حجم البيانات', val: '١.٢ جيجا', icon: HardDrive, color: 'amber' },
      { label: 'زمن استجابة الـ Query', val: '٤٥ مللي ثانية', icon: Zap, color: 'emerald' },
      { label: 'سعة المعالجة', val: '٩٤٪', icon: Cpu, color: 'blue' },
  ];

  const handleBackup = () => {
      setIsBackingUp(true);
      setTimeout(() => setIsBackingUp(false), 3000);
  };

  return (
    <div className="flex flex-col gap-10 w-full" dir="rtl">
      <header className="px-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-50 text-amber-600 rounded-lg text-[10px] font-black uppercase tracking-widest mb-3 border border-amber-100">
            <Server size={12} />
            إدارة البيانات الحساسة
        </div>
        <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-2">النواة المركزية للبيانات</h1>
        <p className="text-sm font-bold text-slate-400 italic">التحكم في سلامة قواعد البيانات، النسخ الاحتياطي، وإدارة البيانات الاختبارية للمنصة</p>
      </header>

      {/* Database Performance Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
              <div key={i} className="bg-white p-6 rounded-[2.5rem] border border-slate-100 flex items-center gap-6 group hover:border-indigo-100 transition-all">
                  <div className={cn(
                      "w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110",
                      `bg-${stat.color}-50 text-${stat.color}-600`
                  )}>
                      <stat.icon size={22} />
                  </div>
                  <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-tight mb-1">{stat.label}</p>
                      <p className="text-xl font-black text-slate-900 leading-none">{stat.val}</p>
                  </div>
              </div>
          ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-10">
              <div className="bg-white rounded-[3.5rem] border border-slate-100 p-10 shadow-sm relative overflow-hidden">
                  <DataSeeder />
              </div>

              <div className="bg-white rounded-[3.5rem] border border-slate-100 p-10 shadow-sm">
                   <div className="flex items-center justify-between mb-10">
                       <div>
                           <h3 className="text-xl font-black text-slate-900 mb-1">النسخ الاحتياطي اليدوي</h3>
                           <p className="text-xs font-bold text-slate-400 italic">إنشاء نسخة كاملة من النظام محلياً أو سحابياً</p>
                       </div>
                       <button 
                            onClick={handleBackup}
                            disabled={isBackingUp}
                            className="px-8 py-3 bg-indigo-600 text-white rounded-2xl text-xs font-black hover:bg-slate-900 transition-all shadow-xl shadow-indigo-600/10 flex items-center gap-3 disabled:opacity-50"
                       >
                           {isBackingUp ? <RefreshCcw size={18} className="animate-spin" /> : <Download size={18} />}
                           {isBackingUp ? 'جاري التحضير...' : 'بدء النسخ الاحتياطي الآن'}
                       </button>
                   </div>
                   
                   <div className="space-y-4">
                       {[
                           { name: 'backup_full_2024_05_08.sql', size: '٤٥٠ ميجا', date: 'منذ أمس', status: 'ناجح' },
                           { name: 'profiles_export_v2.json', size: '١٢ ميجا', date: 'منذ ٣ أيام', status: 'ناجح' },
                           { name: 'media_assets_prod.zip', size: '٨٠٠ ميجا', date: 'منذ أسبوع', status: 'ناجح' },
                       ].map((b, j) => (
                           <div key={j} className="flex items-center justify-between p-5 bg-slate-50 rounded-3xl border border-slate-100 group transition-all hover:bg-white hover:border-indigo-100">
                               <div className="flex items-center gap-4">
                                   <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-slate-400 group-hover:text-amber-500">
                                       <Database size={18} />
                                   </div>
                                   <div>
                                       <p className="text-sm font-black text-slate-900">{b.name}</p>
                                       <p className="text-[10px] font-bold text-slate-400 italic">{b.size} • {b.date}</p>
                                   </div>
                               </div>
                               <div className="flex items-center gap-3">
                                   <span className="text-[9px] font-black text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">{b.status}</span>
                                   <button className="p-2 text-slate-400 hover:text-indigo-600 transitiog-all">
                                       <Download size={16} />
                                   </button>
                               </div>
                           </div>
                       ))}
                   </div>
              </div>
          </div>

          <div className="space-y-8">
              <div className="bg-slate-950 p-10 rounded-[3rem] text-white relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700" />
                  <div className="w-16 h-16 rounded-[1.5rem] bg-indigo-600 flex items-center justify-center mb-8 shadow-xl shadow-indigo-600/30">
                      <ShieldAlert size={32} />
                  </div>
                  <h4 className="text-xl font-black mb-4 relative z-10 tracking-tight">إجراءات الحذف النهائي</h4>
                  <p className="text-xs font-bold text-slate-400 mb-8 leading-relaxed italic relative z-10">
                      تنبيه: حذف البيانات الاختبارية سيؤدي لمسح كافة السجلات الحالية من قاعدة البيانات. تأكد من وجود نسخة احتياطية قبل البدء.
                  </p>
                  <button className="w-full py-4 bg-rose-600 hover:bg-rose-500 text-white rounded-2xl font-black text-sm transition-all active:scale-95 flex items-center justify-center gap-3 shadow-xl shadow-rose-600/20">
                      <Trash2 size={18} />
                      تفريغ كافة الجداول
                  </button>
              </div>

              <div className="p-8 rounded-[3rem] bg-amber-50/50 border border-amber-100 border-dashed">
                  <div className="flex items-center gap-3 mb-4">
                      <RefreshCcw size={18} className="text-amber-600" />
                      <h4 className="text-sm font-black text-slate-900 tracking-tight">مزامنة البيانات الميدانية</h4>
                  </div>
                  <p className="text-[11px] font-bold text-slate-600 leading-relaxed mb-6 italic">
                      يتم تحديث سجلات الربط الجغرافي كل ١٥ دقيقة تلقائياً. يمكنك طلب مزامنة فورية الآن.
                  </p>
                  <button className="w-full py-3 bg-white border border-amber-200 text-amber-700 rounded-xl text-[10px] font-black hover:bg-amber-100 transition-all flex items-center justify-center gap-2">
                       تحديث الفهرس المركزي
                  </button>
              </div>
              
              <div className="bg-white p-8 rounded-[3rem] border border-slate-100">
                   <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6 px-2 italic">حالة المكونات السحابية</h4>
                   <div className="space-y-4">
                       {[
                           { name: 'Firestore Clusters', status: 'Online', up: true },
                           { name: 'Authentication API', status: 'Online', up: true },
                           { name: 'Cloud Storage', status: 'Online', up: true },
                           { name: 'Analytics Engine', status: 'Maintenance', up: false },
                       ].map((sv, k) => (
                           <div key={k} className="flex items-center justify-between">
                               <span className="text-[11px] font-bold text-slate-600">{sv.name}</span>
                               <div className="flex items-center gap-2">
                                   <span className={cn("text-[9px] font-black", sv.up ? "text-emerald-500" : "text-amber-500")}>{sv.status}</span>
                                   <div className={cn("w-1.5 h-1.5 rounded-full", sv.up ? "bg-emerald-500" : "bg-amber-500 animate-pulse")} />
                               </div>
                           </div>
                       ))}
                   </div>
              </div>
          </div>
      </div>
    </div>
  );
};
