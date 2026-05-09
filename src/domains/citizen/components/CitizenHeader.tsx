import { Link, useLocation } from "react-router-dom";
import { LogOut, User as UserIcon, Home, PlusCircle } from "lucide-react";
import { useAuth } from "../../core/context/AuthContext";
import { useRole } from "../../core/context/RoleContext";
import { NotificationCenter } from "../../core/components/NotificationCenter";
import { RoleSwitcher } from "../../core/components/RoleSwitcher";
import { cn } from "../../core/utils/cn";

export function CitizenHeader() {
  const location = useLocation();
  const { profile, signOut } = useAuth();
  const { currentRole } = useRole();

  const themeColor = currentRole?.themeColor || '#10b981';

  return (
    <header className="h-20 bg-white border-b border-slate-100 hidden md:flex items-center justify-between px-12 sticky top-0 z-40 w-full shrink-0">
      <div className="flex items-center gap-10">
        <Link to="/citizen" className="flex items-center gap-3 group">
          <div 
            className="w-11 h-11 rounded-2xl flex items-center justify-center text-white shadow-lg transition-transform group-hover:scale-105"
            style={{ backgroundColor: themeColor }}
          >
            <Home size={24} />
          </div>
          <div>
            <h1 className="text-xl font-black tracking-tighter text-slate-900 font-readex leading-tight">صوت المواطن</h1>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">منصة المشاركة المجتمعية</p>
          </div>
        </Link>
        
        <nav className="flex gap-8 text-sm font-bold">
          <Link 
            to="/citizen/new" 
            className="flex items-center gap-2 bg-emerald-600 text-white px-5 py-2 rounded-xl hover:bg-emerald-700 transition-all shadow-md shadow-emerald-600/20 active:scale-95"
          >
            <PlusCircle size={16} />
            بلاغ جديد
          </Link>
        </nav>
      </div>

      <div className="flex items-center gap-6">
        <nav className="flex gap-8 text-sm font-bold ml-6">
          <Link 
            to="/citizen" 
            className={cn(
              "transition-all duration-300 relative py-7",
              location.pathname === '/citizen' ? "text-slate-900" : "text-slate-400 hover:text-slate-600"
            )}
            style={location.pathname === '/citizen' ? { color: themeColor } : {}}
          >
            الرئيسية
          </Link>
          <Link 
            to="/citizen/reports/my" 
            className={cn(
              "transition-all duration-300 relative py-7",
              location.pathname.startsWith('/citizen/reports/my') ? "text-slate-900" : "text-slate-400 hover:text-slate-600"
            )}
            style={location.pathname.startsWith('/citizen/reports/my') ? { color: themeColor } : {}}
          >
            بلاغاتي
          </Link>
          <Link 
            to="/citizen/map" 
            className={cn(
              "transition-all duration-300 relative py-7",
              location.pathname.startsWith('/citizen/map') ? "text-slate-900" : "text-slate-400 hover:text-slate-600"
            )}
            style={location.pathname.startsWith('/citizen/map') ? { color: themeColor } : {}}
          >
            خريطة المنطقة
          </Link>
          <Link 
            to="/citizen/support" 
            className={cn(
              "transition-all duration-300 relative py-7",
              location.pathname.startsWith('/citizen/support') ? "text-slate-900" : "text-slate-400 hover:text-slate-600"
            )}
            style={location.pathname.startsWith('/citizen/support') ? { color: themeColor } : {}}
          >
            مركز المساعدة
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <NotificationCenter />
          <div className="w-px h-6 bg-slate-200 mx-1"></div>
          <RoleSwitcher />
          
          <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 py-1.5 px-3 rounded-2xl">
            <div className="flex flex-col text-left items-end">
              <span className="text-[11px] font-bold text-slate-900 leading-tight">{profile?.displayName || 'المواطن'}</span>
              <span className="text-[9px] text-emerald-600 font-black uppercase">عضو نشط</span>
            </div>
            <div className="w-8 h-8 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-500 overflow-hidden">
              {profile?.profileImageUrl ? <img src={profile.profileImageUrl} alt="" className="w-full h-full object-cover" /> : <UserIcon size={16} />}
            </div>
            <button 
              onClick={() => signOut()}
              className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
