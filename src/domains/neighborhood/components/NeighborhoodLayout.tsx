import { Outlet } from "react-router-dom";
import { NeighborhoodSidebar } from "./NeighborhoodSidebar";
import { NeighborhoodHeader } from "./NeighborhoodHeader";
import { NeighborhoodAppBar } from "./NeighborhoodAppBar";
import { NeighborhoodBottomNav } from "./NeighborhoodBottomNav";
import { Toaster } from "sonner";

export function NeighborhoodLayout() {
  return (
    <div 
      className="min-h-screen flex flex-col font-cairo bg-white text-[#1E293B] overflow-x-hidden selection:bg-green-100 pb-16 md:pb-0" 
      dir="rtl"
    >
      <Toaster position="top-center" richColors />
      
      {/* Desktop Navigation */}
      <NeighborhoodHeader />

      {/* Mobile Navigation */}
      <NeighborhoodAppBar />
      <NeighborhoodBottomNav />

      <div className="flex-1 flex w-full relative">
        <NeighborhoodSidebar />
        <main className="flex-1 flex flex-col p-4 sm:p-8 max-w-7xl mx-auto w-full">
          <Outlet />
        </main>
      </div>

      <footer className="hidden md:flex h-12 bg-white border-t border-slate-100 items-center justify-between px-10 text-[10px] text-slate-400 shrink-0 mt-auto">
        <div>نظام إدارة الأحياء الموحد © ٢٠٢٤</div>
        <div className="flex gap-6 font-bold">
          <span className="hover:text-green-600 cursor-pointer transition-colors">دليل العاقل</span>
          <span className="hover:text-green-600 cursor-pointer transition-colors">اللوائح الإدارية</span>
          <span className="hover:text-green-600 cursor-pointer transition-colors">الدعم التقني</span>
        </div>
      </footer>
    </div>
  );
}
