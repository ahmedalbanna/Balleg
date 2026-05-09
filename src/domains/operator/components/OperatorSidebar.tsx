import { useRole } from "../../core/context/RoleContext";
import { 
  User, 
  LayoutDashboard, 
  PhoneCall, 
  History, 
  MessageSquare, 
  MapPin,
  Settings,
  HelpCircle,
  Headphones,
  CheckCircle2,
  AlertTriangle
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "../../core/utils/cn";

export function OperatorSidebar() {
  const { currentRole } = useRole();
  const location = useLocation();

  if (!currentRole) return null;

  const menuItems = [
    { name: 'لوحة العمليات', icon: <LayoutDashboard className="w-5 h-5" />, path: '/' },
    { name: 'مركز المكالمات', icon: <PhoneCall className="w-5 h-5" />, path: '/operator/calls' },
    { name: 'البلاغات الجارية', icon: <AlertTriangle className="w-5 h-5" />, path: '/operator/reports' },
    { name: 'رسائل المواطنين', icon: <MessageSquare className="w-5 h-5" />, path: '/operator/messages' },
    { name: 'خريطة البلاغات', icon: <MapPin className="w-5 h-5" />, path: '/operator/map' },
    { name: 'تاريخ العمليات', icon: <History className="w-5 h-5" />, path: '/operator/history' },
    { name: 'الحساب الشخصي', icon: <User className="w-5 h-5" />, path: '/profile' },
    { name: 'المساعدة والدعم', icon: <HelpCircle className="w-5 h-5" />, path: '/operator/help' },
    { name: 'الإعدادات', icon: <Settings className="w-5 h-5" />, path: '/operator/settings' },
  ];

  return (
    <aside className="w-72 bg-white border-l border-slate-100 hidden md:flex flex-col h-[calc(100vh-80px)] sticky top-20 z-40 shrink-0">
      <div className="flex-1 overflow-y-auto custom-scrollbar py-6 px-4">
        <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 px-3 italic">مركز التحكم والاتصال</h3>
        
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
                    ? "bg-blue-50 text-blue-900 font-bold" 
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
        <div className="p-4 bg-blue-50/50 rounded-2xl border border-blue-100">
            <div className="flex items-center gap-2 font-bold text-xs mb-2 text-blue-800">
                <CheckCircle2 size={14} className="text-blue-600" />
                <span>الارتباط نشط</span>
            </div>
            <p className="text-[10px] text-slate-500 leading-relaxed font-bold">
                أنت الآن متصل بالنظام المركزي للاستجابة. يرجى ضمان دقة إدخال البيانات.
            </p>
        </div>
      </div>
    </aside>
  );
}
