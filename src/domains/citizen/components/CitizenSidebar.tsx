import { useRole } from "../../core/context/RoleContext";
import { 
  User, 
  Home, 
  PlusSquare, 
  ClipboardList, 
  MapPin,
  Settings,
  HelpCircle,
  Bell,
  Star,
  Info
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "../../core/utils/cn";

export function CitizenSidebar() {
  const { currentRole } = useRole();
  const location = useLocation();

  if (!currentRole) return null;

  const menuItems = [
    { name: 'الرئيسية', icon: <Home className="w-5 h-5" />, path: '/citizen' },
    { name: 'تقديم بلاغ جديد', icon: <PlusSquare className="w-5 h-5" />, path: '/citizen/new' },
    { name: 'قائمة بلاغاتي', icon: <ClipboardList className="w-5 h-5" />, path: '/citizen/reports/my' },
    { name: 'خريطة المنطقة', icon: <MapPin className="w-5 h-5" />, path: '/citizen/map' },
    { name: 'الملف الشخصي', icon: <User className="w-5 h-5" />, path: '/citizen/profile' },
    { name: 'التنبيهات', icon: <Bell className="w-5 h-5" />, path: '/citizen/notifications' },
    { name: 'مركز المساعدة', icon: <HelpCircle className="w-5 h-5" />, path: '/citizen/support' },
    { name: 'عن المنصة', icon: <Info className="w-5 h-5" />, path: '/citizen/about' },
    { name: 'إعدادات الحساب', icon: <Settings className="w-5 h-5" />, path: '/citizen/settings' },
  ];

  return (
    <aside className="w-72 bg-white border-l border-slate-100 hidden md:flex flex-col h-[calc(100vh-80px)] sticky top-20 z-40 shrink-0">
      <div className="flex-1 overflow-y-auto custom-scrollbar py-6 px-4">
        <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 px-3 italic">الخدمات المتاحة</h3>
        
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
                    ? "bg-emerald-50 text-emerald-900 font-bold" 
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
        <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100">
            <div className="flex items-center gap-2 font-bold text-xs mb-2 text-amber-800">
                <Star size={14} className="text-amber-500 fill-amber-500" />
                <span>المواطن الفاعل</span>
            </div>
            <p className="text-[10px] text-slate-500 leading-relaxed font-bold">
                مساهمتك في الإبلاغ عن المشاكل تساعد في تحسين مجتمعك. شكراً لمبادرتك.
            </p>
        </div>
      </div>
    </aside>
  );
}
