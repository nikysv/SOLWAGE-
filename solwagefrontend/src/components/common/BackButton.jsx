import React from "react";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";

const BackButton = ({ className = "", children = "Volver" }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleGoBack = () => {
    const currentPath = location.pathname;

    // Mapeo de rutas de vuelta específicas
    const backRoutes = {
      "/employer/jobs/create": "/employer/dashboard",
      "/employer/jobs/": "/employer/trabajos", // Para rutas dinámicas de jobs
      "/employer/trabajos": "/employer/dashboard",
      "/employer/talento": "/employer/dashboard",
      "/employer/perfil": "/employer/dashboard",
      "/freelancer/dashboard": "/",
      "/employer/dashboard": "/",
    };

    // Buscar la ruta de vuelta apropiada
    let backRoute = null;

    for (const [pattern, route] of Object.entries(backRoutes)) {
      if (currentPath.startsWith(pattern)) {
        backRoute = route;
        break;
      }
    }

    // Si encontramos una ruta específica, usarla
    if (backRoute) {
      navigate(backRoute);
    } else {
      // Si no hay ruta específica, intentar usar el historial del navegador
      if (window.history.length > 1) {
        navigate(-1);
      } else {
        // Como último recurso, ir al dashboard apropiado
        if (currentPath.includes("/employer/")) {
          navigate("/employer/dashboard");
        } else if (currentPath.includes("/freelancer/")) {
          navigate("/freelancer/dashboard");
        } else {
          navigate("/");
        }
      }
    }
  };

  return (
    <motion.button
      onClick={handleGoBack}
      className={`flex items-center text-gray-600 hover:text-purple-600 transition-colors duration-300 ${className}`}
      whileHover={{ x: -2 }}
      whileTap={{ scale: 0.95 }}
    >
      <svg
        className="w-5 h-5 mr-2"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 19l-7-7 7-7"
        />
      </svg>
      {children}
    </motion.button>
  );
};

export default BackButton;
