import { Link, useLocation } from "react-router-dom";
import { LogOut, User as UserIcon, Bell } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useRole } from "../context/RoleContext";
import { NotificationCenter } from "./NotificationCenter";
import { RoleSwitcher } from "./RoleSwitcher";
import { cn } from "../utils/cn";

export function Header() {
  const location = useLocation();
  const { profile, signOut } = useAuth();
  const { currentRole } = useRole();

  const themeColor = currentRole?.themeColor || '#3b82f6';

  return (
    <header className="h-20 bg-white border-b border-slate-100 hidden md:flex items-center justify-between px-12 sticky top-0 z-40 w-full shrink-0">
      <div className="flex items-center gap-10">
        <Link to="/" className="flex items-center gap-3 group">
          <div 
            className="w-11 h-11 rounded-2xl flex items-center justify-center text-white font-bold text-2xl pb-1 shadow-lg transition-transform group-hover:scale-105"
            style={{ backgroundColor: themeColor, shadowColor: `${themeColor}33` }}
          >
            ب
          </div>
          <h1 className="text-2xl font-black tracking-tighter text-slate-900 font-readex">بلّــــغ</h1>
        </Link>

        <nav className="flex gap-8 text-sm font-bold">
          <Link 
            to="/" 
            className={cn(
              "transition-all duration-300 relative py-7",
              location.pathname === '/' ? "text-slate-900" : "text-slate-400 hover:text-slate-600"
            )}
          >
            الرئيسية
            {location.pathname === '/' && (
              <div 
                className="absolute bottom-0 left-0 right-0 h-1 rounded-t-full"
                style={{ backgroundColor: themeColor }}
              />
            )}
          </Link>
          <Link 
            to="/track" 
            className={cn(
              "transition-all duration-300 relative py-7",
              location.pathname === '/track' ? "text-slate-900" : "text-slate-400 hover:text-slate-600"
            )}
          >
            متابعة البلاغات
            {location.pathname === '/track' && (
              <div 
                className="absolute bottom-0 left-0 right-0 h-1 rounded-t-full"
                style={{ backgroundColor: themeColor }}
              />
            )}
          </Link>
          <Link 
            to="/reports/my" 
            className={cn(
              "transition-all duration-300 relative py-7",
              location.pathname === '/reports/my' ? "text-slate-900" : "text-slate-400 hover:text-slate-600"
            )}
          >
            بلاغاتي
            {location.pathname === '/reports/my' && (
              <div 
                className="absolute bottom-0 left-0 right-0 h-1 rounded-t-full"
                style={{ backgroundColor: themeColor }}
              />
            )}
          </Link>
        </nav>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-4">
          <NotificationCenter />
          <RoleSwitcher />
          
          <div className="w-px h-6 bg-slate-200 mx-2"></div>
          
          <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 py-1.5 px-3 rounded-2xl">
            <div className="flex flex-col text-left items-end">
              <span className="text-[11px] font-bold text-slate-900 leading-tight">{profile?.displayName || 'مستخدم'}</span>
              <span className="text-[9px] text-slate-500 font-medium">@{profile?.role || 'مواطن'}</span>
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
