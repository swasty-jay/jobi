import { useEffect, useState } from "react";
import { ArrowRight, Menu, X, Sparkles } from "lucide-react";
import { Button } from "../ui/button";
import clsx from "clsx";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [menuOpen]);

  const navItems = [
    { label: "Jobs", to: "/joblisting" },
    { label: "Training", to: "/courses" },
    { label: "Volunteer", to: "/volunteer" },
    { label: "Contact", to: "/contact" },
    { label: " About us", to: "/about" },
  ];

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header
        className={clsx(
          "fixed top-0 left-0 w-full z-50 transition-all duration-300 mb-4",
          scrolled
            ? "backdrop-blur-xl bg-white/10 shadow-lg border-b border-gray-200/60"
            : "bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto py-3 sm:py-4 px-4 sm:px-6 lg:px-10 flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-br from-purple-600 via-purple-600 to-pink-600 rounded-lg flex items-center justify-center shadow-lg hover:shadow-purple-500/30 transition-shadow duration-300">
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-gray-900 via-purple-700 to-purple-600 bg-clip-text text-transparent">
              Jobi
            </h1>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center space-x-8 xl:space-x-10">
            {navItems.map(({ label, to }) => (
              <Link
                key={label}
                to={to}
                className="text-gray-700 hover:text-purple-600 transition-colors duration-300 relative group font-medium text-sm xl:text-base py-2"
              >
                {label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-600 to-pink-600 transition-all duration-300 group-hover:w-full rounded-full" />
              </Link>
            ))}
          </nav>

          {/* Call to Action (Desktop) */}
          <div className="hidden lg:block">
            <Link
              to={"/loginpage"}
              className="text-gray-700 hover:text-purple-600 transition-colors duration-300 relative group font-medium text-sm xl:text-base py-2 mr-3  "
            >
              Login
            </Link>

            <Link
              to={"/loginpage"}
              className="text-gray-700 hover:text-purple-600 transition-colors duration-300 relative group font-medium text-sm xl:text-base py-2 mr-3"
            >
              Log Out
            </Link>
            <Link to={"/jobpostform"}>
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 shadow-lg hover:shadow-purple-500/30 transition-all duration-300 group px-6 py-2.5">
                post a job
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="lg:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle Menu"
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
            >
              <Menu
                className={clsx(
                  "w-6 h-6 text-gray-700 transition-transform duration-300",
                  menuOpen && "rotate-90"
                )}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer Overlay */}
      <div
        className={clsx(
          "fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300",
          menuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={closeMenu}
      />

      {/* Mobile Menu Drawer */}
      <div
        className={clsx(
          "fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white shadow-2xl z-50 lg:hidden transition-transform duration-300 ease-in-out",
          menuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <div className="w-7 h-7 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center shadow-lg">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <h2 className="text-lg font-bold bg-gradient-to-r from-gray-900 to-purple-600 bg-clip-text text-transparent">
              Jobi
            </h2>
          </div>
          <button
            onClick={closeMenu}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
            aria-label="Close Menu"
          >
            <X className="w-6 h-6 text-gray-700" />
          </button>
        </div>

        {/* Drawer Content */}
        <div className="p-6 space-y-6">
          {/* Navigation Links */}
          <nav className="space-y-4">
            {navItems.map(({ label, to }) => (
              <Link
                key={label}
                to={to}
                onClick={closeMenu}
                className="flex items-center justify-between py-3 px-4 text-gray-800 font-medium hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all duration-200 group"
              >
                <span className="text-lg">{label}</span>
                <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200" />
              </Link>
            ))}
          </nav>

          {/* Call to Action */}
          <div className="pt-6 border-t border-gray-200">
            <Link to={"/JobPostForm"}>
              <Button
                onClick={closeMenu}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 shadow-lg hover:shadow-purple-500/30 transition-all duration-300 group py-3"
              >
                Post a job
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </Link>
          </div>

          {/* Additional Info */}
          <div className="pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500 text-center">
              Ready to find your dream job?
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
