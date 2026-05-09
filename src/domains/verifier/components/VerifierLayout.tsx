import { Outlet } from "react-router-dom";
import { VerifierSidebar } from "./VerifierSidebar";
import { VerifierHeader } from "./VerifierHeader";
import { VerifierAppBar } from "./VerifierAppBar";
import { VerifierBottomNav } from "./VerifierBottomNav";
import { Toaster } from "sonner";

export function VerifierLayout() {
  return (
    <div 
      className="min-h-screen flex flex-col font-cairo bg-white text-[#1E293B] overflow-x-hidden selection:bg-slate-100 pb-16 md:pb-0" 
      dir="rtl"
    >
      <Toaster position="top-center" richColors />
      
      {/* Desktop Navigation */}
      <VerifierHeader />

      {/* Mobile Navigation */}
      <VerifierAppBar />
      <VerifierBottomNav />

      <div className="flex-1 flex w-full relative">
        <VerifierSidebar />
        <main className="flex-1 flex flex-col p-4 sm:p-8 max-w-7xl mx-auto w-full">
          <Outlet />
        </main>
      </div>

      <footer className="hidden md:flex h-12 bg-white border-t border-slate-100 items-center justify-between px-10 text-[10px] text-slate-400 shrink-0 mt-auto">
        <div>نظام التوثيق الموحد © ٢٠٢٤</div>
        <div className="flex gap-6 font-bold">
          <span className="hover:text-slate-600 cursor-pointer transition-colors">مواثيق النزاهة</span>
          <span className="hover:text-slate-600 cursor-pointer transition-colors">دليل المدقق</span>
          <span className="hover:text-slate-600 cursor-pointer transition-colors">الدعم التقني</span>
        </div>
      </footer>
    </div>
  );
}
