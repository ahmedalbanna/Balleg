import { useRole } from "../../core/context/RoleContext";
import { 
  User, 
  Home, 
  HeartHandshake, 
  MapPin, 
  BarChart3,
  Settings,
  Bell,
  Stethoscope,
  ShieldCheck,
  History,
  Tent,
  ClipboardList,
  Activity
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "../../core/utils/cn";

export function HumanitarianSidebar() {
  const { currentRole } = useRole();
  const location = useLocation();

  if (!currentRole) return null;

  const menuItems = [
    { name: 'لوحة التحكم', icon: <Activity className="w-5 h-5" />, path: '/' },
    { icon: <Tent className="w-5 h-5" />, name: 'مراكز الإيواء', path: '/humanitarian/shelters' },
    { icon: <ClipboardList className="w-5 h-5" />, name: 'المسح الميداني', path: '/humanitarian/field-survey' },
    { icon: <HeartHandshake className="w-5 h-5" />, name: 'الحالات الإنسانية', path: '/humanitarian/cases' },
    { icon: <Stethoscope className="w-5 h-5" />, name: 'الدعم الطبي', path: '/humanitarian/medical' },
    { icon: <BarChart3 className="w-5 h-5" />, name: 'إحصائيات الأثر', path: '/humanitarian/impact' },
    { icon: <History className="w-5 h-5" />, name: 'سجل المساعدات', path: '/humanitarian/aid-log' },
    { icon: <User className="w-5 h-5" />, name: 'حساب المنقذ', path: '/humanitarian/profile' },
    { icon: <Bell className="w-5 h-5" />, name: 'البلاغات النشطة', path: '/humanitarian/active-reports' },
    { icon: <Settings className="w-5 h-5" />, name: 'الإعدادات', path: '/humanitarian/settings' },
  ];

  return (
    <aside className="w-72 bg-white border-l border-slate-100 hidden md:flex flex-col h-[calc(100vh-80px)] sticky top-20 z-40 shrink-0">
      <div className="flex-1 overflow-y-auto custom-scrollbar py-6 px-4">
        <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 px-3 italic">العمل الإغاثي والتنموي</h3>
        
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
                    ? "bg-teal-50 text-teal-900 font-bold" 
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
        <div className="p-4 bg-teal-50 rounded-2xl border border-teal-100 italic transition-all hover:bg-teal-100/50">
            <div className="flex items-center gap-2 font-bold text-xs mb-2 text-teal-800">
                <ShieldCheck size={14} className="text-teal-600" />
                <span>مواثيق العمل الإنساني</span>
            </div>
            <p className="text-[10px] text-slate-500 leading-relaxed font-bold">
                نلتزم بالحياد والاستقلالية في تقديم المساعدات لضمان وصولها لمن يستحقها بالفعل.
            </p>
        </div>
      </div>
    </aside>
  );
}
