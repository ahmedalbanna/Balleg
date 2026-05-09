import { Outlet } from "react-router-dom";
import { CouncilSidebar } from "./CouncilSidebar";
import { CouncilHeader } from "./CouncilHeader";
import { CouncilAppBar } from "./CouncilAppBar";
import { CouncilBottomNav } from "./CouncilBottomNav";
import { Toaster } from "sonner";

export function CouncilLayout() {
  return (
    <div 
      className="min-h-screen flex flex-col font-cairo bg-white text-[#1E293B] overflow-x-hidden selection:bg-slate-100 pb-16 md:pb-0" 
      dir="rtl"
    >
      <Toaster position="top-center" richColors />
      
      {/* Desktop Navigation */}
      <CouncilHeader />

      {/* Mobile Navigation */}
      <CouncilAppBar />
      <CouncilBottomNav />

      <div className="flex-1 flex w-full relative">
        <CouncilSidebar />
        <main className="flex-1 flex flex-col p-4 sm:p-8 max-w-7xl mx-auto w-full">
          <Outlet />
        </main>
      </div>

      <footer className="hidden md:flex h-12 bg-white border-t border-slate-100 items-center justify-between px-10 text-[10px] text-slate-400 shrink-0 mt-auto">
        <div>بوابة الرقابة المحلية الموحدة © ٢٠٢٤</div>
        <div className="flex gap-6 font-bold">
          <span className="hover:text-slate-600 cursor-pointer transition-colors">ميثاق العمل</span>
          <span className="hover:text-slate-600 cursor-pointer transition-colors">دليل الإجراءات</span>
          <span className="hover:text-slate-600 cursor-pointer transition-colors">اتصل برئيس المجلس</span>
        </div>
      </footer>
    </div>
  );
}
