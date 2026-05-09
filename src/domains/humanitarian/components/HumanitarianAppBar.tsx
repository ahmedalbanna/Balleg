import { Link } from "react-router-dom";
import { User as UserIcon, HeartHandshake } from "lucide-react";
import { useAuth } from "../../core/context/AuthContext";
import { useRole } from "../../core/context/RoleContext";
import { NotificationCenter } from "../../core/components/NotificationCenter";

export function HumanitarianAppBar() {
  const { profile } = useAuth();
  const { currentRole } = useRole();

  const themeColor = currentRole?.themeColor || '#0d9488'; // Teal for humanitarian

  return (
    <header className="md:hidden h-16 bg-white border-b border-slate-100 flex items-center justify-between px-6 sticky top-0 z-40 w-full shrink-0">
      <div className="flex items-center gap-3">
        <Link to="/" className="flex items-center gap-2">
          <div 
            className="w-8 h-8 rounded-xl flex items-center justify-center text-white shadow-sm"
            style={{ backgroundColor: themeColor }}
          >
            <HeartHandshake size={16} />
          </div>
          <h1 className="text-xl font-black tracking-tighter text-slate-900 font-readex truncate max-w-[120px]">بوابة الإنسانية</h1>
        </Link>
      </div>

      <div className="flex items-center gap-4">
        <NotificationCenter />
        <Link to="/profile" className="w-8 h-8 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-500 overflow-hidden">
          {profile?.profileImageUrl ? (
            <img src={profile.profileImageUrl} alt="" className="w-full h-full object-cover" />
          ) : (
            <UserIcon size={16} />
          )}
        </Link>
      </div>
    </header>
  );
}
