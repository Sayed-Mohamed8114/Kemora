import { useEffect, useState } from "react";
import {
  addStaff,
  editStaff,
} from "@/Services/staffManagement";
import { toast } from "sonner";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  UserRound,
  X,
  Plus,
  Save,
} from "lucide-react";

export default function AddStaffForm({
  staff,
  onClose,
  onSuccess,
}) {
  const isEditMode = Boolean(staff);

  const [staffForm, setStaffForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  /*
   * When the selected staff changes:
   * - null  -> create mode
   * - staff -> edit mode
   */
  useEffect(() => {
    if (staff) {
      setStaffForm({
        name: staff.name || "",
        email: staff.email || "",
        password: "",
      });
    } else {
      setStaffForm({
        name: "",
        email: "",
        password: "",
      });
    }

    setShowPassword(false);
  }, [staff]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setStaffForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const name = staffForm.name.trim();
    const email = staffForm.email.trim();

    if (!name) {
      toast.error("Please enter the staff name");
      return;
    }

    if (!email) {
      toast.error("Please enter the staff email");
      return;
    }

    /*
     * Password is required only when creating
     * a new staff account.
     */
    if (!isEditMode) {
      if (!staffForm.password) {
        toast.error("Please enter a password");
        return;
      }

      if (staffForm.password.length < 8) {
        toast.error("Password must be at least 8 characters");
        return;
      }
    }

    try {
      setLoading(true);

      if (isEditMode) {
        await editStaff(staff.id, {
          name,
          email,
        });

        toast.success("Staff updated successfully");
      } else {
        await addStaff({
          name,
          email,
          password: staffForm.password,
        });

        toast.success("Staff added successfully");
      }

      /*
       * Tell the parent page to refresh
       * the staff list and close the modal.
       */
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
              {isEditMode ? (
                <Save size={20} />
              ) : (
                <Plus size={20} />
              )}
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
              {isEditMode ? "Edit Staff" : "Add Staff"}
            </h2>
          </div>

          <p className="text-sm leading-6 text-slate-500 dark:text-slate-400">
            {isEditMode
              ? "Update the staff member's account information."
              : "Create a new staff account for the Kemora dashboard."}
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

      {/* Form Fields */}
      <div className="space-y-5">
        {/* Name */}
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
            Full Name
          </label>

          <div className="relative">
            <UserRound
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
              value={staffForm.name}
              onChange={handleChange}
              placeholder="Enter staff name"
              disabled={loading}
              autoComplete="name"
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
                dark:bg-white/[0.03]
                dark:text-white
                dark:placeholder:text-slate-500
                dark:focus:border-gold-light
                dark:focus:ring-gold-light/10
              "
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="
              mb-2 block
              text-sm font-medium
              text-slate-700
              dark:text-slate-300
            "
          >
            Email Address
          </label>

          <div className="relative">
            <Mail
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
              id="email"
              name="email"
              type="email"
              value={staffForm.email}
              onChange={handleChange}
              placeholder="staff@kemora.com"
              disabled={loading}
              autoComplete="email"
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
                dark:bg-white/[0.03]
                dark:text-white
                dark:placeholder:text-slate-500
                dark:focus:border-gold-light
                dark:focus:ring-gold-light/10
              "
            />
          </div>
        </div>

        {/* Password - Create only */}
        {!isEditMode && (
          <div>
            <label
              htmlFor="password"
              className="
                mb-2 block
                text-sm font-medium
                text-slate-700
                dark:text-slate-300
              "
            >
              Temporary Password
            </label>

            <div className="relative">
              <Lock
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
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={staffForm.password}
                onChange={handleChange}
                placeholder="Minimum 8 characters"
                disabled={loading}
                autoComplete="new-password"
                className="
                  w-full rounded-xl
                  border border-slate-200
                  bg-slate-50
                  py-3 pl-10 pr-11
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
                  dark:bg-white/[0.03]
                  dark:text-white
                  dark:placeholder:text-slate-500
                  dark:focus:border-gold-light
                  dark:focus:ring-gold-light/10
                "
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword((prev) => !prev)
                }
                disabled={loading}
                className="
                  absolute right-3 top-1/2
                  -translate-y-1/2
                  text-slate-400
                  transition
                  hover:text-slate-700
                  disabled:cursor-not-allowed
                  dark:text-slate-500
                  dark:hover:text-slate-200
                "
                aria-label={
                  showPassword
                    ? "Hide password"
                    : "Show password"
                }
              >
                {showPassword ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>
            </div>

            <p className="mt-2 text-xs text-slate-400 dark:text-slate-500">
              The staff member can use this password to sign in.
            </p>
          </div>
        )}

        {/* Edit Mode Information */}
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
                {staff.name}
              </span>
              . Password changes can be handled separately.
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
              {isEditMode ? (
                <Save size={18} />
              ) : (
                <Plus size={18} />
              )}

              {isEditMode ? "Save Changes" : "Add Staff"}
            </>
          )}
        </button>
      </div>
    </form>
  );
}