import Hero from "../components/sections/Hero";
import Banner from "../components/sections/Banner";
import About from "../components/sections/About";
import Services from "../components/sections/Services.jsx";
import Works from "../components/sections/Works.jsx";
import Stats from "../components/sections/Stats.jsx";
import Process from "../components/sections/Process";
import Journal from "../components/sections/Journel.jsx";
import Team from "../components/sections/Team.jsx";
import CTA from "../components/sections/CTA.jsx";

import Footer from "../components/layout/Footer.jsx";
import Navbar from "../components/layout/Navbar.jsx";
import { useEffect, useState } from "react";
import Testimonial from "../components/sections/Testimonial.jsx";

export default function HomePage() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => {
      const d = new Date();
      const h = d.toLocaleTimeString("en-US", {
        hour12: false,
        timeZone: "UTC",
      });

      setTime(`${h} UTC`);
    };

    update();

    const interval = setInterval(update, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-full overflow-hidden">
      <Navbar />
      <Hero />
      <Banner />
      <About />
      <Services />
      <Works />
      <Stats />
      <Process />
      <Journal />
      <Team />
      <Testimonial />
      <CTA />
      <Footer time={time} />
    </div>
  );
}
