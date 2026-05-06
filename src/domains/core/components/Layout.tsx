import { Outlet, Link, useLocation } from "react-router-dom";
import { Shield, LogOut, User as UserIcon } from "lucide-react";
import { RoleSwitcher } from "./RoleSwitcher";
import { Sidebar } from "./Sidebar";
import { NotificationCenter } from "./NotificationCenter";
import { useAuth } from "../context/AuthContext";

export function Layout() {
  const location = useLocation();
  const { profile, signOut } = useAuth();

  return (
    <div className="min-h-screen flex flex-col font-cairo bg-[#F8FAFC] text-[#1E293B] overflow-x-hidden selection:bg-blue-100" dir="rtl">
      <header className="h-20 bg-white border-b border-slate-100 flex items-center justify-between px-6 sm:px-12 shrink-0 sticky top-0 z-50">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-11 h-11 bg-blue-600 rounded-2xl flex items-center justify-center text-white font-bold text-2xl pb-1 shadow-lg shadow-blue-600/20 group-hover:scale-105 transition-transform">ب</div>
          <h1 className="text-2xl font-black tracking-tighter text-slate-900 font-readex">بلّــــغ</h1>
        </Link>

        <div className="flex items-center gap-6 text-neutral-400">
          <nav className="hidden lg:flex gap-10 text-sm font-bold">
            <Link 
              to="/" 
              className={`transition-all duration-300 relative py-7 ${location.pathname === '/' ? 'text-blue-600 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-1.5 after:bg-blue-600 after:rounded-t-full' : 'text-slate-400 hover:text-slate-600'}`}
            >
              الرئيسية
            </Link>
            <Link 
              to="/track" 
              className={`transition-all duration-300 relative py-7 ${location.pathname === '/track' ? 'text-blue-600 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-1.5 after:bg-blue-600 after:rounded-t-full' : 'text-slate-400 hover:text-slate-600'}`}
            >
              متابعة البلاغات
            </Link>
            <Link 
              to="/reports/my" 
              className={`transition-all duration-300 relative py-7 ${location.pathname === '/reports/my' ? 'text-blue-600 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-1.5 after:bg-blue-600 after:rounded-t-full' : 'text-slate-400 hover:text-slate-600'}`}
            >
              بلاغاتي
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <NotificationCenter />
            <RoleSwitcher />
            
            <div className="w-px h-6 bg-slate-200 mx-2 hidden md:block"></div>
            
            <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 py-1.5 px-3 rounded-2xl">
              <div className="flex flex-col text-left items-end hidden sm:flex">
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

      <div className="flex-1 flex w-full relative">
        <Sidebar />
        <main className="flex-1 flex flex-col p-4 sm:p-10 max-w-7xl mx-auto w-full">
          <Outlet />
        </main>
      </div>

      <footer className="h-14 bg-white border-t border-slate-200 flex items-center justify-between px-6 sm:px-10 text-[11px] text-slate-400 shrink-0 mt-auto">
        <div>© ٢٠٢٤ مشروع "بلّغ" - المنظومة الوطنية الموحدة للبلاغات</div>
        <div className="hidden sm:flex gap-6">
          <span>سهولة الاستخدام</span>
          <span>الخصوصية والأمان</span>
          <span>دعم ذوي الإعاقة</span>
        </div>
      </footer>
    </div>
  );
}
