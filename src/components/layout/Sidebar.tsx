import "./sidebar.css";
import { useMemo, useState } from "react";
import { useLocation, NavLink, Link, useNavigate } from "react-router-dom";
import { ChevronDown, ChevronLeft, ChevronRight, LogOut } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { menuSections, type MenuItem } from "./sidebarMenuConfig";
import { toast } from "sonner";
import { cloneElement, isValidElement } from "react";
import type { ReactElement } from "react";
import { useAuth } from "../../hooks/useAuth";

const sidebarVariants = {
  open: {
    opacity: 1,
    height: "auto",
    transition: {
      duration: 0.35,
      ease: "easeInOut",
      staggerChildren: 0.05,
      when: "beforeChildren",
    },
  },
  closed: {
    opacity: 0,
    height: 0,
    transition: {
      duration: 0.3,
      ease: "easeInOut",
      staggerChildren: 0.05,
      staggerDirection: -1,
      when: "afterChildren",
    },
  },
} as const;

const subItemVariants = {
  open: {
    y: 0,
    opacity: 1,
    transition: { y: { stiffness: 1000, velocity: -100 } },
  },
  closed: { y: -10, opacity: 0, transition: { y: { stiffness: 1000 } } },
};

type SidebarProps = {
  mobileOpen: boolean;
  toggleMobileSidebar: () => void;
  collapsed: boolean;
  toggleSidebar: () => void;
};

const Sidebar = ({
  mobileOpen,
  toggleMobileSidebar,
  collapsed,
  toggleSidebar,
}: SidebarProps) => {
  const location = useLocation();
  const { user } = useAuth();
  const [manualOpenSubmenu, setManualOpenSubmenu] = useState<
    string | null | undefined
  >(undefined);
  const [lastPathname, setLastPathname] = useState(location.pathname);
  const navigate = useNavigate();

  if (location.pathname !== lastPathname) {
    setLastPathname(location.pathname);
    setManualOpenSubmenu(undefined);
  }

  const autoOpenLabel = useMemo(() => {
    for (const section of menuSections) {
      for (const item of section.items) {
        if (item.submenu?.some((sub) => location.pathname === sub.to)) {
          return item.label;
        }
      }
    }
    return null;
  }, [location.pathname]);

  const filteredMenuSections = useMemo(() => {
    if (!user) return [];

    return menuSections
      .map((section) => ({
        ...section,
        items: section.items
          .filter((item) => {
            if (!item.roles) return true;

            return item.roles.includes(user.role);
          })
          .map((item) => ({
            ...item,
            submenu: item.submenu?.filter((sub) => {
              if (!sub.roles) return true;

              return sub.roles.includes(user.role);
            }),
          }))
          .filter((item) => !item.submenu || item.submenu.length > 0),
      }))
      .filter((section) => section.items.length > 0);
  }, [user]);

  const activeSubmenuLabel =
    manualOpenSubmenu === undefined ? autoOpenLabel : manualOpenSubmenu;

  const toggleSubmenu = (label: string) => {
    if (collapsed) return;
    setManualOpenSubmenu(activeSubmenuLabel === label ? null : label);
  };

  const renderIcon = (icon: MenuItem["icon"], size: number) => {
    if (!isValidElement(icon)) {
      return icon;
    }

    return cloneElement(
      icon as ReactElement<{ size?: number; className?: string }>,
      {
        size,
        className: "shrink-0",
      },
    );
  };

  const isSubmenuOpen = (label: string) => activeSubmenuLabel === label;

  const isItemActive = (item: MenuItem) => {
    if (item.submenu) {
      return item.submenu.some((sub) => location.pathname === sub.to);
    }
    return location.pathname === item.to;
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");

    toast.success("Logged out successfully.");

    navigate("/login", { replace: true });
  };

  return (
    <motion.aside
      className="print:hidden h-full bg-white overflow-y-auto scrollbar border-r border-gray-200 z-80"
      initial={{ width: 256 }}
      animate={{ width: collapsed ? 80 : 256 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <div className="h-full flex flex-col pb-4 overflow-x-hidden scrollbar">
        <div className="w-full py-5 h-20 flex justify-between items-center bg-white sticky top-0 z-20 px-4 border-b border-gray-200">
          <button
            onClick={toggleSidebar}
            className="absolute -right-1 top-1/2 -translate-y-1/2 h-8 w-8 flex items-center cursor-pointer justify-center opacity-40 hover:opacity-100 text-black transition-all"
            aria-label="Toggle sidebar"
          >
            {collapsed ? (
              <ChevronRight className="w-4 h-4" />
            ) : (
              <ChevronLeft className="w-4 h-4" />
            )}
          </button>
          <AnimatePresence mode="wait">
            {collapsed ? (
              <motion.div
                key="small-logo"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex justify-center w-full"
              >
                <img
                  src="/logo.png"
                  alt="logo"
                  width={35}
                  height={35}
                  className="object-contain"
                />
              </motion.div>
            ) : (
              <motion.div
                key="full-logo"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex-1 flex justify-center"
              >
                <Link to="/admin">
                  <img
                    src={"/logo.png"}
                    alt="logo"
                    className="max-h-10 w-auto object-contain"
                    style={{ maxWidth: "200px" }}
                  />
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <main className="grow w-full flex flex-col justify-between mt-4">
          <div className="grow px-2">
            {filteredMenuSections.map((section, sectionIndex) => (
              <div
                key={sectionIndex}
                className={sectionIndex === 0 ? "" : "mt-2"}
              >
                {/* Section Header */}
                {section.sectionLabel && !collapsed && (
                  <div className="flex items-center gap-2 px-1 py-1.5 mb-1">
                    <span className="text-xs font-semibold tracking-wider text-gray-400 whitespace-nowrap">
                      {section.sectionLabel}
                    </span>
                  </div>
                )}
                <div className="space-y-1">
                  {section.items.map((item, itemIndex) => {
                    if (item.submenu) {
                      // Item with submenu
                      return (
                        <div
                          key={`${item.label}-${itemIndex}`}
                          className="w-full overflow-hidden"
                        >
                          <motion.div
                            onClick={() => toggleSubmenu(item.label)}
                            className={`px-3 py-2.5 flex items-center gap-3 w-full rounded-lg transition-all duration-200 cursor-pointer hover:bg-gray-50 ${
                              collapsed ? "justify-center" : ""
                            }`}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <span
                              className={`shrink-0 ${
                                isItemActive(item)
                                  ? "text-[#0757A7]"
                                  : "text-gray-400"
                              }`}
                              style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              {renderIcon(item.icon, collapsed ? 18 : 16)}
                            </span>
                            {!collapsed && (
                              <motion.span
                                initial={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className={`text-sm font-medium flex-1 ${
                                  isItemActive(item)
                                    ? "text-[#0757A7]"
                                    : "text-gray-600"
                                }`}
                              >
                                {item.label}
                              </motion.span>
                            )}
                            {!collapsed && (
                              <motion.div
                                animate={{
                                  rotate: isSubmenuOpen(item.label) ? 180 : 0,
                                }}
                                transition={{ duration: 0.2 }}
                              >
                                <ChevronDown
                                  size={16}
                                  className="text-gray-400"
                                />
                              </motion.div>
                            )}
                          </motion.div>

                          <AnimatePresence>
                            {!collapsed && isSubmenuOpen(item.label) && (
                              <motion.div
                                className="ml-8 my-1 space-y-1"
                                initial="closed"
                                animate="open"
                                exit="closed"
                                variants={sidebarVariants}
                              >
                                {item.submenu.map((subItem, subIndex) => (
                                  <motion.div
                                    key={subIndex}
                                    variants={subItemVariants}
                                    whileHover={{ x: 3 }}
                                    whileTap={{ x: 0 }}
                                  >
                                    <NavLink
                                      to={subItem.to}
                                      className={({ isActive }) =>
                                        `block px-3 py-2.5 rounded-md transition-all duration-200 ${
                                          isActive
                                            ? "text-[#0757A7]"
                                            : "text-gray-500 hover:bg-gray-50"
                                        }`
                                      }
                                    >
                                      <div className="flex items-center gap-3">
                                        <span className="text-sm font-normal">
                                          {subItem.label}
                                        </span>
                                      </div>
                                    </NavLink>
                                  </motion.div>
                                ))}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    }

                    // Leaf item
                    return (
                      <div
                        key={`${item.label}-${itemIndex}`}
                        className="w-full overflow-hidden"
                      >
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <NavLink
                            to={item.to!}
                            onClick={() => {
                              if (collapsed) {
                                toggleSidebar();
                              }
                            }}
                          >
                            <div
                              className={`px-3 py-2.5 flex items-center gap-3 rounded-lg transition-all duration-200 hover:bg-gray-50 ${
                                collapsed ? "justify-center" : ""
                              }`}
                            >
                              <span
                                className={`shrink-0 ${
                                  location.pathname === item.to
                                    ? "text-[#0757A7]"
                                    : "text-gray-400"
                                }`}
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                }}
                              >
                                {renderIcon(item.icon, collapsed ? 18 : 16)}
                              </span>
                              {!collapsed && (
                                <span
                                  className={`text-sm font-medium ${
                                    location.pathname === item.to
                                      ? "text-[#0757A7]"
                                      : "text-gray-600"
                                  }`}
                                >
                                  {item.label}
                                </span>
                              )}
                            </div>
                          </NavLink>
                        </motion.div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Logout Button */}
          <div className="p-2 border-t border-gray-200">
            <button
              onClick={handleLogout}
              className={`w-full flex items-center cursor-pointer justify-center gap-2 py-2 rounded-lg text-green-600 hover:bg-green-50 border border-green-200 transition-all ${
                collapsed ? "px-2" : "px-3"
              }`}
              title={collapsed ? "Logout" : ""}
            >
              <LogOut size={18} />
              <AnimatePresence>
                {!collapsed && (
                  <motion.span
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "auto" }}
                    exit={{ opacity: 0, width: 0 }}
                    className="text-sm font-medium cursor-pointer overflow-hidden whitespace-nowrap"
                  >
                    Logout
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </main>
      </div>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={toggleMobileSidebar}
        />
      )}
    </motion.aside>
  );
};

export default Sidebar;
