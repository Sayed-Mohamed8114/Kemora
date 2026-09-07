import About from "@/Components/Home/About";
import Destinations from "@/Components/Home/Destination";
import Explore from "@/Components/Home/Explore";
import Guides from "@/Components/Home/Guides";
import Hero from "@/Components/Home/Hero";
import Tours from "@/Components/Home/Tours";

export default function Home() {
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center overflow-x-hidden">
      <Hero />
      <Explore />
      <Tours />
      <Guides />
      <Destinations />
      <About />
    </div>
  );
}
