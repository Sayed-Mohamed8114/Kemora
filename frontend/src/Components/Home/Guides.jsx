import { pyramids, market, mosque, aswan } from "@/assets/egyImages";

const guides = [
  {
    image: pyramids,
    number: "01",
    title: "Ancient Egypt",
    description:
      "Discover the stories, monuments, and mysteries behind one of the world's oldest civilizations.",
  },
  {
    image: market,
    number: "02",
    title: "Culture & Customs",
    description:
      "Learn about Egyptian traditions, local etiquette, and everyday life before you arrive.",
  },
  {
    image: mosque,
    number: "03",
    title: "Travel Tips",
    description:
      "Useful tips about transportation, money, language, what to pack, and getting around Egypt.",
  },
  {
    image: aswan,
    number: "04",
    title: "City Guides",
    description:
      "Explore Cairo, Luxor, Aswan, Alexandria, and more with guides built for curious travelers.",
  },
];

export default function Guides() {
  return (
    <section className="w-full px-5 md:px-10 py-24" id="guides">
      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-14">
        <p className="font-manrope text-sm uppercase tracking-[0.3em] text-gold-dark dark:text-gold-light mb-4">
          Travel Smarter
        </p>

        <h2 className="font-cinzel font-extrabold text-4xl md:text-6xl text-dark-border dark:text-light-border">
          Your Guide to Egypt
        </h2>

        <p className="font-manrope max-w-2xl mt-5 text-base md:text-lg text-dark-border/60 dark:text-light-border/60">
          Everything you need to know before you explore the land of history,
          culture, and unforgettable experiences.
        </p>
      </div>

      {/* Guides Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-5">
        {guides.map((guide) => (
          <article
            key={guide.number}
            className="
              group relative
              h-105
              overflow-hidden
              rounded-2xl
              border border-black/10
              dark:border-gold-light/15
            "
          >
            {/* Image */}
            <img
              src={guide.image}
              alt={guide.title}
              className="
                absolute inset-0
                w-full h-full
                object-cover
                transition-transform
                duration-700
                group-hover:scale-105
              "
            />

            {/* Gradient Overlay */}
            <div
              className="
                absolute inset-0
                bg-linear-to-t
                from-black/90
                via-black/40
                to-transparent
              "
            />

            {/* Number */}
          

            {/* Content */}
            <div
              className="
                absolute bottom-0 left-0 right-0
                p-7 md:p-9
                text-white
              "
            >
              <h3
                className="
                  font-cinzel
                  text-2xl md:text-3xl
                  font-bold
                  mb-3
                  transition-transform
                  duration-500
                  group-hover:-translate-y-1
                "
              >
                {guide.title}
              </h3>

              <p
                className="
                  font-manrope
                  text-sm md:text-base
                  text-white/70
                  max-w-xl
                  leading-relaxed
                  mb-6
                "
              >
                {guide.description}
              </p>

              <button
                className="
                  inline-flex
                  items-center
                  gap-3
                  font-manrope
                  text-sm
                  font-semibold
                  text-gold-light
                  group-hover:gap-5
                  transition-all
                  duration-500
                "
              >
                Read Guide
                <span className="text-lg">→</span>
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
