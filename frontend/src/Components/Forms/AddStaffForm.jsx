import { useEffect, useState } from "react";
import { addStaff, editStaff } from "@/Services/staffManagement";
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
  Check,
} from "lucide-react";

export default function AddStaffForm({ staff, onClose, onSuccess }) {
  // True when editing an existing staff member
  const isEditMode = Boolean(staff);

  const [staffForm, setStaffForm] = useState({
    name: "",
    email: "",
    password: "",
    is_active: true,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (staff) {
      setStaffForm({
        name: staff.name || "",
        email: staff.email || "",
        password: "",
        is_active: staff.is_active ?? true,
      });
    } else {
      setStaffForm({
        name: "",
        email: "",
        password: "",
        is_active: true,
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

  const handleStatusToggle = () => {
    setStaffForm((prev) => ({
      ...prev,
      is_active: !prev.is_active,
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
          is_active: staffForm.is_active,
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
                dark:bg-white/3
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
                dark:bg-white/3
                dark:text-white
                dark:placeholder:text-slate-500
                dark:focus:border-gold-light
                dark:focus:ring-gold-light/10
              "
            />
          </div>
        </div>

        {/* Password - Create mode only */}
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
                  dark:bg-white/3
                  dark:text-white
                  dark:placeholder:text-slate-500
                  dark:focus:border-gold-light
                  dark:focus:ring-gold-light/10
                "
              />

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
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
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <p className="mt-2 text-xs text-slate-400 dark:text-slate-500">
              The staff member can use this password to sign in.
            </p>
          </div>
        )}

        {/* Account Status - Edit mode only */}
        {isEditMode && (
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
                  Account Status
                </p>

                <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">
                  {staffForm.is_active
                    ? "This staff member can access the dashboard."
                    : "This staff member cannot access the dashboard."}
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
                    staffForm.is_active
                      ? "bg-emerald-500"
                      : "bg-slate-300 dark:bg-slate-600"
                  }
                `}
                aria-label={
                  staffForm.is_active
                    ? "Deactivate staff account"
                    : "Activate staff account"
                }
                aria-pressed={staffForm.is_active}
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
                      staffForm.is_active
                        ? "translate-x-6"
                        : "translate-x-1"
                    }
                  `}
                >
                  {staffForm.is_active && (
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
                    staffForm.is_active
                      ? "bg-emerald-500"
                      : "bg-red-500"
                  }
                `}
              />

              <span
                className={`
                  text-xs font-semibold
                  ${
                    staffForm.is_active
                      ? "text-emerald-600 dark:text-emerald-400"
                      : "text-red-600 dark:text-red-400"
                  }
                `}
              >
                {staffForm.is_active ? "Active" : "Inactive"}
              </span>
            </div>
          </div>
        )}

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

              {isEditMode ? "Save Changes" : "Add Staff"}
            </>
          )}
        </button>
      </div>
    </form>
  );
}