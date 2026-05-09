import { Outlet } from "react-router-dom";
import { HandymanSidebar } from "./HandymanSidebar";
import { HandymanHeader } from "./HandymanHeader";
import { HandymanAppBar } from "./HandymanAppBar";
import { HandymanBottomNav } from "./HandymanBottomNav";
import { Toaster } from "sonner";

export function HandymanLayout() {
  return (
    <div 
      className="min-h-screen flex flex-col font-cairo bg-white text-[#1E293B] overflow-x-hidden selection:bg-blue-100 pb-16 md:pb-0" 
      dir="rtl"
    >
      <Toaster position="top-center" richColors />
      
      {/* Desktop Navigation */}
      <HandymanHeader />

      {/* Mobile Navigation */}
      <HandymanAppBar />
      <HandymanBottomNav />

      <div className="flex-1 flex w-full relative">
        <HandymanSidebar />
        <main className="flex-1 flex flex-col p-4 sm:p-8 max-w-7xl mx-auto w-full">
          <Outlet />
        </main>
      </div>

      <footer className="hidden md:flex h-12 bg-white border-t border-slate-100 items-center justify-between px-10 text-[10px] text-slate-400 shrink-0 mt-auto">
        <div>نظام الإدارة الفنية الموحد © ٢٠٢٤</div>
        <div className="flex gap-6 font-bold">
          <span className="hover:text-blue-600 cursor-pointer transition-colors">دليل الصيانة</span>
          <span className="hover:text-blue-600 cursor-pointer transition-colors">معايير الجودة</span>
          <span className="hover:text-blue-600 cursor-pointer transition-colors">الدعم الفني</span>
        </div>
      </footer>
    </div>
  );
}
