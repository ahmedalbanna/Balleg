import { useRole } from "../../core/context/RoleContext";
import { 
  User, 
  LayoutDashboard, 
  FileSearch, 
  GraduationCap, 
  ClipboardList, 
  MapPin,
  BarChart3,
  BookOpen,
  Settings,
  ShieldCheck,
  Lightbulb,
  Cpu
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "../../core/utils/cn";

export function SpecialistSidebar() {
  const { currentRole } = useRole();
  const location = useLocation();

  if (!currentRole) return null;

  const menuItems = [
    { name: 'لوحة التحليلات', icon: <LayoutDashboard className="w-5 h-5" />, path: '/' },
    { name: 'تقارير فنية', icon: <FileSearch className="w-5 h-5" />, path: '/specialist/reports' },
    { name: 'دراسات الحالة', icon: <BookOpen className="w-5 h-5" />, path: '/specialist/cases' },
    { name: 'الخرائط الحرارية', icon: <MapPin className="w-5 h-5" />, path: '/specialist/heatmaps' },
    { name: 'إحصائيات القطاع', icon: <BarChart3 className="w-5 h-5" />, path: '/specialist/stats' },
    { name: 'المعارف والوثائق', icon: <GraduationCap className="w-5 h-5" />, path: '/specialist/archive' },
    { name: 'المهام المعلقة', icon: <ClipboardList className="w-5 h-5" />, path: '/specialist/tasks' },
    { name: 'تحليل الذكاء الاصطناعي', icon: <Cpu className="w-5 h-5" />, path: '/specialist/ai' },
    { name: 'الملف المهني', icon: <User className="w-5 h-5" />, path: '/specialist/profile' },
    { name: 'إعدادات الأدوات', icon: <Settings className="w-5 h-5" />, path: '/specialist/settings' },
  ];

  return (
    <aside className="w-72 bg-white border-l border-slate-100 hidden md:flex flex-col h-[calc(100vh-80px)] sticky top-20 z-40 shrink-0">
      <div className="flex-1 overflow-y-auto custom-scrollbar py-6 px-4">
        <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 px-3 italic">منصة الخبراء والمختصين</h3>
        
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
                    ? "bg-violet-50 text-violet-900 font-bold" 
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
        <div className="p-4 bg-violet-50/50 rounded-2xl border border-violet-100">
            <div className="flex items-center gap-2 font-bold text-xs mb-2 text-violet-800">
                <ShieldCheck size={14} className="text-violet-600" />
                <span>شهادة الاختصاص نشطة</span>
            </div>
            <p className="text-[10px] text-slate-500 leading-relaxed font-bold">
                تقاريرك الفنية تعتمد كمرجع أساسي لاتخاذ القرار. يرجى توخي الدقة العلمية.
            </p>
        </div>
      </div>
    </aside>
  );
}
