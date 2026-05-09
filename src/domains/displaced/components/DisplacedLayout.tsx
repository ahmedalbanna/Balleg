import { Outlet } from "react-router-dom";
import { DisplacedSidebar } from "./DisplacedSidebar";
import { DisplacedHeader } from "./DisplacedHeader";
import { DisplacedAppBar } from "./DisplacedAppBar";
import { DisplacedBottomNav } from "./DisplacedBottomNav";
import { Toaster } from "sonner";

export function DisplacedLayout() {
  return (
    <div 
      className="min-h-screen flex flex-col font-cairo bg-white text-[#1E293B] overflow-x-hidden selection:bg-amber-100 pb-16 md:pb-0" 
      dir="rtl"
    >
      <Toaster position="top-center" richColors />
      
      {/* Desktop Navigation */}
      <DisplacedHeader />

      {/* Mobile Navigation */}
      <DisplacedAppBar />
      <DisplacedBottomNav />

      <div className="flex-1 flex w-full relative">
        <DisplacedSidebar />
        <main className="flex-1 flex flex-col p-4 sm:p-8 max-w-7xl mx-auto w-full">
          <Outlet />
        </main>
      </div>

      <footer className="hidden md:flex h-12 bg-white border-t border-slate-100 items-center justify-between px-10 text-[10px] text-slate-400 shrink-0 mt-auto">
        <div>منظومة الرعاية الوطنية لضيوف الكرامة © ٢٠٢٤</div>
        <div className="flex gap-6 font-bold">
          <span className="hover:text-amber-600 cursor-pointer transition-colors">دليل الحقوق</span>
          <span className="hover:text-amber-600 cursor-pointer transition-colors">مراكز الدعم</span>
          <span className="hover:text-amber-600 cursor-pointer transition-colors">بلاغ عن إساءة</span>
        </div>
      </footer>
    </div>
  );
}
