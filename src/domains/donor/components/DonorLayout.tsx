import { Outlet } from "react-router-dom";
import { DonorSidebar } from "./DonorSidebar";
import { DonorHeader } from "./DonorHeader";
import { DonorAppBar } from "./DonorAppBar";
import { DonorBottomNav } from "./DonorBottomNav";
import { Toaster } from "sonner";

export function DonorLayout() {
  return (
    <div 
      className="min-h-screen flex flex-col font-cairo bg-white text-[#1E293B] overflow-x-hidden selection:bg-emerald-100 pb-16 md:pb-0" 
      dir="rtl"
    >
      <Toaster position="top-center" richColors />
      
      {/* Desktop Navigation */}
      <DonorHeader />

      {/* Mobile Navigation */}
      <DonorAppBar />
      <DonorBottomNav />

      <div className="flex-1 flex w-full relative">
        <DonorSidebar />
        <main className="flex-1 flex flex-col p-4 sm:p-8 max-w-7xl mx-auto w-full">
          <Outlet />
        </main>
      </div>

      <footer className="hidden md:flex h-12 bg-white border-t border-slate-100 items-center justify-between px-10 text-[10px] text-slate-400 shrink-0 mt-auto">
        <div>منصة العطاء المستدام © ٢٠٢٤</div>
        <div className="flex gap-6 font-bold">
          <span className="hover:text-emerald-600 cursor-pointer transition-colors">عن المنصة</span>
          <span className="hover:text-emerald-600 cursor-pointer transition-colors">ميثاق المانحين</span>
          <span className="hover:text-emerald-600 cursor-pointer transition-colors">التواصل مع الدعم</span>
        </div>
      </footer>
    </div>
  );
}
