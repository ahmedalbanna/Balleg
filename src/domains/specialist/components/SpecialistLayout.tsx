import { Outlet } from "react-router-dom";
import { SpecialistSidebar } from "./SpecialistSidebar";
import { SpecialistHeader } from "./SpecialistHeader";
import { SpecialistAppBar } from "./SpecialistAppBar";
import { SpecialistBottomNav } from "./SpecialistBottomNav";
import { Toaster } from "sonner";

export function SpecialistLayout() {
  return (
    <div 
      className="min-h-screen flex flex-col font-cairo bg-[#FAF9FF] text-[#1E293B] overflow-x-hidden selection:bg-violet-100 pb-16 md:pb-0" 
      dir="rtl"
    >
      <Toaster position="top-center" richColors />
      
      {/* Desktop Navigation */}
      <SpecialistHeader />

      {/* Mobile Navigation */}
      <SpecialistAppBar />
      <SpecialistBottomNav />

      <div className="flex-1 flex w-full relative">
        <SpecialistSidebar />
        <main className="flex-1 flex flex-col p-4 sm:p-10 max-w-7xl mx-auto w-full">
          <Outlet />
        </main>
      </div>

      <footer className="hidden md:flex h-12 bg-white border-t border-slate-100 items-center justify-between px-10 text-[10px] text-slate-400 shrink-0 mt-auto">
        <div>نظام دعم القرار الفني التخصصي © ٢٠٢٤</div>
        <div className="flex gap-6 font-bold">
          <span className="hover:text-violet-600 cursor-pointer transition-colors">منهجية العمل</span>
          <span className="hover:text-violet-600 cursor-pointer transition-colors">النزاهة الأكاديمية</span>
          <span className="hover:text-violet-600 cursor-pointer transition-colors">اتصل بنا</span>
        </div>
      </footer>
    </div>
  );
}
