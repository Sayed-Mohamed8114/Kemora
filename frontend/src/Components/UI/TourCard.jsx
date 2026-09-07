export default function TourCard({ tours }) {
  return (
    <div
      className="
        bg-white/30 dark:bg-black/30
        backdrop-blur-sm
        rounded-xl
        overflow-hidden
        flex flex-col
        w-full lg:w-60
        h-112
        mt-5
        border border-black/10 dark:border-gold-light/20
      "
    >
      {/* Image */}
      <div className="w-full h-44 overflow-hidden ">
        <img
          src={tours.image}
          alt={tours.title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col p-4 gap-3">
        <div>
          <h2 className="font-cinzel text-xl font-bold text-dark-border dark:text-light-border">
            {tours.title}
          </h2>

          <p className="text-sm text-gold-dark dark:text-gold-light mt-1">
            {tours.type}
          </p>
        </div>

        {/* Highlights */}
        <div className="flex flex-col gap-1 text-sm text-dark-border/70 dark:text-light-border/70">
          <span>{tours.history}</span>
          <span>{tours.culture}</span>
        </div>
        {/* Bottom Info */}
        <div className="flex items-center justify-between mt-2 pt-3 border-black/10 dark:border-gold-light/20">
          <span className="text-sm">{tours.duration}</span>

          <span className="font-bold text-gold-dark dark:text-gold-light">
            {tours.price}
          </span>
        </div>
        <button className="mx-auto mt-1 items-center justify-center mb-3 bg-dark-bg px-3 py-3 w-full rounded-lg text-gold-light dark:bg-gold-light dark:text-dark-bg
        font-bold font-manrope cursor-pointer hover:text-light-bg duration-700 ease-in-out transition-colors dark:hover:text-gray-50
        ">
          Discover more
        </button>
      </div>
    </div>
  );
}
