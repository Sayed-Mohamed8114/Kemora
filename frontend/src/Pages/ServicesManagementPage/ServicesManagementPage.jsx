import SmallLoader from "@/Components/Common/SmallLoader";
import ServicesForm from "@/Components/Forms/ServicesForm";
import ServiceCard from "@/Components/UI/ServiceCard";
import { deleteService, getAllServices } from "@/Services/Services";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function ServicesManagementPage() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAddService, setShowAddService] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  // get all services
  const getallServices = async () => {
    try {
      const data = await getAllServices();
      setServices(data);
    } catch (error) {
      toast.error(error?.response?.data?.detail || "something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // delete service
  const handleDelete = async (serviceId) => {
    try {
      await deleteService(serviceId);
      toast.success("Deleted Successfully");
      await getallServices();
    } catch (error) {
      toast.error(
        error?.response?.data?.detail || "failed to delete this service",
      );
    }
  };

  // open form to add new service
  const handleAdd = () => {
    setSelectedService(null);
    setShowAddService(true);
  };

  // open form to edit service
  const handleEdit = (service) => {
    setSelectedService(service);
    setShowAddService(true);
  };

  const handleCloseForm = () => {
    setShowAddService(false);
    setSelectedService(null);
  };

  const handleServiceFormSuccess = async () => {
    await getallServices();
    handleCloseForm();
  };

  useEffect(() => {
    getallServices();
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
            Services Management
          </h1>

          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Manage services that kemora will provide to their customers.
          </p>
        </div>

        {/* Services Grid */}
        {loading ? (
          <SmallLoader />
        ) : services.length === 0 ? (
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
              No Services yet start adding some services.
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
            {services.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                onDelete={handleDelete}
                onEdit={handleEdit}
              />
            ))}
          </div>
        )}
      </div>

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
        <span>Add Services</span>
      </button>
      {showAddService && (
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
            <ServicesForm
              service={selectedService}
              onCLose={handleCloseForm}
              onSuccess={handleServiceFormSuccess}
            />
          </div>
        </div>
      )}
    </main>
  );
}
