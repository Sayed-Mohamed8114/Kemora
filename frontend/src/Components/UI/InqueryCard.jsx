import { Mail, UserRound, MessageSquare } from "lucide-react";

export default function InqueryCard({ inquiry, onDelete }) {
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
              <UserRound size={22} strokeWidth={1.8} />
            </div>

            <div className="min-w-0">
              <h3
                className="
                  truncate text-base font-semibold
                  text-slate-900
                  dark:text-white
                "
                title={inquiry.name}
              >
                {inquiry.name}
              </h3>

              <p
                className="
                  mt-0.5 text-xs font-medium uppercase
                  tracking-wider text-slate-500
                  dark:text-slate-400
                "
              >
                Customer Inquiry
              </p>
            </div>
          </div>

          <div
            className="
              flex shrink-0 items-center gap-1.5
              rounded-full
              bg-[#C9A227]/10
              px-2.5 py-1
              text-xs font-semibold
              text-[#A88318]
              dark:text-[#D8B94A]
            "
          >
            <MessageSquare size={13} />
            Inquiry
          </div>
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
            <p
              className="
                text-[11px] font-medium uppercase
                tracking-wider text-slate-400
              "
            >
              Email
            </p>

            <p
              className="
                mt-0.5 truncate text-sm font-medium
                text-slate-700
                dark:text-slate-200
              "
              title={inquiry.email}
            >
              {inquiry.email}
            </p>
          </div>
        </div>

        <div className="mt-5">
          <p
            className="
              text-[11px] font-medium uppercase
              tracking-wider text-slate-400
            "
          >
            Subject
          </p>

          <h4
            className="
              mt-1 truncate text-base font-semibold
              text-slate-800
              dark:text-slate-100
            "
            title={inquiry.subject}
          >
            {inquiry.subject}
          </h4>
        </div>

        <div className="mt-4">
          <p
            className="
              text-[11px] font-medium uppercase
              tracking-wider text-slate-400
            "
          >
            Message
          </p>

          <p
            className="
              mt-1 line-clamp-3 text-sm leading-6
              text-slate-600
              dark:text-slate-300
            "
            title={inquiry.message}
          >
            {inquiry.message}
          </p>
        </div>

        <div className="mt-5 flex w-full items-center justify-start gap-5 px-2">
          <button
            onClick={() => onDelete(inquiry.id)}
            className="
              flex w-[45%] cursor-pointer items-center justify-center gap-2
              rounded-md
              bg-red-700
              px-4 py-2
              text-[14px] font-semibold
              text-light-border
              transition-colors duration-700 
              pointer-cursor
              hover:bg-red-500 hover:text-white
            "
          >
            Delete
          </button>
        </div>
      </div>
    </article>
  );
}