import { Outlet } from "react-router-dom";
import { OperatorSidebar } from "./OperatorSidebar";
import { OperatorHeader } from "./OperatorHeader";
import { OperatorAppBar } from "./OperatorAppBar";
import { OperatorBottomNav } from "./OperatorBottomNav";
import { Toaster } from "sonner";

export function OperatorLayout() {
  return (
    <div 
      className="min-h-screen flex flex-col font-cairo bg-white text-[#1E293B] overflow-x-hidden selection:bg-blue-100 pb-16 md:pb-0" 
      dir="rtl"
    >
      <Toaster position="top-center" richColors />
      
      {/* Desktop Navigation */}
      <OperatorHeader />

      {/* Mobile Navigation */}
      <OperatorAppBar />
      <OperatorBottomNav />

      <div className="flex-1 flex w-full relative">
        <OperatorSidebar />
        <main className="flex-1 flex flex-col p-4 sm:p-8 max-w-7xl mx-auto w-full">
          <Outlet />
        </main>
      </div>

      <footer className="hidden md:flex h-12 bg-white border-t border-slate-100 items-center justify-between px-10 text-[10px] text-slate-400 shrink-0 mt-auto">
        <div>بوابة عمليات الاستجابة الطارئة © ٢٠٢٤</div>
        <div className="flex gap-6 font-bold">
          <span className="hover:text-blue-600 cursor-pointer transition-colors">بروتوكول الاتصال</span>
          <span className="hover:text-blue-600 cursor-pointer transition-colors">دليل الأماكن</span>
          <span className="hover:text-blue-600 cursor-pointer transition-colors">المساعدة التقنية</span>
        </div>
      </footer>
    </div>
  );
}
