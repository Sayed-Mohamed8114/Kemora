import ContactForm from "@/Components/Forms/ContactForm";

export default function ContactPage() {
  return (
    <section className="w-full px-5 sm:px-8 md:px-12 lg:px-16 py-16 mt-20">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10 md:mb-14 max-w-3xl">
          <span className="font-manrope text-sm sm:text-base font-bold uppercase tracking-[0.2em] text-gold-dark">
            Get in Touch
          </span>

          <h2 className="mt-3 font-manrope text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight text-dark-card dark:text-white">
            In <span className="font-cinzel text-gold-dark">Kemora,</span> we
            believe that connection is the beginning of every great journey.
          </h2>

          <p className="mt-5 text-base sm:text-lg leading-7 text-gray-500 dark:text-gray-400">
            Have a question, need help planning your next adventure, or simply
            want to know more about Kemora? We are always here to listen, help,
            and keep you connected with everything new.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          <div className="flex flex-col gap-8">
            <div>
              <h3 className="font-manrope text-xl sm:text-2xl font-extrabold text-dark-card dark:text-white">
                Stay connected with Kemora
              </h3>

              <p className="mt-3 text-base sm:text-lg leading-7 text-gray-500 dark:text-gray-400">
                Kemora is more than a travel experience. We connect you with
                Egypt's history, culture, landscapes, and unforgettable places.
                From ancient wonders to hidden destinations, our goal is to make
                every journey meaningful.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="rounded-2xl border border-gray-200 dark:border-gray-700 p-5">
                <h4 className="font-manrope font-bold text-dark-card dark:text-white">
                  24/7 Support
                </h4>

                <p className="mt-2 text-sm leading-6 text-gray-500 dark:text-gray-400">
                  We are always here when you need us.
                </p>
              </div>

              <div className="rounded-2xl border border-gray-200 dark:border-gray-700 p-5">
                <h4 className="font-manrope font-bold text-dark-card dark:text-white">
                  New Journeys
                </h4>

                <p className="mt-2 text-sm leading-6 text-gray-500 dark:text-gray-400">
                  Discover new destinations and experiences.
                </p>
              </div>

              <div className="rounded-2xl border border-gray-200 dark:border-gray-700 p-5">
                <h4 className="font-manrope font-bold text-dark-card dark:text-white">
                  New Offers
                </h4>

                <p className="mt-2 text-sm leading-6 text-gray-500 dark:text-gray-400">
                  Stay updated with our latest travel offers.
                </p>
              </div>
            </div>

            <div className="border-l-4 border-gold-dark pl-5">
              <p className="font-manrope text-base sm:text-lg font-semibold italic leading-7 text-dark-card dark:text-gray-200">
                "Your journey may start with a destination, but it becomes
                unforgettable through the connections you make along the way."
              </p>
            </div>
          </div>

          <div className="w-full rounded-3xl border border-gray-200 dark:border-gray-700 p-5 sm:p-7 md:p-8 shadow-sm">
            <div className="mb-6">
              <h3 className="font-manrope text-2xl font-extrabold text-dark-card dark:text-white">
                Send us a message
              </h3>

              <p className="mt-2 text-sm sm:text-base text-gray-500 dark:text-gray-400">
                Have something to ask? Send us a message and our team will get
                back to you as soon as possible.
              </p>
            </div>
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
