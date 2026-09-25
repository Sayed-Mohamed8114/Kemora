import {
  CalendarDays,
  User,
  Tag,
  UserRoundCheck,
  Clock,
  Eye,
} from "lucide-react";

export default function RequestCard({ request, onApprove, onReject }) {
  const getStatusStyle = (status) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return "bg-amber-500/10 text-amber-600 dark:text-amber-400";

      case "approved":
        return "bg-blue-500/10 text-blue-600 dark:text-blue-400";

      case "in_progress":
        return "bg-purple-500/10 text-purple-600 dark:text-purple-400";

      case "completed":
        return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400";

      case "rejected":
        return "bg-red-500/10 text-red-600 dark:text-red-400";

      case "cancelled":
        return "bg-slate-500/10 text-slate-600 dark:text-slate-400";

      default:
        return "bg-slate-500/10 text-slate-600 dark:text-slate-400";
    }
  };

  const formatStatus = (status) => {
    if (!status) return "Unknown";

    return status
      .replace("_", " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  const formatDate = (date) => {
    if (!date) return "—";

    return new Date(date).toLocaleDateString();
  };

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
                title={request.service?.name}
              >
                {request.service_name || `Service #${request.service_id}`}
              </h3>

              <p
                className="
                  mt-0.5 text-xs font-medium uppercase
                  tracking-wider text-slate-500
                  dark:text-slate-400
                "
              >
                Service Request
              </p>
            </div>
          </div>

          <span
            className={`
              inline-flex shrink-0 items-center
              rounded-full px-2.5 py-1
              text-xs font-semibold
              ${getStatusStyle(request.status)}
            `}
          >
            {formatStatus(request.status)}
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
            Customer
          </p>

          <div className="mt-2 flex items-center gap-2">
            <User size={15} className="text-[#C9A227]" />

            <p
              className="
                text-sm font-medium
                text-slate-700
                dark:text-slate-300
              "
            >
              {request.customer_name || `Customer #${request.customer_id}`}
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
            Customer Note
          </p>

          <p
            className="
              mt-2 line-clamp-2
              text-sm leading-6
              text-slate-600
              dark:text-slate-300
            "
            title={request.note}
          >
            {request.note || "No note provided."}
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
              Assigned Staff
            </p>

            <div className="mt-1 flex items-center gap-1.5">
              <UserRoundCheck
                size={14}
                className="text-[#A88318] dark:text-[#D8B94A]"
              />

              <p
                className="
                  truncate text-xs font-medium
                  text-slate-600
                  dark:text-slate-300
                "
                title={request.assigned_staff?.name}
              >
                {request.staff_name ||
                  (request.assigned_staff_id
                    ? `Staff #${request.assigned_staff_id}`
                    : "Not assigned")}
              </p>
            </div>
          </div>

          {/* Requested */}
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
              Requested
            </p>

            <div className="mt-1 flex items-center gap-1.5">
              <CalendarDays size={14} className="text-slate-400" />

              <p
                className="
                  text-xs font-medium
                  text-slate-600
                  dark:text-slate-300
                "
              >
                {formatDate(request.requested_at)}
              </p>
            </div>
          </div>
        </div>

        <div
          className="
            mt-4 rounded-xl
            border border-slate-200
            bg-slate-50
            p-3
            dark:border-white/10
            dark:bg-white/5
          "
        >
          <div className="flex items-center gap-2 mb-3">
            <Clock size={15} className="text-[#C9A227]" />

            <p
              className="
                text-[11px] font-medium uppercase 
                tracking-wider text-slate-400
              "
            >
              Timeline
            </p>
          </div>

          <div className="flex gap-2 items-center justify-evenly ">
            <div>
              <p className="text-[10px] text-slate-400">Approved</p>

              <p
                className="
                  mt-1 text-xs font-medium
                  text-slate-600
                  dark:text-slate-300
                "
              >
                {formatDate(request.approved_at)}
              </p>
            </div>

            <div>
              <p className="text-[10px] text-slate-400">Completed</p>

              <p
                className="
                  mt-1 text-xs font-medium
                  text-slate-600
                  dark:text-slate-300
                "
              >
                {formatDate(request.completed_at)}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 flex w-full items-center justify-center gap-3 px-4">
          <button
            type="button"
            onClick={() => onApprove(request.id)}
            className="
      flex w-1/2
      items-center justify-center gap-2
      rounded-md
      bg-green-600
      px-4 py-2
      text-sm md:text-base
      font-semibold
      text-white
      transition-colors
      duration-500
      hover:bg-green-700
      cursor-pointer
    "
          >
            Approve
          </button>

          <button
            type="button"
            onClick={() => onReject(request.id)}
            className="
      flex w-1/2
      items-center justify-center gap-2
      rounded-md
      bg-red-600
      px-4 py-2
      text-sm md:text-base
      font-semibold
      text-white
      transition-colors
      duration-500
      hover:bg-red-700
      cursor-pointer
    "
          >
            Reject
          </button>
        </div>
      </div>
    </article>
  );
}
