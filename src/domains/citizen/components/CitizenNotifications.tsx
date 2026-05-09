import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bell, 
  CheckCircle2, 
  AlertCircle, 
  Info, 
  Clock, 
  MoreVertical, 
  Trash2, 
  Eye,
  MessageSquare,
  Zap,
  Droplets,
  MapPin,
  ShieldCheck
} from 'lucide-react';
import { useAuth } from '../../core/context/AuthContext';
import { notificationService, AppNotification } from '../../core/services/notifications';
import { cn } from '../../core/utils/cn';

export function CitizenNotifications() {
  const { profile } = useAuth();
  const [notifications, setNotifications] = useState<AppNotification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (profile?.uid) {
      const unsubscribe = notificationService.subscribeToUserNotifications(profile.uid, (data) => {
        setNotifications(data);
        setLoading(false);
      });
      return () => unsubscribe();
    }
  }, [profile?.uid]);

  const getIcon = (type: string) => {
    switch (type) {
      case 'success': return <CheckCircle2 className="text-emerald-500" />;
      case 'warning': return <AlertCircle className="text-amber-500" />;
      case 'error': return <AlertCircle className="text-rose-500" />;
      case 'message': return <MessageSquare className="text-blue-500" />;
      default: return <Bell className="text-slate-400" />;
    }
  };

  const markAllRead = () => {
      notifications.forEach(n => {
          if(!n.read) notificationService.markAsRead(n.id);
      });
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4" dir="rtl">
      <header className="flex items-center justify-between gap-6 mb-12">
        <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-[2rem] bg-emerald-600 text-white flex items-center justify-center shadow-xl shadow-emerald-900/20">
                <Bell size={28} />
            </div>
            <div>
                <h1 className="text-3xl font-black text-slate-900">التنبيهات</h1>
                <p className="text-xs font-bold text-slate-400 italic">ابقَ على اطلاع بكل مستجدات بلاغاتك والخدمات في حيك</p>
            </div>
        </div>
        
        <button 
            onClick={markAllRead}
            className="px-6 py-3 bg-white border border-slate-100 rounded-2xl text-[11px] font-black text-emerald-600 hover:bg-emerald-50 transition-all active:scale-95 shadow-sm"
        >
            تحديد الكل كمقروء
        </button>
      </header>

      {loading ? (
          <div className="py-20 flex flex-col items-center gap-4">
              <div className="w-12 h-12 border-4 border-emerald-100 border-t-emerald-600 rounded-full animate-spin" />
              <p className="text-xs font-bold text-slate-300 italic">جاري تحميل تنبيهاتك...</p>
          </div>
      ) : notifications.length === 0 ? (
          <div className="bg-white rounded-[3rem] p-20 text-center border border-slate-50 shadow-sm">
               <div className="w-24 h-24 bg-slate-50 text-slate-200 rounded-[2rem] flex items-center justify-center mx-auto mb-8">
                  <Bell size={48} />
              </div>
              <h3 className="text-xl font-black text-slate-900 mb-2">لا توجد تنبيهات جديدة</h3>
              <p className="text-sm font-bold text-slate-400 italic">سنقوم بإبلاغك هنا عند حدوث أي تحديث مهم يخصك.</p>
          </div>
      ) : (
          <div className="space-y-4">
              <AnimatePresence mode="popLayout">
                {notifications.map((notif, idx) => (
                    <motion.div
                        key={notif.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ delay: idx * 0.05 }}
                        className={cn(
                            "group bg-white p-6 rounded-[2.5rem] border transition-all flex items-start gap-6 relative overflow-hidden",
                            notif.read ? "border-slate-50 opacity-70" : "border-emerald-100 shadow-lg shadow-emerald-500/5 ring-1 ring-emerald-500/10"
                        )}
                        onClick={() => !notif.read && notificationService.markAsRead(notif.id)}
                    >
                        {!notif.read && (
                            <div className="absolute top-0 right-0 w-1.5 h-full bg-emerald-600" />
                        )}

                        <div className={cn(
                            "w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border transition-transform group-hover:scale-110",
                            notif.read ? "bg-slate-50 border-slate-100" : "bg-emerald-50 border-emerald-100"
                        )}>
                            {getIcon(notif.type)}
                        </div>

                        <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1 gap-4">
                                <h3 className={cn(
                                    "text-sm font-black truncate",
                                    notif.read ? "text-slate-600" : "text-slate-900"
                                )}>
                                    {notif.title}
                                </h3>
                                <span className="text-[10px] font-bold text-slate-300 italic flex items-center gap-1.5 shrink-0">
                                    <Clock size={10} />
                                    {new Date(notif.createdAt?.seconds * 1000).toLocaleDateString('ar-YE')}
                                </span>
                            </div>
                            <p className={cn(
                                "text-[11px] font-medium leading-relaxed italic line-clamp-2 transition-colors",
                                notif.read ? "text-slate-400" : "text-slate-600"
                            )}>
                                {notif.message}
                            </p>
                        </div>

                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            {/* deleteNotification not implemented in service */}
                        </div>
                    </motion.div>
                ))}
              </AnimatePresence>
          </div>
      )}
    </div>
  );
}
