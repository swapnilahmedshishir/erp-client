import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/layout/Sidebar";
import TopMenuBar from "../components/layout/TopMenuBar";
import MobileDrawer from "../components/layout/MobileDrawer";
import MobileTopBar from "../components/layout/MobileTopBar";

const DashboardLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className="relative flex h-screen w-full bg-gray-50 overflow-hidden">
      <div className="hidden lg:block fixed left-0 top-0 h-full z-10">
        <Sidebar
          mobileOpen={false}
          toggleMobileSidebar={() => {}}
          collapsed={collapsed}
          toggleSidebar={() => setCollapsed((c) => !c)}
        />
      </div>
      <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />

      <div
        className={`flex flex-col flex-1 h-screen w-full transition-all duration-300 ease-in-out ${
          collapsed ? "lg:pl-20" : "lg:pl-64"
        }`}
      >
        <div className="no-print fixed top-0 left-0 right-0 z-30">
          {/* Mobile */}
          <MobileTopBar
            onMenuClick={() => setDrawerOpen(true)}
            notificationCount={1}
          />
          {/* Desktop */}
          <div className="hidden lg:block">
            <TopMenuBar collapsed={collapsed} />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto mt-16 lg:mt-18.25 mb-16 lg:mb-0">
          <div className="p-3 md:p-5">
            <Outlet />
          </div>
          <div className="pb-4" />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
