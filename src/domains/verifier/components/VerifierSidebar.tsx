import { useRole } from "../../core/context/RoleContext";
import { 
  User, 
  Home, 
  ShieldCheck, 
  MapPin, 
  ClipboardCheck,
  Settings,
  HelpCircle,
  Bell,
  Search,
  FileCheck,
  History,
  FileText,
  Lock,
  Eye
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "../../core/utils/cn";

export function VerifierSidebar() {
  const { currentRole } = useRole();
  const location = useLocation();

  if (!currentRole) return null;

  const menuItems = [
    { name: 'الرئيسية', icon: <Home className="w-5 h-5" />, path: '/' },
    { name: 'لوحة التحقق', icon: <Home className="w-5 h-5" />, path: '/verifier/verification-board' },
    { name: 'خارطة الميدان', icon: <MapPin className="w-5 h-5" />, path: '/verifier/field-map' },
    { name: 'طلبات التوثيق', icon: <FileCheck className="w-5 h-5" />, path: '/verifier/doc-requests' },
    { name: 'مراجعة البيانات', icon: <Search className="w-5 h-5" />, path: '/verifier/data-review' },
    { name: 'سجل البلاغات', icon: <ClipboardCheck className="w-5 h-5" />, path: '/verifier/reports-history' },
    { name: 'الرقابة والشفافية', icon: <Eye className="w-5 h-5" />, path: '/verifier/audit' },
    { name: 'الأرشيف الموثق', icon: <History className="w-5 h-5" />, path: '/verifier/archive' },
    { name: 'التقارير التحليلية', icon: <FileText className="w-5 h-5" />, path: '/verifier/analytics' },
    { name: 'الملف الفني', icon: <User className="w-5 h-5" />, path: '/verifier/profile' },
    { name: 'إشعارات الأمن', icon: <Lock className="w-5 h-5" />, path: '/verifier/security' },
    { name: 'تنبيهات النظام', icon: <Bell className="w-5 h-5" />, path: '/verifier/alerts' },
    { name: 'إعدادات المنصة', icon: <Settings className="w-5 h-5" />, path: '/verifier/settings' },
  ];

  return (
    <aside className="w-72 bg-white border-l border-slate-100 hidden md:flex flex-col h-[calc(100vh-80px)] sticky top-20 z-40 shrink-0">
      <div className="flex-1 overflow-y-auto custom-scrollbar py-6 px-4">
        <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 px-3 italic">التدقيق والتوثيق الميداني</h3>
        
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
        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 italic transition-all hover:bg-slate-200/50">
            <div className="flex items-center gap-2 font-bold text-xs mb-2 text-slate-800">
                <ShieldCheck size={14} className="text-slate-600" />
                <span>ميثاق النزاهة والتحقق</span>
            </div>
            <p className="text-[10px] text-slate-500 leading-relaxed font-bold">
                توثيق الحقيقة وضمان جودة البيانات هو الركيزة الأساسية للثقة في هذا النظام.
            </p>
        </div>
      </div>
    </aside>
  );
}
