import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Building2, ShieldCheck, Activity, Search, Plus, MoreVertical, CheckCircle2, XCircle, AlertCircle } from 'lucide-react';
import { collection, query, getDocs, doc, updateDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../../core/services/firebase';

interface UserData {
  uid: string;
  displayName: string;
  email: string;
  role: string;
  isActive: boolean;
  departmentId?: string;
}

export const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'users' | 'departments' | 'logs'>('users');
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeReports: 42,
    departmentsCount: 8,
    systemHealth: '100%'
  });

  useEffect(() => {
    const q = query(collection(db, 'users'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const userData = snapshot.docs.map(doc => doc.data() as UserData);
      setUsers(userData);
      setStats(prev => ({ ...prev, totalUsers: userData.length }));
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const toggleUserStatus = async (uid: string, currentStatus: boolean) => {
    try {
      await updateDoc(doc(db, 'users', uid), {
        isActive: !currentStatus
      });
    } catch (error) {
      console.error("Error updating user status:", error);
    }
  };

  return (
    <div className="space-y-8 p-6" dir="rtl">
      {/* Header Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard icon={<Users className="text-blue-500" />} label="إجمالي المستخدمين" value={stats.totalUsers.toString()} color="blue" />
        <StatCard icon={<Building2 className="text-purple-500" />} label="الأقسام المفعلة" value={stats.departmentsCount.toString()} color="purple" />
        <StatCard icon={<ShieldCheck className="text-green-500" />} label="بلاغات نشطة" value={stats.activeReports.toString()} color="green" />
        <StatCard icon={<Activity className="text-orange-500" />} label="حالة النظام" value={stats.systemHealth} color="orange" />
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="flex border-b border-slate-100 p-2">
          {['users', 'departments', 'logs'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`flex-1 py-3 px-4 rounded-xl text-sm font-bold transition-all ${
                activeTab === tab ? 'bg-slate-900 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-50'
              }`}
            >
              {tab === 'users' ? 'المستخدمين' : tab === 'departments' ? 'الأقسام' : 'سجل التحركات'}
            </button>
          ))}
        </div>

        <div className="p-6">
          {activeTab === 'users' && (
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="relative flex-1 w-full">
                  <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <input 
                    type="text" 
                    placeholder="بحث عن مستخدم بالاسم أو الدور..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 pr-12 pl-4 focus:ring-2 focus:ring-blue-500/20 outline-none"
                  />
                </div>
                <button className="bg-blue-600 text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 w-fit">
                  <Plus size={20} />
                  إضافة مستخدم
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-right border-separate border-spacing-y-2">
                  <thead>
                    <tr className="text-slate-400 text-xs font-black uppercase tracking-widest px-4">
                      <th className="pb-4 pr-6">المستخدم</th>
                      <th className="pb-4">الدور</th>
                      <th className="pb-4">القسم</th>
                      <th className="pb-4">الحالة</th>
                      <th className="pb-4 text-center">الإجراءات</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.uid} className="bg-slate-50/50 hover:bg-slate-100/50 transition-colors group">
                        <td className="py-4 pr-6 rounded-r-2xl border-y border-r border-slate-100">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-400 font-bold">
                              {user.displayName?.charAt(0) || 'U'}
                            </div>
                            <div>
                              <p className="text-sm font-bold text-slate-900">{user.displayName}</p>
                              <p className="text-[10px] text-slate-400">{user.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 border-y border-slate-100">
                          <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-lg text-[10px] font-black uppercase tracking-tighter shadow-sm border border-blue-100">
                            {user.role}
                          </span>
                        </td>
                        <td className="py-4 border-y border-slate-100 text-sm font-bold text-slate-600">
                          {user.departmentId || 'بدون قسم'}
                        </td>
                        <td className="py-4 border-y border-slate-100">
                          {user.isActive ? (
                            <div className="flex items-center gap-1.5 text-green-600">
                              <CheckCircle2 size={14} />
                              <span className="text-xs font-bold">نشط</span>
                            </div>
                          ) : (
                            <div className="flex items-center gap-1.5 text-red-500">
                              <XCircle size={14} />
                              <span className="text-xs font-bold">معطل</span>
                            </div>
                          )}
                        </td>
                        <td className="py-4 pl-6 rounded-l-2xl border-y border-l border-slate-100 text-center">
                          <div className="flex items-center justify-center gap-2">
                             <button 
                              onClick={() => toggleUserStatus(user.uid, user.isActive)}
                              className={`p-2 rounded-lg transition-all ${user.isActive ? 'text-red-400 hover:bg-red-50' : 'text-green-500 hover:bg-green-50'}`}
                            >
                              <AlertCircle size={18} />
                            </button>
                            <button className="p-2 text-slate-400 hover:bg-white rounded-lg transition-all">
                              <MoreVertical size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'departments' && (
            <div className="flex flex-col items-center justify-center py-20 text-slate-400 bg-slate-50/50 rounded-3xl border-2 border-dashed border-slate-200">
              <Building2 size={48} className="mb-4 opacity-20" />
              <p className="text-lg font-bold">إدارة الأقسام قيد التطوير</p>
              <p className="text-sm">سيتمكن المسؤول من هنا من تعريف الجهات الحكومية والخدمية.</p>
            </div>
          )}

          {activeTab === 'logs' && (
             <div className="flex flex-col items-center justify-center py-20 text-slate-400 bg-slate-50/50 rounded-3xl border-2 border-dashed border-slate-200">
              <Activity size={48} className="mb-4 opacity-20" />
              <p className="text-lg font-bold">سجل الأنشطة (Audit Log)</p>
              <p className="text-sm">يعرض هذا السجل كل العمليات الحساسة التي قام بها المستخدمون.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const StatCard: React.FC<{ icon: React.ReactNode, label: string, value: string, color: string }> = ({ icon, label, value, color }) => (
  <div className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm flex items-center gap-4 relative overflow-hidden group">
    <div className={`absolute top-0 right-0 w-2 h-full bg-${color}-500 opacity-20 group-hover:opacity-40 transition-opacity`} />
    <div className={`w-14 h-14 bg-${color}-50 rounded-2xl flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform`}>
      {icon}
    </div>
    <div>
      <p className="text-xs font-bold text-slate-400 uppercase mb-1">{label}</p>
      <p className="text-2xl font-black text-slate-900">{value}</p>
    </div>
  </div>
);
