import { Outlet } from "react-router-dom";
import { DeveloperSidebar } from "./DeveloperSidebar";
import { DeveloperHeader } from "./DeveloperHeader";
import { DeveloperAppBar } from "./DeveloperAppBar";
import { DeveloperBottomNav } from "./DeveloperBottomNav";
import { Toaster } from "sonner";

export function DeveloperLayout() {
  return (
    <div 
      className="min-h-screen flex flex-col font-cairo bg-white text-[#1E293B] overflow-x-hidden selection:bg-indigo-100 pb-16 md:pb-0" 
      dir="rtl"
    >
      <Toaster position="top-center" richColors />
      
      {/* Desktop Navigation */}
      <DeveloperHeader />

      {/* Mobile Navigation */}
      <DeveloperAppBar />
      <DeveloperBottomNav />

      <div className="flex-1 flex w-full relative">
        <DeveloperSidebar />
        <main className="flex-1 flex flex-col p-4 sm:p-8 max-w-7xl mx-auto w-full">
          <Outlet />
        </main>
      </div>

      <footer className="hidden md:flex h-12 bg-white border-t border-slate-100 items-center justify-between px-10 text-[10px] text-slate-400 shrink-0 mt-auto">
        <div>منصة هندسة البرمجيات الموحدة © ٢٠٢٤</div>
        <div className="flex gap-6 font-bold">
          <span className="hover:text-indigo-600 cursor-pointer transition-colors">دليل المطور</span>
          <span className="hover:text-indigo-600 cursor-pointer transition-colors">مكتبة APIs</span>
          <span className="hover:text-indigo-600 cursor-pointer transition-colors">الإبلاغ عن خلل</span>
        </div>
      </footer>
    </div>
  );
}
