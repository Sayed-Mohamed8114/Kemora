import ChangePasswordForm from "@/Components/Forms/ChangePasswordForm";
import { useAuth } from "@/Context/AuthContext";
import { updateProfile } from "@/Services/updateProfile";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

export default function UpdateProfilePage() {
  const { user, updateUser } = useAuth();
  const [showChangePasswordForm, setShowChangePasswordForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    gender: "",
    phone: "",
  });

  useEffect(() => {
    if (user) {
      setUserData({
        name: user.name || "",
        email: user.email || "",
        gender: user.gender || "",
        phone: user.phone || "",
      });
    }
  }, [user]);

  const handleUpdateUserProfile = async (e) => {
    e.preventDefault();

    setSaving(true);

    try {
      const data = await updateProfile(userData);
      updateUser(data);
      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error(error?.response?.data?.detail || "Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <main className="min-h-screen bg-slate-50 px-4 py-8 text-slate-900 dark:bg-[#121212] dark:text-white sm:px-20">
        <div className="w-full md:px-5">
          <div className="mb-8">
            <h1 className="font-cinzel text-2xl font-bold text-gold-dark dark:text-gold-light sm:text-3xl">
              Update Profile
            </h1>

            <p className="mt-2 text-sm text-light-muted dark:text-dark-muted">
              Update your personal information and keep your profile up to date.
            </p>
          </div>

          <div className="rounded-2xl bg-gray-50 p-6 shadow-sm dark:border-dark-border dark:bg-dark-surface sm:p-8">
            <form onSubmit={handleUpdateUserProfile}>
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-semibold text-light-text dark:text-dark-text"
                  >
                    Full Name
                  </label>

                  <input
                    id="name"
                    type="text"
                    value={userData.name}
                    onChange={(e) =>
                      setUserData({
                        ...userData,
                        name: e.target.value,
                      })
                    }
                    className="w-full rounded-xl border border-light-border bg-gray-100 px-4 py-3 text-sm outline-none transition-all placeholder:text-light-muted focus:border-gold focus:ring-2 focus:ring-gold/20 dark:border-dark-border dark:bg-dark-card dark:text-dark-text dark:placeholder:text-dark-muted"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-semibold text-light-text dark:text-dark-text"
                  >
                    Email Address
                  </label>

                  <input
                    id="email"
                    type="email"
                    value={userData.email}
                    onChange={(e) =>
                      setUserData({
                        ...userData,
                        email: e.target.value,
                      })
                    }
                    className="w-full rounded-xl border border-light-border bg-gray-100 px-4 py-3 text-sm outline-none transition-all placeholder:text-light-muted focus:border-gold focus:ring-2 focus:ring-gold/20 dark:border-dark-border dark:bg-dark-card dark:text-dark-text dark:placeholder:text-dark-muted"
                    placeholder="Enter your email"
                  />
                </div>

                <div>
                  <label
                    htmlFor="gender"
                    className="mb-2 block text-sm font-semibold text-light-text dark:text-dark-text"
                  >
                    Gender
                  </label>

                  <select
                    id="gender"
                    value={userData.gender}
                    onChange={(e) =>
                      setUserData({
                        ...userData,
                        gender: e.target.value,
                      })
                    }
                    className="w-full rounded-xl border border-light-border bg-gray-100 px-4 py-3 text-sm outline-none transition-all focus:border-gold focus:ring-2 focus:ring-gold/20 dark:border-dark-border dark:bg-dark-card dark:text-dark-text"
                  >
                    <option value="">Select your gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="mb-2 block text-sm font-semibold text-light-text dark:text-dark-text"
                  >
                    Phone Number
                  </label>

                  <input
                    id="phone"
                    type="tel"
                    value={userData.phone}
                    onChange={(e) =>
                      setUserData({
                        ...userData,
                        phone: e.target.value,
                      })
                    }
                    className="w-full rounded-xl border border-light-border bg-gray-100 px-4 py-3 text-sm outline-none transition-all placeholder:text-light-muted focus:border-gold focus:ring-2 focus:ring-gold/20 dark:border-dark-border dark:bg-dark-card dark:text-dark-text dark:placeholder:text-dark-muted"
                    placeholder="Enter your phone number"
                  />
                </div>
              </div>

              <div className="mt-8 border-t border-light-border pt-6 dark:border-dark-border">
                <h2 className="mb-5 font-cinzel text-lg font-semibold text-gold-dark dark:text-gold-light">
                  Account Information
                </h2>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                  <div>
                    <label
                      htmlFor="role"
                      className="mb-2 block text-sm font-semibold text-light-text dark:text-dark-text"
                    >
                      Role
                    </label>

                    <input
                      id="role"
                      type="text"
                      value={user?.role || ""}
                      disabled
                      className="w-full cursor-not-allowed rounded-xl border border-light-border bg-gray-100 px-4 py-3 text-sm capitalize text-light-muted opacity-80 dark:border-dark-border dark:bg-dark-card dark:text-dark-muted"
                    />

                    <p className="mt-2 text-xs text-light-muted dark:text-dark-muted">
                      Your account role cannot be changed.
                    </p>
                  </div>

                  <div>
                    <label
                      htmlFor="status"
                      className="mb-2 block text-sm font-semibold text-light-text dark:text-dark-text"
                    >
                      Account Status
                    </label>

                    <input
                      id="status"
                      type="text"
                      value={user?.is_active ? "Active" : "Inactive"}
                      disabled
                      className="w-full cursor-not-allowed rounded-xl border border-light-border bg-gray-100 px-4 py-3 text-sm text-light-muted opacity-80 dark:border-dark-border dark:bg-dark-card dark:text-dark-muted"
                    />

                    <p className="mt-2 text-xs text-light-muted dark:text-dark-muted">
                      Your account status can only be changed by an administrator.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex w-full flex-col-reverse items-center justify-between gap-5 border-t border-light-border pt-6 dark:border-dark-border md:flex-row-reverse md:gap-0">
                <button
                  type="button"
                  onClick={() => setShowChangePasswordForm(true)}
                  disabled={saving}
                  className="w-full cursor-pointer rounded-xl bg-gold-dark px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-700 hover:bg-gold-light hover:shadow-md focus:outline-none focus:ring-2 focus:ring-gold/30 disabled:cursor-not-allowed disabled:opacity-60 md:w-auto"
                >
                  Change Your Password
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="w-full cursor-pointer rounded-xl bg-gold-dark px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-700 hover:bg-gold-light hover:shadow-md focus:outline-none focus:ring-2 focus:ring-gold/30 disabled:cursor-not-allowed disabled:opacity-60 md:w-auto"
                >
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>

      <AnimatePresence>
        {showChangePasswordForm && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            onClick={() => setShowChangePasswordForm(false)}
          >
            <motion.div
              className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl dark:bg-dark-surface sm:p-8"
              initial={{ opacity: 0, y: 30, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.96 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
            >
              <ChangePasswordForm
                onClose={() => setShowChangePasswordForm(false)}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}