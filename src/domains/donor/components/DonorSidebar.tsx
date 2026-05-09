import { useRole } from "../../core/context/RoleContext";
import { 
  User, 
  Home, 
  Gift, 
  Heart, 
  BarChart3,
  Settings,
  HelpCircle,
  Bell,
  HandHelping,
  ShieldCheck,
  TrendingUp,
  FileText,
  Users
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "../../core/utils/cn";

export function DonorSidebar() {
  const { currentRole } = useRole();
  const location = useLocation();

  if (!currentRole) return null;

  const menuItems = [
    { name: 'لوحة التحكم', icon: <Home className="w-5 h-5" />, path: '/' },
    { name: 'مشاريع العطاء', icon: <Gift className="w-5 h-5" />, path: '/donor/projects' },
    { name: 'سجل التبرعات', icon: <Heart className="w-5 h-5" />, path: '/donor/donations' },
    { name: 'تقارير الأثر', icon: <BarChart3 className="w-5 h-5" />, path: '/donor/impact' },
    { name: 'فرص التطوع', icon: <HandHelping className="w-5 h-5" />, path: '/donor/volunteer' },
    { name: 'الشركاء', icon: <Users className="w-5 h-5" />, path: '/donor/partners' },
    { name: 'الملف الشخصي', icon: <User className="w-5 h-5" />, path: '/donor/profile' },
    { name: 'الإشعارات', icon: <Bell className="w-5 h-5" />, path: '/donor/alerts' },
    { name: 'مركز المساعدة', icon: <HelpCircle className="w-5 h-5" />, path: '/donor/support' },
    { name: 'الإعدادات', icon: <Settings className="w-5 h-5" />, path: '/donor/settings' },
  ];

  return (
    <aside className="w-72 bg-white border-l border-slate-100 hidden md:flex flex-col h-[calc(100vh-80px)] sticky top-20 z-40 shrink-0">
      <div className="flex-1 overflow-y-auto custom-scrollbar py-6 px-4">
        <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 px-3 italic">منصة العمل الميداني المستدام</h3>
        
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
        <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100 italic transition-all hover:bg-emerald-100/50">
            <div className="flex items-center gap-2 font-bold text-xs mb-2 text-emerald-800">
                <ShieldCheck size={14} className="text-emerald-600" />
                <span>الشفافية والموثوقية</span>
            </div>
            <p className="text-[10px] text-slate-500 leading-relaxed font-bold">
                جميع تبرعاتك موثقة وتصل لمستحقيها بضمانة الرقابة المجتمعية والتقارير الميدانية.
            </p>
        </div>
      </div>
    </aside>
  );
}
