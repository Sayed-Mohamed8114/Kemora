import SmallLoader from "@/Components/Common/SmallLoader";
import AddTourForm from "@/Components/Forms/AddTourForm";
import TourCard from "@/Components/UI/TourCard";
import { useAuth } from "@/Context/AuthContext";
import { useEffect, useState } from "react";

export default function ToursManagement() {
  const [loading, isLoading] = useState(false);
  const [tours, setTours] = useState([]);
  const [selectedTour, setSelectedTour] = useState(null);
  const [showAddTour, setShowAddTour] = useState(false);
  const { user } = useAuth();

  const role = user.role;

  const handleDelete = async () => {};

  const handleEdit = async () => {};

  const handleAdd = async () => {};

  const handleCloseForm = async () => {};

  const handleFormSuccess = async () => {};

  useEffect(() => {}, [tours]);
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
            Tours Management
          </h1>

          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Add and update kemora Tours.
          </p>
        </div>

        {/* Staff Grid */}
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
              No staff members found.
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
            {tours.map((tour) => (
              <TourCard
                key={tour.id}
                tour={tour}
                onDelete={handleDelete}
                onEdit={handleEdit}
              />
            ))}
          </div>
        )}
      </div>

      {/* Add tour Button */}
      <button
        onClick={handleAdd}
        className="
          fixed bottom-3 right-3 z-50
          flex items-center gap-2
          rounded-lg
          bg-gold-dark
          px-4 py-2 md:px-5 md:py-3.5 md:text-base
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
          dark:bg-gold-light
          dark:text-slate-900
          dark:shadow-gold-light/20
          dark:hover:bg-gold-dark
          dark:hover:text-white
        "
      >
        <span>Add Tour</span>
      </button>
      {showAddTour && (
        <div
          className="
            fixed inset-0 z-1000
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
              staff={selectedTour}
              onClose={handleCloseForm}
              onSuccess={handleFormSuccess}
            />
          </div>
        </div>
      )}
    </main>
  );
}
