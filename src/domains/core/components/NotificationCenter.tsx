import React, { useState, useEffect } from 'react';
import { Bell, Check, Trash2, ExternalLink, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { notificationService, AppNotification } from '../services/notifications';
import { useAuth } from '../context/AuthContext';
import { formatDistanceToNow } from 'date-fns';
import { ar } from 'date-fns/locale';

import { useRole } from '../context/RoleContext';

export const NotificationCenter: React.FC = () => {
  const { user } = useAuth();
  const { currentRole } = useRole();
  const [notifications, setNotifications] = useState<AppNotification[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const unreadCount = notifications.filter(n => !n.read).length;

  const themeColor = currentRole?.themeColor || '#3b82f6';

  useEffect(() => {
    if (!user) return;
    const unsubscribe = notificationService.subscribeToUserNotifications(user.uid, (data) => {
      setNotifications(data);
    });
    return () => unsubscribe();
  }, [user]);

  const handleMarkAllRead = async () => {
    if (user) await notificationService.markAllAsRead(user.uid);
  };

  const handleToggle = () => setIsOpen(!isOpen);

  return (
    <div className="relative">
      <button 
        onClick={handleToggle}
        className="relative p-2 text-slate-400 hover:text-slate-900 hover:bg-white rounded-xl transition-all border border-transparent hover:border-slate-100"
      >
        <Bell size={20} />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse">
            {unreadCount}
          </span>
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div 
              className="fixed inset-0 z-40" 
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="absolute left-0 top-full mt-4 w-96 bg-white rounded-[2rem] border border-slate-200 shadow-2xl z-50 overflow-hidden"
              dir="rtl"
            >
              <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                <h3 className="text-lg font-black text-slate-900">الإشعارات</h3>
                <button 
                  onClick={handleMarkAllRead}
                  className="text-xs font-bold hover:underline"
                  style={{ color: themeColor }}
                >
                  تحديد الكل كمقروء
                </button>
              </div>

              <div className="max-h-[400px] overflow-y-auto custom-scrollbar">
                {notifications.length === 0 ? (
                  <div className="p-12 text-center text-slate-400">
                    <Bell className="w-12 h-12 mx-auto mb-4 opacity-10" />
                    <p className="text-sm font-bold">لا توجد إشعارات حالياً</p>
                  </div>
                ) : (
                  <div className="divide-y divide-slate-50">
                    {notifications.map((n) => (
                      <div 
                        key={n.id}
                        className={`p-5 hover:bg-slate-50 transition-colors relative group`}
                        style={!n.read ? { backgroundColor: `${themeColor}08` } : {}}
                      >
                        {!n.read && (
                          <div 
                            className="absolute right-0 top-0 bottom-0 w-1 rounded-r-full" 
                            style={{ backgroundColor: themeColor }}
                          />
                        )}
                        <div className="flex justify-between items-start mb-1">
                          <h4 className={`text-sm font-bold ${!n.read ? 'text-slate-900' : 'text-slate-600'}`}>{n.title}</h4>
                          <span className="text-[10px] text-slate-400 font-bold">
                            {n.createdAt?.toDate ? formatDistanceToNow(n.createdAt.toDate(), { addSuffix: true, locale: ar }) : 'الآن'}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 leading-relaxed mb-3">{n.message}</p>
                        <div className="flex gap-2">
                           <button 
                            onClick={() => notificationService.markAsRead(n.id)}
                            className="p-1.5 bg-white border border-slate-200 rounded-lg text-slate-400 hover:text-blue-600 hover:border-blue-200 transition-all"
                            title="تحديد كمقروء"
                          >
                            <Check size={14} />
                          </button>
                          {n.link && (
                            <a href={n.link} className="p-1.5 bg-white border border-slate-200 rounded-lg text-slate-400 hover:text-indigo-600 hover:border-indigo-200 transition-all">
                              <ExternalLink size={14} />
                            </a>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="p-4 bg-slate-50 border-t border-slate-100 text-center">
                <button className="text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-slate-900 transition-colors">
                  عرض كل التنبيهات
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
