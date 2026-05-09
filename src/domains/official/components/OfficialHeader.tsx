import { Link, useLocation } from "react-router-dom";
import { LogOut, User as UserIcon, Landmark, Search } from "lucide-react";
import { useAuth } from "../../core/context/AuthContext";
import { useRole } from "../../core/context/RoleContext";
import { NotificationCenter } from "../../core/components/NotificationCenter";
import { RoleSwitcher } from "../../core/components/RoleSwitcher";
import { cn } from "../../core/utils/cn";

export function OfficialHeader() {
  const location = useLocation();
  const { profile, signOut } = useAuth();
  const { currentRole } = useRole();

  const themeColor = currentRole?.themeColor || '#059669';

  return (
    <header className="h-20 bg-white border-b border-slate-100 hidden md:flex items-center justify-between px-12 sticky top-0 z-40 w-full shrink-0">
      <div className="flex items-center gap-10">
        <Link to="/" className="flex items-center gap-3 group">
          <div 
            className="w-11 h-11 rounded-2xl flex items-center justify-center text-white font-bold text-2xl pb-1 shadow-lg transition-transform group-hover:scale-105"
            style={{ backgroundColor: themeColor }}
          >
            <Landmark size={24} />
          </div>
          <div>
            <h1 className="text-xl font-black tracking-tighter text-slate-900 font-readex leading-tight">بوابة المسؤول</h1>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">إدارة القرار الميداني</p>
          </div>
        </Link>

        <div className="relative w-64 group">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-600 transition-colors" size={16} />
            <input 
                type="text" 
                placeholder="ابحث عن تعميم أو بلاغ..." 
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-2 pr-10 pl-4 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all"
            />
        </div>
      </div>

      <div className="flex items-center gap-6">
        <nav className="flex gap-8 text-sm font-bold ml-6">
          <Link 
            to="/" 
            className={cn(
              "transition-all duration-300 relative py-7",
              location.pathname === '/' ? "" : "text-slate-400 hover:text-slate-600"
            )}
            style={location.pathname === '/' ? { color: themeColor } : {}}
          >
            المتابعة اللحظية
            {location.pathname === '/' && (
              <div 
                className="absolute bottom-0 left-0 right-0 h-1 rounded-t-full"
                style={{ backgroundColor: themeColor }}
              />
            )}
          </Link>
          <Link 
            to="/official/approval" 
            className={cn(
              "transition-all duration-300 relative py-7",
              location.pathname.startsWith('/official/approval') ? "" : "text-slate-400 hover:text-slate-600"
            )}
            style={location.pathname.startsWith('/official/approval') ? { color: themeColor } : {}}
          >
            الاعتمادات
            {location.pathname.startsWith('/official/approval') && (
              <div 
                className="absolute bottom-0 left-0 right-0 h-1 rounded-t-full"
                style={{ backgroundColor: themeColor }}
              />
            )}
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <NotificationCenter />
          <div className="w-px h-6 bg-slate-200 mx-1"></div>
          <RoleSwitcher />
          
          <div className="flex items-center gap-3 bg-emerald-50/50 border border-emerald-100 py-1.5 px-3 rounded-2xl">
            <div className="flex flex-col text-left items-end">
              <span className="text-[11px] font-bold text-slate-900 leading-tight">{profile?.displayName || 'المسؤول'}</span>
              <span className="text-[9px] text-emerald-600 font-bold uppercase tracking-tighter">الدرجة الوظيفية: أولى</span>
            </div>
            <div className="w-8 h-8 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-500 overflow-hidden">
              {profile?.profileImageUrl ? <img src={profile.profileImageUrl} alt="" className="w-full h-full object-cover" /> : <UserIcon size={16} />}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
