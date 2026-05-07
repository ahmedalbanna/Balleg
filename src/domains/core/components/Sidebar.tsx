import { useRole } from "../context/RoleContext";
import { User, Settings, LayoutDashboard, FileText, Bell, CheckSquare, Activity, MessageSquare, MapPin } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "../utils/cn";

export function Sidebar() {
  const { currentRole } = useRole();
  const location = useLocation();

  if (!currentRole) return null;

  const getMenuItems = () => {
    if (currentRole.slug === 'citizen') {
      return [
        { name: 'الرئيسية', icon: <LayoutDashboard className="w-5 h-5" />, path: '/' },
        { name: 'بلاغاتي', icon: <FileText className="w-5 h-5" />, path: '/reports/my' },
        { name: 'تقديم بلاغ', icon: <Activity className="w-5 h-5" />, path: '/new' },
        { name: 'تتبع بلاغ', icon: <MapPin className="w-5 h-5" />, path: '/track' },
        { name: 'الملف الشخصي', icon: <User className="w-5 h-5" />, path: '/profile' },
      ];
    }
    return [
      { name: 'لوحة القيادة', icon: <LayoutDashboard className="w-5 h-5" />, path: '/' },
      { name: 'التقارير والبلاغات', icon: <FileText className="w-5 h-5" />, path: '/reports' },
      { name: 'المهمات الموكلة', icon: <CheckSquare className="w-5 h-5" />, path: '/tasks' },
      { name: 'الخريطة التفاعلية', icon: <MapPin className="w-5 h-5" />, path: '/map' },
      { name: 'الإشعارات التنبيهية', icon: <Bell className="w-5 h-5" />, path: '/notifications' },
      { name: 'سجل النشاطات', icon: <Activity className="w-5 h-5" />, path: '/activities' },
      { name: 'الرسائل الفورية', icon: <MessageSquare className="w-5 h-5" />, path: '/messages' },
      { name: 'الملف الشخصي', icon: <User className="w-5 h-5" />, path: '/profile' },
      { name: 'الإعدادات العامة', icon: <Settings className="w-5 h-5" />, path: '/settings' },
    ];
  };

  const menuItems = getMenuItems();

  return (
    <aside className="w-72 bg-white border-l border-slate-100 hidden md:flex flex-col h-[calc(100vh-80px)] sticky top-20 z-40 shrink-0">
      <div className="flex-1 overflow-y-auto custom-scrollbar py-6 px-4">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 px-3">القائمة الرئيسية</h3>
        
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
                    ? "bg-slate-50 text-slate-900 font-bold" 
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

      <div className="mt-auto p-6 border-t border-slate-100 space-y-4 bg-white">
        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
            <div className="flex items-center gap-2 text-slate-800 font-bold text-sm mb-1">
                <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: currentRole.themeColor }} />
                <span>عن {currentRole.name}</span>
            </div>
            <p className="text-[11px] text-slate-500 leading-relaxed">
                {currentRole.description}
            </p>
        </div>
      </div>
    </aside>
  );
}
