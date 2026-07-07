import {
  House,
  ShoppingCart,
  Package2,
  Users,
  FileText,
  Mail,
  Settings,
  Bell,
} from "lucide-react";

export interface SubMenuItem {
  label: string;
  to: string;
}

export interface MenuItem {
  label: string;
  icon: React.ReactNode;
  to?: string;
  submenu?: SubMenuItem[];
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
      },
    ],
  },

  {
    sectionLabel: "PRODUCTS",
    items: [
      {
        label: "Products",
        icon: <Package2 size={20} />,
        submenu: [
          { label: "All Products", to: "/all-product" },
          { label: "Offers Products", to: "/offers" },
        ],
      },
    ],
  },
  {
    sectionLabel: "ORDERS & SALES",
    items: [
      {
        label: "Sales",
        icon: <ShoppingCart size={20} />,
        to: "/sales",
      },
      {
        label: "Order",
        icon: <FileText size={20} />,
        to: "/order",
      },
    ],
  },

  {
    sectionLabel: "SETTINGS",
    items: [
      {
        label: "Notifications",
        icon: <Bell size={20} />,
        to: "/notifications",
      },
      {
        label: "All Users",
        icon: <Users size={20} />,
        to: "/all-users",
      },
      {
        label: "Email",
        icon: <Mail size={20} />,
        to: "/email/inbox",
      },

      {
        label: "Settings",
        icon: <Settings size={20} />,
        to: "/settings",
      },
    ],
  },
];
