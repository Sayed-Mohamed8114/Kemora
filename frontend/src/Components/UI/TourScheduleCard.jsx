import { useAuth } from "@/Context/AuthContext";
import {
  CalendarDays,
  Clock3,
  Users,
  MapPin,
  Pencil,
  Trash2,
  UserRound,
  ArrowUpRight,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { toast } from "sonner";

const API_URL = "http://localhost:8000";

export default function TourScheduleCard({
  schedule,
  bookedSeats = 0,
  onEdit,
  onDelete,
  onBook,
  onManage,
}) {

  const { user } = useAuth();

  const canManage = user?.role === "staff" || user?.role === "super_admin";

  const tour = schedule.tour;

  const availableSeats = Math.max(
    0,
    schedule.capacity - bookedSeats,
  );

  const isAvailable =
    schedule.status === "available" && availableSeats > 0;

  const formatDate = (date) => {
    if (!date) return "N/A";

    return new Date(`${date}T00:00:00`).toLocaleDateString(
      "en-GB",
      {
        day: "numeric",
        month: "short",
        year: "numeric",
      },
    );
  };

  const formatTime = (time) => {
    if (!time) return "N/A";

    const [hours, minutes] = time.split(":");

    return new Date(2000, 0, 1, hours, minutes).toLocaleTimeString(
      "en-US",
      {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      },
    );
  };

  const formatDateTime = (dateTime) => {
    if (!dateTime) return "N/A";

    return new Date(dateTime).toLocaleString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  };

  const getStatusStyle = () => {
    switch (schedule.status) {
      case "available":
        return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400";

      case "full":
        return "bg-amber-500/10 text-amber-600 dark:text-amber-400";

      case "completed":
        return "bg-blue-500/10 text-blue-600 dark:text-blue-400";

      case "cancelled":
        return "bg-red-500/10 text-red-600 dark:text-red-400";

      default:
        return "bg-slate-500/10 text-slate-600 dark:text-slate-400";
    }
  };

  const handleBook = () => {
    if (!user) {
      toast.error("Please login first to book this schedule.");
      return;
    }

    if (user.role !== "customer") {
      toast.error("Only customers can book schedules.");
      return;
    }

    if (!isAvailable) {
      toast.error("This schedule is not available for booking.");
      return;
    }

    onBook?.(schedule);
  };

  const handleDelete = () => {
    onDelete?.(schedule.id);
  };

  return (
    <article
      className="
        flex h-full w-full flex-col overflow-hidden
        rounded-xl border border-black/10
        bg-white/30 backdrop-blur-sm
        dark:border-gold-light/20 dark:bg-black/30
      "
    >
      <div className="relative h-44 w-full overflow-hidden">
        {tour?.image_url ? (
          <img
            src={`${API_URL}${tour.image_url}`}
            alt={tour.title}
            className="
              h-full w-full object-cover
              transition-transform duration-500
              hover:scale-105
            "
          />
        ) : (
          <div
            className="
              flex h-full items-center justify-center
              bg-slate-100 text-sm text-slate-400
              dark:bg-white/5
            "
          >
            No image available
          </div>
        )}

        <span
          className={`
            absolute right-3 top-3 rounded-full
            px-3 py-1 text-xs font-semibold
            capitalize backdrop-blur-md
            ${getStatusStyle()}
          `}
        >
          {schedule.status}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-4 p-4">
        <div>
          <h2
            className="
              line-clamp-1 px-1 font-cinzel
              text-xl font-bold text-dark-border
              dark:text-light-border
            "
          >
            {tour?.title ?? "Tour schedule"}
          </h2>

          <div
            className="
              mt-2 flex items-center gap-2 px-1
              text-sm text-gold-dark dark:text-gold-light
            "
          >
            <MapPin size={15} />
            <span className="line-clamp-1">
              {tour?.location ?? "Location unavailable"}
            </span>
          </div>

          <p
            className="
              mt-3 line-clamp-3 text-sm leading-5
              text-dark-border/70 dark:text-light-border/70
            "
          >
            {tour?.description}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div
            className="
              rounded-lg border border-black/5
              bg-black/3 p-3
              dark:border-white/10 dark:bg-white/3
            "
          >
            <div className="mb-2 flex items-center gap-2 text-gold-dark dark:text-gold-light">
              <CalendarDays size={16} />
              <span className="text-xs font-medium">Start date</span>
            </div>

            <p className="text-sm font-bold text-dark-border dark:text-light-border">
              {formatDate(schedule.start_date)}
            </p>
          </div>

          <div
            className="
              rounded-lg border border-black/5
              bg-black/3 p-3
              dark:border-white/10 dark:bg-white/3
            "
          >
            <div className="mb-2 flex items-center gap-2 text-gold-dark dark:text-gold-light">
              <Clock3 size={16} />
              <span className="text-xs font-medium">Start time</span>
            </div>

            <p className="text-sm font-bold text-dark-border dark:text-light-border">
              {formatTime(schedule.start_time)}
            </p>
          </div>
        </div>

        {/* Capacity and available seats */}
        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center gap-3">
            <Users
              size={19}
              className="shrink-0 text-gold-dark dark:text-gold-light"
            />

            <div>
              <p className="text-xs text-dark-border/60 dark:text-light-border/60">
                Total capacity
              </p>
              <p className="font-bold text-dark-border dark:text-light-border">
                {schedule.capacity}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {isAvailable ? (
              <CheckCircle2
                size={19}
                className="shrink-0 text-emerald-500"
              />
            ) : (
              <AlertCircle
                size={19}
                className="shrink-0 text-amber-500"
              />
            )}

            <div>
              <p className="text-xs text-dark-border/60 dark:text-light-border/60">
                Available seats
              </p>
              <p className="font-bold text-dark-border dark:text-light-border">
                {availableSeats}
              </p>
            </div>
          </div>
        </div>

        {/* Price */}
        <div
          className="
            flex items-center justify-between
            border-t border-black/10 pt-3
            dark:border-gold-light/20
          "
        >
          <span className="text-sm text-dark-border/70 dark:text-light-border/70">
            Price per person
          </span>

          <span className="font-bold text-gold-dark dark:text-gold-light">
            ${tour?.price ?? "0.00"}
          </span>
        </div>

        {/* Management details: staff and super admin only */}
        {canManage && (
          <div
            className="
              space-y-3 rounded-lg border
              border-black/10 bg-black/3 p-3
              dark:border-gold-light/15 dark:bg-white/3
            "
          >
            <h3 className="font-cinzel text-sm font-bold text-dark-border dark:text-light-border">
              Management details
            </h3>

            <div className="flex items-start gap-2">
              <UserRound
                size={16}
                className="mt-0.5 shrink-0 text-gold-dark dark:text-gold-light"
              />

              <div className="min-w-0">
                <p className="text-xs text-dark-border/60 dark:text-light-border/60">
                  Tour created by
                </p>

                <p className="wrap-break-word text-sm font-semibold text-dark-border dark:text-light-border">
                  {tour?.creator?.name ?? "Unknown"}
                </p>

                <p className="break-all text-xs text-dark-border/60 dark:text-light-border/60">
                  {tour?.creator?.email ?? ""}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-2 text-xs text-dark-border/70 dark:text-light-border/70">
              <p>
                <span className="font-semibold">Tour ID:</span>{" "}
                {tour?.id ?? "N/A"}
              </p>

              <p>
                <span className="font-semibold">Schedule ID:</span>{" "}
                {schedule.id}
              </p>

              <p>
                <span className="font-semibold">Created at:</span>{" "}
                {formatDateTime(schedule.created_at)}
              </p>

              <p>
                <span className="font-semibold">Last updated:</span>{" "}
                {formatDateTime(schedule.updated_at)}
              </p>

              <p>
                <span className="font-semibold">Created by user ID:</span>{" "}
                {tour?.created_by ?? "N/A"}
              </p>
            </div>
          </div>
        )}

        <div className="mt-auto flex gap-2 pt-1">
          {canManage ? (
            <>
              {onManage && (
                <button
                  type="button"
                  onClick={() => onManage(schedule)}
                  className="
                    flex flex-1 items-center justify-center gap-2
                    rounded-lg bg-dark-bg px-3 py-2.5
                    text-sm font-bold text-gold-light
                    transition duration-300 hover:opacity-90
                    dark:bg-gold-light dark:text-dark-bg
                  "
                >
                  <ArrowUpRight size={16} />
                  Manage
                </button>
              )}

              {onEdit && (
                <button
                  type="button"
                  onClick={() => onEdit(schedule)}
                  aria-label="Edit schedule"
                  className="
                    flex items-center justify-center rounded-lg
                    border border-black/10 px-3 py-2.5
                    text-gold-dark transition hover:bg-black/5
                    dark:border-gold-light/20 dark:text-gold-light
                    dark:hover:bg-white/5
                  "
                >
                  <Pencil size={16} />
                </button>
              )}

              {onDelete && (
                <button
                  type="button"
                  onClick={handleDelete}
                  aria-label="Delete schedule"
                  className="
                    flex items-center justify-center rounded-lg
                    border border-red-500/20 bg-red-500/10
                    px-3 py-2.5 text-red-600
                    transition hover:bg-red-500/20
                    dark:text-red-400
                  "
                >
                  <Trash2 size={16} />
                </button>
              )}
            </>
          ) : (
            <button
              type="button"
              onClick={handleBook}
              disabled={!isAvailable || user?.role !== "customer"}
              className="
                flex w-full items-center justify-center gap-2
                rounded-lg bg-dark-bg px-3 py-3
                text-sm font-bold text-gold-light
                transition duration-300 hover:opacity-90
                disabled:cursor-not-allowed disabled:opacity-50
                dark:bg-gold-light dark:text-dark-bg
              "
            >
              {isAvailable ? "Book this schedule" : "Not available"}
              <ArrowUpRight size={16} />
            </button>
          )}
        </div>
      </div>
    </article>
  );
}