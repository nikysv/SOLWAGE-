import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const menuVariants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
    open: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };

  const menuItemVariants = {
    closed: { opacity: 0, x: -20 },
    open: { opacity: 1, x: 0 },
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <motion.header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-lg"
          : "bg-white shadow-sm"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.div
            className="flex-shrink-0"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <Link to="/">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent hover:from-purple-700 hover:to-blue-700 transition-all duration-300">
                Solwage
              </h1>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {/* Inicio - siempre visible */}
            <motion.div
              className="text-gray-700 hover:text-purple-600 transition-all duration-300 font-medium relative group"
              whileHover={{ y: -2 }}
              transition={{ duration: 0.2 }}
            >
              <Link to="/" className="block">
                Inicio
                <motion.span
                  className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-purple-600 to-blue-600"
                  initial={{ width: 0 }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.3 }}
                />
              </Link>
            </motion.div>

            {/* Enlaces internos - solo en landing page */}
            {location.pathname === "/" && (
              <>
                <motion.button
                  onClick={() => scrollToSection("que-es-solwage")}
                  className="text-gray-700 hover:text-purple-600 transition-all duration-300 font-medium relative group"
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  ¿Qué es Solwage?
                  <motion.span
                    className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-purple-600 to-blue-600"
                    initial={{ width: 0 }}
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.button>

                <motion.button
                  onClick={() => scrollToSection("beneficios")}
                  className="text-gray-700 hover:text-purple-600 transition-all duration-300 font-medium relative group"
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  Beneficios
                  <motion.span
                    className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-purple-600 to-blue-600"
                    initial={{ width: 0 }}
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.button>
              </>
            )}

            {/* Enlace a Tecnología - siempre visible */}
            <motion.div
              className="text-gray-700 hover:text-purple-600 transition-all duration-300 font-medium relative group"
              whileHover={{ y: -2 }}
              transition={{ duration: 0.2 }}
            >
              <Link to="/tecnologia" className="block">
                Tecnología
                <motion.span
                  className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-purple-600 to-blue-600"
                  initial={{ width: 0 }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.3 }}
                />
              </Link>
            </motion.div>

            <motion.div
              className="text-gray-700 hover:text-purple-600 transition-all duration-300 font-medium relative group"
              whileHover={{ y: -2 }}
              transition={{ duration: 0.2 }}
            >
              <Link to="/auth" className="block">
                <motion.button
                  className="bg-gradient-to-r from-purple-600 to-purple-700 text-white px-6 py-2.5 rounded-lg hover:from-purple-700 hover:to-purple-800 transition-all duration-300 font-medium shadow-md hover:shadow-lg"
                  whileHover={{ y: -2, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                >
                  Empezar
                </motion.button>
              </Link>
            </motion.div>

            <motion.div
              className="text-gray-700 hover:text-purple-600 transition-all duration-300 font-medium relative group"
              whileHover={{ y: -2 }}
              transition={{ duration: 0.2 }}
            >
              <Link to="/login" className="block">
                <motion.button
                  className="bg-white text-purple-600 px-6 py-2.5 rounded-lg border-2 border-purple-200 hover:border-purple-300 hover:bg-purple-50 transition-all duration-300 font-medium shadow-md hover:shadow-lg"
                  whileHover={{ y: -2, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                >
                  Iniciar Sesión
                </motion.button>
              </Link>
            </motion.div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <motion.button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-purple-600 transition-colors duration-300"
              whileTap={{ scale: 0.95 }}
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="md:hidden"
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
            >
              <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-200">
                {/* Inicio - siempre visible */}
                <motion.div
                  className="block w-full text-left px-3 py-2 text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-md transition-colors duration-300"
                  variants={menuItemVariants}
                >
                  <Link to="/" onClick={() => setIsMenuOpen(false)}>
                    Inicio
                  </Link>
                </motion.div>

                {location.pathname === "/" && (
                  <>
                    <motion.button
                      onClick={() => {
                        scrollToSection("que-es-solwage");
                        setIsMenuOpen(false);
                      }}
                      className="block w-full text-left px-3 py-2 text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-md transition-colors duration-300"
                      variants={menuItemVariants}
                    >
                      ¿Qué es Solwage?
                    </motion.button>

                    <motion.button
                      onClick={() => {
                        scrollToSection("beneficios");
                        setIsMenuOpen(false);
                      }}
                      className="block w-full text-left px-3 py-2 text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-md transition-colors duration-300"
                      variants={menuItemVariants}
                    >
                      Beneficios
                    </motion.button>
                  </>
                )}

                <motion.div
                  className="block w-full text-left px-3 py-2 text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-md transition-colors duration-300"
                  variants={menuItemVariants}
                >
                  <Link to="/tecnologia" onClick={() => setIsMenuOpen(false)}>
                    Tecnología
                  </Link>
                </motion.div>

                <motion.div
                  className="block w-full text-left px-3 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors duration-300"
                  variants={menuItemVariants}
                >
                  <Link to="/auth" onClick={() => setIsMenuOpen(false)}>
                    Empezar
                  </Link>
                </motion.div>

                <motion.div
                  className="block w-full text-left px-3 py-2 bg-white text-purple-600 border-2 border-purple-200 rounded-md hover:bg-purple-50 transition-colors duration-300"
                  variants={menuItemVariants}
                >
                  <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                    Iniciar Sesión
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

export default Header;
