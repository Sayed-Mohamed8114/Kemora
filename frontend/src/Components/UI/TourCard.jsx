import { Clock3, MapPin, Pencil, Trash2 } from "lucide-react";

export default function TourCard({ tour, onDelete, onEdit }) {
  const getStatusStyle = () => {
    switch (tour.status) {
      case "published":
        return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400";

      case "archived":
        return "bg-red-500/10 text-red-600 dark:text-red-400";

      case "draft":
      default:
        return "bg-amber-500/10 text-amber-600 dark:text-amber-400";
    }
  };

  const imageUrl = `http://localhost:8000${tour.image_url}`;

  return (
    <div
      className="
        overflow-hidden
        flex flex-col
        w-full
        h-125
        rounded-xl
        border
        border-black/10
        bg-white/30
        backdrop-blur-sm
        dark:border-gold-light/20
        dark:bg-black/30
      "
    >
      <div className="relative h-44 w-full overflow-hidden">
        {tour.image_url ? (
          <img
            src={imageUrl}
            alt={tour.title}
            className="
              h-full w-full
              object-cover
              transition-transform
              duration-500
              hover:scale-105
            "
          />
        ) : (
          <div
            className="
              flex h-full w-full
              items-center justify-center
              bg-slate-100
              text-sm
              text-slate-400
              dark:bg-white/5
              dark:text-slate-500
            "
          >
            No image available
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div>
          <h2
            className="
              line-clamp-1
              font-cinzel
              text-xl font-bold
              text-dark-border
              dark:text-light-border
            "
          >
            {tour.title}
          </h2>

          <div
            className="
              mt-1
              flex items-center gap-1
              text-sm
              text-gold-dark
              dark:text-gold-light
            "
          >
            <MapPin size={14} />

            <span className="line-clamp-1">{tour.location}</span>
          </div>
        </div>

        <p
          className="
            line-clamp-3
            text-sm leading-5
            text-dark-border/70
            dark:text-light-border/70
          "
        >
          {tour.description}
        </p>
        <div className="flex items-center justify-between px-4 mt-5">
          <span className="
          font-cinzel text-bold 
          ">Created by : {tour.creator.name}</span>

          <span
            className={`
            rounded-full
            px-3 py-1
            text-xs font-semibold
            capitalize
            ${getStatusStyle()}
          `}
          >
            {tour.status}
          </span>
        </div>

        {/* Bottom Info */}
        <div
          className="
            mt-auto
            flex items-center justify-between
            border-t
            border-black/10
            pt-3
            dark:border-gold-light/20
          "
        >
          <div className="flex items-center gap-1">
            <Clock3 size={15} className="text-gold-dark dark:text-gold-light" />

            <span className="text-sm text-dark-border dark:text-light-border">
              {tour.duration + " Days"}
            </span>
          </div>

          <span
            className="
              font-bold
              text-gold-dark
              dark:text-gold-light
            "
          >
            ${tour.price}
          </span>
        </div>

        {(onEdit || onDelete) && (
          <div className="mt-1 flex gap-2">
            {onEdit && (
              <button
                type="button"
                onClick={() => onEdit(tour)}
                className="
                  flex flex-1
                  items-center
                  justify-center
                  gap-2
                  rounded-lg
                  bg-dark-bg
                  px-3 py-2.5
                  text-sm
                  font-bold
                  text-gold-light
                  transition
                  duration-300
                  hover:opacity-90
                  dark:bg-gold-light
                  dark:text-dark-bg
                "
              >
                <Pencil size={15} />
                Edit
              </button>
            )}

            {onDelete && (
              <button
                type="button"
                onClick={() => onDelete(tour.id)}
                className="
                  flex
                  items-center
                  justify-center
                  gap-2
                  rounded-lg
                  border
                  border-red-500/20
                  bg-red-500/10
                  px-3 py-2.5
                  text-sm
                  font-bold
                  text-red-600
                  transition
                  duration-300
                  hover:bg-red-500/20
                  dark:text-red-400
                "
              >
                <Trash2 size={15} />
                Delete
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
