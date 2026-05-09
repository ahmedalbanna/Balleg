import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  Search, 
  Filter, 
  UserPlus, 
  MoreVertical, 
  Shield, 
  UserCheck, 
  UserMinus, 
  Mail, 
  Phone,
  Clock,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  ShieldAlert
} from 'lucide-react';
import { db } from '../../core/services/firebase';
import { collection, getDocs, query, limit, orderBy } from 'firebase/firestore';
import { cn } from '../../core/utils/cn';

export interface UserProfile {
  uid: string;
  displayName: string;
  email: string;
  role: string;
  createdAt?: any;
  lastLogin?: any;
}

export const AdminUsers: React.FC = () => {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const q = query(collection(db, 'profiles'), orderBy('displayName', 'asc'), limit(50));
        const snapshot = await getDocs(q);
        const userData = snapshot.docs.map(doc => ({ uid: doc.id, ...doc.data() } as UserProfile));
        setUsers(userData);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const filteredUsers = users.filter(u => 
    u.displayName?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    u.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-8 w-full" dir="rtl">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-2">
        <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 text-indigo-600 rounded-lg text-[10px] font-black uppercase tracking-widest mb-3 border border-indigo-100">
                <Users size={12} />
                إدارة المستخدمين
            </div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-2">سجل الهوية الرقمية</h1>
            <p className="text-sm font-bold text-slate-400 italic">إدارة كافة حسابات المستخدمين والمناديب والمشرفين في النظام</p>
        </div>

        <div className="flex items-center gap-3">
             <button className="px-6 py-3 bg-slate-900 text-white rounded-2xl text-xs font-black hover:bg-slate-800 transition-all active:scale-95 flex items-center gap-2 shadow-xl shadow-slate-900/10">
                <UserPlus size={16} />
                إضافة مستخدم جديد
            </button>
        </div>
      </header>

      <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-50 bg-slate-50/30 flex flex-col sm:flex-row gap-4 items-center">
              <div className="relative flex-1 group">
                  <Search className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" size={18} />
                  <input 
                    type="text" 
                    placeholder="البحث بالاسم، البريد الإلكتروني، أو الرقم الوظيفي..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-6 pr-14 py-4 bg-white border border-slate-100 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all"
                  />
              </div>
              <button className="p-4 bg-white border border-slate-100 rounded-2xl text-slate-500 hover:text-indigo-600 hover:border-indigo-100 transition-all">
                  <Filter size={20} />
              </button>
          </div>

          <div className="overflow-x-auto">
              <table className="w-full text-right">
                  <thead>
                      <tr className="border-b border-slate-50">
                          <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">المستخدم</th>
                          <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">الدور الوظيفي</th>
                          <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">الحالة</th>
                          <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">تاريخ الانضمام</th>
                          <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-left">العمليات</th>
                      </tr>
                  </thead>
                  <tbody>
                      {loading ? (
                          [...Array(5)].map((_, i) => (
                              <tr key={i} className="animate-pulse border-b border-slate-50/50">
                                  <td colSpan={5} className="px-8 py-6 h-20 bg-slate-50/30 my-2 rounded-xl" />
                              </tr>
                          ))
                      ) : filteredUsers.length === 0 ? (
                          <tr>
                              <td colSpan={5} className="px-8 py-20 text-center">
                                  <Users size={48} className="mx-auto text-slate-200 mb-4" />
                                  <p className="text-sm font-black text-slate-400">لم يتم العثور على مستخدمين مطابقتين للبحث</p>
                              </td>
                          </tr>
                      ) : filteredUsers.map((user) => (
                          <motion.tr 
                            key={user.uid}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors group"
                          >
                              <td className="px-8 py-5">
                                  <div className="flex items-center gap-4">
                                      <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-black text-xs">
                                          {user.displayName?.[0] || 'U'}
                                      </div>
                                      <div>
                                          <p className="text-sm font-black text-slate-900 group-hover:text-indigo-600 transition-colors">{user.displayName}</p>
                                          <p className="text-[10px] font-bold text-slate-400 italic">{user.email}</p>
                                      </div>
                                  </div>
                              </td>
                              <td className="px-8 py-5">
                                  <span className={cn(
                                      "px-3 py-1 rounded-lg text-[9px] font-black border",
                                      user.role === 'admin' ? "bg-slate-900 text-white border-slate-900" :
                                      user.role === 'specialist' ? "bg-indigo-50 text-indigo-600 border-indigo-100" :
                                      "bg-emerald-50 text-emerald-600 border-emerald-100"
                                  )}>
                                      {user.role === 'admin' ? 'مدير نظام' : 
                                       user.role === 'specialist' ? 'فني مختص' : 
                                       user.role === 'merchant' ? 'تاجر' :
                                       user.role === 'displaced' ? 'نازح' : 'مواطن'}
                                  </span>
                              </td>
                              <td className="px-8 py-5">
                                  <div className="flex items-center gap-2">
                                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                      <span className="text-[10px] font-bold text-slate-600">نشط</span>
                                  </div>
                              </td>
                              <td className="px-8 py-5">
                                  <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 italic">
                                      <Clock size={12} />
                                      {user.createdAt ? new Date(user.createdAt.seconds * 1000).toLocaleDateString('ar-YE') : 'غير متوفر'}
                                  </div>
                              </td>
                              <td className="px-8 py-5 text-left">
                                  <div className="flex items-center justify-end gap-2">
                                      <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-white rounded-lg transition-all border border-transparent hover:border-indigo-100">
                                          <ShieldCheck size={16} />
                                      </button>
                                      <button className="p-2 text-slate-400 hover:text-rose-500 hover:bg-white rounded-lg transition-all border border-transparent hover:border-rose-100">
                                          <UserMinus size={16} />
                                      </button>
                                      <button className="p-2 text-slate-300 hover:text-slate-900 transition-colors">
                                          <MoreVertical size={16} />
                                      </button>
                                  </div>
                              </td>
                          </motion.tr>
                      ))}
                  </tbody>
              </table>
          </div>

          <div className="p-6 bg-slate-50/30 flex items-center justify-between border-t border-slate-50">
              <p className="text-[10px] font-bold text-slate-400 italic">عرض ١٠ من أصل {users.length} مستخدم</p>
              <div className="flex items-center gap-2">
                  <button className="p-2 bg-white border border-slate-100 rounded-lg text-slate-400 hover:text-indigo-600 disabled:opacity-30" disabled>
                      <ChevronRight size={16} />
                  </button>
                  <div className="flex gap-1">
                      <button className="w-8 h-8 rounded-lg bg-indigo-600 text-white text-[10px] font-black">١</button>
                      <button className="w-8 h-8 rounded-lg bg-white border border-slate-100 text-slate-400 text-[10px] font-black hover:border-indigo-200">٢</button>
                  </div>
                  <button className="p-2 bg-white border border-slate-100 rounded-lg text-slate-400 hover:text-indigo-600">
                      <ChevronLeft size={16} />
                  </button>
              </div>
          </div>
      </div>
    </div>
  );
};
