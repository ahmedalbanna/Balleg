import { useRole } from "../context/RoleContext";
import { User, Shield, Briefcase, ChevronDown, Store, LogOut, Settings, Car, Home, Headset, HardHat, BarChart3, Landmark, Users, HeartPulse, Newspaper, Signal, Hammer, Wrench } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

export function RoleSwitcher() {
  const { currentRole, setCurrentRole, availableRoles } = useRole();
  const [isOpen, setIsOpen] = useState(false);

  const getIcon = (slug: string) => {
    switch (slug) {
      case 'official': return <Shield className="w-4 h-4" />;
      case 'merchant': return <Store className="w-4 h-4" />;
      case 'driver': return <Car className="w-4 h-4" />;
      case 'displaced': return <Home className="w-4 h-4" />;
      case 'operator': return <Headset className="w-4 h-4" />;
      case 'specialist': return <HardHat className="w-4 h-4" />;
      case 'manager': return <BarChart3 className="w-4 h-4" />;
      case 'admin': return <Briefcase className="w-4 h-4" />;
      case 'council': return <Landmark className="w-4 h-4" />;
      case 'neighborhood_council': return <Users className="w-4 h-4" />;
      case 'humanitarian': return <HeartPulse className="w-4 h-4" />;
      case 'journalist': return <Newspaper className="w-4 h-4" />;
      case 'telecom': return <Signal className="w-4 h-4" />;
      case 'contractor': return <Hammer className="w-4 h-4" />;
      case 'handyman': return <Wrench className="w-4 h-4" />;
      default: return <User className="w-4 h-4" />;
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
    <div className="relative">
      {/* Profile Trigger */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 p-1.5 pr-4 border border-slate-200 rounded-2xl hover:bg-slate-50 transition-all shadow-sm bg-white group cursor-pointer"
      >
        <div className="hidden sm:block text-left ml-1">
          <p className="text-[10px] text-slate-400 font-black uppercase leading-none mb-1">مرحباً بك</p>
          <p className="text-sm font-black text-slate-900 leading-none">أحمد محمد</p>
        </div>
        
        <div className="relative">
            <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center border-2 border-white shadow-sm text-slate-500 overflow-hidden group-hover:border-blue-100 transition-colors">
                <img 
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmed" 
                  alt="Avatar" 
                  className="w-full h-full object-cover shadow-inner"
                  referrerPolicy="no-referrer"
                />
            </div>
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-blue-600 rounded-full border-2 border-white flex items-center justify-center text-white">
                {getIcon(currentRole.slug)}
            </div>
        </div>
        
        <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)}></div>
            <motion.div 
              initial={{ opacity: 0, y: 15, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 15, scale: 0.95 }}
              className="absolute left-0 top-full mt-3 w-80 bg-white border border-slate-200 rounded-[2rem] shadow-2xl z-50 overflow-hidden"
            >
              {/* User Info Header */}
              <div className="p-6 bg-slate-50/50 border-b border-slate-100">
                <p className="text-xs font-bold text-slate-400 uppercase mb-1">الحساب التجريبي</p>
                <h4 className="text-lg font-black text-slate-900">أحمد محمد</h4>
                <p className="text-xs text-slate-500 truncate">ahmed.demo@balleg.ye</p>
              </div>

              {/* Roles Section */}
              <div className="max-h-[400px] overflow-y-auto custom-scrollbar p-4">
                <div className="px-3 py-2 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-50 mb-3">اختر دور العرض (تجريبي)</div>
                
                <div className="space-y-6">
                  {(Object.keys(categoryMap) as Array<keyof typeof categoryMap>).map((catKey) => {
                    const roles = groupedRoles[catKey];
                    if (!roles || roles.length === 0) return null;

                    return (
                      <div key={catKey} className="space-y-2">
                        <h5 className="px-3 text-[9px] font-black text-slate-400 uppercase tracking-wider">{categoryMap[catKey]}</h5>
                        <div className="space-y-1">
                          {roles.map((role) => (
                            <button
                              key={role.id}
                              onClick={() => {
                                  setCurrentRole(role);
                                  setIsOpen(false);
                              }}
                              className={`w-full flex items-center gap-4 p-3 rounded-2xl transition-all ${
                                  currentRole.id === role.id 
                                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' 
                                  : 'hover:bg-slate-50 text-slate-600'
                              }`}
                            >
                              <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                                  currentRole.id === role.id ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
                              }`}>
                                  {getIcon(role.slug)}
                              </div>
                              <div className="text-right">
                                  <div className="text-sm font-black">{role.name}</div>
                                  <div className={`text-[10px] ${currentRole.id === role.id ? 'text-blue-100' : 'text-slate-400'}`}>
                                      واجهة {role.name}
                                  </div>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Footer Actions */}
              <div className="p-2 bg-slate-50 border-t border-slate-100 flex gap-1">
                <button className="flex-1 flex items-center justify-center gap-2 py-2 text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors">
                    <Settings className="w-3 h-3" />
                    الإعدادات
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 py-2 text-xs font-bold text-red-500 hover:bg-red-50 rounded-xl transition-colors">
                    <LogOut className="w-3 h-3" />
                    خروج
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
