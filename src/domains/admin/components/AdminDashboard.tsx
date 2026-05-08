import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Users, Building2, ShieldCheck, Activity, Search, Plus, MoreVertical, CheckCircle2, XCircle, AlertCircle, PieChart as PieChartIcon, TrendingUp, BarChart3, Clock, Star, MapPin, Download, ChevronLeft, ArrowLeftRight, Workflow, Database } from 'lucide-react';
import { collection, query, getDocs, doc, updateDoc, onSnapshot, where, serverTimestamp } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../../core/services/firebase';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, BarChart, Bar, Legend 
} from 'recharts';
import { cn } from '../../core/utils/cn';
import MapView from '../../locations/components/MapView';
import { Report } from '../../core/services/reportApi';
import { toast } from 'sonner';
import { MermaidChart } from '../../core/components/MermaidChart';
import { DepartmentsManager } from './DepartmentsManager';

interface UserData {
  uid: string;
  displayName: string;
  email: string;
  role: string;
  isActive: boolean;
  departmentId?: string;
  createdAt?: string;
}

export const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'analytics' | 'users' | 'alerts' | 'departments' | 'logs' | 'flow' | 'schema'>('analytics');
  const [users, setUsers] = useState<UserData[]>([]);
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [reroutingReportId, setReroutingReportId] = useState<string | null>(null);
  const [rerouteDepartment, setRerouteDepartment] = useState("");
  const [rerouteReason, setRerouteReason] = useState("");

  const [searchQuery, setSearchQuery] = useState("");
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [newUserMsg, setNewUserMsg] = useState("");
  const [newUserForm, setNewUserForm] = useState({ displayName: '', email: '', role: 'official', department: '' });

  const [stats, setStats] = useState({
    totalUsers: 0,
    activeReports: 0,
    satisfactionRate: '0/5',
    systemHealth: '100%',
    delayedReports: 0,
    criticalReports: 0
  });

  useEffect(() => {
    // Fetch users mapping
    const qUsers = query(collection(db, 'users'));
    const unsubUsers = onSnapshot(qUsers, (snapshot) => {
      const userData = snapshot.docs.map(doc => ({...doc.data(), uid: doc.id} as UserData));
      setUsers(userData);
      setStats(prev => ({ ...prev, totalUsers: userData.length }));
    }, (error) => handleFirestoreError(error, OperationType.LIST, 'users'));

    // Fetch reports
    const qReports = query(collection(db, 'reports'));
    const unsubReports = onSnapshot(qReports, (snapshot) => {
      const docs = snapshot.docs.map(d => ({ ...d.data(), id: d.id } as Report));
      setReports(docs);

      const active = docs.filter(r => r.status === 'in_progress' || r.status === 'pending_official' || r.status === 'pending_operator').length;
      
      const now = new Date();
      const delayed = docs.filter(r => {
        if (r.status.startsWith('resolved')) return false;
        const diffMs = now.getTime() - new Date(r.createdAt).getTime();
        return diffMs > 7 * 24 * 60 * 60 * 1000; // > 7 days
      }).length;

      const critical = docs.filter(r => r.priority === 'critical' && !r.status.startsWith('resolved')).length;

      setStats(prev => ({ 
        ...prev, 
        activeReports: active,
        delayedReports: delayed,
        criticalReports: critical,
        satisfactionRate: calculateSatisfaction(docs)
      }));

      setLoading(false);
    }, (error) => handleFirestoreError(error, OperationType.LIST, 'reports'));

    return () => {
      unsubUsers();
      unsubReports();
    };
  }, []);

  const calculateSatisfaction = (docs: Report[]) => {
    const rated = docs.filter(r => r.rating && r.rating > 0);
    if (!rated.length) return 'N/A';
    const sum = rated.reduce((acc, r) => acc + (r.rating || 0), 0);
    return (sum / rated.length).toFixed(1) + '/5';
  };

  const toggleUserStatus = async (uid: string, currentStatus: boolean) => {
    try {
      const toastId = toast.loading('جاري تحديث الحساب...');
      await updateDoc(doc(db, 'users', uid), {
        isActive: !currentStatus,
        updatedAt: new Date().toISOString()
      });
      toast.success(currentStatus ? 'تم تعطيل الحساب' : 'تم تفعيل الحساب', { id: toastId });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, 'users');
    }
  };

  const handleReroute = async (reportId: string) => {
    if (!rerouteDepartment) return;
    try {
      const toastId = toast.loading('جاري التوجيه...');
      await updateDoc(doc(db, 'reports', reportId), {
        department: rerouteDepartment,
        status: 'pending_official',
        reroutedReason: rerouteReason || "توجيه إداري من السلطة العليا",
        updatedAt: new Date().toISOString()
      });
      toast.success('تم التوجيه بنجاح', { id: toastId });
      setReroutingReportId(null);
      setRerouteDepartment("");
      setRerouteReason("");
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, 'reports');
    }
  };

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const toastId = toast.loading('جاري إضافة المستخدم...');
      // Note: In a real app, you would create the Auth user here via Cloud Functions 
      // or a secondary Firebase App instance to avoid logging out the current admin.
      // Here we just add the profile to the users collection.
      const newUid = 'usr_' + Date.now().toString(36);
      await updateDoc(doc(db, 'users', newUid), {
        uid: newUid,
        displayName: newUserForm.displayName,
        email: newUserForm.email,
        role: newUserForm.role,
        departmentId: newUserForm.department,
        isActive: true,
        createdAt: serverTimestamp()
      }).catch(async (err) => {
         // fallback if updateDoc fails because it doesn't exist, we should use setDoc but wait, import setDoc first
         const { setDoc, serverTimestamp } = await import('firebase/firestore');
         await setDoc(doc(db, 'users', newUid), {
            uid: newUid,
            displayName: newUserForm.displayName,
            email: newUserForm.email,
            role: newUserForm.role,
            departmentId: newUserForm.department,
            isActive: true,
            createdAt: serverTimestamp()
         });
      });
      toast.success('تم إنشاء الحساب بنجاح', { id: toastId });
      setIsAddUserModalOpen(false);
      setNewUserForm({ displayName: '', email: '', role: 'official', department: '' });
    } catch (err) {
      handleFirestoreError(err, OperationType.CREATE, 'users');
    }
  };

  const filteredUsers = users.filter(u => 
    u.displayName?.toLowerCase().includes(searchQuery.toLowerCase()) || 
    u.email?.toLowerCase().includes(searchQuery.toLowerCase()) || 
    u.role?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleExport = () => {
      const csvRows = [];
      // CSV Headers
      csvRows.push(['ID', 'Status', 'Department', 'Type', 'Priority', 'Created At', 'Rating'].join(','));
      
      // Data Rows
      reports.forEach(r => {
         const row = [
             r.id,
             r.status,
             r.department || 'N/A',
             r.type || 'N/A',
             r.priority || 'medium',
             new Date(r.createdAt).toLocaleString(),
             r.rating || ''
         ];
         // Escape commas and quotes
         const safeRow = row.map(v => `"${String(v).replace(/"/g, '""')}"`);
         csvRows.push(safeRow.join(','));
      });
      
      const csvString = '\uFEFF' + csvRows.join('\n'); // adding BOM for unicode support in Excel
      const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `reports_export_${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast.success("تم تصدير التقرير بصيغة CSV بنجاح");
  };

  // Generate chart data based on real reports
  const deptMap: Record<string, { total: number, resolved: number }> = {};
  const typeMap: Record<string, number> = {};
  reports.forEach(r => {
      const d = r.department || 'غير مصنف';
      if (!deptMap[d]) deptMap[d] = { total: 0, resolved: 0 };
      deptMap[d].total++;
      if (r.status.startsWith('resolved')) deptMap[d].resolved++;

      const t = r.type || 'أخرى';
      typeMap[t] = (typeMap[t] || 0) + 1;
  });

  const deptPerformance = Object.keys(deptMap).map(k => ({
      name: k,
      score: Math.round((deptMap[k].resolved / deptMap[k].total) * 100),
      total: deptMap[k].total
  })).sort((a,b) => b.score - a.score);

  const typeDistribution = Object.keys(typeMap).map(k => ({
      name: k, value: typeMap[k]
  }));

  const mapPoints = reports.filter(r => r.location).map(r => ({
      lat: r.location![0],
      lng: r.location![1],
      intensity: r.priority === 'critical' ? 1 : r.status === 'in_progress' ? 0.6 : 0.4,
      label: r.description
  }));

  const delayedList = reports.filter(r => {
      if (r.status.startsWith('resolved')) return false;
      const diffMs = new Date().getTime() - new Date(r.createdAt).getTime();
      return diffMs > 7 * 24 * 60 * 60 * 1000;
  });

  const criticalList = reports.filter(r => r.priority === 'critical' && !r.status.startsWith('resolved'));

  return (
    <div className="space-y-8 p-6 max-w-7xl mx-auto w-full" dir="rtl">
      
      {/* Header section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-slate-900 rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl" />
        <div className="relative z-10 flex items-center gap-5">
           <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center p-3">
              <ShieldCheck className="w-full h-full text-blue-400" />
           </div>
           <div>
              <h2 className="text-3xl font-black text-white font-readex">لوحة الإدارة العليا (Admin)</h2>
              <p className="text-sm font-bold text-slate-300 mt-1">الرؤية الاستراتيجية لأداء العاصمة والمديريات</p>
           </div>
        </div>
        <button onClick={handleExport} className="relative z-10 bg-white text-slate-900 px-6 py-3 rounded-2xl text-sm font-black flex items-center gap-2 hover:bg-slate-100 transition-colors shadow-lg">
           <Download className="w-4 h-4" />
           تصدير التقارير القيادية
        </button>
      </div>

      {/* Header Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        <StatCard icon={<Users className="text-blue-600" />} label="المستخدمين" value={stats.totalUsers.toString()} color="blue" />
        <StatCard icon={<Star className="text-amber-500 fill-amber-500" />} label="معدل الرضا" value={stats.satisfactionRate} color="amber" />
        <StatCard icon={<Activity className="text-emerald-600" />} label="بلاغات قيد الإجراء" value={stats.activeReports.toString()} color="emerald" />
        <div className="bg-rose-50 p-6 rounded-[2rem] border border-rose-200 shadow-sm flex items-center gap-4 relative overflow-hidden">
            <div className={`w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-inner`}>
                <AlertCircle className="text-rose-600" />
            </div>
            <div>
            <p className="text-[10px] font-black text-rose-500 uppercase mb-1">مخاطر حرجة</p>
            <p className="text-2xl font-black text-rose-900">{stats.criticalReports}</p>
            </div>
        </div>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-slate-200 overflow-hidden shadow-sm">
        <div className="flex border-b border-slate-100 p-3 overflow-x-auto gap-2 bg-slate-50/50">
          {['analytics', 'alerts', 'users', 'departments', 'flow', 'schema', 'logs'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${
                activeTab === tab ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20' : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              {tab === 'analytics' && <TrendingUp className="w-4 h-4" />}
              {tab === 'users' && <Users className="w-4 h-4" />}
              {tab === 'alerts' && <AlertCircle className="w-4 h-4" />}
              {tab === 'departments' && <Building2 className="w-4 h-4" />}
              {tab === 'flow' && <Workflow className="w-4 h-4" />}
              {tab === 'schema' && <Database className="w-4 h-4" />}
              {tab === 'logs' && <Activity className="w-4 h-4" />}
              
              {tab === 'analytics' ? 'المؤشرات والخرائط' : 
               tab === 'alerts' ? 'التنبيهات والمساءلة' :
               tab === 'users' ? 'إدارة الوصول' : 
               tab === 'departments' ? 'الهيكل التنظيمي' :
               tab === 'flow' ? 'دورات العمل' : 
               tab === 'schema' ? 'هيكل النظام (DB)' : 'سجل التدقيق'}
            </button>
          ))}
        </div>

        <div className="p-6 md:p-8">
          {activeTab === 'analytics' && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                 {/* Distribution Pie */}
                 <div className="bg-white rounded-[2rem] p-6 border border-slate-100 shadow-sm">
                    <h4 className="text-sm font-black text-slate-800 flex items-center gap-2 mb-6 tracking-widest uppercase">
                        <PieChartIcon size={16} className="text-purple-500" />
                        القطاعات الأكثر بلاغاً
                    </h4>
                    <div className="h-[250px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={typeDistribution}
                                    innerRadius={50}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {typeDistribution.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={['#3b82f6', '#8b5cf6', '#f59e0b', '#ef4444', '#10b981'][index % 5]} />
                                    ))}
                                </Pie>
                                <RechartsTooltip contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                                <Legend verticalAlign="bottom" height={36}/>
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                 </div>

                {/* Department Performance */}
                <div className="lg:col-span-2 bg-white rounded-[2rem] p-6 border border-slate-100 shadow-sm flex flex-col">
                    <h4 className="text-sm font-black text-slate-800 flex items-center gap-2 mb-6 tracking-widest uppercase">
                        <BarChart3 size={16} className="text-orange-500" />
                        كفاءة الإدارات (نسبة الإنجاز)
                    </h4>
                    <div className="space-y-4 flex-1">
                        {deptPerformance.slice(0,5).map((dept) => (
                            <div key={dept.name} className="space-y-2">
                                <div className="flex justify-between text-xs font-black">
                                    <span className="text-slate-700">{dept.name} <span className="text-slate-400 font-bold mr-1">({dept.total} بلاغ)</span></span>
                                    <span className={cn(
                                        dept.score > 80 ? "text-emerald-600" : dept.score > 60 ? "text-amber-500" : "text-rose-500"
                                    )}>{dept.score}%</span>
                                </div>
                                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                                    <motion.div 
                                        initial={{ width: 0 }}
                                        animate={{ width: `${dept.score}%` }}
                                        transition={{ duration: 1, ease: "easeOut" }}
                                        className={cn(
                                            "h-full rounded-full",
                                            dept.score > 80 ? "bg-emerald-500" : dept.score > 60 ? "bg-amber-500" : "bg-rose-500"
                                        )}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
              </div>

              {/* Heatmap Section */}
              <div className="bg-white rounded-[2rem] p-1 border border-slate-100 shadow-sm overflow-hidden">
                  <div className="flex justify-between items-center p-5 border-b border-slate-50 mb-2">
                       <h4 className="text-sm font-black text-slate-800 flex items-center gap-2 tracking-widest uppercase">
                          <MapPin size={16} className="text-rose-500" />
                          الخريطة الاستراتيجية للعمليات
                      </h4>
                      <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-3 py-1 rounded-full">{mapPoints.length} نقطة نشطة</span>
                  </div>
                  <div className="h-[400px] w-full rounded-[1.5rem] overflow-hidden">
                      <MapView points={mapPoints} center={[15.3694, 44.1910]} zoom={12} />
                  </div>
              </div>
            </div>
          )}

          {activeTab === 'alerts' && (
            <div className="space-y-6">
                <div className="bg-rose-50 rounded-[2rem] p-6 border border-rose-100">
                    <h3 className="text-lg font-black text-rose-900 mb-2 flex items-center gap-2">
                        <AlertCircle className="w-6 h-6" /> بلاغات حرجة تتطلب تدخلاً (Critical)
                    </h3>
                    <p className="text-xs text-rose-700 font-bold mb-6">هذه البلاغات صنفت حرجة ويجب معالجتها فوراً (مثل: حرائق، انهيارات، أعطال شبكة رئيسية).</p>

                    <div className="space-y-3">
                        {criticalList.length === 0 && <p className="text-sm font-black text-rose-300 text-center py-4">لا توجد حالات حرجة حالياً</p>}
                        {criticalList.map(r => (
                            <div key={r.id} className="bg-white p-4 rounded-2xl border border-rose-100 flex flex-col md:flex-row gap-4 justify-between md:items-center">
                                <div>
                                    <p className="text-sm font-black text-slate-900">{r.description}</p>
                                    <p className="text-[10px] text-slate-500 font-bold mt-1">
                                        الحالة: {r.status} / القطاع: {r.department || 'غير مصنف'}
                                    </p>
                                </div>
                                <div className="flex gap-2">
                                     <button onClick={() => setReroutingReportId(r.id)} className="bg-rose-600 text-white px-4 py-2 rounded-xl text-xs font-black shadow-lg shadow-rose-600/20 hover:bg-rose-700 transition flex items-center gap-2">
                                         <ArrowLeftRight className="w-4 h-4" /> إعادة توجيه طارئ
                                     </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-amber-50 rounded-[2rem] p-6 border border-amber-100">
                    <h3 className="text-lg font-black text-amber-900 mb-2 flex items-center gap-2">
                        <Clock className="w-6 h-6" /> بلاغات متأخرة جداً (+7 أيام)
                    </h3>
                    <p className="text-xs text-amber-700 font-bold mb-6">مساءلة الأقسام: هذه القائمة تتطلب مراجعة من المركز.</p>

                    <div className="space-y-3">
                        {delayedList.length === 0 && <p className="text-sm font-black text-amber-300 text-center py-4">لا يوجد تقاعس تتجاوز مدته 7 أيام</p>}
                        {delayedList.map(r => (
                            <div key={r.id} className="bg-white p-4 rounded-2xl border border-amber-100 flex flex-col md:flex-row gap-4 justify-between md:items-center">
                                <div>
                                    <p className="text-sm font-black text-slate-900">{r.description}</p>
                                    <p className="text-[10px] text-slate-500 font-bold mt-1">تاريخ البلاغ: {new Date(r.createdAt).toLocaleDateString('ar-SA')} - القطاع الموجه إليه: {r.department || 'غير مصنف'}</p>
                                </div>
                                <div className="flex gap-2">
                                     <button onClick={() => setReroutingReportId(r.id)} className="bg-slate-900 text-white px-4 py-2 rounded-xl text-xs font-black hover:bg-slate-800 transition flex items-center gap-2">
                                        توجيه إلزامي
                                     </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
          )}

          {activeTab === 'users' && (
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="relative flex-1 w-full max-w-md">
                  <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <input 
                    type="text" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="بحث بالمستخدمين... (الاسم، الدور، الايميل)"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 pr-12 pl-4 text-sm font-bold focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                  />
                </div>
                <button onClick={() => setIsAddUserModalOpen(true)} className="bg-blue-600 text-white px-6 py-2.5 rounded-xl text-sm font-black flex items-center gap-2 hover:bg-blue-700 transition-all shadow-md shadow-blue-600/20 w-fit">
                  <Plus size={18} />
                  إضافة حساب موظف
                </button>
              </div>

              <div className="overflow-x-auto border border-slate-100 rounded-3xl">
                <table className="w-full text-right bg-white">
                  <thead className="bg-slate-50 border-b border-slate-100">
                    <tr className="text-slate-500 text-[10px] font-black uppercase tracking-widest">
                      <th className="py-4 px-6 text-right">المستخدم</th>
                      <th className="py-4 px-6 text-right">الدور البرمجي</th>
                      <th className="py-4 px-6 text-right">الجهة / القطاع</th>
                      <th className="py-4 px-6 text-right">الحالة</th>
                      <th className="py-4 px-6 text-center">الإجراءات</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredUsers.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="py-8 text-center text-slate-400 font-bold text-sm">
                          لا توجد نتائج مطابقة للبحث
                        </td>
                      </tr>
                    ) : filteredUsers.map((user) => (
                      <tr key={user.uid} className="hover:bg-slate-50/50 transition-colors group">
                        <td className="py-3 px-6">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-600 font-bold border border-slate-200">
                              {user.displayName?.charAt(0) || 'U'}
                            </div>
                            <div>
                              <p className="text-sm font-black text-slate-900">{user.displayName || 'بدون اسم'}</p>
                              <p className="text-[10px] text-slate-500 font-bold">{user.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-6">
                          <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-lg text-[10px] font-black uppercase border border-blue-100 inline-block font-mono">
                            {user.role}
                          </span>
                        </td>
                        <td className="py-3 px-6 text-xs font-bold text-slate-600">
                          {user.departmentId || 'غير مرتبط'}
                        </td>
                        <td className="py-3 px-6">
                          {user.isActive ? (
                            <div className="flex items-center gap-1.5 text-emerald-600 bg-emerald-50 w-fit px-2 py-1 rounded-md">
                              <CheckCircle2 size={12} />
                              <span className="text-[10px] font-black uppercase">نشط</span>
                            </div>
                          ) : (
                            <div className="flex items-center gap-1.5 text-rose-600 bg-rose-50 w-fit px-2 py-1 rounded-md">
                              <XCircle size={12} />
                              <span className="text-[10px] font-black uppercase">مُعطل</span>
                            </div>
                          )}
                        </td>
                        <td className="py-3 px-6 text-center">
                          <div className="flex items-center justify-center gap-2">
                             <button 
                              onClick={() => toggleUserStatus(user.uid, user.isActive)}
                              title={user.isActive ? "تعطيل الحساب" : "تفعيل الحساب"}
                              className={`p-2 rounded-xl border transition-all ${user.isActive ? 'text-rose-500 border-rose-100 hover:bg-rose-50' : 'text-emerald-600 border-emerald-100 hover:bg-emerald-50'}`}
                            >
                              <AlertCircle size={16} />
                            </button>
                            <button className="p-2 text-slate-400 hover:bg-slate-100 border border-transparent hover:border-slate-200 rounded-xl transition-all">
                              <MoreVertical size={16} />
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
            <DepartmentsManager />
          )}

          {activeTab === 'flow' && (
            <div className="bg-white rounded-[2rem] p-6 border border-slate-100 shadow-sm overflow-x-auto min-h-[400px] flex flex-col gap-12">
               
               <div>
                 <h3 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-3">
                    <Workflow className="w-6 h-6 text-blue-500" /> مخطط سير العمل (Sequence Diagram) الدورة النموذجية للبلاغ
                 </h3>
                 <div className="bg-slate-50 rounded-3xl border border-slate-100 p-6 min-w-[800px]">
                   <MermaidChart chart={`sequenceDiagram
    participant C as المواطن
    participant S as النظام
    participant O as موظف الاستقبال
    participant P as الأخصائي
    participant T as الفريق الميداني
    
    C->>S: تقديم البلاغ (صورة/صوت/موقع)
    S-->>C: إشعار استلام (رقم المتابعة)
    Note over S: الحالة: جديد
    
    O->>S: عرض البلاغ
    Note over S: اقتراح الذكاء الاصطناعي للإدارة
    O->>S: قبول وتوجيه للإدارة المختصة
    Note over S: الحالة: قيد المعالجة
    
    P->>S: عرض البلاغ 
    P->>T: تكليف الفريق
    Note over S: الحالة: تحت التنفيذ
    
    T-->>P: إنجاز المهمة وإرسال صور
    P->>S: رفع صورة توثيق بعد الإنجاز
    Note over S: الحالة: منتهي بانتظار التقييم
    
    S-->>C: إشعار للمواطن: تم الحل يرجى التقييم
    
    alt إيجابي
        C->>S: تقييم عالٍ
        Note over S: الحالة: مغلق - رضا
    else سلبي
        C->>S: تقييم منخفض
        Note over S: الحالة: مغلق - استياء (تنبيه للمدير)
    else لا يوجد رد
        Note over S: مرور 48 ساعة
        Note over S: الحالة: مغلق - ضمني
    end`} />
                 </div>
               </div>

               <div>
                 <h3 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-3">
                    <Workflow className="w-6 h-6 text-blue-500" /> مخطط حالة (State Diagram) لدورة حياة البلاغ
                 </h3>
                 <div className="bg-slate-50 rounded-3xl border border-slate-100 p-6 min-w-[800px]">
                   <MermaidChart chart={`stateDiagram-v2
    [*] --> جديد: يقدم المواطن بلاغاً

    جديد --> محل_إعادة: رفض من المشغل (بيانات ناقصة)
    محل_إعادة --> جديد: يعدل المواطن البلاغ (خلال 48 ساعة)
    محل_إعادة --> ملغى: انتهاء المهلة 48 ساعة دون تعديل

    جديد --> مرفوض: رفض (مكرر/وهمي/خارج الاختصاص)
    مرفوض --> [*]: إشعار للمواطن بالرفض النهائي

    جديد --> قيد_المعالجة: قبول من المشغل وتحويله لإدارة مختصة

    قيد_المعالجة --> تحت_التنفيذ: يكلف الأخصائي الفريق الميداني
    تحت_التنفيذ --> قيد_المعالجة: يعيد الأخصائي التحويل لإدارة أخرى (نادر)

    تحت_التنفيذ --> منتهي_بانتظار_تقييم: يرفع الأخصائي صورة "بعد" ويغير الحالة

    منتهي_بانتظار_تقييم --> مغلق_رضا: يقيّم المواطن إيجاباً
    منتهي_بانتظار_تقييم --> مغلق_استياء: يقيّم المواطن سلباً
    منتهي_بانتظار_تقييم --> مغلق_ضمني: لا يقيّم المواطن خلال 48 ساعة

    مغلق_رضا --> [*]
    مغلق_ضمني --> [*]
    مغلق_استياء --> تحت_التنفيذ: يعيد مدير الإدارة فتح البلاغ (إذا تبين استحقاقه)
    مغلق_استياء --> [*]: إذا رئي أن التقييم غير مبرر

    ملغى --> [*]`} />
                 </div>
               </div>
               <div>
                 <h3 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-3">
                    <Workflow className="w-6 h-6 text-blue-500" /> سير عمل فرعي: إدارة المستخدمين والأدوار (للمسؤول فقط)
                 </h3>
                 <div className="bg-slate-50 rounded-3xl border border-slate-100 p-6 min-w-[800px]">
                   <MermaidChart chart={`sequenceDiagram
    participant A as مدير النظام العام
    participant S as النظام
    participant E as الموظف الجديد

    A->>S: إنشاء حساب موظف (تحديد الدور والقسم)
    S-->>E: إرسال دعوة التفعيل
    E->>S: تفعيل الحساب وتسجيل الدخول
    Note over S: الموظف جاهز لاستخدام النظام بحسب الصلاحيات`} />
                 </div>
               </div>

               <div>
                 <h3 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-3">
                    <Workflow className="w-6 h-6 text-blue-500" /> سير عمل فرعي: اعتراض صحفي أو لجنة حي
                 </h3>
                 <div className="bg-slate-50 rounded-3xl border border-slate-100 p-6 min-w-[800px]">
                   <MermaidChart chart={`sequenceDiagram
    participant J as صحفي / لجنة
    participant S as النظام
    participant D as الجهة المختصة

    J->>S: بحث عن بلاغ متأخر أو ذو أهمية
    J->>S: إرسال طلب تعليق رسمي ومساءلة للجهة
    S-->>D: إشعار بوجود طلب تعليق
    D->>S: الرد والتوضيح (خلال المهلة المحددة)
    S-->>J: وصول رد الجهة للصحفي
    J->>J: تصدير وبناء تقرير للمجتمع`} />
                 </div>
               </div>

               <div>
                 <h3 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-3">
                    <Workflow className="w-6 h-6 text-blue-500" /> سير عمل فرعي: تكامل القطاع الخاص (مثال: شركة اتصالات)
                 </h3>
                 <div className="bg-slate-50 rounded-3xl border border-slate-100 p-6 min-w-[800px]">
                   <MermaidChart chart={`sequenceDiagram
    participant C as المواطن
    participant S as النظام
    participant V as القطاع الخاص (شركة الاتصالات)

    C->>S: تقديم بلاغ مخصص (خدمة خاصة)
    Note over S: النظام يوجه البلاغ فوراً لمسارات القطاع الخاص
    S-->>V: ظهور البلاغ في لوحة تحكم الشركة
    V->>S: معالجة المشكلة وتحديث الحالة داخلياً
    S-->>C: إشعار للمواطن بإغلاق البلاغ وحل المشكلة`} />
                 </div>
               </div>
            </div>
          )}

          {activeTab === 'schema' && (
            <div className="bg-white rounded-[2rem] p-6 border border-slate-100 shadow-sm flex flex-col gap-12 overflow-x-auto min-h-[400px]">
               <div>
                 <h3 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-3">
                    <Database className="w-6 h-6 text-blue-500" /> مخطط الكيانات والعلاقات (ERD)
                 </h3>
                 <div className="bg-slate-50 rounded-3xl border border-slate-100 p-6 overflow-x-auto min-w-[800px]">
                   <MermaidChart chart={`erDiagram
    USERS ||--o{ REPORTS : "يقدم (مواطن) / يعالج (أخصائي)"
    DEPARTMENTS ||--o{ USERS : "يضم (موظفين)"
    DEPARTMENTS ||--o{ REPORTS : "يسند إليها"
    REPORTS ||--o| RATINGS : "له تقييم (مواطن)"
    REPORTS ||--o| PRIVATE_TICKETS : "يتحول إلى"
    DEPARTMENTS ||--o{ CONTRACTS : "يبرم عقداً"
    USERS ||--o{ CONTRACTS : "يدير (مقاول)"
    USERS ||--o{ REQUESTS : "يرسل (صحفي/لجنة)"
    DEPARTMENTS ||--o{ REQUESTS : "يستقبل"
    USERS ||--o{ AUDIT_LOGS : "يقوم بإجراء"
    USERS ||--o{ NOTIFICATIONS : "يتلقى"

    USERS {
        string uid PK
        string role
        string departmentId FK
    }
    DEPARTMENTS {
        string id PK
        string name
        string category
        string parentDepartmentId
    }
    REPORTS {
        string id PK
        string citizenUid FK
        string status
        string assignedDeptId FK
        string assignedSpecialistUid FK
    }
    RATINGS {
        string reportId FK
        int stars
        string comment
    }
    NOTIFICATIONS {
        string id PK
        string userId FK
        string type
        boolean isRead
    }
    AUDIT_LOGS {
        string id PK
        string userId FK
        string action
        string targetId
    }
    REQUESTS {
        string id PK
        string fromUserId FK
        string toDepartmentId FK
        string status
    }
    CONTRACTS {
        string id PK
        string contractorCompanyId FK
        number budget
        string status
    }
    PRIVATE_TICKETS {
        string id PK
        string reportId FK
        string companyType
        string status
    }`} />
                 </div>
               </div>

               <div>
                 <h3 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-3">
                    <Database className="w-6 h-6 text-blue-500" /> تفاصيل إضافية عن البيانات
                 </h3>
                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-slate-50 rounded-3xl p-6 border border-slate-100">
                        <h4 className="font-bold text-slate-800 mb-4">أنواع البيانات الموصى بها</h4>
                        <ul className="space-y-4 text-sm text-slate-600">
                            <li><strong className="text-slate-800">الموقع الجغرافي (locationGeo):</strong> GeoPoint لحفظ الإحداثيات للاستعلام المكاني.</li>
                            <li><strong className="text-slate-800">الملفات (audioUrl, imageUrl):</strong> روابط (URL) للملفات المرفوعة على التخزين السحابي (Cloud Storage).</li>
                            <li><strong className="text-slate-800">حالة البلاغ (status):</strong> قائمة محددة (جديد، قيد المعالجة، تحت التنفيذ، منتهي...إلخ).</li>
                            <li><strong className="text-slate-800">الأدوار (role):</strong> تحدد صلاحيات المستخدمين (مواطن، أخصائي، مشغل، صحفي...إلخ).</li>
                        </ul>
                    </div>
                    <div className="bg-slate-50 rounded-3xl p-6 border border-slate-100">
                        <h4 className="font-bold text-slate-800 mb-4">اعتبارات إضافية للمشروع</h4>
                         <ul className="space-y-4 text-sm text-slate-600">
                            <li><strong className="text-slate-800">الفصل بين البيانات:</strong> فصل تفاصيل المواطن عن الهيكل الأساسي للحد من الازدحام.</li>
                            <li><strong className="text-slate-800">الإشعارات:</strong> يجب دعم الإشعارات اللحظية عبر الجوال والمتصفح.</li>
                            <li><strong className="text-slate-800">بلاغات مجهولة:</strong> دعم البلاغات غير المسجلة (مثل النازحين) بآلية خاصة للرقم التعريفي.</li>
                            <li><strong className="text-slate-800">فهرسة البيانات (Indexing):</strong> على الحقول الأكثر استخداماً بالبحث مثل status و departmentId.</li>
                        </ul>
                    </div>
                 </div>
               </div>
            </div>
          )}

          {activeTab === 'logs' && (
             <div className="flex flex-col items-center justify-center py-20 text-slate-400 bg-slate-50/50 rounded-3xl border-2 border-dashed border-slate-200">
              <Activity size={48} className="mb-4 opacity-20 text-slate-800" />
              <p className="text-lg font-black text-slate-700">سجل الاستجابة الشامل (Audit Log)</p>
              <p className="text-sm font-bold mt-2">توثيق محكم لحركات إعادة التوجيه وتعديل الحسابات.</p>
            </div>
          )}
        </div>
      </div>

      {reroutingReportId && (
        <div className="fixed inset-0 z-50 flex justify-center items-center p-4">
           {/* Backdrop */}
           <motion.div 
              initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
              onClick={() => setReroutingReportId(null)}
           />
           {/* Modal */}
           <motion.div
              initial={{scale:0.95, opacity:0, y:20}} animate={{scale:1, opacity:1, y:0}} exit={{scale:0.95, opacity:0, y:20}}
              className="relative bg-white rounded-[2rem] p-8 w-full max-w-lg shadow-2xl border border-slate-100"
           >
                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-4">
                   <ArrowLeftRight className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-black text-slate-900 mb-2">توجيه إداري إلزامي</h3>
                <p className="text-xs font-bold text-slate-500 mb-6">سجل التوجيه ليتم إحالته للقطاع المعني فوراً.</p>

                <div className="space-y-4 font-bold text-sm">
                    <div>
                        <label className="block text-[10px] uppercase font-black text-slate-400 mb-1 pl-1">اختر الجهة المستهدفة</label>
                        <select 
                            value={rerouteDepartment}
                            onChange={(e) => setRerouteDepartment(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                        >
                            <option value="">-- اختر --</option>
                            <option value="النظافة والمخلفات">النظافة والمخلفات</option>
                            <option value="الإنارة والكهرباء">الإنارة والكهرباء</option>
                            <option value="الطرق والجسور">الطرق والجسور</option>
                            <option value="الصرف الصحي والمياه">الصرف الصحي والمياه</option>
                            <option value="التشجير والمرافق">التشجير والمرافق</option>
                            <option value="الشرطة والمطافئ">الشرطة والمطافئ</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-[10px] uppercase font-black text-slate-400 mb-1 pl-1">سبب التوجيه أو تعليماتك</label>
                        <textarea
                            value={rerouteReason}
                            onChange={(e) => setRerouteReason(e.target.value)}
                            placeholder="مثال: تعاملوا معها فوراً حسب توجيهات الأمانة..."
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 resize-none min-h-[100px]"
                        ></textarea>
                    </div>
                </div>

                <div className="flex gap-3 mt-8">
                    <button onClick={() => handleReroute(reroutingReportId)} className="flex-1 bg-blue-600 text-white rounded-xl py-3 text-sm font-black shadow-lg shadow-blue-600/20 hover:bg-blue-700 transition">
                        اعتماد وتوجيه
                    </button>
                    <button onClick={() => setReroutingReportId(null)} className="flex-1 bg-slate-100 text-slate-700 rounded-xl py-3 text-sm font-black hover:bg-slate-200 transition">
                        إلغاء
                    </button>
                </div>
           </motion.div>
        </div>
      )}

      {isAddUserModalOpen && (
        <div className="fixed inset-0 z-50 flex justify-center items-center p-4">
           {/* Backdrop */}
           <motion.div 
              initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
              onClick={() => setIsAddUserModalOpen(false)}
           />
           {/* Modal */}
           <motion.div
              initial={{scale:0.95, opacity:0, y:20}} animate={{scale:1, opacity:1, y:0}} exit={{scale:0.95, opacity:0, y:20}}
              className="relative bg-white rounded-[2rem] p-8 w-full max-w-lg shadow-2xl border border-slate-100"
           >
                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-4">
                   <Plus className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-black text-slate-900 mb-2">إضافة حساب موظف جديد</h3>
                <p className="text-xs font-bold text-slate-500 mb-6">قم بإدخال بيانات الموظف والصلاحيات ليتمكن من الدخول للمنظومة.</p>

                <form onSubmit={handleAddUser} className="space-y-4 font-bold text-sm">
                    <div>
                        <label className="block text-[10px] uppercase font-black text-slate-400 mb-1 pl-1">الاسم الكامل</label>
                        <input
                            required
                            value={newUserForm.displayName}
                            onChange={(e) => setNewUserForm({...newUserForm, displayName: e.target.value})}
                            placeholder="مثال: صالح عبدالله"
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                        />
                    </div>
                    <div>
                        <label className="block text-[10px] uppercase font-black text-slate-400 mb-1 pl-1">البريد الإلكتروني</label>
                        <input
                            required
                            type="email"
                            value={newUserForm.email}
                            onChange={(e) => setNewUserForm({...newUserForm, email: e.target.value})}
                            placeholder="employee@city.gov.sa"
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 text-left dir-ltr"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-[10px] uppercase font-black text-slate-400 mb-1 pl-1">الدور البرمجي</label>
                            <select 
                                value={newUserForm.role}
                                onChange={(e) => setNewUserForm({...newUserForm, role: e.target.value})}
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                            >
                                <option value="official">مسؤول جهة (Official)</option>
                                <option value="operator">موظف استجابة (Operator)</option>
                                <option value="manager">مدير قسم (Manager)</option>
                                <option value="council">مجلس بلدي (Council)</option>
                                <option value="specialist">مهندس/أخصائي (Specialist)</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-[10px] uppercase font-black text-slate-400 mb-1 pl-1">الجهة التابع لها</label>
                            <select 
                                value={newUserForm.department}
                                onChange={(e) => setNewUserForm({...newUserForm, department: e.target.value})}
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                            >
                                <option value="">بدون جهة (عام)</option>
                                <option value="النظافة والمخلفات">النظافة والمخلفات</option>
                                <option value="الإنارة والكهرباء">الإنارة والكهرباء</option>
                                <option value="الطرق والجسور">الطرق والجسور</option>
                                <option value="الصرف الصحي والمياه">الصرف الصحي والمياه</option>
                                <option value="الشرطة والمطافئ">الشرطة والمطافئ</option>
                            </select>
                        </div>
                    </div>

                    <div className="flex gap-3 mt-8 pt-4">
                        <button type="submit" className="flex-1 bg-blue-600 text-white rounded-xl py-3 text-sm font-black shadow-lg shadow-blue-600/20 hover:bg-blue-700 transition">
                            أضف الحساب
                        </button>
                        <button type="button" onClick={() => setIsAddUserModalOpen(false)} className="flex-1 bg-slate-100 text-slate-700 rounded-xl py-3 text-sm font-black hover:bg-slate-200 transition">
                            إلغاء
                        </button>
                    </div>
                </form>
           </motion.div>
        </div>
      )}

    </div>
  );
};

const StatCard: React.FC<{ icon: React.ReactNode, label: string, value: string, color: string }> = ({ icon, label, value, color }) => (
  <div className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm flex items-center gap-4 relative overflow-hidden group">
    <div className={`absolute top-0 right-0 w-2 h-full bg-${color}-500/20 group-hover:bg-${color}-500 transition-colors`} />
    <div className={`w-14 h-14 bg-${color}-50 rounded-2xl flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform shrink-0`}>
      {icon}
    </div>
    <div className="min-w-0">
      <p className="text-[10px] font-black text-slate-400 uppercase mb-1 truncate">{label}</p>
      <p className="text-2xl font-black text-slate-900 truncate">{value}</p>
    </div>
  </div>
);

