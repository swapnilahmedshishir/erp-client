import { useLocation, NavLink, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, X } from "lucide-react";
import { useState } from "react";
import { menuSections, type MenuItem } from "./sidebarMenuConfig";
import { cloneElement, isValidElement } from "react";
import type { ReactElement } from "react";

const sidebarVariants = {
  open: {
    opacity: 1,
    height: "auto",
    transition: { staggerChildren: 0.04, when: "beforeChildren" },
  },
  closed: {
    opacity: 0,
    height: 0,
    transition: {
      staggerChildren: 0.04,
      staggerDirection: -1,
      when: "afterChildren",
    },
  },
};

const subItemVariants = {
  open: {
    y: 0,
    opacity: 1,
    transition: { y: { stiffness: 1000, velocity: -100 } },
  },
  closed: { y: -10, opacity: 0, transition: { y: { stiffness: 1000 } } },
};

const renderIcon = (icon: MenuItem["icon"]) => {
  if (!isValidElement(icon)) return icon;
  return cloneElement(
    icon as ReactElement<{ size?: number; className?: string }>,
    {
      size: 18,
      className: "w-[18px] h-[18px]",
    },
  );
};

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function MobileDrawer({ open, onClose }: Props) {
  const location = useLocation();
  const [openSubmenus, setOpenSubmenus] = useState<Record<string, boolean>>({});

  const toggle = (label: string) =>
    setOpenSubmenus((p) => ({ ...p, [label]: !p[label] }));

  const isItemActive = (item: MenuItem) => {
    if (item.submenu)
      return item.submenu.some((s) => location.pathname === s.to);
    return location.pathname === item.to;
  };

  const isOpen = (label: string) => Boolean(openSubmenus[label]);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={onClose}
          />

          {/* Drawer panel */}
          <motion.div
            key="drawer"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed left-0 top-0 h-full w-65 bg-white z-50 flex flex-col shadow-xl lg:hidden"
          >
            {/* Header */}
            <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200 shrink-0">
              <Link to="/admin/home" onClick={onClose}>
                <img
                  src="/tslogo.png"
                  alt="logo"
                  className="h-8 w-auto object-contain"
                />
              </Link>
              <button
                onClick={onClose}
                className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
                aria-label="Close menu"
              >
                <X size={18} className="text-gray-500" />
              </button>
            </div>

            {/* Nav items */}
            <div className="flex-1 overflow-y-auto py-3 px-2">
              {menuSections.map((section, si) => (
                <div key={si} className={si > 0 ? "mt-3" : ""}>
                  {section.sectionLabel && (
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 px-2 py-1.5">
                      {section.sectionLabel}
                    </p>
                  )}
                  <div className="space-y-0.5">
                    {section.items.map((item, ii) => {
                      const active = isItemActive(item);

                      if (item.submenu) {
                        return (
                          <div key={ii} className="overflow-hidden">
                            <button
                              onClick={() => toggle(item.label)}
                              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors ${
                                active
                                  ? "bg-[#005BAB]/8 text-[#005BAB]"
                                  : "text-gray-600 hover:bg-gray-50"
                              }`}
                            >
                              <span
                                className={
                                  active ? "text-[#005BAB]" : "text-gray-400"
                                }
                              >
                                {renderIcon(item.icon)}
                              </span>
                              <span className="text-sm font-medium flex-1">
                                {item.label}
                              </span>
                              <motion.div
                                animate={{
                                  rotate: isOpen(item.label) ? 180 : 0,
                                }}
                                transition={{ duration: 0.2 }}
                              >
                                <ChevronDown
                                  size={15}
                                  className="text-gray-400"
                                />
                              </motion.div>
                            </button>

                            <AnimatePresence>
                              {isOpen(item.label) && (
                                <motion.div
                                  initial="closed"
                                  animate="open"
                                  exit="closed"
                                  variants={sidebarVariants}
                                  className="ml-9 mt-0.5 space-y-0.5"
                                >
                                  {item.submenu.map((sub, subi) => (
                                    <motion.div
                                      key={subi}
                                      variants={subItemVariants}
                                    >
                                      <NavLink
                                        to={sub.to}
                                        onClick={onClose}
                                        className={({ isActive }) =>
                                          `block px-3 py-2 rounded-md text-sm transition-colors ${
                                            isActive
                                              ? "text-[#005BAB] bg-[#005BAB]/8 border-l-2 border-[#005BAB]"
                                              : "text-gray-500 hover:bg-gray-50"
                                          }`
                                        }
                                      >
                                        {sub.label}
                                      </NavLink>
                                    </motion.div>
                                  ))}
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        );
                      }

                      return (
                        <NavLink
                          key={ii}
                          to={item.to!}
                          onClick={onClose}
                          className={({ isActive }) =>
                            `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                              isActive
                                ? "bg-[#005BAB]/8 text-[#005BAB]"
                                : "text-gray-600 hover:bg-gray-50"
                            }`
                          }
                        >
                          {({ isActive }) => (
                            <>
                              <span
                                className={
                                  isActive ? "text-[#005BAB]" : "text-gray-400"
                                }
                              >
                                {renderIcon(item.icon)}
                              </span>
                              {item.label}
                            </>
                          )}
                        </NavLink>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
