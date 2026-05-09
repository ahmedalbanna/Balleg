import { Link, useLocation } from "react-router-dom";
import { LogOut, User as UserIcon, Lightbulb, Search, Book } from "lucide-react";
import { useAuth } from "../../core/context/AuthContext";
import { useRole } from "../../core/context/RoleContext";
import { NotificationCenter } from "../../core/components/NotificationCenter";
import { RoleSwitcher } from "../../core/components/RoleSwitcher";
import { cn } from "../../core/utils/cn";

export function SpecialistHeader() {
  const location = useLocation();
  const { profile, signOut } = useAuth();
  const { currentRole } = useRole();

  const themeColor = currentRole?.themeColor || '#8b5cf6';

  return (
    <header className="h-20 bg-white border-b border-slate-100 hidden md:flex items-center justify-between px-12 sticky top-0 z-40 w-full shrink-0">
      <div className="flex items-center gap-10">
        <Link to="/" className="flex items-center gap-3 group">
          <div 
            className="w-11 h-11 rounded-2xl flex items-center justify-center text-white shadow-lg transition-transform group-hover:scale-105"
            style={{ backgroundColor: themeColor }}
          >
            <Lightbulb size={24} />
          </div>
          <div>
            <h1 className="text-xl font-black tracking-tighter text-slate-900 font-readex leading-tight">بوابة الخبير</h1>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">الدعم الفني والتحليلي</p>
          </div>
        </Link>
        
        <div className="relative group">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-violet-500 transition-colors" size={14} />
            <input 
                type="text" 
                placeholder="بحث في المراجع والتقارير..." 
                className="w-64 bg-slate-50 border border-slate-100 rounded-xl py-2 pr-9 pl-4 text-[11px] font-bold focus:outline-none focus:bg-white focus:ring-2 focus:ring-violet-500/10 transition-all border-slate-200"
            />
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
            مركز التحليلات
          </Link>
          <Link 
            to="/specialist/knowledge" 
            className={cn(
              "transition-all duration-300 relative py-7",
               location.pathname.startsWith('/specialist/knowledge') ? "text-slate-900" : "text-slate-400 hover:text-slate-600"
            )}
            style={location.pathname.startsWith('/specialist/knowledge') ? { color: themeColor } : {}}
          >
            المكتبة العلمية
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <NotificationCenter />
          <div className="w-px h-6 bg-slate-200 mx-1"></div>
          <RoleSwitcher />
          
          <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 py-1.5 px-3 rounded-2xl">
            <div className="flex flex-col text-left items-end">
              <span className="text-[11px] font-bold text-slate-900 leading-tight">{profile?.displayName || 'الخبير'}</span>
              <span className="text-[9px] text-violet-600 font-bold uppercase flex items-center gap-1">
                <Book size={8} />
                مستوى: مستشار
              </span>
            </div>
            <div className="w-8 h-8 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-500 overflow-hidden">
              {profile?.profileImageUrl ? <img src={profile.profileImageUrl} alt="" className="w-full h-full object-cover" /> : <UserIcon size={16} />}
            </div>
            <button 
              onClick={() => signOut()}
              className="p-1 link-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
