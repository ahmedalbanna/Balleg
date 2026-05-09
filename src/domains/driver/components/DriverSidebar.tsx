import { useRole } from "../../core/context/RoleContext";
import { 
  User, 
  Home, 
  Map, 
  ClipboardList, 
  Gauge,
  Settings,
  HelpCircle,
  Bell,
  Truck,
  ShieldCheck,
  Fuel,
  Navigation
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "../../core/utils/cn";

export function DriverSidebar() {
  const { currentRole } = useRole();
  const location = useLocation();

  if (!currentRole) return null;

  const menuItems = [
    { name: 'اللوحة الرئيسية', icon: <Home className="w-5 h-5" />, path: '/' },
    { name: 'خرائط المسارات', icon: <Navigation className="w-5 h-5" />, path: '/driver/routes' },
    { name: 'سجل الرحلات', icon: <ClipboardList className="w-5 h-5" />, path: '/driver/trips' },
    { name: 'استهلاك الوقود', icon: <Fuel className="w-5 h-5" />, path: '/driver/fuel' },
    { name: 'مؤشرات الأداء', icon: <Gauge className="w-5 h-5" />, path: '/driver/kpi' },
    { name: 'الملف الشخصي', icon: <User className="w-5 h-5" />, path: '/driver/profile' },
    { name: 'التنبيهات المرورية', icon: <Bell className="w-5 h-5" />, path: '/driver/traffic' },
    { name: 'المساعدة الفنية', icon: <HelpCircle className="w-5 h-5" />, path: '/driver/support' },
    { name: 'إعدادات الحساب', icon: <Settings className="w-5 h-5" />, path: '/driver/settings' },
  ];

  return (
    <aside className="w-72 bg-white border-l border-slate-100 hidden md:flex flex-col h-[calc(100vh-80px)] sticky top-20 z-40 shrink-0">
      <div className="flex-1 overflow-y-auto custom-scrollbar py-6 px-4">
        <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 px-3 italic">النقل والخدمات اللوجستية</h3>
        
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
                <ShieldCheck size={14} className="text-teal-500" />
                <span>بروتوكول سلامة السائق</span>
            </div>
            <p className="text-[10px] text-slate-500 leading-relaxed font-bold">
                تأكد من الالتزام بكافة تعليمات السلامة وفترات الراحة الإلزامية أثناء القيادة.
            </p>
        </div>
      </div>
    </aside>
  );
}
