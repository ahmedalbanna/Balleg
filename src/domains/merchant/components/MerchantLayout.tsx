import { Outlet } from "react-router-dom";
import { MerchantSidebar } from "./MerchantSidebar";
import { MerchantHeader } from "./MerchantHeader";
import { MerchantAppBar } from "./MerchantAppBar";
import { MerchantBottomNav } from "./MerchantBottomNav";
import { Toaster } from "sonner";

export function MerchantLayout() {
  return (
    <div 
      className="min-h-screen flex flex-col font-cairo bg-white text-[#1E293B] overflow-x-hidden selection:bg-indigo-100 pb-16 md:pb-0" 
      dir="rtl"
    >
      <Toaster position="top-center" richColors />
      
      {/* Desktop Navigation */}
      <MerchantHeader />

      {/* Mobile Navigation */}
      <MerchantAppBar />
      <MerchantBottomNav />

      <div className="flex-1 flex w-full relative">
        <MerchantSidebar />
        <main className="flex-1 flex flex-col p-4 sm:p-8 max-w-7xl mx-auto w-full">
          <Outlet />
        </main>
      </div>

      <footer className="hidden md:flex h-12 bg-white border-t border-slate-100 items-center justify-between px-10 text-[10px] text-slate-400 shrink-0 mt-auto">
        <div>منصة التجارة الوطنية © ٢٠٢٤</div>
        <div className="flex gap-6 font-bold">
          <span className="hover:text-indigo-600 cursor-pointer transition-colors">شروط الخدمة</span>
          <span className="hover:text-indigo-600 cursor-pointer transition-colors">سياسة الخصوصية</span>
          <span className="hover:text-indigo-600 cursor-pointer transition-colors">مركز التاجر</span>
        </div>
      </footer>
    </div>
  );
}
