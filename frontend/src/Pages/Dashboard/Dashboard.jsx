import { useState } from "react";
import { Outlet } from "react-router-dom";
import NavBarDashboard from "@/Components/UI/NavBarDashboard";
import SideBar from "@/Components/UI/SideBar";

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <section className="flex min-h-screen w-full flex-col bg-light-surface dark:bg-dark-bg">
      <NavBarDashboard
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />
      <div className="relative flex flex-1 items-stretch">
        <SideBar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main className="min-w-0 flex-1">
          <Outlet />
        </main>
      </div>
    </section>
  );
}
