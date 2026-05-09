import { Outlet } from "react-router-dom";
import { DriverSidebar } from "./DriverSidebar";
import { DriverHeader } from "./DriverHeader";
import { DriverAppBar } from "./DriverAppBar";
import { DriverBottomNav } from "./DriverBottomNav";
import { Toaster } from "sonner";

export function DriverLayout() {
  return (
    <div 
      className="min-h-screen flex flex-col font-cairo bg-white text-[#1E293B] overflow-x-hidden selection:bg-teal-100 pb-16 md:pb-0" 
      dir="rtl"
    >
      <Toaster position="top-center" richColors />
      
      {/* Desktop Navigation */}
      <DriverHeader />

      {/* Mobile Navigation */}
      <DriverAppBar />
      <DriverBottomNav />

      <div className="flex-1 flex w-full relative">
        <DriverSidebar />
        <main className="flex-1 flex flex-col p-4 sm:p-8 max-w-7xl mx-auto w-full">
          <Outlet />
        </main>
      </div>

      <footer className="hidden md:flex h-12 bg-white border-t border-slate-100 items-center justify-between px-10 text-[10px] text-slate-400 shrink-0 mt-auto">
        <div>منصة النقل واللوجستيات الوطنية © ٢٠٢٤</div>
        <div className="flex gap-6 font-bold">
          <span className="hover:text-teal-600 cursor-pointer transition-colors">قوانين المرور</span>
          <span className="hover:text-teal-600 cursor-pointer transition-colors">دعم الطريق</span>
          <span className="hover:text-teal-600 cursor-pointer transition-colors">اتصل بالإدارة</span>
        </div>
      </footer>
    </div>
  );
}
