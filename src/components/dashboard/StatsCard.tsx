import type { ReactNode } from "react";
import { TrendingUp } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon?: ReactNode;
  color?: string;
}

const StatsCard = ({
  title,
  value,
  icon,
  color = "bg-slate-900",
}: StatsCardProps) => {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>

          <h3 className="mt-3 text-3xl font-bold text-slate-900">{value}</h3>
        </div>

        <div
          className={`flex h-12 w-12 items-center justify-center rounded-xl text-white ${color}`}
        >
          {icon ?? <TrendingUp size={22} />}
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
