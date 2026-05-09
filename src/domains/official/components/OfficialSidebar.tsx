import { useRole } from "../../core/context/RoleContext";
import { 
  User, 
  LayoutDashboard, 
  FileCheck, 
  Layers, 
  ClipboardList, 
  MapPin,
  TrendingUp,
  History,
  FileText,
  BadgeAlert,
  Landmark
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "../../core/utils/cn";

export function OfficialSidebar() {
  const { currentRole } = useRole();
  const location = useLocation();

  if (!currentRole) return null;

  const menuItems = [
    { name: 'نظرة عامة', icon: <LayoutDashboard className="w-5 h-5" />, path: '/' },
    { name: 'اعتماد البلاغات', icon: <FileCheck className="w-5 h-5" />, path: '/official/approval' },
    { name: 'التعاميم الصادرة', icon: <ClipboardList className="w-5 h-5" />, path: '/official/circulars' },
    { name: 'إحصائيات الإنجاز', icon: <TrendingUp className="w-5 h-5" />, path: '/official/stats' },
    { name: 'خرائط النطاق', icon: <MapPin className="w-5 h-5" />, path: '/official/map' },
    { name: 'توزيع القطاعات', icon: <Layers className="w-5 h-5" />, path: '/official/sectors' },
    { name: 'الأرشيف الحكومي', icon: <History className="w-5 h-5" />, path: '/official/archive' },
    { name: 'تقارير الأداء', icon: <FileText className="w-5 h-5" />, path: '/official/performance' },
    { name: 'البلاغات العاجلة', icon: <BadgeAlert className="w-5 h-5" />, path: '/official/urgent' },
    { name: 'الملف الوظيفي', icon: <User className="w-5 h-5" />, path: '/profile' },
  ];

  return (
    <aside className="w-72 bg-white border-l border-slate-100 hidden md:flex flex-col h-[calc(100vh-80px)] sticky top-20 z-40 shrink-0">
      <div className="flex-1 overflow-y-auto custom-scrollbar py-6 px-4">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 px-3 italic">صلاحيات المسؤول الميداني</h3>
        
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

      <div className="mt-auto p-6 border-t border-slate-100 bg-white">
        <div className="p-4 bg-emerald-900/5 rounded-2xl border border-emerald-100">
            <div className="flex items-center gap-2 font-bold text-xs mb-2 text-emerald-800">
                <Landmark size={14} className="text-emerald-600" />
                <span>الارتباط الرسمي</span>
            </div>
            <p className="text-[10px] text-slate-500 leading-relaxed font-medium">
                بصفتك مسؤولاً رسمياً، قراراتك تخضع للمتابعة الإدارية المباشرة. التزم بالتعاميم المنظمة.
            </p>
        </div>
      </div>
    </aside>
  );
}
