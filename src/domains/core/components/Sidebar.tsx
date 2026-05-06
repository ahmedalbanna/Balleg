import { useRole } from "../context/RoleContext";
import { User, Shield, Store, Briefcase, LayoutDashboard, Settings, Info, Car, Home, Headset, HardHat, BarChart3, Landmark, Users, HeartPulse, Newspaper, Signal } from "lucide-react";
import { motion } from "motion/react";
import { cn } from "../utils/cn";

export function Sidebar() {
  const { currentRole, setCurrentRole, availableRoles } = useRole();

  const getIcon = (slug: string) => {
    switch (slug) {
      case 'official': return <Shield className="w-5 h-5" />;
      case 'merchant': return <Store className="w-5 h-5" />;
      case 'driver': return <Car className="w-5 h-5" />;
      case 'displaced': return <Home className="w-5 h-5" />;
      case 'operator': return <Headset className="w-5 h-5" />;
      case 'specialist': return <HardHat className="w-5 h-5" />;
      case 'manager': return <BarChart3 className="w-5 h-5" />;
      case 'admin': return <Briefcase className="w-5 h-5" />;
      case 'council': return <Landmark className="w-5 h-5" />;
      case 'neighborhood_council': return <Users className="w-5 h-5" />;
      case 'humanitarian': return <HeartPulse className="w-5 h-5" />;
      case 'journalist': return <Newspaper className="w-5 h-5" />;
      case 'telecom': return <Signal className="w-5 h-5" />;
      default: return <User className="w-5 h-5" />;
    }
  };

  const categoryMap = {
    citizens: "المواطنون والمجتمع",
    business: "قطاع الأعمال",
    community: "المجتمع المدني",
    admin: "الوحدات التنفيذية",
    leadership: "القيادة والرقابة"
  };

  const groupedRoles = availableRoles.reduce((acc, role) => {
    const cat = role.category || 'citizens';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(role);
    return acc;
  }, {} as Record<string, typeof availableRoles>);

  if (!currentRole) return null;

  return (
    <aside className="w-72 bg-white border-l border-slate-100 hidden md:flex flex-col h-[calc(100vh-80px)] sticky top-20 z-40 shrink-0">
      <div className="flex-1 overflow-y-auto custom-scrollbar p-6">
        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-6">تبديل بيئة العرض</h3>
        
        <div className="space-y-8">
          {(Object.keys(categoryMap) as Array<keyof typeof categoryMap>).map((catKey) => {
            const roles = groupedRoles[catKey];
            if (!roles || roles.length === 0) return null;

            return (
              <div key={catKey} className="space-y-3">
                <div className="flex items-center gap-2 px-2">
                  <div className="w-1 h-3 bg-slate-200 rounded-full"></div>
                  <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-wider">
                    {categoryMap[catKey]}
                  </h4>
                </div>
                
                <div className="space-y-2">
                  {roles.map((role) => (
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
            );
          })}
        </div>
      </div>

      <div className="mt-auto p-6 border-t border-slate-100 space-y-4 bg-white">
        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
            <div className="flex items-center gap-2 text-slate-800 font-bold text-sm mb-1">
                <Info className="w-4 h-4 text-blue-600" />
                <span>عن الدور الحالي</span>
            </div>
            <p className="text-[11px] text-slate-500 leading-relaxed">
                {currentRole.description}
            </p>
        </div>

        <div className="grid grid-cols-2 gap-2">
            <button className="flex flex-col items-center justify-center gap-1.5 p-3 rounded-xl hover:bg-slate-50 text-slate-400 hover:text-slate-900 transition-all border border-transparent hover:border-slate-100">
                <LayoutDashboard className="w-4 h-4" />
                <span className="text-[9px] font-black uppercase tracking-tighter">الرئيسية</span>
            </button>
            <button className="flex flex-col items-center justify-center gap-1.5 p-3 rounded-xl hover:bg-slate-50 text-slate-400 hover:text-slate-900 transition-all border border-transparent hover:border-slate-100">
                <Settings className="w-4 h-4" />
                <span className="text-[9px] font-black uppercase tracking-tighter">الإعدادات</span>
            </button>
        </div>
      </div>
    </aside>
  );
}
