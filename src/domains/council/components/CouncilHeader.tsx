import { Link, useLocation } from "react-router-dom";
import { LogOut, User as UserIcon, Landmark, Search, Shield } from "lucide-react";
import { useAuth } from "../../core/context/AuthContext";
import { useRole } from "../../core/context/RoleContext";
import { NotificationCenter } from "../../core/components/NotificationCenter";
import { RoleSwitcher } from "../../core/components/RoleSwitcher";
import { cn } from "../../core/utils/cn";

export function CouncilHeader() {
  const location = useLocation();
  const { profile, signOut } = useAuth();
  const { currentRole } = useRole();

  const themeColor = currentRole?.themeColor || '#1e293b';

  return (
    <header className="h-20 bg-white border-b border-slate-100 hidden md:flex items-center justify-between px-12 sticky top-0 z-40 w-full shrink-0">
      <div className="flex items-center gap-10">
        <Link to="/" className="flex items-center gap-3 group">
          <div 
            className="w-11 h-11 rounded-2xl flex items-center justify-center text-white shadow-lg transition-transform group-hover:scale-105"
            style={{ backgroundColor: themeColor }}
          >
            <Landmark size={24} />
          </div>
          <div>
            <h1 className="text-xl font-black tracking-tighter text-slate-900 font-readex leading-tight">المجلس المحلي</h1>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest italic">منصة الرقابة ودعم القرار</p>
          </div>
        </Link>
        
        <div className="flex items-center gap-2 bg-slate-50 px-4 py-1.5 rounded-full border border-slate-100">
            <Shield size={12} className="text-slate-500" />
            <span className="text-[10px] font-black text-slate-700">النظام الرقابي الموحد v2</span>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <nav className="flex gap-8 text-sm font-bold ml-6">
          <Link 
            to="/" 
            className={cn(
              "transition-all duration-300 relative py-7",
              location.pathname === '/' ? "text-slate-900" : "text-slate-400 hover:text-slate-600"
            )}
            style={location.pathname === '/' ? { color: themeColor } : {}}
          >
            غرفة العمليات
          </Link>
          <Link 
            to="/reports" 
            className={cn(
              "transition-all duration-300 relative py-7",
              location.pathname.startsWith('/reports') ? "text-slate-900" : "text-slate-400 hover:text-slate-600"
            )}
            style={location.pathname.startsWith('/reports') ? { color: themeColor } : {}}
          >
            سجل البلاغات
          </Link>
          <Link 
            to="/analytics" 
            className={cn(
              "transition-all duration-300 relative py-7",
              location.pathname.startsWith('/analytics') ? "text-slate-900" : "text-slate-400 hover:text-slate-600"
            )}
            style={location.pathname.startsWith('/analytics') ? { color: themeColor } : {}}
          >
            الرصد الإحصائي
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <NotificationCenter />
          <div className="w-px h-6 bg-slate-200 mx-1"></div>
          <RoleSwitcher />
          
          <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 py-1.5 px-3 rounded-2xl">
            <div className="flex flex-col text-left items-end">
              <span className="text-[11px] font-bold text-slate-900 leading-tight">{profile?.displayName || 'عضو المجلس'}</span>
              <span className="text-[9px] text-slate-600 font-black uppercase">عضوية رسمية</span>
            </div>
            <div className="w-8 h-8 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-500 overflow-hidden">
              {profile?.profileImageUrl ? <img src={profile.profileImageUrl} alt="" className="w-full h-full object-cover" /> : <UserIcon size={16} />}
            </div>
            <button 
              onClick={() => signOut()}
              className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
              title="تسجيل الخروج"
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
