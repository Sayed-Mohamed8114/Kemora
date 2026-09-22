import { useEffect, useState } from "react";
import { addService, editService } from "@/Services/Services";
import { toast } from "sonner";
import {
  Tag,
  FileText,
  DollarSign,
  X,
  Plus,
  Save,
  Check,
} from "lucide-react";

export default function ServicesForm({ service, onClose, onSuccess }) {
  const isEditMode = Boolean(service);

  const [serviceForm, setServiceForm] = useState({
    name: "",
    description: "",
    price: "",
    is_active: true,
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (service) {
      setServiceForm({
        name: service.name || "",
        description: service.description || "",
        price: service.price || "",
        is_active: service.is_active ?? true,
      });
    } else {
      setServiceForm({
        name: "",
        description: "",
        price: "",
        is_active: true,
      });
    }
  }, [service]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setServiceForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleStatusToggle = () => {
    setServiceForm((prev) => ({
      ...prev,
      is_active: !prev.is_active,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const name = serviceForm.name.trim();
    const description = serviceForm.description.trim();
    const price = String(serviceForm.price).trim();

    if (!name) {
      toast.error("Please enter the service name");
      return;
    }

    if (!description) {
      toast.error("Please enter the service description");
      return;
    }

    if (!price) {
      toast.error("Please enter the service price");
      return;
    }

    if (Number(price) < 0) {
      toast.error("Price cannot be negative");
      return;
    }

    try {
      setLoading(true);

      const serviceData = {
        name,
        description,
        price,
        is_active: serviceForm.is_active,
      };

      if (isEditMode) {
        await editService(service.id, serviceData);
        toast.success("Service updated successfully");
      } else {
        await addService(serviceData);
        toast.success("Service added successfully");
      }

      await onSuccess?.();
    } catch (error) {
      const message =
        error?.response?.data?.detail ||
        "Something went wrong. Please try again later.";

      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      {/* Header */}
      <div className="mb-7 flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="mb-2 flex items-center gap-3">
            <div
              className="
                flex h-10 w-10 shrink-0
                items-center justify-center
                rounded-xl
                bg-gold-dark/10
                text-gold-dark
                dark:bg-gold-light/10
                dark:text-gold-light
              "
            >
              {isEditMode ? <Save size={20} /> : <Plus size={20} />}
            </div>

            <h2
              className="
                font-cinzel
                text-xl font-bold
                text-slate-900
                dark:text-white
                sm:text-2xl
              "
            >
              {isEditMode ? "Edit Service" : "Add Service"}
            </h2>
          </div>

          <p className="text-sm leading-6 text-slate-500 dark:text-slate-400">
            {isEditMode
              ? "Update the service information and availability."
              : "Create a new service for the Kemora platform."}
          </p>
        </div>

        {onClose && (
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="
              flex h-9 w-9 shrink-0
              items-center justify-center
              rounded-lg
              text-slate-500
              transition
              hover:bg-slate-100
              hover:text-slate-900
              disabled:cursor-not-allowed
              disabled:opacity-50
              dark:text-slate-400
              dark:hover:bg-white/5
              dark:hover:text-white
            "
            aria-label="Close"
          >
            <X size={20} />
          </button>
        )}
      </div>

      <div className="space-y-5">
        {/* Service Name */}
        <div>
          <label
            htmlFor="name"
            className="
              mb-2 block
              text-sm font-medium
              text-slate-700
              dark:text-slate-300
            "
          >
            Service Name
          </label>

          <div className="relative">
            <Tag
              size={18}
              className="
                pointer-events-none
                absolute left-3 top-1/2
                -translate-y-1/2
                text-slate-400
                dark:text-slate-500
              "
            />

            <input
              id="name"
              name="name"
              type="text"
              value={serviceForm.name}
              onChange={handleChange}
              placeholder="e.g. Personal Tour Guide"
              disabled={loading}
              autoComplete="off"
              className="
                w-full rounded-xl
                border border-slate-200
                bg-slate-50
                py-3 pl-10 pr-4
                text-sm text-slate-900
                outline-none
                transition
                placeholder:text-slate-400
                focus:border-gold-dark
                focus:ring-2
                focus:ring-gold-dark/10
                disabled:cursor-not-allowed
                disabled:opacity-60
                dark:border-white/10
                dark:bg-white/3
                dark:text-white
                dark:placeholder:text-slate-500
                dark:focus:border-gold-light
                dark:focus:ring-gold-light/10
              "
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label
            htmlFor="description"
            className="
              mb-2 block
              text-sm font-medium
              text-slate-700
              dark:text-slate-300
            "
          >
            Description
          </label>

          <div className="relative">
            <FileText
              size={18}
              className="
                pointer-events-none
                absolute left-3 top-3.5
                text-slate-400
                dark:text-slate-500
              "
            />

            <textarea
              id="description"
              name="description"
              value={serviceForm.description}
              onChange={handleChange}
              placeholder="Describe what this service includes..."
              disabled={loading}
              rows={4}
              className="
                w-full resize-none rounded-xl
                border border-slate-200
                bg-slate-50
                py-3 pl-10 pr-4
                text-sm text-slate-900
                outline-none
                transition
                placeholder:text-slate-400
                focus:border-gold-dark
                focus:ring-2
                focus:ring-gold-dark/10
                disabled:cursor-not-allowed
                disabled:opacity-60
                dark:border-white/10
                dark:bg-white/3
                dark:text-white
                dark:placeholder:text-slate-500
                dark:focus:border-gold-light
                dark:focus:ring-gold-light/10
              "
            />
          </div>
        </div>

        {/* Price */}
        <div>
          <label
            htmlFor="price"
            className="
              mb-2 block
              text-sm font-medium
              text-slate-700
              dark:text-slate-300
            "
          >
            Service Price
          </label>

          <div className="relative">
            <DollarSign
              size={18}
              className="
                pointer-events-none
                absolute left-3 top-1/2
                -translate-y-1/2
                text-slate-400
                dark:text-slate-500
              "
            />

            <input
              id="price"
              name="price"
              type="number"
              min="0"
              step="0.01"
              value={serviceForm.price}
              onChange={handleChange}
              placeholder="30.00"
              disabled={loading}
              className="
                w-full rounded-xl
                border border-slate-200
                bg-slate-50
                py-3 pl-10 pr-4
                text-sm text-slate-900
                outline-none
                transition
                placeholder:text-slate-400
                focus:border-gold-dark
                focus:ring-2
                focus:ring-gold-dark/10
                disabled:cursor-not-allowed
                disabled:opacity-60
                dark:border-white/10
                dark:bg-white/3
                dark:text-white
                dark:placeholder:text-slate-500
                dark:focus:border-gold-light
                dark:focus:ring-gold-light/10
              "
            />
          </div>

          <p className="mt-2 text-xs text-slate-400 dark:text-slate-500">
            Enter the price for this service.
          </p>
        </div>

        {/* Service Status */}
        <div
          className="
            rounded-xl
            border border-slate-200
            bg-slate-50
            p-4
            dark:border-white/10
            dark:bg-white/3
          "
        >
          <div className="flex items-center justify-between gap-4">
            <div className="min-w-0">
              <p className="text-sm font-semibold text-slate-800 dark:text-white">
                Service Status
              </p>

              <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">
                {serviceForm.is_active
                  ? "This service is currently available to customers."
                  : "This service is currently hidden from customers."}
              </p>
            </div>

            <button
              type="button"
              onClick={handleStatusToggle}
              disabled={loading}
              className={`
                relative h-6 w-11 shrink-0 rounded-full
                transition-colors duration-200
                focus:outline-none
                focus:ring-2
                focus:ring-gold-dark/30
                disabled:cursor-not-allowed
                disabled:opacity-60
                dark:focus:ring-gold-light/30
                ${
                  serviceForm.is_active
                    ? "bg-emerald-500"
                    : "bg-slate-300 dark:bg-slate-600"
                }
              `}
              aria-label={
                serviceForm.is_active
                  ? "Deactivate service"
                  : "Activate service"
              }
              aria-pressed={serviceForm.is_active}
            >
              <span
                className={`
                  absolute top-1
                  flex h-4 w-4
                  items-center justify-center
                  rounded-full
                  bg-white
                  shadow-sm
                  transition-transform duration-200
                  ${
                    serviceForm.is_active
                      ? "translate-x-6"
                      : "translate-x-1"
                  }
                `}
              >
                {serviceForm.is_active && (
                  <Check
                    size={10}
                    className="text-emerald-600"
                    strokeWidth={3}
                  />
                )}
              </span>
            </button>
          </div>

          <div className="mt-3 flex items-center gap-2">
            <span
              className={`
                h-2 w-2 rounded-full
                ${
                  serviceForm.is_active
                    ? "bg-emerald-500"
                    : "bg-red-500"
                }
              `}
            />

            <span
              className={`
                text-xs font-semibold
                ${
                  serviceForm.is_active
                    ? "text-emerald-600 dark:text-emerald-400"
                    : "text-red-600 dark:text-red-400"
                }
              `}
            >
              {serviceForm.is_active ? "Active" : "Inactive"}
            </span>
          </div>
        </div>

        {/* Edit Information */}
        {isEditMode && (
          <div
            className="
              rounded-xl
              border border-gold-dark/15
              bg-gold-dark/5
              p-4
              dark:border-gold-light/15
              dark:bg-gold-light/5
            "
          >
            <p className="text-xs leading-5 text-slate-600 dark:text-slate-400">
              You are editing{" "}
              <span className="font-semibold text-gold-dark dark:text-gold-light">
                {service.name}
              </span>
              . Changes will be applied after saving.
            </p>
          </div>
        )}
      </div>

      {/* Actions */}
      <div
        className="
          mt-7
          flex flex-col-reverse gap-3
          sm:flex-row sm:justify-end
        "
      >
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="
              rounded-xl
              border border-slate-200
              px-5 py-3
              text-sm font-semibold
              text-slate-700
              transition
              hover:bg-slate-100
              disabled:cursor-not-allowed
              disabled:opacity-50
              dark:border-white/10
              dark:text-slate-300
              dark:hover:bg-white/5
            "
          >
            Cancel
          </button>
        )}

        <button
          type="submit"
          disabled={loading}
          className="
            flex items-center justify-center gap-2
            rounded-xl
            bg-gold-dark
            px-6 py-3
            text-sm font-semibold text-white
            shadow-lg shadow-gold-dark/20
            transition
            hover:bg-gold-light
            hover:text-slate-900
            active:scale-[0.98]
            disabled:cursor-not-allowed
            disabled:opacity-60
            dark:bg-gold-light
            dark:text-slate-900
            dark:hover:bg-gold-dark
            dark:hover:text-white
          "
        >
          {loading ? (
            <>
              <span
                className="
                  h-4 w-4
                  animate-spin
                  rounded-full
                  border-2
                  border-current
                  border-t-transparent
                "
              />

              {isEditMode ? "Saving..." : "Creating..."}
            </>
          ) : (
            <>
              {isEditMode ? <Save size={18} /> : <Plus size={18} />}

              {isEditMode ? "Save Changes" : "Add Service"}
            </>
          )}
        </button>
      </div>
    </form>
  );
}