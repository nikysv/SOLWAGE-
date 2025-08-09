import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { isAuthenticated, userData, logout } = useAuth();

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

  const isFreelancer = isAuthenticated && userData?.userType === "freelancer";
  const isEmployer = isAuthenticated && userData?.userType === "employer";

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
           {" "}
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
               {" "}
        <div className="flex justify-between items-center h-16">
                    {/* Logo */}         {" "}
          <motion.div
            className="flex-shrink-0"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
                       {" "}
            <Link to="/">
                           {" "}
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent hover:from-purple-700 hover:to-blue-700 transition-all duration-300">
                                Solwage              {" "}
              </h1>
                         {" "}
            </Link>
                     {" "}
          </motion.div>
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-10">
            {/* Navegación principal - solo en landing page */}
            {location.pathname === "/" && !isAuthenticated && (
              <>
                <motion.button
                  onClick={() => scrollToSection("que-es-solwage")}
                  className="text-gray-600 hover:text-purple-600 transition-all duration-300 font-medium relative group"
                  whileHover={{ y: -1 }}
                  transition={{ duration: 0.2 }}
                >
                  ¿Qué es Solwage?
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-600 transition-all duration-300 group-hover:w-full"></span>
                </motion.button>
                <motion.button
                  onClick={() => scrollToSection("beneficios")}
                  className="text-gray-600 hover:text-purple-600 transition-all duration-300 font-medium relative group"
                  whileHover={{ y: -1 }}
                  transition={{ duration: 0.2 }}
                >
                  Beneficios
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-600 transition-all duration-300 group-hover:w-full"></span>
                </motion.button>
                <motion.div
                  className="text-gray-600 hover:text-purple-600 transition-all duration-300 font-medium relative group"
                  whileHover={{ y: -1 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link to="/tecnologia" className="block">
                    Tecnología
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-600 transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                </motion.div>
              </>
            )}

            {/* Navegación para usuarios autenticados */}
            {isAuthenticated && (
              <>
                <motion.div
                  className="text-gray-600 hover:text-purple-600 transition-all duration-300 font-medium relative group"
                  whileHover={{ y: -1 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link to="/" className="block">
                    Inicio
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-600 transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                </motion.div>
                <motion.div
                  className="text-gray-600 hover:text-purple-600 transition-all duration-300 font-medium relative group"
                  whileHover={{ y: -1 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link to="/tecnologia" className="block">
                    Tecnología
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-600 transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                </motion.div>
              </>
            )}
          </div>
          {/* Botones de acción */}
          <div className="hidden lg:flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                {isFreelancer && (
                  <motion.div
                    className="text-gray-600 hover:text-purple-600 transition-all duration-300 font-medium relative group"
                    whileHover={{ y: -1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Link to="/freelancer/wallet" className="block">
                      Mi Wallet
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-600 transition-all duration-300 group-hover:w-full"></span>
                    </Link>
                  </motion.div>
                )}
                <motion.div
                  className="text-gray-600 hover:text-purple-600 transition-all duration-300 font-medium relative group"
                  whileHover={{ y: -1 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link
                    to={
                      isEmployer
                        ? "/employer/dashboard"
                        : "/freelancer/dashboard"
                    }
                    className="block"
                  >
                    Dashboard
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-600 transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                </motion.div>
                <motion.button
                  onClick={logout}
                  className="ml-4 bg-gradient-to-r from-red-50 to-red-100 text-red-600 px-6 py-2.5 rounded-xl border border-red-200 hover:border-red-300 hover:from-red-100 hover:to-red-200 transition-all duration-300 font-medium"
                  whileHover={{ y: -1, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                >
                  Cerrar sesión
                </motion.button>
              </>
            ) : (
              <>
                <motion.button
                  className="text-gray-600 hover:text-purple-600 transition-all duration-300 font-medium px-4 py-2"
                  whileHover={{ y: -1 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link to="/login" className="block">
                    Iniciar Sesión
                  </Link>
                </motion.button>
                <motion.button
                  className="bg-gradient-to-r from-purple-600 to-purple-700 text-white px-8 py-3 rounded-xl hover:from-purple-700 hover:to-purple-800 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl"
                  whileHover={{ y: -2, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link to="/auth" className="block">
                    Empezar Ahora
                  </Link>
                </motion.button>
              </>
            )}
                     {" "}
          </div>
          {/* Mobile menu button */}
          <div className="lg:hidden">
            <motion.button
              onClick={toggleMenu}
              className={`p-2 rounded-xl transition-all duration-300 ${
                isMenuOpen
                  ? "bg-purple-100 text-purple-600"
                  : "text-gray-600 hover:text-purple-600 hover:bg-purple-50"
              }`}
              whileTap={{ scale: 0.95 }}
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </motion.button>
          </div>
        </div>
        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="lg:hidden"
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
            >
              <div className="px-6 py-6 space-y-4 bg-white/95 backdrop-blur-lg border-t border-purple-100 shadow-xl">
                {/* Navegación principal */}
                {location.pathname === "/" && !isAuthenticated && (
                  <>
                    <motion.button
                      onClick={() => {
                        scrollToSection("que-es-solwage");
                        setIsMenuOpen(false);
                      }}
                      className="block w-full text-left px-4 py-3 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-xl transition-all duration-300 font-medium"
                      variants={menuItemVariants}
                    >
                      ¿Qué es Solwage?
                    </motion.button>
                    <motion.button
                      onClick={() => {
                        scrollToSection("beneficios");
                        setIsMenuOpen(false);
                      }}
                      className="block w-full text-left px-4 py-3 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-xl transition-all duration-300 font-medium"
                      variants={menuItemVariants}
                    >
                      Beneficios
                    </motion.button>
                    <motion.div
                      className="block w-full text-left px-4 py-3 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-xl transition-all duration-300 font-medium"
                      variants={menuItemVariants}
                    >
                      <Link
                        to="/tecnologia"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Tecnología
                      </Link>
                    </motion.div>
                  </>
                )}

                {/* Navegación para usuarios autenticados */}
                {isAuthenticated && (
                  <>
                    <motion.div
                      className="block w-full text-left px-4 py-3 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-xl transition-all duration-300 font-medium"
                      variants={menuItemVariants}
                    >
                      <Link to="/" onClick={() => setIsMenuOpen(false)}>
                        Inicio
                      </Link>
                    </motion.div>
                    <motion.div
                      className="block w-full text-left px-4 py-3 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-xl transition-all duration-300 font-medium"
                      variants={menuItemVariants}
                    >
                      <Link
                        to="/tecnologia"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Tecnología
                      </Link>
                    </motion.div>
                  </>
                )}
                {/* Sección de botones móviles */}
                <div className="pt-4 border-t border-gray-200 space-y-3">
                  {isAuthenticated ? (
                    <>
                      {isFreelancer && (
                        <motion.div
                          className="block w-full text-left px-4 py-3 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-xl transition-all duration-300 font-medium"
                          variants={menuItemVariants}
                        >
                          <Link
                            to="/freelancer/wallet"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            Mi Wallet
                          </Link>
                        </motion.div>
                      )}
                      <motion.div
                        className="block w-full text-left px-4 py-3 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-xl transition-all duration-300 font-medium"
                        variants={menuItemVariants}
                      >
                        <Link
                          to={
                            isEmployer
                              ? "/employer/dashboard"
                              : "/freelancer/dashboard"
                          }
                          onClick={() => setIsMenuOpen(false)}
                        >
                          Dashboard
                        </Link>
                      </motion.div>
                      <motion.button
                        onClick={() => {
                          setIsMenuOpen(false);
                          logout();
                        }}
                        className="w-full text-left px-4 py-3 bg-gradient-to-r from-red-50 to-red-100 text-red-600 border border-red-200 rounded-xl hover:from-red-100 hover:to-red-200 transition-all duration-300 font-medium"
                        variants={menuItemVariants}
                      >
                        Cerrar sesión
                      </motion.button>
                    </>
                  ) : (
                    <>
                      <motion.div
                        className="block w-full text-left px-4 py-3 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-xl transition-all duration-300 font-medium"
                        variants={menuItemVariants}
                      >
                        <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                          Iniciar Sesión
                        </Link>
                      </motion.div>
                      <motion.div
                        className="block w-full text-center px-4 py-4 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl hover:from-purple-700 hover:to-purple-800 transition-all duration-300 font-semibold shadow-lg"
                        variants={menuItemVariants}
                      >
                        <Link to="/auth" onClick={() => setIsMenuOpen(false)}>
                          Empezar Ahora
                        </Link>
                      </motion.div>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

export default Header;
