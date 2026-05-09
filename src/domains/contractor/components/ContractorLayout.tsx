import { Outlet } from "react-router-dom";
import { ContractorSidebar } from "./ContractorSidebar";
import { ContractorHeader } from "./ContractorHeader";
import { ContractorAppBar } from "./ContractorAppBar";
import { ContractorBottomNav } from "./ContractorBottomNav";
import { Toaster } from "sonner";

export function ContractorLayout() {
  return (
    <div 
      className="min-h-screen flex flex-col font-cairo bg-white text-[#1E293B] overflow-x-hidden selection:bg-amber-100 pb-16 md:pb-0" 
      dir="rtl"
    >
      <Toaster position="top-center" richColors />
      
      {/* Desktop Navigation */}
      <ContractorHeader />

      {/* Mobile Navigation */}
      <ContractorAppBar />
      <ContractorBottomNav />

      <div className="flex-1 flex w-full relative">
        <ContractorSidebar />
        <main className="flex-1 flex flex-col p-4 sm:p-8 max-w-7xl mx-auto w-full">
          <Outlet />
        </main>
      </div>

      <footer className="hidden md:flex h-12 bg-white border-t border-slate-100 items-center justify-between px-10 text-[10px] text-slate-400 shrink-0 mt-auto">
        <div>منظمة الإعمار والبناء الوطنية © ٢٠٢٤</div>
        <div className="flex gap-6 font-bold">
          <span className="hover:text-amber-600 cursor-pointer transition-colors">كود البناء</span>
          <span className="hover:text-amber-600 cursor-pointer transition-colors">الدعم اللوجستي</span>
          <span className="hover:text-amber-600 cursor-pointer transition-colors">شكاوى المواقع</span>
        </div>
      </footer>
    </div>
  );
}
