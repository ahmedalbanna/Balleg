import { Outlet, Link, useLocation } from "react-router-dom";
import { Shield } from "lucide-react";

export function Layout() {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col font-cairo bg-[#F8FAFC] text-[#1E293B] overflow-x-hidden selection:bg-blue-100" dir="rtl">
      <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-6 sm:px-10 shrink-0 sticky top-0 z-50">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-2xl pb-1">ب</div>
          <h1 className="text-2xl font-black tracking-tight text-blue-900 font-readex">بلّــــغ</h1>
        </Link>

        <nav className="hidden sm:flex gap-8 text-sm font-medium">
          <Link 
            to="/" 
            className={`transition-colors ${location.pathname === '/' ? 'text-blue-600 border-b-2 border-blue-600 pb-1' : 'text-slate-500 hover:text-blue-600'}`}
          >
            الرئيسية
          </Link>
          <Link 
            to="/track" 
            className={`transition-colors ${location.pathname === '/track' ? 'text-blue-600 border-b-2 border-blue-600 pb-1' : 'text-slate-500 hover:text-blue-600'}`}
          >
            متابعة البلاغات
          </Link>
        </nav>
      </header>

      <main className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-10 py-8 flex flex-col gap-8">
        <Outlet />
      </main>

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
