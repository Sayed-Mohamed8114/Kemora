import { useAuth } from "@/Context/AuthContext";
import { useParams } from "react-router-dom";

export default function SchedulesPage() {
  const { tourId } = useParams();
  const { user } = useAuth();
  const superAdmin = user?.role === "super_admin";
  const staff = user?.role === "staff";

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
          <h1
            className="
              font-cinzel
              text-2xl font-bold
              text-gold-dark
              dark:text-gold-light
              sm:text-3xl
            "
          >
            {superAdmin && "Tour Schedules Management"}
            {staff && "Manage Schedules for tours you have created"}
          </h1>

          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            {staff &&
              "manage the schedules for the tour you added to the platform"}
            {superAdmin && "Manage tour schedules edit or add what you want "}
          </p>
        </div>
      </div>
    </main>
  );
}
