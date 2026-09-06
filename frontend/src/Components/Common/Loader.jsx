import { useEffect, useState } from "react";

export default function Loader({ children }) {
  const [progress, setProgress] = useState(0);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    const duration = 3500;
    const intervalTime = 30;

    let outroTimer;

    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + (100 / duration) * intervalTime;

        if (next >= 100) {
          clearInterval(interval);

          outroTimer = setTimeout(() => {
            setFinished(true);
          }, 1000);

          return 100;
        }

        return next;
      });
    }, intervalTime);

    return () => {
      clearInterval(interval);
      clearTimeout(outroTimer);
    };
  }, []);

  if (finished) {
    return children;
  }

  const isComplete = progress >= 100;

  return (
    <div
      className={`
        fixed inset-0 z-999
        flex items-center justify-center
        overflow-hidden
        bg-dark-bg
        text-gold-light
        ${isComplete ? "animate-loader-out" : ""}
      `}
    >
      <div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-1/2
          h-125
          w-125
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-gold-light/5
          blur-[120px]
        "
      />

      <div className="relative flex w-full flex-col items-center px-6">

        <div
          className="
            mb-8
            animate-fade-in
            font-manrope
            text-xs
            uppercase
            tracking-[0.5em]
            text-gold-light/60
          "
        >
          Ancient Egypt - Modern Experience
        </div>

        <div className="overflow-hidden">
          <h1
            className={`
              text-center
              font-cinzel
              text-4xl
              font-extrabold
              tracking-[0.12em]
              text-gold-light
              sm:text-5xl
              md:text-6xl
              lg:text-7xl
              ${
                isComplete
                  ? "animate-welcome-out"
                  : "animate-welcome-in"
              }
            `}
          >
            Welcome to Kemora
          </h1>
        </div>

        <div
          className={`
            mt-6
            h-px
            bg-gold-light/50
            transition-all
            duration-700
            ${isComplete ? "w-0" : "w-24"}
          `}
        />

        <div
          className={`
            mt-10
            w-[80%]
            max-w-175
            transition-all
            duration-700
            ${isComplete ? "translate-y-5 opacity-0" : "opacity-100"}
          `}
        >
          <div className="mb-3 flex items-center justify-between font-manrope text-gold-light/70">
            <span className="text-xs uppercase tracking-[0.3em]">
              Loading
            </span>

            <span className="text-xs tracking-widest">
              {Math.floor(progress)}%
            </span>
          </div>

          {/* Progress Bar */}
          <div className="relative h-0.5 w-full overflow-hidden bg-gold-light/10">
            <div
              className="
                absolute
                left-0
                top-0
                h-full
                bg-gold-light
                shadow-[0_0_10px_rgba(255,255,255,0.3)]
                transition-all
                duration-100
                ease-linear
              "
              style={{
                width: `${progress}%`,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}