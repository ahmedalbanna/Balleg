import { useRole } from "../../core/context/RoleContext";
import { User, Shield, Briefcase, ChevronDown, Store } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

export function RoleSwitcher() {
  const { currentRole, setCurrentRole, availableRoles } = useRole();
  const [isOpen, setIsOpen] = useState(false);

  const getIcon = (slug: string) => {
    switch (slug) {
      case 'official': return <Shield className="w-4 h-4" />;
      case 'merchant': return <Store className="w-4 h-4" />;
      case 'expert': return <Briefcase className="w-4 h-4" />;
      default: return <User className="w-4 h-4" />;
    }
  };

  if (!currentRole) return null;

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors shadow-sm"
      >
        <div className="w-6 h-6 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
          {getIcon(currentRole.slug)}
        </div>
        <span className="text-sm font-bold text-slate-700 hidden sm:inline">{currentRole.name}</span>
        <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)}></div>
            <motion.div 
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="absolute left-0 top-full mt-2 w-56 bg-white border border-slate-200 rounded-2xl shadow-2xl p-2 z-50 overflow-hidden"
            >
              <div className="px-3 py-2 text-xs font-bold text-slate-400 uppercase tracking-wider">تبديل الدور التجريبي</div>
              {availableRoles.map((role) => (
                <button
                  key={role.id}
                  onClick={() => {
                    setCurrentRole(role);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all ${
                    currentRole.id === role.id 
                      ? 'bg-blue-50 text-blue-700 font-bold' 
                      : 'hover:bg-slate-50 text-slate-600'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    currentRole.id === role.id ? 'bg-blue-100' : 'bg-slate-100'
                  }`}>
                    {getIcon(role.slug)}
                  </div>
                  <div className="text-right">
                    <div className="text-sm">{role.name}</div>
                    <div className="text-[10px] opacity-70">عرض مخصص</div>
                  </div>
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
