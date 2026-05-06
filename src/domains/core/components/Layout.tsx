import { Outlet, Link, useLocation } from "react-router-dom";
import { Shield } from "lucide-react";
import { RoleSwitcher } from "./RoleSwitcher";
import { Sidebar } from "./Sidebar";

export function Layout() {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col font-cairo bg-[#F8FAFC] text-[#1E293B] overflow-x-hidden selection:bg-blue-100" dir="rtl">
      <header className="h-20 bg-white border-b border-slate-100 flex items-center justify-between px-6 sm:px-12 shrink-0 sticky top-0 z-50">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-11 h-11 bg-blue-600 rounded-2xl flex items-center justify-center text-white font-bold text-2xl pb-1 shadow-lg shadow-blue-600/20 group-hover:scale-105 transition-transform">ب</div>
          <h1 className="text-2xl font-black tracking-tighter text-slate-900 font-readex">بلّــــغ</h1>
        </Link>

        <div className="flex items-center gap-8 text-neutral-400">
          <nav className="hidden md:flex gap-10 text-sm font-bold">
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
          </nav>
          <div className="w-px h-6 bg-slate-200 mx-2 hidden md:block"></div>
          <RoleSwitcher />
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
