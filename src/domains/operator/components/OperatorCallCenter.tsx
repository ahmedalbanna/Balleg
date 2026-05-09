import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Phone, 
  PhoneIncoming, 
  PhoneOutgoing, 
  PhoneMissed,
  User, 
  Clock, 
  MapPin, 
  MessageSquare, 
  Plus, 
  Search,
  Mic,
  MicOff,
  Video,
  Pause,
  Play,
  X,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { cn } from '../../core/utils/cn';

const recentCalls = [
  { id: '1', name: 'أحمد علي', phone: '777123456', time: '10:30 ص', type: 'incoming', status: 'completed' },
  { id: '2', name: 'سارة محمد', phone: '733987654', time: '09:45 ص', type: 'missed', status: 'none' },
  { id: '3', name: 'خالد وليد', phone: '711555222', time: '09:12 ص', type: 'outgoing', status: 'completed' },
];

export const OperatorCallCenter: React.FC = () => {
  const [isCalling, setIsCalling] = useState(false);
  const [activeCall, setActiveCall] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleStartCall = (contact?: any) => {
    setActiveCall(contact || { name: 'متصل مجهول', phone: 'جاري التعرف...' });
    setIsCalling(true);
  };

  return (
    <div className="flex flex-col gap-8 w-full h-full" dir="rtl">
      <header className="px-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 text-indigo-700 rounded-lg text-[10px] font-black uppercase tracking-widest mb-3 border border-indigo-100">
            <Phone size={12} />
            وحدة الاستجابة الهاتفية الموحدة
        </div>
        <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-2">مركز المكالمات</h1>
        <p className="text-sm font-bold text-slate-400 italic">إدارة البلاغات الهاتفية، توثيق الشكاوى، وتوجيه المواطنين عبر الخط الساخن</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 flex-1">
          {/* Left Column: Call Controls & Dial Pad */}
          <div className="lg:col-span-4 flex flex-col gap-6">
              <div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm flex flex-col items-center">
                  <div className="w-full aspect-square max-w-[280px] bg-slate-50 rounded-[2.5rem] p-8 grid grid-cols-3 gap-4 mb-8">
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, '*', 0, '#'].map((num) => (
                          <button 
                            key={num}
                            className="w-full aspect-square rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-xl font-black text-slate-900 hover:bg-slate-950 hover:text-white hover:border-slate-950 transition-all active:scale-90 shadow-sm"
                          >
                              {num}
                          </button>
                      ))}
                  </div>
                  
                  <div className="flex flex-col w-full gap-4">
                      <div className="relative">
                          <input 
                            type="text" 
                            placeholder="777 000 000" 
                            className="w-full py-5 px-6 bg-slate-50 border border-slate-100 rounded-3xl text-2xl font-black text-center placeholder:text-slate-200 outline-none focus:ring-4 focus:ring-indigo-500/5 transition-all mb-4"
                          />
                      </div>
                      <button 
                        onClick={() => handleStartCall()}
                        className="w-full py-6 bg-emerald-500 text-white rounded-3xl font-black text-lg hover:bg-emerald-600 transition-all active:scale-95 flex items-center justify-center gap-3 shadow-xl shadow-emerald-500/20"
                      >
                          <Phone size={24} />
                          بدء اتصال جديد
                      </button>
                  </div>
              </div>

              <div className="bg-indigo-600 p-8 rounded-[3rem] text-white overflow-hidden relative group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                  <h3 className="text-xl font-black mb-2 relative z-10">إحصائيات النوبة</h3>
                  <p className="text-xs font-bold text-indigo-100/70 mb-8 italic relative z-10">مؤشرات الأداء للساعة الحالية</p>
                  
                  <div className="grid grid-cols-2 gap-4 relative z-10">
                      <div className="bg-white/10 p-4 rounded-2xl border border-white/10 text-center">
                          <p className="text-[10px] font-black text-indigo-200 uppercase mb-1">المكالمات</p>
                          <p className="text-2xl font-black">٤٢</p>
                      </div>
                      <div className="bg-white/10 p-4 rounded-2xl border border-white/10 text-center">
                          <p className="text-[10px] font-black text-indigo-200 uppercase mb-1">وقت الحل</p>
                          <p className="text-2xl font-black">٣:١٥</p>
                      </div>
                  </div>
              </div>
          </div>

          {/* Right Column: Active Call or Recent List */}
          <div className="lg:col-span-8 flex flex-col gap-6 h-full">
              <AnimatePresence mode="wait">
                  {isCalling ? (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="bg-slate-950 p-12 rounded-[4rem] flex-1 flex flex-col items-center justify-center text-white relative overflow-hidden"
                      >
                          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-white rounded-full animate-ping" style={{ animationDuration: '3s' }} />
                              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white rounded-full animate-ping" style={{ animationDuration: '2s' }} />
                          </div>

                          <div className="w-32 h-32 rounded-[2.5rem] bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center mb-8 relative z-10">
                              <User size={64} className="text-indigo-400" />
                          </div>

                          <h2 className="text-3xl font-black mb-2 relative z-10 tracking-tight">{activeCall?.name}</h2>
                          <p className="text-xl font-bold text-slate-400 mb-12 relative z-10">{activeCall?.phone}</p>
                          
                          <div className="flex items-center gap-6 relative z-10">
                               <button className="w-16 h-16 rounded-full bg-white/10 border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all group">
                                   <Mic size={24} className="group-active:scale-90 transition-transform" />
                               </button>
                               <button className="w-16 h-16 rounded-full bg-white/10 border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all">
                                   <Pause size={24} />
                               </button>
                               <button 
                                 onClick={() => setIsCalling(false)}
                                 className="w-24 h-24 rounded-[2rem] bg-rose-500 text-white flex items-center justify-center hover:bg-rose-600 transition-all shadow-2xl shadow-rose-500/40 active:scale-90"
                               >
                                   <Phone size={32} className="rotate-[135deg]" />
                               </button>
                               <button className="w-16 h-16 rounded-full bg-white/10 border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all">
                                   <Video size={24} />
                               </button>
                               <button className="w-16 h-16 rounded-full bg-white/10 border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all">
                                   <Plus size={24} />
                               </button>
                          </div>

                          <div className="mt-16 flex items-center gap-12 relative z-10 pb-4">
                               <button className="flex flex-col items-center gap-3 group">
                                   <div className="w-14 h-14 rounded-2xl bg-indigo-600 flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg shadow-indigo-600/20">
                                       <Plus size={24} />
                                   </div>
                                   <span className="text-[10px] font-black uppercase tracking-widest text-indigo-400">فتح بلاغ جديد</span>
                               </button>
                               <button className="flex flex-col items-center gap-3 group">
                                   <div className="w-14 h-14 rounded-2xl bg-slate-800 flex items-center justify-center group-hover:scale-110 transition-transform">
                                       <Search size={24} />
                                   </div>
                                   <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">بحث في السجل</span>
                               </button>
                          </div>
                      </motion.div>
                  ) : (
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="bg-white rounded-[4rem] border border-slate-100 shadow-sm flex-1 flex flex-col overflow-hidden"
                      >
                          <div className="p-8 border-b border-slate-50 flex items-center justify-between bg-slate-50/20">
                              <div>
                                  <h3 className="text-xl font-black text-slate-900 mb-1">المكالمات الأخيرة</h3>
                                  <p className="text-xs font-bold text-slate-400 italic">سجل المكالمات الواردة والصادرة خلال النوبة</p>
                              </div>
                              <button className="w-12 h-12 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-slate-400 hover:text-indigo-600 transition-all">
                                  <Search size={20} />
                              </button>
                          </div>

                          <div className="flex-1 overflow-y-auto p-4 space-y-3">
                              {recentCalls.map((call) => (
                                  <div 
                                    key={call.id}
                                    className="p-6 rounded-[2.5rem] bg-white border border-slate-50 hover:border-indigo-100 hover:shadow-xl hover:shadow-indigo-500/5 transition-all group flex items-center justify-between"
                                  >
                                      <div className="flex items-center gap-5">
                                          <div className={cn(
                                              "w-14 h-14 rounded-2xl flex items-center justify-center transition-all group-hover:scale-110",
                                              call.type === 'missed' ? 'bg-rose-50 text-rose-500' : 
                                              call.type === 'incoming' ? 'bg-emerald-50 text-emerald-500' : 'bg-blue-50 text-blue-500'
                                          )}>
                                              {call.type === 'missed' ? <PhoneMissed size={24} /> : 
                                               call.type === 'incoming' ? <PhoneIncoming size={24} /> : <PhoneOutgoing size={24} />}
                                          </div>
                                          <div>
                                              <h4 className="text-lg font-black text-slate-900 mb-1">{call.name}</h4>
                                              <div className="flex items-center gap-3">
                                                  <span className="text-[11px] font-bold text-slate-400">{call.phone}</span>
                                                  <span className="w-1 h-1 rounded-full bg-slate-200" />
                                                  <span className="text-[11px] font-black text-slate-900">{call.time}</span>
                                              </div>
                                          </div>
                                      </div>
                                      <div className="flex items-center gap-3">
                                           <button 
                                             onClick={() => handleStartCall(call)}
                                             className="w-12 h-12 rounded-2xl bg-slate-50 text-slate-400 hover:bg-emerald-500 hover:text-white transition-all shadow-sm"
                                           >
                                               <Phone size={20} className="mx-auto" />
                                           </button>
                                           <button className="w-12 h-12 rounded-2xl bg-slate-50 text-slate-400 hover:bg-slate-900 hover:text-white transition-all shadow-sm">
                                               <Plus size={20} className="mx-auto" />
                                           </button>
                                      </div>
                                  </div>
                              ))}
                          </div>

                          <div className="p-8 bg-slate-50/50 text-center border-t border-slate-100">
                               <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">نهاية قائمة السجل المباشر</p>
                          </div>
                      </motion.div>
                  )}
              </AnimatePresence>
          </div>
      </div>
    </div>
  );
};
