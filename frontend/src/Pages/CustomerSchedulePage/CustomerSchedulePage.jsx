import SmallLoader from "@/Components/Common/SmallLoader";
import TourScheduleCard from "@/Components/UI/TourScheduleCard";
import { getTourScheduleByTour } from "@/Services/tourSchedule";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

export default function CustomerSchedulePage() {
  const navigate = useNavigate();
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(false);
  const { tourId } = useParams();

  const handleReturnToTours = () => {
    navigate("/tours");
  };

  const handleGetTourSchedules = async () => {
    setLoading(true);
    try {
      const data = await getTourScheduleByTour(tourId);
      console.log(data);
      setSchedules(data);
    } catch (error) {
      const message =
        error?.response?.data?.detail || "failed to load requests";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    handleGetTourSchedules();
  }, []);

  return (
    <main
      className="
        min-h-screen
        bg-slate-50
        px-4 py-8
        text-slate-900
        dark:bg-[#121212]
        dark:text-white
        sm:px-20
      "
    >
      <div className="w-full">
        <div className="mb-8">
          <div className="flex flex-col-reverse md:flex-row justify-between items-center">
            <h1
              className="
              font-cinzel
              text-2xl font-bold
              text-gold-dark
              dark:text-gold-light
              sm:text-3xl
            "
            >
              Tour schedules
            </h1>
            <button
              onClick={handleReturnToTours}
              className="px-3 py-2 md:text-lg text-xs text-gold-dark dark:text-gold-light 
            duration-900 transition-colors  hover:underline underline-offset-2
            cursor-pointer hover:text-black dark:hover:text-white font-bold font-cinzel"
            >
              Return to tours page
            </button>
          </div>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            See the schedules for this tour to know your trip time
          </p>
        </div>

        {loading ? (
          <SmallLoader />
        ) : schedules.length === 0 ? (
          <div
            className="
              flex min-h-60
              items-center justify-center
              rounded-2xl
              border border-dashed border-slate-300
              bg-white
              dark:border-white/10
              dark:bg-[#171717]
            "
          >
            <p className="text-sm text-slate-500 text-center dark:text-slate-400">
              there are no schedules to this tour yet please make a look at
              other time
            </p>
          </div>
        ) : (
          <div
            className="
              grid
              grid-cols-1
              gap-5
              lg:gap-5
              lg:grid-cols-2
              xl:grid-cols-3
            "
          >
            {schedules.map((schedule) => (
              <TourScheduleCard schedule={schedule} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
