export default function Footer() {
  return (
    <footer className="w-full mt-20 border-t border-black/10 dark:border-gold-light/15">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <h2 className="font-cinzel text-3xl font-extrabold text-gold-dark dark:text-gold-light">
              EGYPT
            </h2>

            <p className="font-manrope text-sm leading-relaxed mt-5 max-w-xs text-dark-border/60 dark:text-light-border/60">
              Discover the stories, places, and experiences that make Egypt
              unforgettable.
            </p>

            <p className="font-manrope text-xs tracking-[0.2em] uppercase mt-8 text-dark-border/40 dark:text-light-border/40">
              Explore Egypt, your way.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-cinzel font-bold text-lg text-dark-border dark:text-light-border mb-5">
              Explore
            </h3>

            <ul className="flex flex-col gap-3">
              {["Explore", "Tours", "Guides", "Destinations", "About"].map(
                (item) => (
                  <li key={item}>
                    <a
                      href={`#${item.toLowerCase()}`}
                      className="
                      font-manrope
                      text-sm
                      text-dark-border/60
                      dark:text-light-border/60
                      hover:text-gold-dark
                      dark:hover:text-gold-light
                      transition-colors
                      duration-300
                    "
                    >
                      {item}
                    </a>
                  </li>
                ),
              )}
            </ul>
          </div>

          {/* Discover */}
          <div>
            <h3 className="font-cinzel font-bold text-lg text-dark-border dark:text-light-border mb-5">
              Discover
            </h3>

            <ul className="flex flex-col gap-3">
              <li>
                <a
                  href="#"
                  className="font-manrope text-sm text-dark-border/60 dark:text-light-border/60 hover:text-gold-dark dark:hover:text-gold-light transition-colors duration-300"
                >
                  Ancient Egypt
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="font-manrope text-sm text-dark-border/60 dark:text-light-border/60 hover:text-gold-dark dark:hover:text-gold-light transition-colors duration-300"
                >
                  Egyptian Culture
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="font-manrope text-sm text-dark-border/60 dark:text-light-border/60 hover:text-gold-dark dark:hover:text-gold-light transition-colors duration-300"
                >
                  Egyptian Food
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="font-manrope text-sm text-dark-border/60 dark:text-light-border/60 hover:text-gold-dark dark:hover:text-gold-light transition-colors duration-300"
                >
                  Travel Tips
                </a>
              </li>
            </ul>
          </div>

          {/* Stay Connected */}
          <div>
            <h3 className="font-cinzel font-bold text-lg text-dark-border dark:text-light-border mb-5">
              Stay Connected
            </h3>

            <p className="font-manrope text-sm leading-relaxed text-dark-border/60 dark:text-light-border/60 mb-5">
              Get inspiration and travel stories from Egypt.
            </p>

            {/* Email */}
            <div className="flex border-b border-dark-border/30 dark:border-light-border/30 pb-2">
              <input
                type="email"
                placeholder="Your email"
                className="
                  w-full
                  bg-transparent
                  outline-none
                  font-manrope
                  text-sm
                  text-dark-border
                  dark:text-light-border
                  placeholder:text-dark-border/40
                  dark:placeholder:text-light-border/40
                "
              />

              <button
                className="
                  font-manrope
                  text-sm
                  font-semibold
                  text-gold-dark
                  dark:text-gold-light
                  hover:translate-x-1
                  transition-transform
                  duration-300
                "
              >
                →
              </button>
            </div>

            {/* Socials */}
            <div className="flex items-center gap-5 mt-7">
              <a
                href="#"
                aria-label="Instagram"
                className="font-manrope text-sm text-dark-border/60 dark:text-light-border/60 hover:text-gold-dark dark:hover:text-gold-light transition-colors"
              >
                Instagram
              </a>

              <a
                href="#"
                aria-label="Facebook"
                className="font-manrope text-sm text-dark-border/60 dark:text-light-border/60 hover:text-gold-dark dark:hover:text-gold-light transition-colors"
              >
                Facebook
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-black/10 dark:border-gold-light/15">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-manrope text-xs text-dark-border/50 dark:text-light-border/50">
            © 2026 Egypt. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            <a
              href="#"
              className="font-manrope text-xs text-dark-border/50 dark:text-light-border/50 hover:text-gold-dark dark:hover:text-gold-light transition-colors"
            >
              Privacy
            </a>

            <a
              href="#"
              className="font-manrope text-xs text-dark-border/50 dark:text-light-border/50 hover:text-gold-dark dark:hover:text-gold-light transition-colors"
            >
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
