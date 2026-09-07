import { pyramids } from "@/assets/egyImages";

export default function About() {
  return (
    <section className="w-full px-5 md:px-10 py-28" id="about">

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

        <div className="relative h-125 md:h-150 rounded-2xl overflow-hidden order-2 lg:order-1">

          <img
            src={pyramids}
            alt="Pyramids of Egypt"
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent" />

          <div className="absolute bottom-7 left-7">
            <p className="font-manrope text-xs uppercase tracking-[0.3em] text-gold-light">
              Egypt
            </p>
          </div>

        </div>


        <div className="order-1 lg:order-2">

          <p className="font-manrope text-sm uppercase tracking-[0.3em] text-gold-dark dark:text-gold-light mb-5">
            About Us
          </p>

          <h2 className="font-cinzel text-4xl md:text-5xl xl:text-6xl font-extrabold leading-tight text-dark-border dark:text-light-border">
            More than a
            <br />
            destination.
          </h2>

          <p className="font-manrope text-lg leading-relaxed mt-7 text-dark-border/70 dark:text-light-border/70 max-w-xl">
            Egypt is more than ancient monuments and beautiful landscapes.
            It is a country filled with stories, traditions, people,
            and experiences waiting to be discovered.
          </p>

          <p className="font-manrope text-base leading-relaxed mt-5 text-dark-border/60 dark:text-light-border/60 max-w-xl">
            Our goal is to make exploring Egypt easier and more meaningful.
            Whether you're searching for ancient wonders, local culture,
            unforgettable adventures, or hidden places, we're here to help
            you discover Egypt your way.
          </p>


          <div className="grid grid-cols-2 gap-8 mt-10 max-w-md">

            <div>
              <span className="font-cinzel text-3xl font-bold text-gold-dark dark:text-gold-light">
                7000+
              </span>

              <p className="font-manrope text-sm mt-1 text-dark-border/60 dark:text-light-border/60">
                Years of history
              </p>
            </div>

            <div>
              <span className="font-cinzel text-3xl font-bold text-gold-dark dark:text-gold-light">
                27
              </span>

              <p className="font-manrope text-sm mt-1 text-dark-border/60 dark:text-light-border/60">
                Governorates to explore
              </p>
            </div>

          </div>


          <button
            className="
              mt-10
              px-7 py-3
              rounded-full
              bg-gold-dark
              dark:bg-gold-light
              text-white
              dark:text-dark-bg
              font-manrope
              font-semibold
              transition-all
              duration-900
              hover:scale-105
              items-center justify-center cursor-pointer
            "
          >
            Discover Our Story →
          </button>

        </div>

      </div>

    </section>
  );
}
