import {
  Users,
  ShieldCheck,
  UserRound,
  UserCheck,
  UserX,
} from "lucide-react";

export default function UserStatisticsCard({ userService }) {
  const statistics = [
    {
      label: "Admins",
      value: userService.super_admins,
      icon: ShieldCheck,
      color: "text-amber-600 dark:text-amber-400",
      bg: "bg-amber-100 dark:bg-amber-400/10",
    },
    {
      label: "Staff Members",
      value: userService.staff,
      icon: UserRound,
      color: "text-blue-600 dark:text-blue-400",
      bg: "bg-blue-100 dark:bg-blue-400/10",
    },
    {
      label: "Active Users",
      value: userService.active_users,
      icon: UserCheck,
      color: "text-emerald-600 dark:text-emerald-400",
      bg: "bg-emerald-100 dark:bg-emerald-400/10",
    },
    {
      label: "Inactive Users",
      value: userService.inactive_users,
      icon: UserX,
      color: "text-rose-600 dark:text-rose-400",
      bg: "bg-rose-100 dark:bg-rose-400/10",
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
        w-full xl:w-auto
        sm:p-6
      "
    >
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
            User Statistics
          </h2>
        </div>

        <div
          className="
            flex size-11 shrink-0 items-center justify-center
            rounded-xl bg-amber-100 text-amber-700
            dark:bg-amber-400/10 dark:text-amber-400
          "
        >
          <Users size={22} />
        </div>
      </div>

      <div className="mt-6 flex  items-center justify-center gap-10">
        <p className="text-sm font-bold text-slate-500 dark:text-slate-400">
          Total Registered Users
        </p>

        <div className="mt-2 flex flex-wrap items-end justify-between gap-3">
          <p className="text-xl font-bold font-cinzel tracking-tight text-slate-900 dark:text-white sm:text-5xl">
            {userService.total_users}
          </p>
        </div>
      </div>

      <div className="my-6 h-px bg-slate-200 dark:bg-white/10" />

      <div className="grid grid-cols-1 gap-3 min-[380px]:grid-cols-2">
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

      <p className="mt-5 text-xs text-slate-400 dark:text-slate-500">
        Overview of registered platform accounts
      </p>
    </article>
  );
}
