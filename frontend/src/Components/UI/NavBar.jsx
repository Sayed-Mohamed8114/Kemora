import { Link, useLocation } from "react-router-dom";
import DarkLightSwitch from "./DarkLightSwitch";
import { useState } from "react";

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    {
      name: "Explore",
      id: "explore",
    },
    {
      name: "Tours",
      id: "tours",
    },
    {
      name: "Guides",
      id: "guides",
    },
    {
      name: "Destinations",
      id: "destinations",
    },
    {
      name: "About",
      id: "about",
    },
  ];

  const liStyle = `
    font-manrope
    text-sm
    lg:text-lg
    font-bold
    text-gold-dark
    dark:text-gold-dark
    transition-all
    duration-300
    hover:-translate-y-0.5
  `;

  // Generate the correct link depending on the current page
  const getSectionLink = (id) => {
    return location.pathname === "/" ? `#${id}` : `/#${id}`;
  };

  // Close mobile menu
  const handleMobileClick = () => {
    setIsOpen(false);
  };

  return (
    <header
      className="
        fixed
        top-0
        left-1/2
        -translate-x-1/2
        mt-5
        z-50
        w-[95%]
        md:w-[90%]
        min-h-[8vh]
        px-5
        py-3
        flex
        items-center
        justify-center
        rounded-md
        bg-gray-100
        dark:bg-gray-50/90
        border-b
        border-gold-dark
        dark:border-gold-light
        shadow-lg
        dark:shadow-dark-border
        backdrop-blur-md
      "
    >
      <nav className="flex w-full items-center justify-between">
        <h1
          className="
            font-cinzel
            font-extrabold
            text-4xl
            lg:text-5xl
            bg-linear-to-r
            from-gold-dark
            to-gold
            bg-clip-text
            text-transparent
            dark:from-gold
            dark:to-gold-light
          "
        >
          <Link
            to="/"
            onClick={handleMobileClick}
            className="flex items-center justify-center"
          >
            Kemora
          </Link>
        </h1>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center justify-center gap-3">
          <ul className="flex items-center justify-center gap-3">
            {navItems.map((item) => (
              <li key={item.id} className={liStyle}>
                <Link to={getSectionLink(item.id)}>{item.name}</Link>
              </li>
            ))}

            {/* Contact */}
            <li className={liStyle}>
              <Link to="/contact">Contact Us</Link>
            </li>
          </ul>

          <DarkLightSwitch />
        </div>

        <button
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label="Toggle menu"
          aria-expanded={isOpen}
          className="
            md:hidden
            flex
            h-10
            w-10
            items-center
            justify-center
            cursor-pointer
            text-black
            transition-all
            duration-500
            hover:scale-105
          "
        >
          <span
            className={`
              text-xl
              font-extrabold
              transition-transform
              duration-500
              ${isOpen ? "rotate-90" : "rotate-0"}
            `}
          >
            {isOpen ? "×" : "☰"}
          </span>
        </button>
      </nav>

      {/* Mobile Navigation */}
      <div
        className={`
          absolute
          left-0
          top-[calc(100%+12px)]
          w-full
          rounded-2xl
          border
          border-gold-dark/20
          dark:border-gold-light/20
          bg-white/95
          dark:bg-black/90
          p-5
          shadow-xl
          backdrop-blur-3xl
          md:hidden
          transform-gpu
          transition-all
          duration-700
          ease-[cubic-bezier(0.16,1,0.3,1)]

          ${
            isOpen
              ? `
                translate-y-0
                scale-100
                opacity-100
                visible
                pointer-events-auto
              `
              : `
                -translate-y-8
                scale-[0.97]
                opacity-0
                invisible
                pointer-events-none
              `
          }
        `}
      >
        <div className="flex w-full flex-col gap-5">
          {navItems.map((item) => (
            <Link
              key={item.id}
              to={getSectionLink(item.id)}
              onClick={handleMobileClick}
              className="
                font-manrope
                text-lg
                font-bold
                text-gold-dark
                dark:text-gold-light
                transition-all
                duration-500
                hover:translate-x-2
              "
            >
              {item.name}
            </Link>
          ))}

          {/* Contact */}
          <Link
            to="/contact"
            onClick={handleMobileClick}
            className="
              font-manrope
              text-lg
              font-bold
              text-gold-dark
              dark:text-gold-light
              transition-all
              duration-500
              hover:translate-x-2
            "
          >
            Contact Us
          </Link>

          {/* Theme Switch */}
          <div
            className="
              flex
              items-center
              justify-end
              pt-3
            "
          >
            <DarkLightSwitch />
          </div>
        </div>
      </div>
    </header>
  );
}
