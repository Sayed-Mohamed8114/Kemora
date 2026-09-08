import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToHash() {
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

      return;
    }

    const id = location.hash.substring(1);

    // Wait for the Home page to render
    const timer = setTimeout(() => {
      const element = document.getElementById(id);

      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [location.pathname, location.hash]);

  return null;
}
