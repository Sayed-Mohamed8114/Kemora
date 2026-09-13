import { useAuth } from "@/Context/AuthContext";
import DarkLightSwitch from "./DarkLightSwitch";
import { User } from "lucide-react";
import { LuMenu } from "react-icons/lu";

export default function NavBarDashboard({ sidebarOpen, setSidebarOpen }) {
  const { user } = useAuth();

  return (
    <header
      className="
        sticky
        top-0
        z-999
        flex
        w-full
        items-center
        justify-center

       bg-gray-100
        dark:bg-gray-50/90
        dark:shadow-dark-border
        backdrop-blur-md
      "
    >
      <nav
        className="
          flex
          h-[8vh]
          w-full
          items-center
          justify-between
          rounded-b-lg
          px-4
          py-2
        "
      >
        <div className="flex min-w-0 items-center gap-3">
          <button
            type="button"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="
              rounded-lg
              p-2
              text-dark-bg
              transition-colors
              hover:bg-black/10

              dark:hover:bg-white/10

              md:hidden
            "
            aria-label="Toggle sidebar"
          >
            <LuMenu size={25} />
          </button>

          <h2 className="min-w-0 truncate font-cinzel text-lg font-extrabold text-dark-border sm:text-2xl md:text-3xl">
            {user?.name}

            <span className="mt-1 flex items-center gap-1 truncate font-manrope text-[10px] font-semibold text-gold-dark sm:text-sm">
              <User size={15} className="shrink-0" />

              <span className="truncate">{user?.email}</span>
            </span>
          </h2>
        </div>

        <div className="flex shrink-0 items-center justify-center gap-3 sm:gap-5">
            <h2 className="text-lg font-extrabold font-cinzel text-nile-dark hidden md:flex">{user.role}</h2>
          <DarkLightSwitch />
        </div>
      </nav>
    </header>
  );
}
