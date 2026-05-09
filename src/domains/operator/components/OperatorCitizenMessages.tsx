import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageSquare, 
  Search, 
  User, 
  Send, 
  CheckCircle2, 
  Clock, 
  Filter, 
  MoreVertical, 
  Paperclip, 
  Smile,
  ShieldCheck,
  Building2,
  MapPin,
  Trash2,
  Archive,
  Star
} from 'lucide-react';
import { cn } from '../../core/utils/cn';

const chatContacts = [
  { id: '1', name: 'ياسر القحطاني', message: 'السلام عليكم، هل تم فحص بلاغ كسر الأنبوب؟', time: '١٠:٤٥ ص', unread: 2, online: true },
  { id: '2', name: 'نهى أحمد', message: 'وصلني إشعار بالإنجاز لكن المشكلة ما زالت قائمة...', time: '٠٩:٣٠ ص', unread: 0, online: false },
  { id: '3', name: 'محمد علي', message: 'شكراً لكم على سرعة التجاوب في حي السبعين', time: 'أمس', unread: 0, online: true },
];

export const OperatorCitizenMessages: React.FC = () => {
  const [activeChat, setActiveChat] = useState<any>(chatContacts[0]);
  const [messageText, setMessageText] = useState('');

  return (
    <div className="flex flex-col gap-8 w-full h-[calc(100vh-12rem)]" dir="rtl">
      <header className="px-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-700 rounded-lg text-[10px] font-black uppercase tracking-widest mb-3 border border-blue-100">
            <MessageSquare size={12} />
            بوابة التواصل المباشر مع المواطن
        </div>
        <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-2">رسائل المواطنين</h1>
        <p className="text-sm font-bold text-slate-400 italic">الرد على استفسارات المواطنين، تلقي الملاحظات، وتقديم الدفع المعنوي للمستفيدين</p>
      </header>

      <div className="flex-1 bg-white rounded-[3.5rem] border border-slate-100 shadow-sm overflow-hidden flex flex-col lg:flex-row">
          {/* Contacts Sidebar */}
          <div className="lg:w-96 border-l border-slate-50 flex flex-col h-full bg-slate-50/10">
              <div className="p-8 border-b border-slate-50">
                  <div className="relative group">
                      <Search className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={18} />
                      <input 
                        type="text" 
                        placeholder="البحث في المحادثات..." 
                        className="w-full pl-6 pr-14 py-4 bg-white border border-slate-100 rounded-2xl text-sm font-bold outline-none focus:ring-4 focus:ring-blue-500/5 transition-all"
                      />
                  </div>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-2">
                  {chatContacts.map((contact) => (
                      <button 
                        key={contact.id}
                        onClick={() => setActiveChat(contact)}
                        className={cn(
                            "w-full p-5 rounded-[2rem] flex items-center gap-4 transition-all group",
                            activeChat?.id === contact.id ? "bg-white border border-slate-100 shadow-xl shadow-blue-500/5 ring-1 ring-blue-100" : "hover:bg-white/50"
                        )}
                      >
                          <div className="relative">
                              <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400">
                                  <User size={24} />
                              </div>
                              {contact.online && (
                                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full" />
                              )}
                          </div>
                          <div className="flex-1 text-right overflow-hidden">
                              <div className="flex items-center justify-between mb-1">
                                  <h4 className="text-sm font-black text-slate-900">{contact.name}</h4>
                                  <span className="text-[10px] font-bold text-slate-400">{contact.time}</span>
                              </div>
                              <p className={cn(
                                  "text-[11px] font-bold truncate italic mr-0.5",
                                  contact.unread > 0 ? "text-slate-900 font-black" : "text-slate-400"
                              )}>
                                  {contact.message}
                              </p>
                          </div>
                          {contact.unread > 0 && (
                              <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-black shadow-lg shadow-blue-600/20">
                                  {contact.unread}
                              </div>
                          )}
                      </button>
                  ))}
              </div>
          </div>

          {/* Chat Window */}
          <div className="flex-1 flex flex-col h-full bg-slate-50/5">
              <div className="p-8 border-b border-slate-50 flex items-center justify-between bg-white/50 backdrop-blur-sm">
                  <div className="flex items-center gap-5">
                      <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 border border-slate-50">
                          <User size={24} />
                      </div>
                      <div>
                          <h3 className="text-lg font-black text-slate-900">{activeChat?.name}</h3>
                          <div className="flex items-center gap-2">
                               <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                               <span className="text-[10px] font-black text-emerald-600 uppercase">نشط الآن</span>
                          </div>
                      </div>
                  </div>
                  <div className="flex items-center gap-3">
                      <button className="p-3 bg-white border border-slate-100 rounded-xl text-slate-400 hover:text-slate-900 transition-all hover:border-slate-200">
                          <Star size={18} />
                      </button>
                      <button className="p-3 bg-white border border-slate-100 rounded-xl text-slate-400 hover:text-slate-900 transition-all hover:border-slate-200">
                          <MoreVertical size={18} />
                      </button>
                  </div>
              </div>

              <div className="flex-1 overflow-y-auto p-10 space-y-8 bg-[url('https://www.transparenttextures.com/patterns/cubic-mesh.png')] bg-fixed opacity-60">
                   <div className="flex flex-col gap-6">
                        <div className="flex items-end gap-4 max-w-[80%]">
                             <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 shrink-0">
                                 <User size={14} />
                             </div>
                             <div className="bg-white p-6 rounded-[2rem] rounded-br-none border border-slate-100 shadow-sm">
                                 <p className="text-sm font-bold text-slate-700 leading-relaxed italic">
                                     السلام عليكم، قمت برفع بلاغ قبل ٣ ساعات في منطقة الصافية لعدم وصول المياه، الموعد المحدد للمضخات انتهى ولم تصل المياه للمنازل.
                                 </p>
                             </div>
                        </div>

                        <div className="flex items-end gap-4 max-w-[80%] self-end flex-row-reverse">
                             <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0">
                                 <ShieldCheck size={14} />
                             </div>
                             <div className="bg-blue-600 p-6 rounded-[2rem] rounded-bl-none text-white shadow-xl shadow-blue-600/10">
                                 <p className="text-sm font-black leading-relaxed">
                                     وعليكم السلام يا أستاذ ياسر، تم فحص النظام وظهر وجود عطل طارئ في المحطة رقم ٥، الفريق الفني باشر الإصلاح منذ ٢٠ دقيقة. نتوقع عودة الضخ خلال ساعة من الآن.
                                 </p>
                                 <div className="flex items-center justify-end mt-2 opacity-50 text-[9px] font-bold">
                                     <Clock size={10} className="ml-1" /> ١٠:٤٠ ص
                                 </div>
                             </div>
                        </div>

                        <div className="flex items-end gap-4 max-w-[80%]">
                             <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 shrink-0">
                                 <User size={14} />
                             </div>
                             <div className="bg-white p-6 rounded-[2rem] rounded-br-none border border-slate-100 shadow-sm">
                                 <p className="text-sm font-bold text-slate-700 leading-relaxed italic">
                                     جزاكم الله خير على التوضيح والاهتمام.
                                 </p>
                             </div>
                        </div>
                   </div>
              </div>

              <div className="p-8 bg-white border-t border-slate-100">
                  <div className="flex items-center gap-4 bg-slate-50 border border-slate-100 p-3 rounded-[2.5rem] focus-within:ring-4 focus-within:ring-blue-500/5 transition-all">
                      <button className="p-4 rounded-full bg-white text-slate-400 hover:text-blue-600 hover:shadow-lg transition-all active:scale-90">
                          <Paperclip size={20} />
                      </button>
                      <input 
                        type="text" 
                        placeholder="اكتب ردك هنا..." 
                        value={messageText}
                        onChange={(e) => setMessageText(e.target.value)}
                        className="flex-1 bg-transparent border-none outline-none text-sm font-bold py-2 placeholder:text-slate-300 placeholder:italic"
                      />
                      <button className="p-4 rounded-full bg-white text-slate-400 hover:text-amber-500 transition-all">
                          <Smile size={20} />
                      </button>
                      <button className="px-8 py-4 bg-blue-600 text-white rounded-[2rem] font-black text-xs hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/20 active:scale-95 flex items-center gap-2">
                          إرسال
                          <Send size={16} className="rotate-[180deg]" />
                      </button>
                  </div>
              </div>
          </div>
      </div>
    </div>
  );
};
