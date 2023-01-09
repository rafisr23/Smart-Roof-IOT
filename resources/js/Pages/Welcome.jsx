import React, { useState, useEffect } from "react";
import { Link, Head } from "@inertiajs/inertia-react";
import Header from "./partials/Header";
import HeroHome from "./partials/HeroHome";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import NavLink from "@/Components/NavLink";

export default function Welcome(props) {
  const [top, setTop] = useState(true);

  // detect whether user has scrolled the page down by 10px
  useEffect(() => {
    const scrollHandler = () => {
      window.pageYOffset > 10 ? setTop(false) : setTop(true);
    };
    window.addEventListener("scroll", scrollHandler);
    return () => window.removeEventListener("scroll", scrollHandler);
  }, [top]);

  return (
    <div div className="flex flex-col min-h-screen overflow-hidden bg-white">
      <header
        className={`fixed w-full z-30 md:bg-opacity-90 transition duration-300 ease-in-out ${
          !top && "bg-white backdrop-blur-sm shadow-lg"
        }`}
      >
        <div className="max-w-6xl mx-auto px-5 sm:px-6">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Site branding */}
            <div className="flex-shrink-0 mr-4">
              {/* Logo */}
              <Link href="/" className="block" aria-label="Cruip">
                <svg
                  className="w-8 h-8"
                  viewBox="0 0 32 32"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <radialGradient
                      cx="21.152%"
                      cy="86.063%"
                      fx="21.152%"
                      fy="86.063%"
                      r="79.941%"
                      id="header-logo"
                    >
                      <stop stopColor="#4FD1C5" offset="0%" />
                      <stop stopColor="#81E6D9" offset="25.871%" />
                      <stop stopColor="#338CF5" offset="100%" />
                    </radialGradient>
                  </defs>
                  <rect
                    width="32"
                    height="32"
                    rx="16"
                    fill="url(#header-logo)"
                    fillRule="nonzero"
                  />
                </svg>
              </Link>
            </div>

            {/* Site navigation */}
            <nav className="flex flex-grow">
              <ul className="flex flex-grow justify-start flex-wrap items-center">
                <li>
                  <Link
                    href={route("home")}
                    className="font-medium text-gray-600 hover:text-gray-900 px-5 py-3 flex items-center transition duration-150 ease-in-out"
                  >
                    Home
                  </Link>
                </li>
                {props.auth.user ? (
                  <li>
                    <Link
                      href={route("monitoring")}
                      className="font-medium text-gray-600 hover:text-gray-900 px-5 py-3 flex items-center transition duration-150 ease-in-out"
                    >
                      Monitoring
                    </Link>
                  </li>
                ) : (
                  <li></li>
                )}
              </ul>
              <ul className="flex flex-grow justify-end flex-wrap items-center">
                {props.auth.user ? (
                  <>
                    <li>
                      <Link
                        method="post"
                        href={route("logout")}
                        as="button"
                        className="btn-sm text-white bg-red-500 hover:bg-red-900 rounded"
                      >
                        Log Out
                      </Link>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <Link
                        href={route("login")}
                        className="font-medium text-gray-600 hover:text-gray-900 px-5 py-3 flex items-center transition duration-150 ease-in-out"
                      >
                        Log in
                      </Link>
                    </li>
                    <li>
                      <Link
                        href={route("register")}
                        className="btn-sm text-gray-200 bg-gray-900 hover:bg-gray-800 ml-3 p-2 rounded"
                      >
                        Register
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </nav>
          </div>
        </div>
      </header>

      {/*  Page content */}
      <main className="flex-grow">
        {/*  Page sections */}
        <HeroHome />
        {/* <FeaturesHome />
        <FeaturesBlocks />
        <Testimonials />
        <Newsletter /> */}
      </main>

      <footer>
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {/* Bottom area */}
          <div className="md:flex md:items-center md:justify-between py-4 md:py-8 border-t border-gray-200">
            {/* Social links */}
            <ul className="flex mb-4 md:order-1 md:ml-4 md:mb-0"></ul>

            {/* Copyrights note */}
            <div className="text-sm text-gray-600 mr-4">
              Made by{" "}
              <a
                className="text-blue-600 hover:underline"
                href="https://instagram.com/rafisr_"
              >
                RafiSR
              </a>
              . All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
