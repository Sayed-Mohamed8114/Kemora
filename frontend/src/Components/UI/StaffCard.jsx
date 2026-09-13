import { Mail, UserRound } from "lucide-react";

export default function StaffCard({ staff, ondelete, onEdit }) {
  return (
    <article
      className="
        group relative w-[50vh] overflow-hidden rounded-2xl
        border border-slate-200/80 bg-white
        p-5 shadow-sm
        transition-all duration-300
        hover:-translate-y-1 hover:shadow-xl
        dark:border-white/10 dark:bg-[#171717]
      "
    >
      <div
        className="
          pointer-events-none absolute -right-12 -top-12
          h-32 w-32 rounded-full
          bg-[#C9A227]/10 blur-3xl
          transition-opacity duration-300
          group-hover:opacity-100
        "
      />

      <div className="relative">
        <div className="flex items-start justify-between gap-4">
          <div className="flex min-w-0 items-center gap-3">
            <div
              className="
                flex h-12 w-12 shrink-0 items-center justify-center
                rounded-xl
                border border-[#C9A227]/30
                bg-[#C9A227]/10
                text-[#C9A227]
              "
            >
              <UserRound size={22} strokeWidth={1.8} />
            </div>

            <div className="min-w-0">
              <h3
                className="
                  truncate text-base font-semibold
                  text-slate-900
                  dark:text-white
                "
              >
                {staff.name}
              </h3>

              <p
                className="
                  mt-0.5 text-xs font-medium uppercase
                  tracking-wider text-slate-500
                  dark:text-slate-400
                "
              >
                Staff Member
              </p>
            </div>
          </div>

          <span
            className={`
              inline-flex shrink-0 items-center gap-1.5
              rounded-full px-2.5 py-1
              text-xs font-semibold
              ${
                staff.is_active
                  ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                  : "bg-red-500/10 text-red-600 dark:text-red-400"
              }
            `}
          >
            {staff.is_active ? "Active" : "Inactive"}
          </span>
        </div>

        <div className="my-5 h-px bg-slate-200 dark:bg-white/10" />

        <div className="flex items-center gap-3">
          <div
            className="
              flex h-9 w-9 shrink-0 items-center justify-center
              rounded-lg bg-slate-100
              text-slate-500
              dark:bg-white/5 dark:text-slate-400
            "
          >
            <Mail size={17} />
          </div>

          <div className="min-w-0">
            <p className="text-[11px] font-medium uppercase tracking-wider text-slate-400">
              Email
            </p>

            <p
              className="
                mt-0.5 truncate text-sm font-medium
                text-slate-700
                dark:text-slate-200
              "
              title={staff.email}
            >
              {staff.email}
            </p>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-end gap-5">
          <div className="flex items-center gap-2">
            <span className="text-sm text-slate-500 dark:text-slate-400">
              Role
            </span>
          </div>

          <span
            className="
              rounded-lg border border-[#C9A227]/20
              bg-[#C9A227]/10
              px-3 py-1
              text-xs font-semibold capitalize
              text-[#A88318]
              dark:text-[#D8B94A]
            "
          >
            {staff.role}
          </span>
        </div>

        <div className="items-center flex justify-between px-8 mt-5 w-full">
          <button
            onClick={() => onEdit(staff)}
            className="
    rounded-md
    border border-gold-dark/30
    bg-gold-dark/10
    px-4 py-1
    text-sm font-semibold
    text-gold-dark
    transition-colors
    duration-300
    hover:bg-gold-dark
    hover:text-white
    dark:border-gold-light/30
    dark:bg-gold-light/10
    dark:text-gold-light
    dark:hover:bg-gold-light
    dark:hover:text-slate-900
  "
          >
            Edit
          </button>{" "}
          <button
            onClick={() => ondelete(staff.id)}
            className="bg-red-700 text-lg font-serif font-bold w-[35%] text-light-border hover:bg-red-500 hover:text-white cursor-pointer duration-700 px-4 py-1 rounded-md transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </article>
  );
}
