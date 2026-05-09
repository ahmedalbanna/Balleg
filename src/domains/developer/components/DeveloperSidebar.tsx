import { useRole } from "../../core/context/RoleContext";
import { 
  User, 
  Home, 
  Terminal, 
  Cpu, 
  Database,
  Settings,
  HelpCircle,
  Bell,
  Code2,
  ShieldCheck,
  Zap,
  Activity,
  Layers
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "../../core/utils/cn";

export function DeveloperSidebar() {
  const { currentRole } = useRole();
  const location = useLocation();

  if (!currentRole) return null;

  const menuItems = [
    { name: 'منصة التحكم', icon: <Home className="w-5 h-5" />, path: '/' },
    { name: 'الأدوات الطرفية', icon: <Terminal className="w-5 h-5" />, path: '/developer/edge-tools' },
    { name: 'بنية الخدمات', icon: <Cpu className="w-5 h-5" />, path: '/developer/architecture' },
    { name: 'قواعد البيانات', icon: <Database className="w-5 h-5" />, path: '/developer/databases' },
    { name: 'مراقبة الأداء', icon: <Activity className="w-5 h-5" />, path: '/developer/performance' },
    { name: 'إدارة الطبقات', icon: <Layers className="w-5 h-5" />, path: '/developer/layers' },
    { name: 'الملف التقني', icon: <User className="w-5 h-5" />, path: '/developer/profile' },
    { name: 'تنبيهات النظام', icon: <Bell className="w-5 h-5" />, path: '/developer/alerts' },
    { name: 'مركز المطورين', icon: <HelpCircle className="w-5 h-5" />, path: '/developer/center' },
    { name: 'إعدادات المنصة', icon: <Settings className="w-5 h-5" />, path: '/developer/settings' },
  ];

  return (
    <aside className="w-72 bg-white border-l border-slate-100 hidden md:flex flex-col h-[calc(100vh-80px)] sticky top-20 z-40 shrink-0">
      <div className="flex-1 overflow-y-auto custom-scrollbar py-6 px-4">
        <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 px-3 italic">تطوير المنظومات التقنية</h3>
        
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
                    ? "bg-indigo-50 text-indigo-900 font-bold" 
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
        <div className="p-4 bg-indigo-50 rounded-2xl border border-indigo-100 italic transition-all hover:bg-indigo-100/50">
            <div className="flex items-center gap-2 font-bold text-xs mb-2 text-indigo-800">
                <ShieldCheck size={14} className="text-indigo-600" />
                <span>بروتوكول أمن المعلومات</span>
            </div>
            <p className="text-[10px] text-slate-500 leading-relaxed font-bold">
                تأكد من تطبيق أفضل الممارسات الأمنية وتشفير البيانات الحساسة أثناء التطوير.
            </p>
        </div>
      </div>
    </aside>
  );
}
