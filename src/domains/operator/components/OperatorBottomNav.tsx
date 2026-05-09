import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, PhoneCall, ListFilter, Map, User } from "lucide-react";
import { useRole } from "../../core/context/RoleContext";
import { cn } from "../../core/utils/cn";

export function OperatorBottomNav() {
  const location = useLocation();
  const { currentRole } = useRole();

  const themeColor = currentRole?.themeColor || '#3b82f6';

  const navItems = [
    { icon: LayoutDashboard, label: "الرئيسية", path: "/" },
    { icon: PhoneCall, label: "المكالمات", path: "/operator/calls" },
    { icon: ListFilter, label: "البلاغات", path: "/operator/reports" },
    { icon: Map, label: "الخريطة", path: "/operator/map" },
    { icon: User, label: "حسابي", path: "/profile" },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-slate-100 flex items-center justify-around px-2 z-50 pb-safe shadow-[0_-4px_12px_rgba(0,0,0,0.03)]">
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        const Icon = item.icon;

        return (
          <Link
            key={item.label}
            to={item.path}
            className="flex flex-col items-center justify-center gap-1 min-w-[64px] transition-all"
          >
            <div 
              className={cn(
                "p-1.5 rounded-xl transition-all",
                isActive ? "bg-opacity-10 scale-110" : "text-slate-400"
              )}
              style={isActive ? { backgroundColor: `${themeColor}20`, color: themeColor } : {}}
            >
              <Icon size={20} className={cn(isActive ? "stroke-[2.5px]" : "stroke-[2px]")} />
            </div>
            <span className={cn(
              "text-[10px] font-bold",
              isActive ? "text-slate-900" : "text-slate-400"
            )}>
              {item.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
