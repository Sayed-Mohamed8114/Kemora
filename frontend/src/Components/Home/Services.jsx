import { getAllServices } from "@/Services/Services";
import { useEffect, useState } from "react";
import { ArrowUpRight, LoaderCircle } from "lucide-react";
import { Link } from "react-router-dom";

export default function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  const getServices = async () => {
    try {
      setLoading(true);

      const data = await getAllServices();

      // Only show active services on the public landing page
      setServices(data.filter((service) => service.is_active));
    } catch (error) {
      console.error("Failed to fetch services:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getServices();
  }, []);

  return (
    <section
      className="
        mt-10 w-full
        px-4 py-16
        sm:px-6
        lg:px-10
        xl:px-16
      "
      id="services"
    >
      <div className="mx-auto max-w-7xl">
        <div className="max-w-4xl">
          <p
            className="
              mb-4
              font-manrope
              text-xs font-semibold uppercase
              tracking-[0.35em]
              text-gold-dark
              dark:text-gold-light
            "
          >
            Kemora Services
          </p>

          <h2
            className="
              font-cinzel
              text-3xl font-extrabold
              leading-tight
              text-gold-dark
              sm:text-4xl
              lg:text-6xl
              dark:text-gold-light
            "
          >
            Explore Egypt easier
            <br className="hidden sm:block" />
            with our services
          </h2>

          <p
            className="
              mt-5 max-w-2xl
              font-manrope
              text-sm leading-7
              text-dark-bg/60
              sm:text-base
              dark:text-light-border/60
            "
          >
            From personal guidance to comfortable travel, our services are
            designed to make your journey through Egypt easier, smoother, and
            more memorable.
          </p>
        </div>

        <div
          className="
            mt-12
            grid grid-cols-1
            gap-10
            xl:grid-cols-[0.8fr_1.5fr]
            xl:items-start
          "
        >
          <div className="xl:sticky xl:top-28">
            <h3
              className="
                font-cinzel
                text-2xl font-extrabold
                leading-tight
                text-dark-border
                sm:text-3xl
                lg:text-4xl
                dark:text-light-border
              "
            >
              Discover Egypt
              <br />
              <span
                className="
                  text-dark-bg/40
                  dark:text-light-border/40
                "
              >
                the easier way.
              </span>
            </h3>

            <p
              className="
                mt-5 max-w-md
                font-manrope
                text-sm leading-7
                text-dark-bg/60
                dark:text-light-border/60
              "
            >
              Whether you need a personal guide, transportation, or help during
              your journey, Kemora is here to make every part of your Egyptian
              adventure easier.
            </p>

            <div
              className="
                mt-8
                flex items-center gap-3
                font-manrope
                text-xs font-semibold uppercase
                tracking-widest
                text-gold-dark
                dark:text-gold-light
              "
            >
              <span className="h-px w-10 bg-gold-dark dark:bg-gold-light" />
              Explore our services
              <span className="h-px w-10 bg-gold-dark dark:bg-gold-light" />
            </div>
          </div>

          <div className="w-full">
            {loading ? (
              <div
                className="
                  flex min-h-75
                  items-center justify-center
                  rounded-3xl
                  border border-dark-border/10
                  bg-dark-border/5
                  dark:border-light-border/10
                  dark:bg-light-border/5
                "
              >
                <div className="flex items-center gap-3">
                  <LoaderCircle
                    size={22}
                    className="
                      animate-spin
                      text-gold-dark
                      dark:text-gold-light
                    "
                  />

                  <span
                    className="
                      font-manrope
                      text-sm
                      text-dark-bg/60
                      dark:text-light-border/60
                    "
                  >
                    Loading services...
                  </span>
                </div>
              </div>
            ) : services.length === 0 ? (
              <div
                className="
                  flex min-h-75
                  items-center justify-center
                  rounded-3xl
                  border border-dark-border/10
                  bg-dark-border/5
                  px-6
                  text-center
                  dark:border-light-border/10
                  dark:bg-light-border/5
                "
              >
                <p
                  className="
                    font-manrope
                    text-sm
                    text-dark-bg/60
                    dark:text-light-border/60
                  "
                >
                  No services are currently available.
                </p>
              </div>
            ) : (
              <div
                className="
                  grid grid-cols-1
                  gap-5
                  sm:grid-cols-2
                "
              >
                {services.map((service, index) => (
                  <Link to={"login"}>
                    <article
                      key={service.id}
                      className="
                      group relative
                      min-h-67.5
                      overflow-hidden
                      rounded-3xl
                      border
                      border-dark-border/10
                      bg-white/70
                      p-6
                      transition-all
                      duration-500
                      hover:-translate-y-2
                      hover:border-gold-dark/30
                      hover:shadow-xl
                      hover:shadow-gold-dark/5
                      dark:border-light-border/10
                      dark:bg-light-border/3
                      dark:hover:border-gold-light/30
                      dark:hover:shadow-gold-light/5
                    "
                    >
                      <div
                        className="
                        pointer-events-none
                        absolute
                        -right-16
                        -top-16
                        h-40 w-40
                        rounded-full
                        bg-gold-dark/10
                        blur-3xl
                        transition-all
                        duration-500
                        group-hover:bg-gold-dark/20
                        dark:bg-gold-light/10
                        dark:group-hover:bg-gold-light/20
                      "
                      />

                      <div
                        className="
                        relative
                        flex items-start
                        justify-between
                        gap-4
                      "
                      >
                        <span
                          className="
                          font-manrope
                          text-xs font-semibold
                          tracking-[0.25em]
                          text-gold-dark
                          dark:text-gold-light
                        "
                        >
                          {String(index + 1).padStart(2, "0")}
                        </span>

                        <div
                          className="
                          flex h-10 w-10
                          items-center justify-center
                          rounded-full
                          border
                          border-gold-dark/20
                          text-gold-dark
                          transition-all
                          duration-500
                          group-hover:rotate-45
                          group-hover:bg-gold-dark
                          group-hover:text-white
                          dark:border-gold-light/20
                          dark:text-gold-light
                          dark:group-hover:bg-gold-light
                          dark:group-hover:text-dark-bg
                        "
                        >
                            <ArrowUpRight size={18} />
                        </div>
                      </div>

                      <div className="relative mt-10">
                        <h3
                          className="
                          font-cinzel
                          text-xl font-bold
                          leading-snug
                          text-dark-border
                          transition-transform
                          duration-500
                          group-hover:translate-x-1
                          sm:text-2xl
                          dark:text-light-border
                        "
                        >
                          {service.name}
                        </h3>

                        <div
                          className="
                          mt-4
                          h-px w-12
                          bg-gold-dark
                          transition-all
                          duration-500
                          group-hover:w-20
                          dark:bg-gold-light
                        "
                        />
                      </div>

                      <p
                        className="
                        relative
                        mt-5
                        line-clamp-3
                        font-manrope
                        text-sm
                        leading-6
                        text-dark-bg/60
                        dark:text-light-border/60
                      "
                      >
                        {service.description}
                      </p>

                      <div
                        className="
                        relative
                        mt-7
                        flex items-center
                        justify-between
                        gap-4
                      "
                      >
                        <div>
                          <p
                            className="
                            font-manrope
                            text-[10px]
                            font-semibold
                            uppercase
                            tracking-[0.2em]
                            text-dark-bg/40
                            dark:text-light-border/40
                          "
                          >
                            Starting from
                          </p>

                          <p
                            className="
                            mt-1
                            font-cinzel
                            text-xl font-bold
                            text-gold-dark
                            dark:text-gold-light
                          "
                          >
                            ${service.price}
                          </p>
                        </div>
                      </div>

                      <div
                        className="
                        absolute bottom-0 left-0
                        h-0.5 w-0
                        bg-gold-dark
                        transition-all
                        duration-500
                        group-hover:w-full
                        dark:bg-gold-light
                      "
                      />
                    </article>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
