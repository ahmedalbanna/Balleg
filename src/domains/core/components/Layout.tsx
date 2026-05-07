import { Outlet, Link, useLocation } from "react-router-dom";
import { Shield, LogOut, User as UserIcon, AlertTriangle } from "lucide-react";
import { Toaster } from "sonner";
import { RoleSwitcher } from "./RoleSwitcher";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { AppBar } from "./AppBar";
import { BottomNav } from "./BottomNav";
import { NotificationCenter } from "./NotificationCenter";
import { useAuth } from "../context/AuthContext";
import { useRole } from "../context/RoleContext";

export function Layout() {
  const location = useLocation();
  const { profile, signOut } = useAuth();
  const { currentRole, availableRoles, setCurrentRole } = useRole();

  const isGuestMode = currentRole && profile && currentRole.slug !== profile.role;
  const themeColor = currentRole?.themeColor || '#3b82f6';

  const handleResetRole = () => {
    const originalRole = availableRoles.find(r => r.slug === profile?.role);
    if (originalRole) {
      setCurrentRole(originalRole);
    }
  };

  return (
    <div 
      className="min-h-screen flex flex-col font-cairo bg-[#F8FAFC] text-[#1E293B] overflow-x-hidden selection:bg-blue-100 pb-16 md:pb-0" 
      dir="rtl"
    >
      <Toaster position="top-center" richColors />
      
      {isGuestMode && (
        <div className="bg-amber-100 border-b border-amber-200 px-6 py-2 flex items-center justify-center gap-3 text-amber-800 text-xs font-bold z-50">
          <AlertTriangle size={14} />
          <span>أنت الآن تتصفح واجهة "{currentRole.name}" بصفة ضيف (وضع الاختبار).</span>
          <button 
            onClick={handleResetRole}
            className="bg-white px-3 py-1 rounded-md shadow-sm border border-amber-200 hover:bg-amber-50 transition-colors ml-2"
          >
            العودة لدوري الأساسي
          </button>
        </div>
      )}

      {/* Desktop Navigation */}
      <Header />

      {/* Mobile Navigation */}
      <AppBar />
      <BottomNav />

      <div className="flex-1 flex w-full relative">
        <Sidebar />
        <main className="flex-1 flex flex-col p-4 sm:p-10 max-w-7xl mx-auto w-full">
          <Outlet />
        </main>
      </div>

      <footer className="hidden md:flex h-14 bg-white border-t border-slate-200 items-center justify-between px-6 sm:px-10 text-[11px] text-slate-400 shrink-0 mt-auto">
        <div>© ٢٠٢٤ مشروع "بلّغ" - المنظومة الوطنية الموحدة للبلاغات</div>
        <div className="flex gap-6">
          <span>سهولة الاستخدام</span>
          <span>الخصوصية والأمان</span>
          <span>دعم ذوي الإعاقة</span>
        </div>
      </footer>
    </div>
  );
}
