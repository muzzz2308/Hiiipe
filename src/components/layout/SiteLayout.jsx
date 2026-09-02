import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import SEO from "../seo/SEO";

export default function SiteLayout({ children, seo }) {
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => {
      const d = new Date();
      setTime(
        `${d.toLocaleTimeString("en-US", { hour12: false, timeZone: "UTC" })} UTC`,
      );
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {seo && <SEO {...seo} />}
      <div className="relative w-full min-h-screen overflow-x-hidden">
        <Navbar />
        <main>{children}</main>
        <Footer time={time} />
      </div>
    </>
  );
}
