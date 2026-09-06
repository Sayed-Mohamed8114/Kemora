import { Outlet } from "react-router-dom";
import NavBar from "../UI/NavBar";
import Footer from "../UI/Footer";

export default function MainLayout() {
  return (
    <div
      className="min-h-screen flex flex-col 
    items-center justify-center bg-light-bg text-light-text
     dark:bg-dark-bg dark:text-dark-text
     transition-colors ease-in-out duration-500 
    
     "
    >
      <NavBar />
      <main className="flex flex-1 w-full min-h-screen">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
