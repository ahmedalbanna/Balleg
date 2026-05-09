import { useRole } from "../../core/context/RoleContext";
import { 
  User, 
  Home, 
  Users, 
  MapPin, 
  ClipboardList,
  Settings,
  HelpCircle,
  Bell,
  Scale,
  ShieldCheck,
  History,
  FileText,
  Building2,
  Calendar
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "../../core/utils/cn";

export function NeighborhoodSidebar() {
  const { currentRole } = useRole();
  const location = useLocation();

  if (!currentRole) return null;

  const menuItems = [
    { name: 'الرئيسية', icon: <Home className="w-5 h-5" />, path: '/' },
    { name: 'مجلس الحي', icon: <Users className="w-5 h-5" />, path: '/neighborhood/council' },
    { name: 'خارطة المربعات', icon: <MapPin className="w-5 h-5" />, path: '/neighborhood/districts' },
    { name: 'سجل السكان', icon: <Users className="w-5 h-5" />, path: '/neighborhood/residents' },
    { name: 'المباني والمنشآت', icon: <Building2 className="w-5 h-5" />, path: '/neighborhood/buildings' },
    { name: 'إحصائيات اجتماعية', icon: <FileText className="w-5 h-5" />, path: '/neighborhood/social-stats' },
    { name: 'بلاغات الأهالي', icon: <ClipboardList className="w-5 h-5" />, path: '/neighborhood/resident-reports' },
    { name: 'حل النزاعات', icon: <Scale className="w-5 h-5" />, path: '/neighborhood/conflict-resolution' },
    { name: 'الأنشطة والفعاليات', icon: <Calendar className="w-5 h-5" />, path: '/neighborhood/events' },
    { name: 'الأرشيف الإداري', icon: <History className="w-5 h-5" />, path: '/neighborhood/archive' },
    { name: 'الملف الشخصي', icon: <User className="w-5 h-5" />, path: '/neighborhood/profile' },
    { name: 'التنبيهات العاجلة', icon: <Bell className="w-5 h-5" />, path: '/neighborhood/alerts' },
    { name: 'الإعدادات', icon: <Settings className="w-5 h-5" />, path: '/neighborhood/settings' },
  ];

  return (
    <aside className="w-72 bg-white border-l border-slate-100 hidden md:flex flex-col h-[calc(100vh-80px)] sticky top-20 z-40 shrink-0">
      <div className="flex-1 overflow-y-auto custom-scrollbar py-6 px-4">
        <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 px-3 italic">الشؤون الاجتماعية والمجتمعية</h3>
        
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
                    ? "bg-green-50 text-green-900 font-bold" 
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
        <div className="p-4 bg-green-50 rounded-2xl border border-green-100 italic transition-all hover:bg-green-100/50">
            <div className="flex items-center gap-2 font-bold text-xs mb-2 text-green-800">
                <ShieldCheck size={14} className="text-green-600" />
                <span>ميثاق الجوار الحسن</span>
            </div>
            <p className="text-[10px] text-slate-500 leading-relaxed font-bold">
                تعزيز الترابط الاجتماعي وخدمة سكان الحي بأمانة وشفافية هي مسؤوليتنا الأولى.
            </p>
        </div>
      </div>
    </aside>
  );
}
