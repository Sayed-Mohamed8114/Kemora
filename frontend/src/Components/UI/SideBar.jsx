import { sidebarByRoles } from "@/Constants/sideBarItems";
import { useAuth } from "@/Context/AuthContext";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { toast } from "sonner";
import { LuLogOut, LuX } from "react-icons/lu";

export default function SideBar({ sidebarOpen, setSidebarOpen }) {
  const { user, logout } = useAuth();

  const role = user?.role;
  const sidebarItems = sidebarByRoles[role] ?? [];

  const [loading, setLoader] = useState(false);

  const handleLogout = async () => {
    try {
      setLoader(true);

      await logout();

      toast.success("Logged out successfully");
    } catch {
      toast.error("Something went wrong");
    } finally {
      setLoader(false);
    }
  };

  const handleNavigation = () => {
    setSidebarOpen(false);
  };

  return (
    <>
      {/* Mobile Overlay */}
      <div
        onClick={() => setSidebarOpen(false)}
        className={`
          fixed inset-0 
          bg-black/40
          backdrop-blur-[2px]
          transition-opacity duration-300
          z-200
          md:hidden
          ${
            sidebarOpen
              ? "pointer-events-auto opacity-100"
              : "pointer-events-none opacity-0"
          }
        `}
      />

      <aside
        className={`
          group
          fixed left-0 top-0 z-300
          flex h-screen
          w-64 shrink-0
          flex-col
          overflow-hidden
          px-3 py-3
          bg-gray-100
          dark:bg-dark-bg
          dark:shadow-2xs 
          backdrop-blur-md
          shadow-xl
          md:mt-[5vh]
          transition-all
          duration-500
          ease-in-out
          md:fixed
          md:top-0
          md:h-[95vh]
          md:w-16
          md:translate-x-0
          md:shadow-none
          md:hover:w-56

          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="mb-4 flex items-center justify-between z-999 md:hidden flex-col">
          <div className="flex items-center mt-20 justify-between w-full">
            <h2 className="font-cinzel text-xl font-extrabold text-dark-bg dark:text-gold-dark">
              Kemora
            </h2>
            <button
              type="button"
              onClick={() => setSidebarOpen(false)}
              className="
              rounded-lg
              p-2
              text-dark-bg
              transition-colors
              hover:bg-black/10
              dark:text-white
              dark:hover:bg-white/10
            "
              aria-label="Close sidebar"
            >
              <LuX size={22} />
            </button>
          </div>
          <h2 className="font-cinzel text-xl font-extrabold text-gold-dark mt-10 text-start">
            {user.role}
          </h2>
        </div>

        <nav className="flex h-full flex-col items-center justify-between font-extrabold">
          <div className="mt-6 flex w-full flex-col gap-5 font-mono text-xl text-dark-border dark:text-light-border md:mt-10">
            {sidebarItems.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={handleNavigation}
                  className={({ isActive }) => `
                    flex
                    w-full
                    items-center
                    gap-3
                    overflow-hidden
                    rounded-lg
                    px-2
                    py-2

                    transition-all
                    duration-700

                    ${
                      isActive
                        ? "bg-dark-border/10 dark:bg-gold-dark/10"
                        : "hover:bg-dark-border/10 dark:hover:bg-gold-dark/10"
                    }
                  `}
                >
                  <Icon
                    size={22}
                    className="
                      shrink-0
                      transition-transform
                      duration-300
                      md:group-hover:scale-105
                    "
                  />

                  <span
                    className="
                      whitespace-nowrap
                      text-sm

                      opacity-100
                      translate-x-0

                      transition-all
                      duration-300
                      ease-in-out

                      md:-translate-x-2
                      md:opacity-0
                      md:group-hover:translate-x-0
                      md:group-hover:opacity-100
                    "
                  >
                    {item.label}
                  </span>
                </NavLink>
              );
            })}
          </div>

          <button
            type="button"
            onClick={handleLogout}
            disabled={loading}
            className="
              flex
              w-full
              items-center
              gap-3
              overflow-hidden
              rounded-lg
              bg-red-800
              px-2
              py-2
              text-light-surface

              transition-all
              duration-300

              hover:bg-red-600

              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            <LuLogOut size={22} className="shrink-0" />

            <span
              className="
                whitespace-nowrap
                text-sm

                opacity-100
                translate-x-0

                transition-all
                duration-300

                md:-translate-x-2
                md:opacity-0
                md:group-hover:translate-x-0
                md:group-hover:opacity-100
              "
            >
              {loading ? "Logging out..." : "Logout"}
            </span>
          </button>
        </nav>
      </aside>
    </>
  );
}
