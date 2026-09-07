import { Images } from "@/Constants/InfiniteImages";
import InfiniteSpiral from "../UI/InfiniteSpiral";

export default function Explore() {
  return (
    <section className="flex flex-col items-center justify-center p-5 mt-10 w-full ">
      <h2 className="font-cinzel text-gold-dark dark:text-gold-light font-extrabold text-6xl">
        Explore Egypt, your way
      </h2>
      <div className="w-full px-5 items-center gap-5 justify-center flex mt-10 h-auto">
        <div className="flex flex-col items-start justify-start w-full h-auto min-h-[50vh] gap-2">
          <h2 className="text-start justify-start items-start text-5xl font-serif px-5  font-extrabold text-dark-border dark:text-light-border ">
            Discover a country where every destination <br />
            <span className="text-dark-bg/50 dark:text-light-border/50">
              tells a different story.
            </span>
          </h2>
          <div className="flex flex-col items-start justify-start p-8 w-full h-auto min-h-[50vh] gap-8 mt-2">
            <div className="w-full max-w-2xl flex flex-col">
              <button className="group w-full text-left  border-dark-border/20 dark:border-light-border/20 py-6 transition-all duration-500 hover:px-4 hover:bg-dark-border/5 dark:hover:bg-light-border/5">
                <div className="flex items-center justify-between">
                  <div className="flex items-start gap-6">
                    <span className="font-manrope text-xs tracking-widest text-gold-dark dark:text-gold-light mt-1">
                      01
                    </span>

                    <div>
                      <h3 className="font-cinzel text-2xl font-bold text-dark-border dark:text-light-border transition-transform duration-500 group-hover:translate-x-2">
                        Ancient Wonders
                      </h3>

                      <p className="font-manrope text-sm mt-2 text-dark-bg/60 dark:text-light-border/60">
                        Pyramids - Temples - Ancient History
                      </p>
                    </div>
                  </div>

                  <span className="text-2xl text-gold-dark dark:text-gold-light opacity-40 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-500">
                    →
                  </span>
                </div>
              </button>

              <button className="group w-full text-left border-t border-dark-border/20 dark:border-light-border/20 py-6 transition-all duration-500 hover:px-4 hover:bg-dark-border/5 dark:hover:bg-light-border/5">
                <div className="flex items-center justify-between">
                  <div className="flex items-start gap-6">
                    <span className="font-manrope text-xs tracking-widest text-gold-dark dark:text-gold-light mt-1">
                      02
                    </span>

                    <div>
                      <h3 className="font-cinzel text-2xl font-bold text-dark-border dark:text-light-border transition-transform duration-500 group-hover:translate-x-2">
                        Nile Adventures
                      </h3>

                      <p className="font-manrope text-sm mt-2 text-dark-bg/60 dark:text-light-border/60">
                        Luxor - Aswan - Nile Cruises
                      </p>
                    </div>
                  </div>

                  <span className="text-2xl text-gold-dark dark:text-gold-light opacity-40 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-500">
                    →
                  </span>
                </div>
              </button>

              <button className="group w-full text-left border-t border-dark-border/20 dark:border-light-border/20 py-6 transition-all duration-500 hover:px-4 hover:bg-dark-border/5 dark:hover:bg-light-border/5">
                <div className="flex items-center justify-between">
                  <div className="flex items-start gap-6">
                    <span className="font-manrope text-xs tracking-widest text-gold-dark dark:text-gold-light mt-1">
                      03
                    </span>

                    <div>
                      <h3 className="font-cinzel text-2xl font-bold text-dark-border dark:text-light-border transition-transform duration-500 group-hover:translate-x-2">
                        Culture & Heritage
                      </h3>

                      <p className="font-manrope text-sm mt-2 text-dark-bg/60 dark:text-light-border/60">
                        Markets - Mosques - Egyptian Life
                      </p>
                    </div>
                  </div>

                  <span className="text-2xl text-gold-dark dark:text-gold-light opacity-40 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-500">
                    →
                  </span>
                </div>
              </button>

              <button className="group w-full text-left border-t border-dark-border/20 dark:border-light-border/20 py-6 transition-all duration-500 hover:px-4 hover:bg-dark-border/5 dark:hover:bg-light-border/5">
                <div className="flex items-center justify-between">
                  <div className="flex items-start gap-6">
                    <span className="font-manrope text-xs tracking-widest text-gold-dark dark:text-gold-light mt-1">
                      04
                    </span>

                    <div>
                      <h3 className="font-cinzel text-2xl font-bold text-dark-border dark:text-light-border transition-transform duration-500 group-hover:translate-x-2">
                        Desert Escapes
                      </h3>

                      <p className="font-manrope text-sm mt-2 text-dark-bg/60 dark:text-light-border/60">
                        Siwa - Oases - Safari
                      </p>
                    </div>
                  </div>

                  <span className="text-2xl text-gold-dark dark:text-gold-light opacity-40 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-500">
                    →
                  </span>
                </div>
              </button>
            </div>
          </div>
        </div>
        <div className="w-250 h-150 p-2 items-center justify-center flex">
          <InfiniteSpiral
            className="w-full h-full px-2 dark:opacity-80"
            items={Images}
            animationMode="auto"
            speed={0.5}
            radius={170}
            cardWidth={180}
            cardHeight={150}
            verticalSpacing={60}
            perspective={1000}
            cardRadius={10}
            centerScale={1.5}
            cardsPerTurn={8}
            direction="up"
            rotation={-60}
            cardTilt={0}
            edgeFade={0.3}
            imageFit="cover"
          />
        </div>
      </div>
    </section>
  );
}
