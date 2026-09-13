import SmallLoader from "@/Components/Common/SmallLoader";
import AddStaffForm from "@/Components/Forms/AddStaffForm";
import StaffCard from "@/Components/UI/StaffCard";
import { deleteStaff, getStaff } from "@/Services/staffManagement";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function StaffMangamenetpage() {
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showAddStaff, setShowAddStaff] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState(null);

  const getAllStaff = async () => {
    try {
      const data = await getStaff();
      setStaff(data);
    } catch (error) {
      toast.error(
        error?.response?.data?.detail || "Failed to load staff"
      );
    } finally {
      setLoading(false);
    }
  };

  // Open form in create mode
  const handleAdd = () => {
    setSelectedStaff(null);
    setShowAddStaff(true);
  };

  // Open form in edit mode
  const handleEdit = (user) => {
    setSelectedStaff(user);
    setShowAddStaff(true);
  };

  // Delete staff
  const handleDelete = async (userId) => {
    try {
      await deleteStaff(userId);

      toast.success("Deleted successfully");

      await getAllStaff();
    } catch (error) {
      toast.error(
        error?.response?.data?.detail || "Something went wrong"
      );
    }
  };

  // Close modal and reset selected staff
  const handleCloseForm = () => {
    setShowAddStaff(false);
    setSelectedStaff(null);
  };

  // Called after successful add/edit
  const handleFormSuccess = async () => {
    await getAllStaff();
    handleCloseForm();
  };

  useEffect(() => {
    getAllStaff();
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
        sm:px-6
      "
    >
      <div className="mx-auto max-w-7xl">
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
            Staff Management
          </h1>

          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Manage Kemora staff members and their access.
          </p>
        </div>

        {/* Staff Grid */}
        {loading ? (
          <SmallLoader />
        ) : staff.length === 0 ? (
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
              sm:grid-cols-2
              xl:grid-cols-3
            "
          >
            {staff.map((user) => (
              <StaffCard
                key={user.id}
                staff={user}
                ondelete={handleDelete}
                onEdit={handleEdit}
              />
            ))}
          </div>
        )}
      </div>

      {/* Add Staff Button */}
      <button
        onClick={handleAdd}
        className="
          fixed bottom-6 right-6 z-[999]
          flex items-center gap-2
          rounded-full
          bg-gold-dark
          px-5 py-3.5
          font-semibold text-white
          shadow-lg shadow-gold-dark/25
          transition-all duration-300
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
        <span>Add Staff</span>
      </button>

      {/* Add / Edit Staff Modal */}
      {showAddStaff && (
        <div
          className="
            fixed inset-0 z-[1000]
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
            <AddStaffForm
              staff={selectedStaff}
              onClose={handleCloseForm}
              onSuccess={handleFormSuccess}
            />
          </div>
        </div>
      )}
    </main>
  );
}