import { Outlet } from "react-router-dom";
import { JournalistSidebar } from "./JournalistSidebar";
import { JournalistHeader } from "./JournalistHeader";
import { JournalistAppBar } from "./JournalistAppBar";
import { JournalistBottomNav } from "./JournalistBottomNav";
import { Toaster } from "sonner";

export function JournalistLayout() {
  return (
    <div 
      className="min-h-screen flex flex-col font-cairo bg-white text-[#1E293B] overflow-x-hidden selection:bg-rose-100 pb-16 md:pb-0" 
      dir="rtl"
    >
      <Toaster position="top-center" richColors />
      
      {/* Desktop Navigation */}
      <JournalistHeader />

      {/* Mobile Navigation */}
      <JournalistAppBar />
      <JournalistBottomNav />

      <div className="flex-1 flex w-full relative">
        <JournalistSidebar />
        <main className="flex-1 flex flex-col p-4 sm:p-8 max-w-7xl mx-auto w-full">
          <Outlet />
        </main>
      </div>

      <footer className="hidden md:flex h-12 bg-white border-t border-slate-100 items-center justify-between px-10 text-[10px] text-slate-400 shrink-0 mt-auto">
        <div>نظام الصحافة الموحد © ٢٠٢٤</div>
        <div className="flex gap-6 font-bold">
          <span className="hover:text-rose-600 cursor-pointer transition-colors">مواثيق الشرف</span>
          <span className="hover:text-rose-600 cursor-pointer transition-colors">دليل التغطية</span>
          <span className="hover:text-rose-600 cursor-pointer transition-colors">مركز الإعلام</span>
        </div>
      </footer>
    </div>
  );
}
