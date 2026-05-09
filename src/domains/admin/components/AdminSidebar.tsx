import { useRole } from "../../core/context/RoleContext";
import { 
  User, 
  Settings, 
  LayoutDashboard, 
  FileText, 
  Bell, 
  Shield, 
  Users, 
  Database, 
  PieChart, 
  MapPin,
  Lock
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "../../core/utils/cn";

export function AdminSidebar() {
  const { currentRole } = useRole();
  const location = useLocation();

  if (!currentRole) return null;

  const menuItems = [
    { name: 'لوحة التحكم', icon: <LayoutDashboard className="w-5 h-5" />, path: '/' },
    { name: 'إدارة المستخدمين', icon: <Users className="w-5 h-5" />, path: '/admin/users' },
    { name: 'البلاغات العامة', icon: <FileText className="w-5 h-5" />, path: '/admin/reports' },
    { name: 'الإحصائيات', icon: <PieChart className="w-5 h-5" />, path: '/admin/stats' },
    { name: 'الخريطة المركزية', icon: <MapPin className="w-5 h-5" />, path: '/admin/map' },
    { name: 'قاعدة البيانات', icon: <Database className="w-5 h-5" />, path: '/admin/database' },
    { name: 'إدارة الأقسام', icon: <Shield className="w-5 h-5" />, path: '/admin/departments' },
    { name: 'الملف الشخصي', icon: <User className="w-5 h-5" />, path: '/profile' },
    { name: 'إعدادات النظام', icon: <Settings className="w-5 h-5" />, path: '/admin/settings' },
  ];

  return (
    <aside className="w-72 bg-white border-l border-slate-100 hidden md:flex flex-col h-[calc(100vh-80px)] sticky top-20 z-40 shrink-0">
      <div className="flex-1 overflow-y-auto custom-scrollbar py-6 px-4">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 px-3 italic">صلاحيات المدير النظامي</h3>
        
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
        <div className="p-4 bg-slate-900 rounded-2xl text-white">
            <div className="flex items-center gap-2 font-bold text-xs mb-2">
                <Lock size={14} className="text-amber-400" />
                <span>الوضع الآمن مفعل</span>
            </div>
            <p className="text-[10px] text-slate-400 leading-relaxed font-medium">
                بصفتك مديراً للنظام، لديك الصلاحية الكاملة لتعديل البيانات وتجاوز القيود. يرجى الحذر.
            </p>
        </div>
      </div>
    </aside>
  );
}
