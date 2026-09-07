import { tours } from "@/Constants/toursData";
import TourCard from "../UI/TourCard";

export default function Tours() {
  return (
    <section className="mt-10 justify-center items-center flex py-5 px-1 md:px-3 lg:px-1 w-full h-auto flex-col " id="tours">
      <hr className="w-[90%]  border border-t border-gray-400/50 bg-gray-400/50 dark:border-gold-light dark:bg-gold-light mb-5" />
      <h2
        className="font-serif font-bold text-black dark:text-light-bg text-4xl md:text-6xl mt-5 text-center
      "
      >
        Discover Tours by{" "}
        <span
          className="font-cinzel font-extrabold
        text-gold-dark dark:text-gold-light 
        "
        >
          Kemora
        </span>
      </h2>
      <div className="md:grid md:grid-cols-3  lg:flex items-center justify-center gap-5 mt-10 flex-col lg:flex-row">
        {tours.map((tour) => (
          <TourCard tours={tour} />
        ))}
      </div>
    </section>
  );
}
