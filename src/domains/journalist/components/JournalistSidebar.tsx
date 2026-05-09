import { useRole } from "../../core/context/RoleContext";
import { 
  User, 
  Home, 
  Newspaper, 
  MapPin, 
  BarChart3,
  Settings,
  HelpCircle,
  Bell,
  Mic,
  ShieldCheck,
  History,
  FileText,
  Camera
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "../../core/utils/cn";

export function JournalistSidebar() {
  const { currentRole } = useRole();
  const location = useLocation();

  if (!currentRole) return null;

  const menuItems = [
    { name: 'غرفة الأخبار', icon: <Home className="w-5 h-5" />, path: '/' },
    { icon: <MapPin className="w-5 h-5" />, name: 'مناطق التغطية', path: '/journalist/coverage-areas' },
    { icon: <FileText className="w-5 h-5" />, name: 'المسودات والمقالات', path: '/journalist/articles' },
    { icon: <Mic className="w-5 h-5" />, name: 'المقابلات الصوتية', path: '/journalist/interviews' },
    { icon: <Camera className="w-5 h-5" />, name: 'المعرض المرئي', path: '/journalist/visual-gallery' },
    { icon: <BarChart3 className="w-5 h-5" />, name: 'إحصائيات القراء', path: '/journalist/reader-stats' },
    { icon: <History className="w-5 h-5" />, name: 'الأرشيف الصحفي', path: '/journalist/archive' },
    { icon: <User className="w-5 h-5" />, name: 'الملف المهني', path: '/journalist/profile' },
    { icon: <Bell className="w-5 h-5" />, name: 'عواجل الصحافة', path: '/journalist/breaking-news' },
    { icon: <Settings className="w-5 h-5" />, name: 'الإعدادات', path: '/journalist/settings' },
  ];

  return (
    <aside className="w-72 bg-white border-l border-slate-100 hidden md:flex flex-col h-[calc(100vh-80px)] sticky top-20 z-40 shrink-0">
      <div className="flex-1 overflow-y-auto custom-scrollbar py-6 px-4">
        <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 px-3 italic">العمل الصحفي والتحقيقي</h3>
        
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
                    ? "bg-rose-50 text-rose-900 font-bold" 
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
        <div className="p-4 bg-rose-50 rounded-2xl border border-rose-100 italic transition-all hover:bg-rose-100/50">
            <div className="flex items-center gap-2 font-bold text-xs mb-2 text-rose-800">
                <ShieldCheck size={14} className="text-rose-600" />
                <span>ميثاق الشرف الصحفي</span>
            </div>
            <p className="text-[10px] text-slate-500 leading-relaxed font-bold">
                تحري الدقة والمصداقية ونقل الحقيقة بأمانة هو جوهر عملنا الصحفي في الميدان.
            </p>
        </div>
      </div>
    </aside>
  );
}
