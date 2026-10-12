
import { Link, useParams } from "react-router-dom";
import  {GuidesData}  from "@/Constants/guides";

export default function GuideDetails() {
  const { slug } = useParams();

  const guide = GuidesData.find((item) => item.slug === slug);

  if (!guide) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center px-5 text-center">
        <h1 className="font-cinzel text-3xl font-bold">
          Guide Not Found
        </h1>

        <p className="mt-4 opacity-70">
          The guide you are looking for does not exist.
        </p>

        <Link
          to="/#guides"
          className="mt-6 text-gold-dark dark:text-gold-light"
        >
          Back to Guides
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen pb-20 w-full">
      {/* Hero */}
      <section className="relative h-[55vh] min-h-95 overflow-hidden w-full">
        <img
          src={guide.image}
          alt={guide.title}
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-linear-to-t from-black via-black/50 to-black/10" />

        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-7xl px-5 pb-12 md:px-10 md:pb-16">
          <Link
            to="/#guides"
            className="mb-8 inline-flex text-sm text-white/80 hover:text-white"
          >
            ← Back to Guides
          </Link>

          <p className="mb-3 font-manrope text-sm uppercase tracking-[0.3em] text-gold-light">
            Travel Guide {guide.number}
          </p>

          <h1 className="max-w-4xl font-cinzel text-4xl font-bold text-white md:text-6xl">
            {guide.title}
          </h1>

          <p className="mt-5 max-w-2xl font-manrope leading-relaxed text-white/75 md:text-lg">
            {guide.intro}
          </p>
        </div>
      </section>

      {/* Guide Content */}
      <section className="mx-auto max-w-7xl px-5 py-16 md:px-10 md:py-24">
        <div className="mb-12 max-w-3xl">
          <p className="mb-3 font-manrope text-sm uppercase tracking-[0.25em] text-gold-dark dark:text-gold-light">
            Local Knowledge
          </p>

          <h2 className="font-cinzel text-3xl font-bold text-dark-border dark:text-light-border md:text-4xl">
            Useful Tips for Your Journey
          </h2>

          <p className="mt-4 font-manrope leading-relaxed text-dark-border/60 dark:text-light-border/60">
            Make the most of your experience with these practical tips,
            prepared to help you explore Egypt with confidence.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {guide.tips.map((tip, index) => (
            <article
              key={tip.title}
              className="rounded-2xl border border-black/10 bg-white/50 p-6 dark:border-gold-light/15 dark:bg-white/3 md:p-8"
            >
              <span className="font-cinzel text-sm text-gold-dark dark:text-gold-light">
                {String(index + 1).padStart(2, "0")}
              </span>

              <h3 className="mt-4 font-cinzel text-xl font-bold text-dark-border dark:text-light-border">
                {tip.title}
              </h3>

              <p className="mt-3 font-manrope leading-relaxed text-dark-border/65 dark:text-light-border/65">
                {tip.description}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-12">
          <Link
            to="/#guides"
            className="inline-flex items-center gap-3 font-manrope text-sm font-semibold text-gold-dark transition-all hover:gap-5 dark:text-gold-light"
          >
            Explore Other Guides <span>→</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
