import {
  MapPin,
  Clock3,
  DollarSign,
  ImagePlus,
  Plus,
  Save,
  X,
} from "lucide-react";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { addTour, updateTour, uploadTourImage } from "@/Services/tours";

const TOUR_STATUSES = [
  {
    value: "draft",
    label: "Draft",
    description: "The tour is not visible to customers yet.",
  },
  {
    value: "published",
    label: "Published",
    description: "The tour is available for customers.",
  },
  {
    value: "archived",
    label: "Archived",
    description: "The tour is no longer active.",
  },
];

export default function AddTourForm({ tour, onClose, onSuccess }) {
  const isEditMode = Boolean(tour);

  const [tourData, setTourData] = useState({
    title: "",
    description: "",
    location: "",
    duration: "",
    price: "",
    status: "draft",
  });

  const [tourImage, setTourImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (tour) {
      setTourData({
        title: tour.title || "",
        description: tour.description || "",
        location: tour.location || "",
        duration: tour.duration || "",
        price: tour.price ?? "",
        status: tour.status || "draft",
      });

      setImagePreview(tour.image_url || "");
    } else {
      setTourData({
        title: "",
        description: "",
        location: "",
        duration: "",
        price: "",
        status: "draft",
      });

      setTourImage(null);
      setImagePreview("");
    }
  }, [tour]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setTourData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image file");
      return;
    }

    setTourImage(file);

    const previewUrl = URL.createObjectURL(file);
    setImagePreview(previewUrl);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const title = tourData.title.trim();
    const description = tourData.description.trim();
    const location = tourData.location.trim();
    const duration = tourData.duration.trim();
    const price = Number(tourData.price);

    if (!title) {
      toast.error("Please enter a tour title");
      return;
    }

    if (!description) {
      toast.error("Please enter a description for the tour");
      return;
    }

    if (!location) {
      toast.error("Please specify the tour location");
      return;
    }

    if (!duration) {
      toast.error("Please specify the tour duration");
      return;
    }

    if (tourData.price === "" || Number.isNaN(price) || price < 0) {
      toast.error("Please enter a valid tour price");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        title,
        description,
        location,
        duration,
        price,
        status: tourData.status,
      };

      let savedTour;

      if (isEditMode) {
        savedTour = await updateTour(tour.id, payload);
      } else {
        savedTour = await addTour(payload);
      }

      // The tour must exist first because the image
      // upload endpoint needs the tour ID.
      const tourId = isEditMode ? tour.id : savedTour?.id;

      console.log("=== IMAGE UPLOAD DEBUG ===");
      console.log("savedTour:", savedTour);
      console.log("tourId:", tourId);
      console.log("tourImage:", tourImage);
      console.log("image name:", tourImage?.name);
      console.log("image type:", tourImage?.type);

      if (tourImage && tourId) {
        console.log("Uploading image now...");

        await uploadTourImage(tourId, tourImage);

        console.log("Image uploaded successfully");
      }

      toast.success(
        isEditMode ? "Tour updated successfully" : "Tour added successfully",
      );

      await onSuccess?.();
    } catch (error) {
      const message =
        error?.response?.data?.detail ||
        (isEditMode ? "Failed to update tour" : "Failed to add a new tour");

      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
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
              {isEditMode ? "Edit Tour" : "Add Tour"}
            </h2>
          </div>

          <p className="text-sm leading-6 text-slate-500 dark:text-slate-400">
            {isEditMode
              ? "Update the tour information and its availability."
              : "Create a new tour for customers visiting Egypt."}
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
        <div>
          <label
            htmlFor="title"
            className="
              mb-2 block
              text-sm font-medium
              text-slate-700
              dark:text-slate-300
            "
          >
            Tour Title
          </label>

          <input
            id="title"
            name="title"
            type="text"
            value={tourData.title}
            onChange={handleChange}
            placeholder="e.g. Pyramids of Giza Experience"
            disabled={loading}
            className="
              w-full rounded-xl
              border border-slate-200
              bg-slate-50
              px-4 py-3
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

          <textarea
            id="description"
            name="description"
            value={tourData.description}
            onChange={handleChange}
            placeholder="Describe what customers will experience..."
            disabled={loading}
            rows={4}
            className="
              w-full resize-none rounded-xl
              border border-slate-200
              bg-slate-50
              px-4 py-3
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

        <div>
          <label
            htmlFor="location"
            className="
              mb-2 block
              text-sm font-medium
              text-slate-700
              dark:text-slate-300
            "
          >
            Location
          </label>

          <div className="relative">
            <MapPin
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
              id="location"
              name="location"
              type="text"
              value={tourData.location}
              onChange={handleChange}
              placeholder="e.g. Giza, Egypt"
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
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <label
              htmlFor="duration"
              className="
                mb-2 block
                text-sm font-medium
                text-slate-700
                dark:text-slate-300
              "
            >
              Duration
            </label>

            <div className="relative">
              <Clock3
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
                id="duration"
                name="duration"
                type="text"
                value={tourData.duration}
                onChange={handleChange}
                placeholder="e.g. 2 days"
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
          </div>

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
              Price
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
                value={tourData.price}
                onChange={handleChange}
                placeholder="0.00"
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
          </div>
        </div>

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
          <div className="mb-3">
            <p className="text-sm font-semibold text-slate-800 dark:text-white">
              Tour Status
            </p>

            <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">
              Choose how this tour should appear in the system.
            </p>
          </div>

          <div className="space-y-2">
            {TOUR_STATUSES.map((status) => (
              <label
                key={status.value}
                className={`
                  flex cursor-pointer items-start gap-3
                  rounded-xl border p-3
                  transition
                  ${
                    tourData.status === status.value
                      ? "border-gold-dark/40 bg-gold-dark/5 dark:border-gold-light/40 dark:bg-gold-light/5"
                      : "border-slate-200 hover:bg-slate-100 dark:border-white/10 dark:hover:bg-white/5"
                  }
                  ${loading ? "cursor-not-allowed opacity-60" : ""}
                `}
              >
                <input
                  type="radio"
                  name="status"
                  value={status.value}
                  checked={tourData.status === status.value}
                  onChange={handleChange}
                  disabled={loading}
                  className="mt-1 accent-gold-dark"
                />

                <div>
                  <p className="text-sm font-semibold text-slate-800 dark:text-white">
                    {status.label}
                  </p>

                  <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">
                    {status.description}
                  </p>
                </div>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label
            htmlFor="tour-image"
            className="
              mb-2 block
              text-sm font-medium
              text-slate-700
              dark:text-slate-300
            "
          >
            Tour Cover Image
          </label>

          <label
            htmlFor="tour-image"
            className={`
              flex min-h-40 cursor-pointer
              flex-col items-center justify-center
              rounded-xl border-2 border-dashed
              border-slate-200
              bg-slate-50
              p-5
              text-center
              transition
              hover:border-gold-dark/50
              hover:bg-gold-dark/5
              dark:border-white/10
              dark:bg-white/3
              dark:hover:border-gold-light/50
              dark:hover:bg-gold-light/5
              ${loading ? "cursor-not-allowed opacity-60" : ""}
            `}
          >
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="Tour preview"
                className="mb-3 h-32 w-full rounded-lg object-cover"
              />
            ) : (
              <ImagePlus
                size={30}
                className="mb-3 text-slate-400 dark:text-slate-500"
              />
            )}

            <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">
              {tourImage
                ? tourImage.name
                : imagePreview
                  ? "Choose a new image"
                  : "Upload tour cover"}
            </p>

            <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">
              PNG, JPG or WEBP
            </p>

            <input
              id="tour-image"
              type="file"
              accept="image/png,image/jpeg,image/webp"
              onChange={handleImageChange}
              disabled={loading}
              className="hidden"
            />
          </label>
        </div>

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
                {tour.title}
              </span>
              . Changes will be applied to this tour.
            </p>
          </div>
        )}
      </div>

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

              {isEditMode ? "Save Changes" : "Add Tour"}
            </>
          )}
        </button>
      </div>
    </form>
  );
}
