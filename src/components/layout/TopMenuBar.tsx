/* eslint-disable react-hooks/set-state-in-effect */
import { Search, Settings, Maximize2, X, Bell } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";

type TopMenuBarProps = {
  collapsed: boolean;
};

type ActivePanel = "search" | null;

const TopMenuBar = ({ collapsed }: TopMenuBarProps) => {
  const { user } = useAuth();
  const [activePanel, setActivePanel] = useState<ActivePanel>(null);
  const [mobileSearchValue, setMobileSearchValue] = useState("");
  const searchRef = useRef<HTMLDivElement | null>(null);
  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const mobileSearchInputRef = useRef<HTMLInputElement | null>(null);

  const handleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  };

  // Focus input when search opens
  useEffect(() => {
    if (activePanel === "search") {
      if (window.innerWidth < 1024) {
        mobileSearchInputRef.current?.focus();
      } else {
        searchInputRef.current?.focus();
      }
    }
  }, [activePanel]);

  // Close search when clicking outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        activePanel === "search" &&
        searchRef.current &&
        !searchRef.current.contains(e.target as Node)
      ) {
        setActivePanel(null);
        setMobileSearchValue("");
      }
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, [activePanel]);

  // Close search on ESC key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && activePanel === "search") {
        setActivePanel(null);
        setMobileSearchValue("");
      }
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [activePanel]);

  // Clear mobile search value when panel closes
  useEffect(() => {
    if (activePanel !== "search") {
      setMobileSearchValue("");
    }
  }, [activePanel]);

  return (
    <div
      className={`fixed top-0 right-0 h-20 bg-white border-b border-gray-200 flex items-center justify-between px-4 py-3 transition-all duration-300 z-30 ${
        collapsed ? "lg:left-20" : "lg:left-64"
      } left-0`}
    >
      {/* Left Side - Menu and Search */}
      <div className="flex items-center gap-3 flex-1 min-w-0" ref={searchRef}>
        {/* Desktop Search */}
        <div className="hidden lg:flex items-center max-w-120 overflow-hidden">
          <button
            onClick={() =>
              setActivePanel(activePanel === "search" ? null : "search")
            }
            className="h-10 w-10 flex cursor-pointer items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Search"
          >
            <Search size={20} className="text-gray-600" />
          </button>
          <input
            ref={searchInputRef}
            type="text"
            placeholder="Search..."
            className={`ml-2 rounded-lg border border-gray-200 bg-gray-50 py-2 transition-all duration-300 ease-in-out ${
              activePanel === "search"
                ? "w-64 px-3 opacity-100"
                : "w-0 px-0 opacity-0 border-transparent"
            }`}
          />
        </div>

        {/* Mobile Search */}
        <div className="flex lg:hidden items-center w-full">
          <button
            onClick={() =>
              setActivePanel(activePanel === "search" ? null : "search")
            }
            className="h-10 w-10 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors shrink-0"
            aria-label="Search"
          >
            <Search size={20} className="text-gray-600" />
          </button>

          <div
            className={`flex-1 transition-all duration-300 ease-in-out overflow-hidden ${
              activePanel === "search" ? "ml-2 opacity-100" : "w-0 opacity-0"
            }`}
          >
            <div className="flex items-center gap-2">
              <input
                ref={mobileSearchInputRef}
                type="text"
                value={mobileSearchValue}
                onChange={(e) => setMobileSearchValue(e.target.value)}
                placeholder="Search..."
                className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
              {activePanel === "search" && (
                <button
                  onClick={() => {
                    setActivePanel(null);
                    setMobileSearchValue("");
                  }}
                  className="p-2 hover:bg-gray-100 rounded-lg shrink-0 transition-colors"
                  aria-label="Close search"
                >
                  <X size={18} className="text-gray-600" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div
        className={`flex items-center gap-6 shrink-0 transition-all duration-300 ${
          activePanel === "search" ? "lg:flex hidden" : "flex"
        }`}
      >
        <div className="relative">
          <button
            className="relative cursor-pointer flex items-center justify-center text-gray-500 hover:text-gray-700 transition-colors"
            aria-label="Notifications"
          >
            <Bell size={20} />
            <span className="absolute -top-2 -right-1 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white bg-red-500 rounded-full">
              1
            </span>
          </button>
        </div>

        <button
          onClick={handleFullscreen}
          className="cursor-pointer text-gray-500 hover:text-gray-700 transition-colors"
        >
          <Maximize2 size={18} />
        </button>

        <Link
          to="/admin/settings"
          className="cursor-pointer text-gray-500 hover:text-gray-700 transition-colors"
        >
          <Settings size={18} />
        </Link>

        <div>
          <button
            className="flex items-center cursor-pointer gap-2.5 p-1.5 rounded-lg hover:bg-gray-50 transition-colors"
            aria-label="Profile menu"
          >
            <span className="hidden xl:block text-sm font-medium text-gray-700">
              {user?.name || "Admin"}
            </span>
            <div className="w-8 h-8 rounded-full overflow-hidden border border-[#005BAB]/20 bg-[#005BAB]/10 flex items-center justify-center shrink-0">
              <span className="text-[11px] font-semibold text-[#005BAB]">
                {user?.name?.[0]?.toUpperCase() ?? "A"}
              </span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopMenuBar;
