import type { ReactNode } from "react";

export default function DashboardCard({
  title,
  value,
  icon,
  accent = "rose"
}: {
  title: string;
  value: string | number;
  icon: ReactNode;
  accent?: "rose" | "amber" | "sky" | "emerald";
}) {
  const accentClasses = {
    rose: "bg-rose-50 text-rose-600",
    amber: "bg-amber-50 text-amber-600",
    sky: "bg-sky-50 text-sky-600",
    emerald: "bg-emerald-50 text-emerald-600"
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-sm text-slate-500">{title}</p>
          <p className="mt-2 text-3xl font-bold text-slate-800">{value}</p>
        </div>
        <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${accentClasses[accent]}`}>
          {icon}
        </div>
      </div>
    </div>
  );
}
