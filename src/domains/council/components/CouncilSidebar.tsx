import { useRole } from "../../core/context/RoleContext";
import { 
  User, 
  Home, 
  FileText, 
  BarChart3, 
  MapPin,
  Settings,
  HelpCircle,
  Bell,
  Landmark,
  ShieldCheck,
  Briefcase,
  History
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "../../core/utils/cn";

export function CouncilSidebar() {
  const { currentRole } = useRole();
  const location = useLocation();

  if (!currentRole) return null;

  const menuItems = [
    { name: 'غرفة العمليات', icon: <Home className="w-5 h-5" />, path: '/' },
    { name: 'البلاغات والتحقيقات', icon: <FileText className="w-5 h-5" />, path: '/council/reports' },
    { name: 'الرقابة الميدانية', icon: <MapPin className="w-5 h-5" />, path: '/council/monitoring' },
    { name: 'إحصائيات الإنجاز', icon: <BarChart3 className="w-5 h-5" />, path: '/council/stats' },
    { name: 'إدارة المشاريع', icon: <Briefcase className="w-5 h-5" />, path: '/council/projects' },
    { name: 'الأرشيف التاريخي', icon: <History className="w-5 h-5" />, path: '/council/archive' },
    { name: 'الملف المهني', icon: <User className="w-5 h-5" />, path: '/council/profile' },
    { name: 'تنبيهات النظام', icon: <Bell className="w-5 h-5" />, path: '/council/alerts' },
    { name: 'مركز الدعم', icon: <HelpCircle className="w-5 h-5" />, path: '/council/support' },
    { name: 'الإعدادات التنظيمية', icon: <Settings className="w-5 h-5" />, path: '/council/settings' },
  ];

  return (
    <aside className="w-72 bg-white border-l border-slate-100 hidden md:flex flex-col h-[calc(100vh-80px)] sticky top-20 z-40 shrink-0">
      <div className="flex-1 overflow-y-auto custom-scrollbar py-6 px-4">
        <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 px-3 italic">الخدمات الرقابية والبلدية</h3>
        
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
                    ? "bg-slate-100 text-slate-900 font-bold" 
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
        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 italic transition-all hover:bg-slate-100/50">
            <div className="flex items-center gap-2 font-bold text-xs mb-2 text-slate-800">
                <ShieldCheck size={14} className="text-slate-600" />
                <span>بروتوكول الرقابة الرسمي</span>
            </div>
            <p className="text-[10px] text-slate-500 leading-relaxed font-bold">
                جميع القرارات والمتابعات الميدانية مسجلة وتخضع للرقابة الدورية لضمان الشفافية.
            </p>
        </div>
      </div>
    </aside>
  );
}
