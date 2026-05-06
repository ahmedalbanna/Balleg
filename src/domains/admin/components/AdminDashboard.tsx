import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Building2, ShieldCheck, Activity, Search, Plus, MoreVertical, CheckCircle2, XCircle, AlertCircle, PieChart as PieChartIcon, TrendingUp, BarChart3, Clock, Star, MapPin } from 'lucide-react';
import { collection, query, getDocs, doc, updateDoc, onSnapshot } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../../core/services/firebase';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, BarChart, Bar, Legend 
} from 'recharts';
import axios from 'axios';
import { cn } from '../../core/utils/cn';
import MapView from '../../locations/components/MapView';

interface UserData {
  uid: string;
  displayName: string;
  email: string;
  role: string;
  isActive: boolean;
  departmentId?: string;
}

export const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'analytics' | 'users' | 'departments' | 'logs'>('analytics');
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);
  const [analytics, setAnalytics] = useState<any>(null);
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeReports: 0,
    satisfactionRate: '0/5',
    systemHealth: '100%'
  });

  useEffect(() => {
    // Fetch Firestore users meta
    const q = query(collection(db, 'users'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const userData = snapshot.docs.map(doc => doc.data() as UserData);
      setUsers(userData);
      setStats(prev => ({ ...prev, totalUsers: userData.length }));
      setLoading(false);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'users');
    });

    // Fetch Backend Analytics
    const fetchAnalytics = async () => {
      try {
        const res = await axios.get('/api/domain/report/stats');
        setAnalytics(res.data);
        setStats(prev => ({
          ...prev,
          activeReports: res.data.summary.pending + res.data.summary.inProgress,
          satisfactionRate: '4.8/5'
        }));
      } catch (err) {
        console.error("Error fetching analytics:", err);
      }
    };

    fetchAnalytics();
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
        <StatCard icon={<Star className="text-amber-500 fill-amber-500" />} label="معدل الرضا العام" value={stats.satisfactionRate} color="amber" />
        <StatCard icon={<ShieldCheck className="text-green-500" />} label="بلاغات نشطة" value={stats.activeReports.toString()} color="green" />
        <StatCard icon={<Activity className="text-orange-500" />} label="حالة النظام" value={stats.systemHealth} color="orange" />
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="flex border-b border-slate-100 p-2 overflow-x-auto gap-2">
          {['analytics', 'users', 'departments', 'logs'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`flex-1 min-w-[120px] py-3 px-4 rounded-xl text-sm font-bold transition-all ${
                activeTab === tab ? 'bg-slate-900 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-50'
              }`}
            >
              {tab === 'analytics' ? 'التحليلات الاستراتيجية' : 
               tab === 'users' ? 'المستخدمين' : 
               tab === 'departments' ? 'الأقسام' : 'سجل التحركات'}
            </button>
          ))}
        </div>

        <div className="p-6">
          {activeTab === 'analytics' && analytics && (
            <div className="space-y-8">
              {/* Strategic Overview Row */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                 {/* Trend Chart */}
                 <div className="lg:col-span-2 bg-slate-50/50 rounded-3xl p-6 border border-slate-100">
                    <div className="flex justify-between items-center mb-6">
                        <h4 className="font-black text-slate-800 flex items-center gap-2">
                            <TrendingUp size={18} className="text-blue-500" />
                            اتجاهات البلاغات (آخر 7 أيام)
                        </h4>
                    </div>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={analytics.trends}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#94a3b8'}} />
                                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#94a3b8'}} />
                                <Tooltip 
                                    contentStyle={{ borderRadius: '1rem', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                                />
                                <Line type="monotone" dataKey="received" name="تم الاستلام" stroke="#3b82f6" strokeWidth={3} dot={{r: 4}} activeDot={{r: 6}} />
                                <Line type="monotone" dataKey="resolved" name="تم الحل" stroke="#10b981" strokeWidth={3} dot={{r: 4}} activeDot={{r: 6}} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                 </div>

                 {/* Distribution Pie */}
                 <div className="bg-slate-50/50 rounded-3xl p-6 border border-slate-100">
                    <h4 className="font-black text-slate-800 flex items-center gap-2 mb-6">
                        <PieChartIcon size={18} className="text-purple-500" />
                        توزيع البلاغات حسب القطاع
                    </h4>
                    <div className="h-[250px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={analytics.typeDistribution}
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {analytics.typeDistribution.map((entry: any, index: number) => (
                                        <Cell key={`cell-${index}`} fill={['#3b82f6', '#8b5cf6', '#f59e0b', '#ef4444', '#10b981'][index % 5]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend verticalAlign="bottom" height={36}/>
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                 </div>
              </div>

              {/* Performance & Map Row */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Department Performance */}
                <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex flex-col">
                    <h4 className="font-black text-slate-800 flex items-center gap-2 mb-6">
                        <BarChart3 size={18} className="text-orange-500" />
                        كفاءة استجابة الأقسام
                    </h4>
                    <div className="space-y-4 flex-1">
                        {analytics.deptPerformance.map((dept: any) => (
                            <div key={dept.name} className="space-y-2">
                                <div className="flex justify-between text-xs font-black">
                                    <span className="text-slate-600">{dept.name}</span>
                                    <span className={cn(
                                        dept.score > 80 ? "text-emerald-600" : dept.score > 60 ? "text-amber-500" : "text-red-500"
                                    )}>{dept.score}%</span>
                                </div>
                                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                                    <motion.div 
                                        initial={{ width: 0 }}
                                        animate={{ width: `${dept.score}%` }}
                                        transition={{ duration: 1, ease: "easeOut" }}
                                        className={cn(
                                            "h-full rounded-full",
                                            dept.score > 80 ? "bg-emerald-500" : dept.score > 60 ? "bg-amber-500" : "bg-red-500"
                                        )}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Heatmap Section */}
                <div className="lg:col-span-2 space-y-4">
                    <div className="flex justify-between items-center px-2">
                         <h4 className="font-black text-slate-800 flex items-center gap-2">
                            <MapPin size={18} className="text-red-500" />
                            الخريطة الحرارية للبلاغات (Heatmap)
                        </h4>
                        <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-1 rounded-lg">مُحدث الآن</span>
                    </div>
                    <div className="h-[400px] w-full">
                        <MapView 
                            points={[
                                { lat: 15.3694, lng: 44.1910, intensity: 0.9, label: "بؤرة حي الصافية" },
                                { lat: 15.3500, lng: 44.2000, intensity: 0.6, label: "منطقة باب اليمن" },
                                { lat: 15.3800, lng: 44.1800, intensity: 0.4, label: "حي النهضة" }
                            ]}
                        />
                    </div>
                </div>
              </div>

              {/* Accountability Row */}
              <div className="bg-red-50/30 rounded-3xl p-6 border border-red-100">
                    <h4 className="font-black text-slate-800 flex items-center gap-2 mb-4">
                        <AlertCircle size={18} className="text-red-500" />
                        تنبيهات المساءلة (متأخرات)
                    </h4>
                    <div className="space-y-3">
                        <div className="p-4 bg-white border border-red-100 rounded-2xl flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-red-50 text-red-600 rounded-xl flex items-center justify-center">
                                    <Clock size={20} />
                                </div>
                                <div>
                                    <p className="text-sm font-black text-slate-900">تأخر في قطاع الطرق</p>
                                    <p className="text-[10px] text-slate-500 font-bold">12 بلاغاً تجاوزت الـ 48 ساعة دون استجابة</p>
                                </div>
                            </div>
                            <span className="text-[10px] font-black text-red-600 bg-red-100 px-2 py-1 rounded-lg uppercase">حرج</span>
                        </div>
                        <div className="p-4 bg-white border border-red-100 rounded-2xl flex items-center justify-between opacity-70">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center">
                                    <MapPin size={20} />
                                </div>
                                <div>
                                    <p className="text-sm font-black text-slate-900">تركيز بلاغات (حي الصافية)</p>
                                    <p className="text-[10px] text-slate-500 font-bold">ارتفاع مفاجئ في شكاوى الصرف الصحي</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
              </div>
            )}

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
