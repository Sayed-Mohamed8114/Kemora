import {
  BriefcaseBusiness,
  CheckCircle2,
  XCircle,
  Clock,
  Activity,
  ClipboardList,
  TrendingUp,
  CircleDashed,
} from "lucide-react";

export default function ServiceStatisticsCard({ serviceService }) {
  const serviceData = serviceService ?? {};

  const requestsByStatus = serviceData.requests_by_status ?? {
    pending: 0,
    approved: 0,
    rejected: 0,
    in_progress: 0,
    completed: 0,
    cancelled: 0,
  };

  const mostRequested = serviceData.most_requested_service ?? null;

  const statistics = [
    {
      label: "Active Services",
      value: serviceData.active_services ?? 0,
      icon: CheckCircle2,
      color: "text-emerald-600 dark:text-emerald-400",
      bg: "bg-emerald-100 dark:bg-emerald-400/10",
    },
    {
      label: "Inactive Services",
      value: serviceData.inactive_services ?? 0,
      icon: XCircle,
      color: "text-rose-600 dark:text-rose-400",
      bg: "bg-rose-100 dark:bg-rose-400/10",
    },
    {
      label: "Total Requests",
      value: serviceData.total_requests ?? 0,
      icon: ClipboardList,
      color: "text-blue-600 dark:text-blue-400",
      bg: "bg-blue-100 dark:bg-blue-400/10",
    },
    {
      label: "Completed Requests",
      value: requestsByStatus.completed,
      icon: CheckCircle2,
      color: "text-teal-600 dark:text-teal-400",
      bg: "bg-teal-100 dark:bg-teal-400/10",
    },
  ];

  const requestStatuses = [
    {
      label: "Pending",
      value: requestsByStatus.pending,
      icon: Clock,
      color: "text-amber-600 dark:text-amber-400",
      bg: "bg-amber-100 dark:bg-amber-400/10",
    },
    {
      label: "Approved",
      value: requestsByStatus.approved,
      icon: CheckCircle2,
      color: "text-blue-600 dark:text-blue-400",
      bg: "bg-blue-100 dark:bg-blue-400/10",
    },
    {
      label: "In Progress",
      value: requestsByStatus.in_progress,
      icon: Activity,
      color: "text-violet-600 dark:text-violet-400",
      bg: "bg-violet-100 dark:bg-violet-400/10",
    },
    {
      label: "Rejected",
      value: requestsByStatus.rejected,
      icon: XCircle,
      color: "text-rose-600 dark:text-rose-400",
      bg: "bg-rose-100 dark:bg-rose-400/10",
    },
    {
      label: "Cancelled",
      value: requestsByStatus.cancelled,
      icon: CircleDashed,
      color: "text-slate-600 dark:text-slate-400",
      bg: "bg-slate-100 dark:bg-white/5",
    },
  ];

  return (
    <article
      className="
        group relative overflow-hidden
        rounded-2xl border border-slate-200
        bg-white p-5 shadow-sm
        transition-all duration-300
        hover:-translate-y-1 hover:shadow-lg
        hover:shadow-amber-900/5
        dark:border-white/10 dark:bg-[#1c1c1c]
        
        dark:hover:border-amber-400/30
        sm:p-6
      "
    >
      {/* Top Accent */}
      <div
        className="
          absolute left-0 top-0 h-1 w-full
          bg-linear-to-r from-gold-light
          via-amber-400 to-transparent
        "
      />

      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
            Platform Overview
          </p>

          <h2 className="mt-1 font-cinzel text-lg font-bold text-slate-900 dark:text-white sm:text-xl">
            Service Statistics
          </h2>
        </div>

        <div
          className="
            flex size-11 shrink-0 items-center justify-center
            rounded-xl bg-amber-100 text-amber-700
            dark:bg-amber-400/10 dark:text-amber-400
          "
        >
          <BriefcaseBusiness size={22} />
        </div>
      </div>

      {/* Total Services */}
      <div className="mt-6 flex flex-wrap items-center justify-center gap-4 sm:gap-10">
        <p className="text-sm font-bold text-slate-500 dark:text-slate-400">
          Total Services
        </p>

        <p className="font-cinzel text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
          {serviceData.total_services ?? 0}
        </p>
      </div>

      <div className="my-6 h-px bg-slate-200 dark:bg-white/10" />

      {/* Main Statistics */}
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
        {statistics.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.label}
              className="
                flex min-w-0 items-center gap-3
                rounded-xl border border-slate-100
                bg-slate-50 p-3
                transition-colors duration-200
                hover:border-slate-200
                dark:border-white/5 dark:bg-white/3
                dark:hover:border-white/10
                sm:p-4
              "
            >
              <div
                className={`flex size-10 shrink-0 items-center justify-center rounded-lg ${stat.bg} ${stat.color}`}
              >
                <Icon size={19} />
              </div>

              <div className="min-w-0">
                <p className="truncate text-xs font-medium text-slate-500 dark:text-slate-400 sm:text-sm">
                  {stat.label}
                </p>

                <p className="mt-1 text-xl font-bold text-slate-900 dark:text-white">
                  {stat.value}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Requests by Status */}
      <div className="my-6 h-px bg-slate-200 dark:bg-white/10" />

      <div className="flex items-center gap-2">
        <ClipboardList
          size={18}
          className="text-amber-600 dark:text-amber-400"
        />

        <h3 className="font-cinzel text-base font-bold text-slate-900 dark:text-white">
          Requests by Status
        </h3>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
        {requestStatuses.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.label}
              className="
                flex min-w-0 items-center gap-3
                rounded-xl border border-slate-100
                bg-slate-50 p-3
                transition-colors duration-200
                hover:border-slate-200
                dark:border-white/5 dark:bg-white/3
                dark:hover:border-white/10
              "
            >
              <div
                className={`flex size-9 shrink-0 items-center justify-center rounded-lg ${stat.bg} ${stat.color}`}
              >
                <Icon size={17} />
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-medium text-slate-500 dark:text-slate-400">
                  {stat.label}
                </p>

                <p className="mt-1 text-lg font-bold text-slate-900 dark:text-white">
                  {stat.value}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Most Requested Service */}
      <div className="my-6 h-px bg-slate-200 dark:bg-white/10" />

      <div
        className="
          rounded-xl border border-amber-200/70
          bg-amber-50/70 p-4
          dark:border-amber-400/15 dark:bg-amber-400/5
        "
      >
        <div className="flex items-center gap-2">
          <TrendingUp
            size={19}
            className="text-amber-600 dark:text-amber-400"
          />

          <p className="text-sm font-semibold text-slate-600 dark:text-slate-300">
            Most Requested Service
          </p>
        </div>

        {mostRequested ? (
          <>
            <h3 className="mt-3 wrap-break-word font-cinzel text-lg font-bold text-slate-900 dark:text-white">
              {mostRequested.name}
            </h3>

            <div className="mt-2 flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs text-slate-500 dark:text-slate-400">
                Service ID: {mostRequested.id}
              </span>

              <span
                className="
                  rounded-lg bg-amber-100 px-3 py-1.5
                  text-sm font-bold text-amber-700
                  dark:bg-amber-400/10 dark:text-amber-400
                "
              >
                {mostRequested.request_count ?? 0}{" "}
                {(mostRequested.request_count ?? 0) === 1
                  ? "Request"
                  : "Requests"}
              </span>
            </div>
          </>
        ) : (
          <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
            No service requests yet.
          </p>
        )}
      </div>

      <p className="mt-5 text-xs text-slate-400 dark:text-slate-500">
        Overview of available services and customer requests
      </p>
    </article>
  );
}
