import SmallLoader from "@/Components/Common/SmallLoader";
import AddTourForm from "@/Components/Forms/AddTourForm";
import TourCard from "@/Components/UI/TourCard";
import { useAuth } from "@/Context/AuthContext";
import {
  deleteTour,
  getToursByStaff,
  getToursForAdmin,
  getToursForCustomers,
} from "@/Services/tours";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

export default function ToursManagement() {
  const [loading, setLoading] = useState(false);
  const [tours, setTours] = useState([]);
  const [selectedTour, setSelectedTour] = useState(null);
  const [showAddTour, setShowAddTour] = useState(false);

  const { user } = useAuth();

  const role = user?.role;

  const canManageTours =
    role === "staff" || role === "super_admin";

  const fetchTours = useCallback(async () => {
    try {
      setLoading(true);

      let data;

      if (role === "staff") {
        data = await getToursByStaff();
      } else if (role === "super_admin") {
        data = await getToursForAdmin();
      } else if (role === "customer") {
        data = await getToursForCustomers();
      } else {
        data = [];
      }

      setTours(data || []);
    } catch (error) {
      toast.error(
        error?.response?.data?.detail ||
          "Failed to load tours",
      );
    } finally {
      setLoading(false);
    }
  }, [role]);

  useEffect(() => {
    if (role) {
      fetchTours();
    }
  }, [role, fetchTours]);

  const handleEdit = (tour) => {
    setSelectedTour(tour);
    setShowAddTour(true);
  };

  const handleAdd = () => {
    setSelectedTour(null);
    setShowAddTour(true);
  };

  const handleCloseForm = () => {
    setShowAddTour(false);
    setSelectedTour(null);
  };

  const handleFormSuccess = async () => {
    handleCloseForm();
    await fetchTours();
  };

  const handleDelete = async (tourId) => {
    try {
      setLoading(true);

      await deleteTour(tourId);

      toast.success("Tour deleted successfully");

      await fetchTours();
    } catch (error) {
      toast.error(
        error?.response?.data?.detail ||
          "Failed to delete the tour",
      );
    } finally {
      setLoading(false);
    }
  };

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
        {/* Header */}
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
            Tours Management
          </h1>

          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Add and update Kemora tours.
          </p>
        </div>

        {/* Tours Grid */}
        {loading ? (
          <SmallLoader />
        ) : tours.length === 0 ? (
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
            <p className="text-sm text-slate-500 dark:text-slate-400">
              No tours found.
            </p>
          </div>
        ) : (
          <div
            className="
              grid
              grid-cols-1
              gap-5
              lg:grid-cols-2
              xl:grid-cols-3
            "
          >
            {tours.map((tour) => (
              <TourCard
                key={tour.id}
                tour={tour}
                onDelete={canManageTours ? handleDelete : undefined}
                onEdit={canManageTours ? handleEdit : undefined}
              />
            ))}
          </div>
        )}
      </div>

      {/* Add Tour Button */}
      {canManageTours && (
        <button
          onClick={handleAdd}
          className="
            fixed bottom-3 right-3 z-50
            flex items-center gap-2
            rounded-lg
            bg-gold-dark
            px-4 py-2
            text-sm
            font-semibold text-white
            shadow-lg shadow-gold-dark/25
            transition-all duration-700
            hover:scale-105
            hover:bg-gold-light
            hover:text-slate-900
            hover:shadow-xl
            active:scale-95
            animate-bounce
            md:px-5 md:py-3.5 md:text-base
            dark:bg-gold-light
            dark:text-slate-900
            dark:shadow-gold-light/20
            dark:hover:bg-gold-dark
            dark:hover:text-white
          "
        >
          <span>Add Tour</span>
        </button>
      )}

      {/* Add / Edit Tour Modal */}
      {showAddTour && (
        <div
          className="
            fixed inset-0 z-999
            flex items-center justify-center
            bg-black/50
            p-4
            backdrop-blur-sm
          "
          onClick={handleCloseForm}
        >
          <div
            className="
              max-h-[90vh]
              w-full
              max-w-lg
              overflow-y-auto
              rounded-2xl
              border border-slate-200
              bg-white
              p-6
              shadow-2xl
              dark:border-white/10
              dark:bg-[#171717]
            "
            onClick={(e) => e.stopPropagation()}
          >
            <AddTourForm
              tour={selectedTour}
              onClose={handleCloseForm}
              onSuccess={handleFormSuccess}
            />
          </div>
        </div>
      )}
    </main>
  );
}
