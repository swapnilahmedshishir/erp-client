import {
  House,
  ShoppingCart,
  Package2,
  Users,
  FileText,
  Settings,
  Bell,
} from "lucide-react";
import type { UserRole } from "../../types/auth";

export interface SubMenuItem {
  label: string;
  to: string;
  roles?: UserRole[];
}

export interface MenuItem {
  label: string;
  icon: React.ReactNode;
  to?: string;
  submenu?: SubMenuItem[];
  roles?: UserRole[];
}

export interface MenuSection {
  sectionLabel: string | null;
  items: MenuItem[];
}

export const menuSections: MenuSection[] = [
  {
    sectionLabel: null,
    items: [
      {
        label: "Dashboard",
        icon: <House size={20} />,
        to: "/",
        roles: ["ADMIN", "MANAGER", "EMPLOYEE"],
      },
    ],
  },

  {
    sectionLabel: "PRODUCTS",
    items: [
      {
        label: "Products",
        icon: <Package2 size={20} />,
        roles: ["ADMIN", "MANAGER", "EMPLOYEE"],
        submenu: [
          {
            label: "All Products",
            to: "/products",
            roles: ["ADMIN", "MANAGER", "EMPLOYEE"],
          },
          {
            label: "Add Product",
            to: "/products/create",
            roles: ["ADMIN", "MANAGER"],
          },
        ],
      },
    ],
  },
  {
    sectionLabel: "ORDERS & SALES",
    items: [
      {
        label: "Sales History",
        icon: <ShoppingCart size={20} />,
        to: "/sales",
        roles: ["ADMIN", "MANAGER"],
      },
      {
        label: "Create Sale",
        icon: <FileText size={20} />,
        to: "/sales/create",
        roles: ["ADMIN", "MANAGER", "EMPLOYEE"],
      },
    ],
  },

  {
    sectionLabel: "SETTINGS",
    items: [
      {
        label: "All Users",
        icon: <Users size={20} />,
        to: "/all-users",
        roles: ["ADMIN"],
      },
      {
        label: "Notifications",
        icon: <Bell size={20} />,
        to: "/notifications",
      },

      {
        label: "Settings",
        icon: <Settings size={20} />,
        to: "/settings",
        roles: ["ADMIN"],
      },
    ],
  },
];
