import { pyramids, luxor, aswan, market } from "@/assets/egyImages";

const destinations = [
  {
    title: "Giza",
    subtitle: "Where history stands tall",
    image: pyramids,
    size: "large",
  },
  {
    title: "Luxor",
    subtitle: "The world's greatest open-air museum",
    image: luxor,
    size: "small",
  },
  {
    title: "Aswan",
    subtitle: "Nile, nature & Nubian culture",
    image: aswan,
    size: "small",
  },
  {
    title: "Cairo",
    subtitle: "Where ancient meets modern",
    image: market,
    size: "wide",
  },
];

export default function Destinations() {
  return (
    <section className="w-full px-5 md:px-10 py-24" id="destinations">
      <div className="flex flex-col w-full md:flex-row md:items-end justify-evenly gap-6 mb-12">
        <div className="">
          <p className="font-manrope text-sm uppercase tracking-[0.3em] text-gold-dark dark:text-gold-light mb-4">
            Places to discover
          </p>

          <h2 className="font-cinzel text-4xl md:text-6xl font-extrabold text-dark-border dark:text-light-border">
            Destinations
          </h2>
        </div>

        <p className="font-serif max-w-md text-lg md:text-lg leading-relaxed text-dark-border dark:text-light-border">
          From ancient monuments to peaceful Nile towns, discover the places
          that make Egypt unforgettable.
        </p>
      </div>

      <div className="w-full mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
        <article className="group relative md:col-span-2 h-125 overflow-hidden rounded-2xl">
          <img
            src={destinations[0].image}
            alt={destinations[0].title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />

          <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/30 to-transparent" />

          <div className="absolute bottom-0 left-0 p-8 md:p-10 text-white">
            <span className="font-manrope text-xs uppercase tracking-[0.25em] text-gold-light">
              Ancient Wonders
            </span>

            <h3 className="font-cinzel text-4xl font-bold mt-2">Giza</h3>

            <p className="font-manrope text-white/70 mt-2">
              Where history stands tall.
            </p>

            <button className="mt-6 text-gold-light font-manrope text-sm font-semibold">
              Explore Giza →
            </button>
          </div>
        </article>

        <div className="flex flex-col gap-4">
          {destinations.slice(1, 3).map((destination) => (
            <article
              key={destination.title}
              className="group relative h-60.5 overflow-hidden rounded-2xl"
            >
              <img
                src={destination.image}
                alt={destination.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-linear-to-t from-black/85 to-transparent" />

              <div className="absolute bottom-0 left-0 p-6 text-white">
                <h3 className="font-cinzel text-2xl font-bold">
                  {destination.title}
                </h3>

                <p className="font-manrope text-sm text-white/70 mt-1">
                  {destination.subtitle}
                </p>
              </div>
            </article>
          ))}
        </div>

        <article className="group relative md:col-span-3 h-70 overflow-hidden rounded-2xl">
          <img
            src={destinations[3].image}
            alt={destinations[3].title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />

          <div className="absolute inset-0 bg-linear-to-r from-black/85 via-black/40 to-transparent" />

          <div className="absolute inset-y-0 left-0 flex flex-col justify-center p-8 md:p-12 text-white">
            <span className="font-manrope text-xs uppercase tracking-[0.25em] text-gold-light">
              The Heart of Egypt
            </span>

            <h3 className="font-cinzel text-4xl font-bold mt-2">Cairo</h3>

            <p className="font-manrope max-w-md text-white/70 mt-2">
              Where ancient history, busy streets, local markets, and modern
              Egyptian life come together.
            </p>

            <button className="mt-5 text-left text-gold-light font-manrope text-sm font-semibold">
              Explore Cairo →
            </button>
          </div>
        </article>
      </div>
    </section>
  );
}
