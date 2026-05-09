import { useRole } from "../../core/context/RoleContext";
import { 
  User, 
  Home, 
  TowerControl as Tower, 
  MapPin, 
  Activity,
  Settings,
  HelpCircle,
  Bell,
  Cpu,
  ShieldCheck,
  History,
  FileText,
  Zap,
  Globe
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "../../core/utils/cn";

export function TelecomSidebar() {
  const { currentRole } = useRole();
  const location = useLocation();

  if (!currentRole) return null;

  const menuItems = [
    { name: 'الرئيسية', icon: <Home className="w-5 h-5" />, path: '/' },
    { name: 'مركز العمليات', icon: <Activity className="w-5 h-5" />, path: '/telecom/operations' },
    { name: 'خارطة التغطية', icon: <MapPin className="w-5 h-5" />, path: '/telecom/coverage' },
    { name: 'إدارة المواقع والأبراج', icon: <Tower className="w-5 h-5" />, path: '/telecom/sites' },
    { name: 'مؤشرات الأداء (KPIs)', icon: <Activity className="w-5 h-5" />, path: '/telecom/kpis' },
    { name: 'إدارة الشبكة الأساسية', icon: <Cpu className="w-5 h-5" />, path: '/telecom/core' },
    { name: 'صيانة المحطات', icon: <Zap className="w-5 h-5" />, path: '/telecom/maintenance' },
    { name: 'سجل الأعطال والتذاكر', icon: <History className="w-5 h-5" />, path: '/telecom/faults' },
    { name: 'الربط الدولي والمحلي', icon: <Globe className="w-5 h-5" />, path: '/telecom/interconnect' },
    { name: 'تقارير السعة والنمو', icon: <FileText className="w-5 h-5" />, path: '/telecom/capacity' },
    { name: 'تنبيهات النظام', icon: <Bell className="w-5 h-5" />, path: '/telecom/alerts' },
    { name: 'الملف الفني', icon: <User className="w-5 h-5" />, path: '/telecom/profile' },
    { name: 'إعدادات المنصة', icon: <Settings className="w-5 h-5" />, path: '/telecom/settings' },
  ];

  return (
    <aside className="w-72 bg-white border-l border-slate-100 hidden md:flex flex-col h-[calc(100vh-80px)] sticky top-20 z-40 shrink-0">
      <div className="flex-1 overflow-y-auto custom-scrollbar py-6 px-4">
        <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 px-3 italic">هندسة الشبكات والاتصالات</h3>
        
        <div className="space-y-1">
          {menuItems.map((item, index) => {
             const isActive = location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path));
             return (
              <Link
                key={index}
                to={item.path}
                className={cn(
                  "flex items-center gap-3 px-3 py-3 rounded-xl transition-all font-medium text-sm group",
                  isActive 
                    ? "bg-blue-50 text-blue-900 font-bold" 
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                )}
                style={isActive ? {
                  color: currentRole.themeColor,
                  backgroundColor: `${currentRole.themeColor}10`
                } : {}}
              >
                <div style={isActive ? { color: currentRole.themeColor } : {}} className={cn(!isActive && "group-hover:text-slate-900 transition-colors")}>
                  {item.icon}
                </div>
                {item.name}
              </Link>
            )
          })}
        </div>
      </div>

      <div className="mt-auto p-6 border-t border-slate-100 bg-white">
        <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100 italic transition-all hover:bg-blue-100/50">
            <div className="flex items-center gap-2 font-bold text-xs mb-2 text-blue-800">
                <ShieldCheck size={14} className="text-blue-600" />
                <span>بروتوكول جودة الخدمة</span>
            </div>
            <p className="text-[10px] text-slate-500 leading-relaxed font-bold">
                ضمان استمرارية الخدمة وتطوير البنية التحتية للاتصالات هو العصب الحيوي للمجتمع.
            </p>
        </div>
      </div>
    </aside>
  );
}
