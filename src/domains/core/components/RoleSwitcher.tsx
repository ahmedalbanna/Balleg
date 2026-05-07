import { useRole } from "../context/RoleContext";
import { User, Shield, Briefcase, ChevronDown, Store, LogOut, Settings, Car, Home, Headset, HardHat, BarChart3, Landmark, Users, HeartPulse, Newspaper, Signal, Hammer, Wrench, FileSearch, Terminal, Globe2, Layers } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../context/AuthContext";

export function RoleSwitcher() {
  const { currentRole, setCurrentRole, availableRoles } = useRole();
  const { profile } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  // In production/real scenario, only Admins can switch roles globally
  // Citizens or regular employees should NOT see this switcher
  const canSwitchRoles = profile?.role === 'admin';

  if (!canSwitchRoles && profile?.role !== 'citizen') {
    // If not admin, but authenticated, we just show the current role status without switching capability
    return (
      <div className="flex items-center gap-2 py-2 px-4 bg-blue-50 text-blue-700 rounded-2xl border border-blue-100 shadow-sm">
        <Shield className="w-4 h-4" />
        <span className="text-xs font-bold">{currentRole.name}</span>
      </div>
    );
  }

  if (!canSwitchRoles) return null;

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
      case 'verifier': return <FileSearch className="w-4 h-4" />;
      case 'developer': return <Terminal className="w-4 h-4" />;
      case 'donor': return <Globe2 className="w-4 h-4" />;
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

  const themeColor = currentRole?.themeColor || '#3b82f6';

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 py-2 px-4 bg-slate-900 text-white rounded-2xl hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/10 group cursor-pointer"
      >
        <Layers className="w-4 h-4" style={{ color: themeColor }} />
        <span className="text-[11px] font-bold hidden sm:inline">تبديل الأدوار</span>
        <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
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
              <div className="p-6 bg-slate-50/50 border-b border-slate-100 flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">دليل الواجهات</p>
                  <h4 className="text-lg font-black text-slate-900">اختر دوراً للمحاكاة</h4>
                </div>
                <div 
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: `${themeColor}15`, color: themeColor }}
                >
                  <Layers className="w-5 h-5" />
                </div>
              </div>

              <div className="max-h-[400px] overflow-y-auto custom-scrollbar p-4">
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
                                  ? 'text-white shadow-lg' 
                                  : 'hover:bg-slate-50 text-slate-600'
                              }`}
                              style={currentRole.id === role.id ? { 
                                backgroundColor: themeColor,
                                boxShadow: `0 8px 12px -2px ${themeColor}33`
                              } : {}}
                            >
                              <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                                  currentRole.id === role.id ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
                              }`}>
                                  {getIcon(role.slug)}
                              </div>
                              <div className="text-right">
                                  <div className="text-sm font-black">{role.name}</div>
                                  <div className={`text-[10px] ${currentRole.id === role.id ? 'text-blue-100' : 'text-slate-400'}`}>
                                      عرض لوحة تحكم الشريك
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

              <div className="p-4 bg-slate-50 border-t border-slate-100 text-center">
                <p className="text-[10px] text-slate-400 font-medium">استخدم هذه القائمة للتنقل بين واجهات المستخدم الـ 19 المختلفة في هذا النموذج الأولي.</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
