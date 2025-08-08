import { useNavigate, useLocation } from "react-router-dom";
import { useCallback } from "react";

const useBackNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const goBack = useCallback(() => {
    const currentPath = location.pathname;

    // Mapeo de rutas de vuelta específicas
    const backRoutes = {
      "/employer/jobs/create": "/employer/jobs",
      "/employer/jobs/": "/employer/jobs", // Para rutas dinámicas de jobs (ej: /employer/jobs/123)
      "/freelancer/dashboard": "/",
      "/employer/dashboard": "/",
      "/profile": "/employer/dashboard",
      "/auth/login": "/",
      "/auth/register": "/",
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
        // Como último recurso, ir al dashboard
        navigate("/employer/dashboard");
      }
    }
  }, [navigate, location]);

  return { goBack };
};

export default useBackNavigation;
