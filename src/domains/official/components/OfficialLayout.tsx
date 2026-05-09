import { Outlet } from "react-router-dom";
import { OfficialSidebar } from "./OfficialSidebar";
import { OfficialHeader } from "./OfficialHeader";
import { OfficialAppBar } from "./OfficialAppBar";
import { OfficialBottomNav } from "./OfficialBottomNav";
import { Toaster } from "sonner";

export function OfficialLayout() {
  return (
    <div 
      className="min-h-screen flex flex-col font-cairo bg-[#F8FAFC] text-[#1E293B] overflow-x-hidden selection:bg-emerald-100 pb-16 md:pb-0" 
      dir="rtl"
    >
      <Toaster position="top-center" richColors />
      
      {/* Desktop Navigation */}
      <OfficialHeader />

      {/* Mobile Navigation */}
      <OfficialAppBar />
      <OfficialBottomNav />

      <div className="flex-1 flex w-full relative">
        <OfficialSidebar />
        <main className="flex-1 flex flex-col p-4 sm:p-8 max-w-7xl mx-auto w-full">
          <Outlet />
        </main>
      </div>

      <footer className="hidden md:flex h-12 bg-white border-t border-slate-200 items-center justify-between px-10 text-[10px] text-slate-400 shrink-0 mt-auto">
        <div>بوابة المسؤول الرسمي الموحد - الجمهورية اليمنية</div>
        <div className="flex gap-6 font-bold">
          <span className="hover:text-emerald-600 cursor-pointer transition-colors">ميثاق العمل</span>
          <span className="hover:text-emerald-600 cursor-pointer transition-colors">الأمان والخصوصية</span>
          <span className="hover:text-emerald-600 cursor-pointer transition-colors">الدعم الفني</span>
        </div>
      </footer>
    </div>
  );
}
