import { useState, useRef, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  Bell,
  ChevronDown,
  User,
  Settings,
  KeyRound,
  LogOut,
  ShieldCheck,
  Home,
} from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import { useAuth } from "../../hooks/useAuth";

const LINKS = [
  { to: "/admin/home", icon: Home, label: "Dashboard" },
  { to: "/admin/my-profile", icon: User, label: "My profile" },
  { to: "/admin/all-admin", icon: ShieldCheck, label: "All admins" },
  { to: "/admin/change-password", icon: KeyRound, label: "Change password" },
  { to: "/admin/settings", icon: Settings, label: "Settings" },
];

type Props = {
  onMenuClick: () => void;
  notificationCount?: number;
};

export default function MobileTopBar({
  onMenuClick,
  notificationCount = 0,
}: Props) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const h = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node))
        setProfileOpen(false);
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  const handleLogout = async () => {
    setProfileOpen(false);
    try {
      await axios.post(
        `${import.meta.env.VITE_OPEN_APIURL}/api/logout`,
        {},
        { withCredentials: true },
      );
    } finally {
      localStorage.removeItem("admin");
      toast.success("Logged out successfully");
      navigate("/");
    }
  };

  return (
    <div className="flex items-center justify-between h-16 bg-white border-b border-gray-200 px-4 lg:hidden">
      {/* Left: burger + small logo */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
          aria-label="Open menu"
        >
          <Menu size={20} className="text-gray-600" />
        </button>
        <img
          src="/logo.png"
          alt="erp logo"
          className="h-8 w-auto object-contain"
        />
      </div>

      {/* Right: bell + divider + avatar */}
      <div className="flex items-center gap-2">
        {/* ── Notification bell ── */}
        <button
          className="relative w-9 h-9 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
          aria-label="Notifications"
        >
          <Bell size={18} className="text-gray-500" />
          {notificationCount > 0 && (
            <span className="absolute top-1.5 right-1.5 min-w-4 h-4 flex items-center justify-center rounded-full bg-red-500 text-[9px] font-semibold text-white px-0.5 leading-none">
              {notificationCount > 99 ? "99+" : notificationCount}
            </span>
          )}
        </button>

        {/* Divider */}
        <div className="w-px h-5 bg-gray-200" />

        {/* Avatar + dropdown */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setProfileOpen((p) => !p)}
            className="flex items-center gap-1.5"
            aria-label="Profile menu"
          >
            <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-[#005BAB]/20 bg-[#005BAB]/10 flex items-center justify-center shrink-0">
              <span className="text-[11px] font-semibold text-[#005BAB]">
                {user?.name?.[0]?.toUpperCase() ?? "A"}
              </span>
            </div>
            <ChevronDown
              size={13}
              className={`text-gray-400 transition-transform duration-200 ${
                profileOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          <AnimatePresence>
            {profileOpen && (
              <motion.div
                initial={{ opacity: 0, y: 6, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 6, scale: 0.97 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 top-full mt-2 w-52 bg-white rounded-xl border border-gray-200 shadow-lg overflow-hidden z-50"
              >
                {/* Admin info header */}
                <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-100 bg-gray-50">
                  <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-[#005BAB]/20 bg-[#005BAB]/10 flex items-center justify-center shrink-0">
                    <span className="text-[11px] font-semibold text-[#005BAB]">
                      {user?.name?.[0]?.toUpperCase() ?? "A"}
                    </span>
                  </div>
                  <div className="min-w-0">
                    <p className="text-[13px] font-medium text-gray-800 truncate">
                      {user?.name || "Admin"}
                    </p>
                    <p className="text-[11px] text-gray-400 mt-0.5">
                      Administrator
                    </p>
                  </div>
                </div>

                {/* Nav links */}
                <div className="py-1">
                  {LINKS.map(({ to, icon: Icon, label }) => (
                    <NavLink
                      key={to}
                      to={to}
                      onClick={() => setProfileOpen(false)}
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
                          isActive
                            ? "text-[#005BAB] bg-[#005BAB]/5"
                            : "text-gray-600 hover:bg-gray-50"
                        }`
                      }
                    >
                      {({ isActive }) => (
                        <>
                          <Icon
                            size={15}
                            className={`shrink-0 ${isActive ? "text-[#005BAB]" : "text-gray-400"}`}
                          />
                          {label}
                        </>
                      )}
                    </NavLink>
                  ))}
                </div>

                {/* Logout */}
                <div className="border-t border-gray-100 py-1">
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors"
                  >
                    <LogOut size={15} className="shrink-0" />
                    Logout
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
