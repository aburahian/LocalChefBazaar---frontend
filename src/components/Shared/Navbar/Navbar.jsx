import Container from "../Container";
import { AiOutlineMenu } from "react-icons/ai";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { useState, useRef } from "react";
import { Link, NavLink } from "react-router";
import useAuth from "../../../hooks/useAuth";
import { useTheme } from "../../../providers/ThemeProvider";
import avatarImg from "../../../assets/images/placeholder.jpg";
import logo from "../../../assets/images/logo-flat.png";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import {
  FaHome,
  FaUtensils,
  FaInfoCircle,
  FaEnvelope,
  FaColumns,
  FaShoppingCart,
  FaSignOutAlt,
  FaSignInAlt,
  FaUserPlus,
} from "react-icons/fa";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef(null);
  const linksRef = useRef(null);

  useGSAP(() => {
    gsap.from(navRef.current, {
      y: -100,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    });
  }, []);

  return (
    <div
      ref={navRef}
      className="fixed w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md z-10 shadow-sm transition-all duration-300"
    >
      <div className="py-4">
        <Container>
          <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <img
                src={logo}
                alt="logo"
                className="w-12 h-auto group-hover:scale-110 transition-transform duration-300"
              />
              <h1 className="hidden md:block font-bold text-xl text-gray-800 dark:text-white tracking-tight group-hover:text-primary transition-colors">
                LocalChef<span className="text-primary">Bazaar</span>
              </h1>
            </Link>

            {/* Middle Navigation Links (Desktop) */}
            <div ref={linksRef} className="hidden md:flex gap-8 items-center">
              <NavLink to="/" className="relative group py-2">
                {({ isActive }) => (
                  <span
                    className={`nav-link text-sm font-medium tracking-wide transition-all duration-300 hover:text-primary ${isActive
                        ? "text-primary"
                        : "text-gray-600 dark:text-gray-300"
                      }`}
                  >
                    Home
                    <span
                      className={`absolute bottom-0 left-0 h-0.5 bg-primary transition-all duration-300 ${isActive ? "w-full" : "w-0 group-hover:w-full"
                        }`}
                    ></span>
                  </span>
                )}
              </NavLink>
              <NavLink to="/meals" className="relative group py-2">
                {({ isActive }) => (
                  <span
                    className={`nav-link text-sm font-medium tracking-wide transition-all duration-300 hover:text-primary ${isActive
                        ? "text-primary"
                        : "text-gray-600 dark:text-gray-300"
                      }`}
                  >
                    Meals
                    <span
                      className={`absolute bottom-0 left-0 h-0.5 bg-primary transition-all duration-300 ${isActive ? "w-full" : "w-0 group-hover:w-full"
                        }`}
                    ></span>
                  </span>
                )}
              </NavLink>
              <NavLink to="/about" className="relative group py-2">
                {({ isActive }) => (
                  <span
                    className={`nav-link text-sm font-medium tracking-wide transition-all duration-300 hover:text-primary ${isActive
                        ? "text-primary"
                        : "text-gray-600 dark:text-gray-300"
                      }`}
                  >
                    About
                    <span
                      className={`absolute bottom-0 left-0 h-0.5 bg-primary transition-all duration-300 ${isActive ? "w-full" : "w-0 group-hover:w-full"
                        }`}
                    ></span>
                  </span>
                )}
              </NavLink>
              <NavLink to="/contact" className="relative group py-2">
                {({ isActive }) => (
                  <span
                    className={`nav-link text-sm font-medium tracking-wide transition-all duration-300 hover:text-primary ${isActive
                        ? "text-primary"
                        : "text-gray-600 dark:text-gray-300"
                      }`}
                  >
                    Contact Us
                    <span
                      className={`absolute bottom-0 left-0 h-0.5 bg-primary transition-all duration-300 ${isActive ? "w-full" : "w-0 group-hover:w-full"
                        }`}
                    ></span>
                  </span>
                )}
              </NavLink>
            </div>

            {/* Theme Toggle and Menu */}
            <div className="flex items-center gap-3">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                aria-label="Toggle theme"
              >
                {theme === "light" ? (
                  <MdDarkMode size={20} />
                ) : (
                  <MdLightMode size={20} />
                )}
              </button>
              <div className="flex flex-row items-center gap-3">
                <div
                  onClick={() => setIsOpen(!isOpen)}
                  className="p-4 md:py-1 md:px-2 border border-neutral-200 dark:border-gray-600 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition hover:scale-105"
                >
                  <AiOutlineMenu />
                  <div className="hidden md:block">
                    {/* Avatar */}
                    <img
                      className="rounded-full h-[30px] w-[30px] object-cover ring-2 ring-transparent group-hover:ring-primary transition-all"
                      referrerPolicy="no-referrer"
                      src={user?.photoURL ? user.photoURL : avatarImg}
                      alt="profile"
                    />
                  </div>
                </div>
              </div>

              {/* Dropdown Menu */}
              <div
                ref={(el) => {
                  if (el) {
                    if (isOpen) {
                      gsap.to(el, {
                        autoAlpha: 1,
                        y: 0,
                        scale: 1,
                        duration: 0.3,
                        ease: "power2.out",
                      });
                    } else {
                      gsap.to(el, {
                        autoAlpha: 0,
                        y: -10,
                        scale: 0.95,
                        duration: 0.2,
                        ease: "power2.in",
                      });
                    }
                  }
                }}
                className="absolute rounded-xl shadow-xl w-[40vw] md:w-[12vw] bg-white dark:bg-gray-800 overflow-hidden right-0 top-14 text-sm transform origin-top-right invisible opacity-0 scale-95 border border-gray-100 dark:border-gray-700"
              >
                <div className="flex flex-col cursor-pointer">
                  {/* Mobile-only navigation links */}
                  <Link
                    to="/"
                    className="block md:hidden px-4 py-3 hover:bg-neutral-50 dark:hover:bg-gray-700 transition font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 flex items-center gap-2"
                    onClick={() => setIsOpen(false)}
                  >
                    <FaHome className="text-primary" /> Home
                  </Link>
                  <Link
                    to="/meals"
                    className="block md:hidden px-4 py-3 hover:bg-neutral-50 dark:hover:bg-gray-700 transition font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 flex items-center gap-2"
                    onClick={() => setIsOpen(false)}
                  >
                    <FaUtensils className="text-primary" /> Meals
                  </Link>
                  <Link
                    to="/about"
                    className="block md:hidden px-4 py-3 hover:bg-neutral-50 dark:hover:bg-gray-700 transition font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 flex items-center gap-2"
                    onClick={() => setIsOpen(false)}
                  >
                    <FaInfoCircle className="text-primary" /> About
                  </Link>
                  <Link
                    to="/contact"
                    className="block md:hidden px-4 py-3 hover:bg-neutral-50 dark:hover:bg-gray-700 transition font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 flex items-center gap-2"
                    onClick={() => setIsOpen(false)}
                  >
                    <FaEnvelope className="text-primary" /> Contact Us
                  </Link>

                  {user ? (
                    <>
                      <Link
                        to="/dashboard"
                        className="px-4 py-3 hover:bg-neutral-50 dark:hover:bg-gray-700 transition font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 flex items-center gap-2"
                        onClick={() => setIsOpen(false)}
                      >
                        <FaColumns className="text-primary" /> Dashboard
                      </Link>
                      <Link
                        to="/dashboard/my-orders"
                        className="px-4 py-3 hover:bg-neutral-50 dark:hover:bg-gray-700 transition font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 flex items-center gap-2"
                        onClick={() => setIsOpen(false)}
                      >
                        <FaShoppingCart className="text-primary" /> Cart
                      </Link>
                      <div
                        onClick={() => {
                          logOut();
                          setIsOpen(false);
                        }}
                        className="px-4 py-3 hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 transition font-medium cursor-pointer flex items-center gap-2"
                      >
                        <FaSignOutAlt /> Logout
                      </div>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/login"
                        className="px-4 py-3 hover:bg-neutral-50 dark:hover:bg-gray-700 transition font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 flex items-center gap-2"
                        onClick={() => setIsOpen(false)}
                      >
                        <FaSignInAlt className="text-primary" /> Login
                      </Link>
                      <Link
                        to="/signup"
                        className="px-4 py-3 hover:bg-neutral-50 dark:hover:bg-gray-700 transition font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 flex items-center gap-2"
                        onClick={() => setIsOpen(false)}
                      >
                        <FaUserPlus className="text-primary" /> Sign Up
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Navbar;
