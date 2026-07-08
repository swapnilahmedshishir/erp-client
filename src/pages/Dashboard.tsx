import { DollarSign, Package, ShoppingCart, AlertTriangle } from "lucide-react";

import StatsCard from "../components/dashboard/StatsCard";
import LowStockTable from "../components/dashboard/LowStockTable";

import { useDashboard } from "../hooks/useDashboard";

const Dashboard = () => {
  const { data, isLoading, isError } = useDashboard();

  if (isLoading) {
    return (
      <div className="flex h-80 items-center justify-center">
        <p className="text-slate-500">Loading dashboard...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex h-80 items-center justify-center">
        <p className="text-red-500">Failed to load dashboard data.</p>
      </div>
    );
  }

  const stats = data?.data;

  return (
    <div className="space-y-8">
      {/* Header */}

      <div>
        <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>

        <p className="mt-1 text-sm text-slate-500">
          Welcome to your Inventory & Sales Management Dashboard.
        </p>
      </div>

      {/* Statistics */}

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        <StatsCard
          title="Total Products"
          value={stats?.totalProducts ?? 0}
          icon={<Package size={22} />}
          color="bg-blue-600"
        />

        <StatsCard
          title="Total Sales"
          value={stats?.totalSales ?? 0}
          icon={<ShoppingCart size={22} />}
          color="bg-green-600"
        />

        <StatsCard
          title="Total Revenue"
          value={`৳ ${(stats?.totalRevenue ?? 0).toLocaleString()}`}
          icon={<DollarSign size={22} />}
          color="bg-emerald-600"
        />

        <StatsCard
          title="Low Stock Products"
          value={stats?.lowStockProducts?.length ?? 0}
          icon={<AlertTriangle size={22} />}
          color="bg-red-600"
        />
      </div>

      {/* Low Stock Products */}

      <LowStockTable
        products={stats?.lowStockProducts ?? []}
        loading={isLoading}
      />
    </div>
  );
};

export default Dashboard;
