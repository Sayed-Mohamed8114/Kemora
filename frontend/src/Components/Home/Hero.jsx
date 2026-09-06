import { Pyramids, nightPyramid } from "@/assets/egyImages";

export default function Hero() {
  return (
    <section className="relative flex min-h-screen w-full items-center justify-center overflow-hidden">
      <img
        src={Pyramids}
        alt="The Pyramids of Egypt"
        className="
          absolute inset-0
          z-0
          h-full w-full
          object-cover
          scale-105
          opacity-100
          transition-all
          duration-1000
          ease-in-out
          animate-[slowZoom_20s_ease-in-out_infinite_alternate]
          dark:opacity-0
        "
      />

      <img
        src={nightPyramid}
        alt="The Pyramids of Egypt at night"
        className="
          absolute inset-0
          z-0
          h-full w-full
          object-cover
          scale-105
          opacity-0
          transition-all
          duration-1000
          ease-in-out
          animate-[slowZoom_20s_ease-in-out_infinite_alternate]
          dark:opacity-100
        "
      />

      <div
        className="
          absolute inset-0
          z-10
          bg-black/35
          transition-colors
          duration-700
          dark:bg-black/50
        "
      />

      <div
        className="
          absolute inset-0
          z-10
          bg-linear-to-b
          from-black/20
          via-transparent
          to-black/70
        "
      />

      <div
        className="
          relative
          z-20
          mx-auto
          flex
          max-w-5xl
          flex-col
          items-center
          px-6
          text-center
          text-white
        "
      >
        <h1
          className="
            max-w-5xl
            text-5xl
            font-extrabold
            font-cinzel
            uppercase
            leading-[0.9]
            tracking-tight
            drop-shadow-2xl
            sm:text-6xl
            md:text-7xl
            lg:text-8xl
            xl:text-9xl
            animate-[fadeUp_1s_ease-out_0.15s_both]
          "
        >
          Welcome
          <span className="block">
            To{" "}
            <span
              className="
                bg-linear-to-r
                from-light-bg
                via-gold-light/90
                to-gold-light/60
                bg-clip-text
                text-transparent
              "
            >
              Kemora
            </span>
          </span>
        </h1>

        <p
          className="
            mt-8
            max-w-2xl
            text-sm
            leading-relaxed
            text-gray-200
            sm:text-base
            md:text-lg
            font-manrope
            animate-[fadeUp_1s_ease-out_0.3s_both]
          "
        >
          Explore the timeless stories, ancient wonders, and unforgettable
          beauty of Egypt through a modern experience.
        </p>

        <div
          className="
            mt-10
            animate-[fadeUp_1s_ease-out_0.45s_both]
          "
        >
          <button
            className="
              group
              relative
              overflow-hidden
              rounded-full
              border
              border-white/50
              bg-white
              px-8
              py-4
              text-sm
              font-bold
              uppercase
              tracking-wider
              text-black
              shadow-md
              transition-all
              duration-700
              hover:scale-105
              hover:text-white
              hover:bg-white/50
              active:scale-95
              cursor-pointer
              font-cinzel
            "
          >
            Explore Egypt
          </button>
        </div>
      </div>

      <div
        className="
          absolute
          bottom-8
          left-1/2
          z-20
          flex
          -translate-x-1/2
          flex-col
          items-center
          gap-3
          text-white/70
          text-center
        "
      >
        <span
          className="
            text-[10px]
            uppercase
            tracking-[0.35em]
          "
        >
          Scroll to explore
        </span>

        <div
          className="
            flex
            h-10
            w-6
            justify-center
            rounded-full
            border
            border-white/40
            pt-3
          "
        >
          <div
            className="
              h-2
              w-2
              font-extrabold 
              rounded-full
              bg-white
              animate-bounce
            "
          />
        </div>
      </div>
      <div
        className="
          absolute
          bottom-0
          left-0
          z-20
          h-32
          w-full
          bg-linear-to-t
          from-black/30
          to-transparent
        "
      />
    </section>
  );
}
