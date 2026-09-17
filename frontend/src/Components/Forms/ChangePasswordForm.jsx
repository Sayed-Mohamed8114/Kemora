import { changePassword } from "@/Services/updateProfile";
import { Eye, EyeOff, Lock, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function ChangePasswordForm({ onClose }) {
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [passwordData, setPasswordData] = useState({
    current_password: "",
    new_password: "",
  });

  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (passwordData.current_password === passwordData.new_password) {
      toast.error("can't use your old password as the new one");
      return;
    }

    if (passwordData.new_password.length < 8) {
      toast.error("new password must be at least 8 characters");
      return;
    }

    if (passwordData.new_password !== confirmPassword) {
      toast.error("passwords don't match");
      return;
    }

    try {
      setLoading(true);
      await changePassword(passwordData);
      setPasswordData({
        current_password: "",
        new_password: "",
      });

      setConfirmPassword("");
      toast.success(
        "your password has changed successfully remember it for the next login",
      );
      setTimeout(() => {
        onClose();
      }, 1200);
    } catch (error) {
      toast.error(
        error?.response?.data?.detail || "Failed to change the password",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className="w-full z-999 bg-white/15 dark:bg-transparent  backdrop-blur-2xl"
      onSubmit={handleChangePassword}
    >
      <div className="mb-7 flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="mb-2 flex items-center gap-3">
            <h2 className="font-cinzel text-xl font-bold text-slate-900 dark:text-white sm:text-2xl">
              Change Password
            </h2>
          </div>
          <p className="text-sm leading-6 text-slate-500 dark:text-slate-400">
            Update your password to keep your Kemora account secure.
          </p>
        </div>

        <button
          type="button"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-white/5 dark:hover:text-white"
          aria-label="Close"
          onClick={onClose}
        >
          <X size={20} />
        </button>
      </div>

      <div className="space-y-5">
        <div>
          <label
            htmlFor="current_password"
            className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300"
          >
            Current Password
          </label>
          <div className="relative">
            <Lock
              size={18}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500"
            />
            <input
              id="current_password"
              name="current_password"
              value={passwordData.current_password}
              onChange={(e) =>
                setPasswordData({
                  ...passwordData,
                  current_password: e.target.value,
                })
              }
              type={showCurrentPassword ? "text" : "password"}
              placeholder="Enter your current password"
              autoComplete="current-password"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-11 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-gold-dark focus:ring-2 focus:ring-gold-dark/10 dark:border-white/10 dark:bg-white/3 dark:text-white dark:placeholder:text-slate-500 dark:focus:border-gold-light dark:focus:ring-gold-light/10"
            />
            <button
              type="button"
              onClick={() => setShowCurrentPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-700 dark:text-slate-500 dark:hover:text-slate-200"
              aria-label={
                showCurrentPassword
                  ? "Hide current password"
                  : "Show current password"
              }
            >
              {showCurrentPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        <div>
          <label
            htmlFor="new_password"
            className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300"
          >
            New Password
          </label>
          <div className="relative">
            <Lock
              size={18}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500"
            />
            <input
              id="new_password"
              name="new_password"
              type={showNewPassword ? "text" : "password"}
              value={passwordData.new_password}
              onChange={(e) =>
                setPasswordData({
                  ...passwordData,
                  new_password: e.target.value,
                })
              }
              placeholder="Enter your new password"
              autoComplete="new-password"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-11 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-gold-dark focus:ring-2 focus:ring-gold-dark/10 dark:border-white/10 dark:bg-white/3 dark:text-white dark:placeholder:text-slate-500 dark:focus:border-gold-light dark:focus:ring-gold-light/10"
            />
            <button
              type="button"
              onClick={() => setShowNewPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-700 dark:text-slate-500 dark:hover:text-slate-200"
              aria-label={
                showNewPassword ? "Hide new password" : "Show new password"
              }
            >
              {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          <p className="mt-2 text-xs text-slate-400 dark:text-slate-500">
            Your new password should be at least 8 characters long.
          </p>
        </div>

        <div>
          <label
            htmlFor="confirm_password"
            className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300"
          >
            Confirm New Password
          </label>
          <div className="relative">
            <Lock
              size={18}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500"
            />
            <input
              id="confirm_password"
              name="confirm_password"
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your new password"
              autoComplete="new-password"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-11 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-gold-dark focus:ring-2 focus:ring-gold-dark/10 dark:border-white/10 dark:bg-white/3 dark:text-white dark:placeholder:text-slate-500 dark:focus:border-gold-light dark:focus:ring-gold-light/10"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-700 dark:text-slate-500 dark:hover:text-slate-200"
              aria-label={
                showConfirmPassword
                  ? "Hide confirm password"
                  : "Show confirm password"
              }
            >
              {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        <div className="rounded-xl border border-gold-dark/15 bg-gold-dark/5 p-4 dark:border-gold-light/15 dark:bg-gold-light/5">
          <div className="flex gap-3">
            <div>
              <p className="text-sm font-semibold text-slate-800 dark:text-white">
                Keep your account secure
              </p>
              <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">
                Use a strong password that you do not use for other accounts.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={onClose}
          className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-white/10 dark:text-slate-300 dark:hover:bg-white/5"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={loading}
          className="flex items-center justify-center gap-2 duration-700 cursor-pointer rounded-xl bg-gold-dark px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-gold-dark/20 transition hover:bg-gold-light hover:text-slate-900 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 dark:bg-gold-light dark:text-slate-900 dark:hover:bg-gold-dark dark:hover:text-white"
        >
          {loading ? "Changing..." : "Change Password"}
        </button>
      </div>
    </form>
  );
}
