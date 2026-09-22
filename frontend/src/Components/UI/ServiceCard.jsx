import { CalendarDays, Pencil, Trash2, Tag } from "lucide-react";

export default function ServiceCard({ service, onDelete, onEdit }) {
  return (
    <article
      className="
        group relative w-auto md:w-[60vh] lg:w-[45vh] xl:w-[60vh]
        overflow-hidden rounded-2xl
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
              <Tag size={22} strokeWidth={1.8} />
            </div>

            <div className="min-w-0">
              <h3
                className="
                  truncate text-base font-semibold
                  text-slate-900
                  dark:text-white
                "
                title={service.name}
              >
                {service.name}
              </h3>

              <p
                className="
                  mt-0.5 text-xs font-medium uppercase
                  tracking-wider text-slate-500
                  dark:text-slate-400
                "
              >
                Company Service
              </p>
            </div>
          </div>

          <span
            className={`
              inline-flex shrink-0 items-center gap-1.5
              rounded-full px-2.5 py-1
              text-xs font-semibold
              ${
                service.is_active
                  ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                  : "bg-red-500/10 text-red-600 dark:text-red-400"
              }
            `}
          >
            

            {service.is_active ? "Active" : "Inactive"}
          </span>
        </div>

        <div className="my-5 h-px bg-slate-200 dark:bg-white/10" />

        <div>
          <p
            className="
              text-[11px] font-medium uppercase
              tracking-wider text-slate-400
            "
          >
            Description
          </p>

          <p
            className="
              mt-2 line-clamp-3
              text-sm leading-6
              text-slate-600
              dark:text-slate-300
            "
            title={service.description}
          >
            {service.description}
          </p>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-4">
          <div
            className="
              rounded-xl border
              border-[#C9A227]/20
              bg-[#C9A227]/5
              p-3
            "
          >
            <p
              className="
                text-[11px] font-medium uppercase
                tracking-wider text-slate-400
              "
            >
              Price
            </p>

            <p
              className="
                mt-1 text-lg font-bold
                text-[#A88318]
                dark:text-[#D8B94A]
              "
            >
              ${service.price}
            </p>
          </div>

          <div
            className="
              rounded-xl
              border border-slate-200
              bg-slate-50
              p-3
              dark:border-white/10
              dark:bg-white/5
            "
          >
            <p
              className="
                text-[11px] font-medium uppercase
                tracking-wider text-slate-400
              "
            >
              Created
            </p>

            <div className="mt-1 flex items-center gap-1.5">
              <CalendarDays
                size={14}
                className="text-slate-400"
              />

              <p
                className="
                  text-xs font-medium
                  text-slate-600
                  dark:text-slate-300
                "
              >
                {new Date(service.created_at).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        <div
          className="
            mt-8 flex w-full
            items-center justify-center
            gap-4 px-4
          "
        >
          <button
            type="button"
            onClick={() => onEdit(service)}
            className="
              flex w-[40%]
              items-center justify-center gap-2
              rounded-md
              bg-gold-dark
              px-4 py-2
              text-sm md:text-base
              font-semibold
              text-light-border
              transition-colors
              duration-500
              hover:text-white
              dark:hover:bg-gold-light
              dark:hover:text-slate-900
              cursor-pointer
            "
          >
            <Pencil size={16} />
            Edit
          </button>

          <button
            type="button"
            onClick={() => onDelete(service.id)}
            className="
              flex w-[40%]
              items-center justify-center gap-2
              rounded-md
              bg-red-700
              px-4 py-2
              text-sm md:text-base
              font-serif font-bold
              text-light-border
              transition-colors
              duration-500
              hover:bg-red-500
              hover:text-white
              cursor-pointer
            "
          >
            <Trash2 size={16} />
            Delete
          </button>
        </div>
      </div>
    </article>
  );
}