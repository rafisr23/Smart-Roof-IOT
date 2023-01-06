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
                    href={route("dashboard")}
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
            <ul className="flex mb-4 md:order-1 md:ml-4 md:mb-0">
              <li>
                <Link
                  to="#"
                  className="flex justify-center items-center text-gray-600 hover:text-gray-900 bg-white hover:bg-white-100 rounded-full shadow transition duration-150 ease-in-out"
                  aria-label="Twitter"
                >
                  <svg
                    className="w-8 h-8 fill-current"
                    viewBox="0 0 32 32"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M24 11.5c-.6.3-1.2.4-1.9.5.7-.4 1.2-1 1.4-1.8-.6.4-1.3.6-2.1.8-.6-.6-1.5-1-2.4-1-1.7 0-3.2 1.5-3.2 3.3 0 .3 0 .5.1.7-2.7-.1-5.2-1.4-6.8-3.4-.3.5-.4 1-.4 1.7 0 1.1.6 2.1 1.5 2.7-.5 0-1-.2-1.5-.4 0 1.6 1.1 2.9 2.6 3.2-.3.1-.6.1-.9.1-.2 0-.4 0-.6-.1.4 1.3 1.6 2.3 3.1 2.3-1.1.9-2.5 1.4-4.1 1.4H8c1.5.9 3.2 1.5 5 1.5 6 0 9.3-5 9.3-9.3v-.4c.7-.5 1.3-1.1 1.7-1.8z" />
                  </svg>
                </Link>
              </li>
              <li className="ml-4">
                <Link
                  to="#"
                  className="flex justify-center items-center text-gray-600 hover:text-gray-900 bg-white hover:bg-white-100 rounded-full shadow transition duration-150 ease-in-out"
                  aria-label="Github"
                >
                  <svg
                    className="w-8 h-8 fill-current"
                    viewBox="0 0 32 32"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M16 8.2c-4.4 0-8 3.6-8 8 0 3.5 2.3 6.5 5.5 7.6.4.1.5-.2.5-.4V22c-2.2.5-2.7-1-2.7-1-.4-.9-.9-1.2-.9-1.2-.7-.5.1-.5.1-.5.8.1 1.2.8 1.2.8.7 1.3 1.9.9 2.3.7.1-.5.3-.9.5-1.1-1.8-.2-3.6-.9-3.6-4 0-.9.3-1.6.8-2.1-.1-.2-.4-1 .1-2.1 0 0 .7-.2 2.2.8.6-.2 1.3-.3 2-.3s1.4.1 2 .3c1.5-1 2.2-.8 2.2-.8.4 1.1.2 1.9.1 2.1.5.6.8 1.3.8 2.1 0 3.1-1.9 3.7-3.7 3.9.3.4.6.9.6 1.6v2.2c0 .2.1.5.6.4 3.2-1.1 5.5-4.1 5.5-7.6-.1-4.4-3.7-8-8.1-8z" />
                  </svg>
                </Link>
              </li>
              <li className="ml-4">
                <Link
                  to="#"
                  className="flex justify-center items-center text-gray-600 hover:text-gray-900 bg-white hover:bg-white-100 rounded-full shadow transition duration-150 ease-in-out"
                  aria-label="Facebook"
                >
                  <svg
                    className="w-8 h-8 fill-current"
                    viewBox="0 0 32 32"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M14.023 24L14 17h-3v-3h3v-2c0-2.7 1.672-4 4.08-4 1.153 0 2.144.086 2.433.124v2.821h-1.67c-1.31 0-1.563.623-1.563 1.536V14H21l-1 3h-2.72v7h-3.257z" />
                  </svg>
                </Link>
              </li>
            </ul>

            {/* Copyrights note */}
            <div className="text-sm text-gray-600 mr-4">
              Made by{" "}
              <a
                className="text-blue-600 hover:underline"
                href="https://cruip.com/"
              >
                Cruip
              </a>
              . All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
