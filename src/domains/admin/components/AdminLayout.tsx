import { Outlet, useLocation } from "react-router-dom";
import { AlertTriangle } from "lucide-react";
import { Toaster } from "sonner";
import { AdminSidebar } from "./AdminSidebar";
import { AdminHeader } from "./AdminHeader";
import { AdminAppBar } from "./AdminAppBar";
import { AdminBottomNav } from "./AdminBottomNav";
import { useAuth } from "../../core/context/AuthContext";
import { useRole } from "../../core/context/RoleContext";

export function AdminLayout() {
  const { profile } = useAuth();
  const { currentRole, availableRoles, setCurrentRole } = useRole();

  const isGuestMode = currentRole && profile && currentRole.slug !== profile.role;

  const handleResetRole = () => {
    const originalRole = availableRoles.find(r => r.slug === profile?.role);
    if (originalRole) {
      setCurrentRole(originalRole);
    }
  };

  return (
    <div 
      className="min-h-screen flex flex-col font-cairo bg-[#FAFBFF] text-[#1E293B] overflow-x-hidden selection:bg-indigo-100 pb-16 md:pb-0" 
      dir="rtl"
    >
      <Toaster position="top-center" richColors />
      
      {isGuestMode && (
        <div className="bg-amber-100 border-b border-amber-200 px-6 py-2 flex items-center justify-center gap-3 text-amber-800 text-xs font-bold z-50">
          <AlertTriangle size={14} />
          <span>أنت الآن تتصفح واجهة المصمم بصفة مشرف نظام (وضع المحاكاة).</span>
          <button 
            onClick={handleResetRole}
            className="bg-white px-3 py-1 rounded-md shadow-sm border border-amber-200 hover:bg-amber-50 transition-colors ml-2"
          >
            العودة للوضع الإداري
          </button>
        </div>
      )}

      {/* Desktop Navigation */}
      <AdminHeader />

      {/* Mobile Navigation */}
      <AdminAppBar />
      <AdminBottomNav />

      <div className="flex-1 flex w-full relative">
        <AdminSidebar />
        <main className="flex-1 flex flex-col p-4 sm:p-10 max-w-7xl mx-auto w-full">
          <Outlet />
        </main>
      </div>

      <footer className="hidden md:flex h-14 bg-white border-t border-slate-200 items-center justify-between px-6 sm:px-10 text-[11px] text-slate-400 shrink-0 mt-auto">
        <div>نظام التحكم الإداري المركزي الموحد © ٢٠٢٤</div>
        <div className="flex gap-6">
          <span>سجل العمليات</span>
          <span>الأمان الرقمي</span>
          <span>تواصل مع الدعم التقني</span>
        </div>
      </footer>
    </div>
  );
}
