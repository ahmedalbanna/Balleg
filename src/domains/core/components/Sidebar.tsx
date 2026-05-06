import { useRole } from "../context/RoleContext";
import { User, Shield, Store, Briefcase, LayoutDashboard, Settings, Info } from "lucide-react";
import { motion } from "motion/react";
import { cn } from "../utils/cn";

export function Sidebar() {
  const { currentRole, setCurrentRole, availableRoles } = useRole();

  const getIcon = (slug: string) => {
    switch (slug) {
      case 'official': return <Shield className="w-5 h-5" />;
      case 'merchant': return <Store className="w-5 h-5" />;
      case 'expert': return <Briefcase className="w-5 h-5" />;
      default: return <User className="w-5 h-5" />;
    }
  };

  if (!currentRole) return null;

  return (
    <aside className="w-72 bg-white border-l border-slate-100 hidden md:flex flex-col h-[calc(100vh-80px)] sticky top-20 z-40 shrink-0">
      <div className="p-6">
        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-6">تبديل بيئة العرض</h3>
        
        <div className="space-y-2">
          {availableRoles.map((role) => (
            <button
              key={role.id}
              onClick={() => setCurrentRole(role)}
              className={cn(
                "w-full flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 group relative overflow-hidden text-right cursor-pointer",
                currentRole.id === role.id 
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20" 
                  : "hover:bg-slate-50 text-slate-600"
              )}
            >
              <div className={cn(
                "w-10 h-10 rounded-xl flex items-center justify-center transition-colors shadow-sm",
                currentRole.id === role.id ? "bg-white/20 text-white" : "bg-white border border-slate-100 text-slate-400 group-hover:text-blue-600"
              )}>
                {getIcon(role.slug)}
              </div>
              
              <div className="flex-1">
                <div className="text-sm font-black">{role.name}</div>
                <div className={cn(
                  "text-[10px] font-bold opacity-70",
                  currentRole.id === role.id ? "text-blue-100" : "text-slate-400"
                )}>
                  عرض واجهة {role.name}
                </div>
              </div>

              {currentRole.id === role.id && (
                <motion.div 
                  layoutId="active-indicator"
                  className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-white rounded-l-full"
                />
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-auto p-6 border-t border-slate-100 space-y-4">
        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
            <div className="flex items-center gap-2 text-slate-800 font-bold text-sm mb-1">
                <Info className="w-4 h-4 text-blue-600" />
                <span>عن الدور الحالي</span>
            </div>
            <p className="text-[11px] text-slate-500 leading-relaxed">
                {currentRole.description}
            </p>
        </div>

        <div className="flex flex-col gap-1">
            <button className="flex items-center gap-3 px-4 py-2 text-xs font-bold text-slate-400 hover:text-slate-900 transition-colors">
                <LayoutDashboard className="w-4 h-4" />
                لوحة التحكم العامة
            </button>
            <button className="flex items-center gap-3 px-4 py-2 text-xs font-bold text-slate-400 hover:text-slate-900 transition-colors">
                <Settings className="w-4 h-4" />
                إعدادات النظام
            </button>
        </div>
      </div>
    </aside>
  );
}
