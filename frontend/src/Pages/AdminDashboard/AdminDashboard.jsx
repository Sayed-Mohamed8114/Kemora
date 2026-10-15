import SmallLoader from "@/Components/Common/SmallLoader";
import ServiceStatisticsCard from "@/Components/UI/ServiceStatisticsCard";
import UserStatisticsCard from "@/Components/UI/UserStatisticsCard";
import { servicesStatistics, usersStatistics } from "@/Services/adminDashboard";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function AdminDashboard() {
  const [loading, setLoading] = useState(false);
  const [usersData, setUsersData] = useState([]);
  const [servicesData, setServicesData] = useState([]);

  const getUsersStatistics = async () => {
    setLoading(true);
    try {
      const data = await usersStatistics();
      setUsersData(data);
    } catch (error) {
      toast.error(
        error?.response?.data?.detail || "failed to delete this service",
      );
    } finally {
      setLoading(false);
    }
  };

  const getServicesStatistics = async () => {
    setLoading(true);
    try {
      const data = await servicesStatistics();
      setServicesData(data);
    } catch (error) {
      toast.error(
        error?.response?.data?.detail || "failed to delete this service",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUsersStatistics();
    getServicesStatistics();
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
          <h1
            className="
              font-cinzel
              text-2xl font-bold
              text-gold-dark
              dark:text-gold-light
              sm:text-3xl
            "
          >
            Welcome to Admin Dashboard
          </h1>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            see your platform analytics to help you take decisions
          </p>
        </div>
        {loading ? (
          <SmallLoader />
        ) : (
          <div
            className="
              flex items-center justify-evenly p-5 flex-col w-full
            "
          >
            <div className="flex items-center flex-col xl:flex-row justify-between gap-10 ">
              <UserStatisticsCard userService={usersData} />
              <ServiceStatisticsCard serviceService={servicesData} />
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
