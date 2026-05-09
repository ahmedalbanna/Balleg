import { useRole } from "../../core/context/RoleContext";
import { 
  User, 
  Home, 
  MapPin, 
  ClipboardList, 
  Info,
  Settings,
  HelpCircle,
  Bell,
  HeartHandshake,
  ShieldCheck,
  Package
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "../../core/utils/cn";

export function DisplacedSidebar() {
  const { currentRole } = useRole();
  const location = useLocation();

  if (!currentRole) return null;

  const menuItems = [
    { name: 'الاستقبال', icon: <Home className="w-5 h-5" />, path: '/' },
    { name: 'خريطة مراكز الإيواء', icon: <MapPin className="w-5 h-5" />, path: '/displaced/shelters' },
    { name: 'متابعة الاحتياجات', icon: <ClipboardList className="w-5 h-5" />, path: '/displaced/needs' },
    { name: 'طلبات المساعدات', icon: <Package className="w-5 h-5" />, path: '/displaced/aid' },
    { name: 'الإرشادات الصحية', icon: <Info className="w-5 h-5" />, path: '/displaced/health' },
    { name: 'حسابي الشخصي', icon: <User className="w-5 h-5" />, path: '/displaced/profile' },
    { name: 'التنبيهات العاجلة', icon: <Bell className="w-5 h-5" />, path: '/displaced/alerts' },
    { name: 'مركز المساعدة', icon: <HelpCircle className="w-5 h-5" />, path: '/displaced/help' },
    { name: 'إعدادات الحساب', icon: <Settings className="w-5 h-5" />, path: '/displaced/settings' },
  ];

  return (
    <aside className="w-72 bg-white border-l border-slate-100 hidden md:flex flex-col h-[calc(100vh-80px)] sticky top-20 z-40 shrink-0">
      <div className="flex-1 overflow-y-auto custom-scrollbar py-6 px-4">
        <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 px-3 italic">الخدمات الإنسانية</h3>
        
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
                    ? "bg-amber-50 text-amber-900 font-bold" 
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
        <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100 italic transition-all hover:bg-amber-100/50">
            <div className="flex items-center gap-2 font-bold text-xs mb-2 text-amber-800">
                <ShieldCheck size={14} className="text-amber-500" />
                <span>نظام حماية النازحين</span>
            </div>
            <p className="text-[10px] text-slate-500 leading-relaxed font-bold">
                بياناتك وطلباتك تخضع لسياسة خصوصية مشددة لضمان أمنك وكرامتك.
            </p>
        </div>
      </div>
    </aside>
  );
}
