import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "../pages/landingPageView/LandingPage";
import TechnologyPage from "../pages/technologyView/TechnologyPage";
import DocumentationPage from "../pages/documentationView/DocumentationPage";
import AuthPage from "../pages/AuthPage";
import LoginPage from "../pages/LoginPage";
import DashboardPage from "../pages/DashboardPage";
import FreelancerDashboard from "../pages/FreelancerDashboard";
import EmployerDashboardPage from "../pages/EmployerDashboardPage";
import TestLoginPage from "../pages/TestLoginPage";
import JobManagementPage from "../pages/JobManagementPage";
import JobCreationPage from "../pages/JobCreationPage";
import DeFiPage from "../pages/DeFiPage";
import WorkDetailsPage from "../pages/WorkDetailsPage";
import MilestoneReviewPage from "../pages/MilestoneReviewPage";

const AppRoutes = ({ auth }) => {
  const { isAuthenticated, isLoading } = auth;

  // Mostrar loading mientras se verifica la autenticación
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando...</p>
        </div>
      </div>
    );
  }

  return (
    <Routes>
      {/* Rutas públicas - Accesibles sin autenticación */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/tecnologia" element={<TechnologyPage />} />
      <Route path="/documentacion" element={<DocumentationPage />} />
      <Route path="/test-login" element={<TestLoginPage auth={auth} />} />

      {/* Rutas de autenticación */}
      <Route
        path="/auth"
        element={
          isAuthenticated ? (
            auth.user?.userType === "employer" ? (
              <Navigate to="/employer/dashboard" replace />
            ) : (
              <Navigate to="/freelancer/dashboard" replace />
            )
          ) : (
            <AuthPage onLoginSuccess={(userData) => auth.register(userData)} />
          )
        }
      />

      <Route
        path="/login"
        element={
          isAuthenticated ? (
            auth.user?.userType === "employer" ? (
              <Navigate to="/employer/dashboard" replace />
            ) : (
              <Navigate to="/freelancer/dashboard" replace />
            )
          ) : (
            <LoginPage auth={auth} />
          )
        }
      />

      {/* Rutas protegidas - Requieren autenticación */}
      <Route
        path="/employer/dashboard"
        element={
          isAuthenticated && auth.user?.userType === "employer" ? (
            <EmployerDashboardPage
              key="dashboard"
              auth={auth}
              initialTab="dashboard"
            />
          ) : (
            <Navigate to="/auth" replace />
          )
        }
      />

      <Route
        path="/freelancer/dashboard"
        element={
          isAuthenticated && auth.user?.userType === "freelancer" ? (
            <FreelancerDashboard auth={auth} />
          ) : (
            <Navigate to="/auth" replace />
          )
        }
      />

      <Route
        path="/dashboard"
        element={
          isAuthenticated ? (
            // Redirección basada en el tipo de usuario
            auth.user?.userType === "employer" ? (
              <Navigate to="/employer/dashboard" replace />
            ) : (
              <Navigate to="/freelancer/dashboard" replace />
            )
          ) : (
            <Navigate to="/auth" replace />
          )
        }
      />

      <Route
        path="/welcome"
        element={
          isAuthenticated ? (
            <DashboardPage auth={auth} />
          ) : (
            <Navigate to="/auth" replace />
          )
        }
      />

      {/* Rutas específicas para empleadores */}
      <Route
        path="/employer/jobs/create"
        element={
          isAuthenticated && auth.user?.userType === "employer" ? (
            <JobCreationPage auth={auth} />
          ) : (
            <Navigate to="/employer/dashboard" replace />
          )
        }
      />

      <Route
        path="/employer/jobs/:jobId"
        element={
          isAuthenticated && auth.user?.userType === "employer" ? (
            <JobManagementPage auth={auth} />
          ) : (
            <Navigate to="/employer/dashboard" replace />
          )
        }
      />

      <Route
        path="/employer/jobs/:jobId/milestone/:milestoneId/review"
        element={
          isAuthenticated && auth.user?.userType === "employer" ? (
            <MilestoneReviewPage auth={auth} />
          ) : (
            <Navigate to="/employer/dashboard" replace />
          )
        }
      />

      <Route
        path="/employer/trabajos"
        element={
          isAuthenticated && auth.user?.userType === "employer" ? (
            <EmployerDashboardPage
              key="trabajos"
              auth={auth}
              initialTab="trabajos"
            />
          ) : (
            <Navigate to="/employer/dashboard" replace />
          )
        }
      />

      <Route
        path="/employer/talento"
        element={
          isAuthenticated && auth.user?.userType === "employer" ? (
            <EmployerDashboardPage
              key="talento"
              auth={auth}
              initialTab="talento"
            />
          ) : (
            <Navigate to="/employer/dashboard" replace />
          )
        }
      />

      <Route
        path="/employer/wallet"
        element={
          isAuthenticated && auth.user?.userType === "employer" ? (
            <EmployerDashboardPage
              key="wallet"
              auth={auth}
              initialTab="wallet"
            />
          ) : (
            <Navigate to="/employer/dashboard" replace />
          )
        }
      />

      <Route
        path="/employer/perfil"
        element={
          isAuthenticated && auth.user?.userType === "employer" ? (
            <EmployerDashboardPage
              key="perfil"
              auth={auth}
              initialTab="perfil"
            />
          ) : (
            <Navigate to="/employer/dashboard" replace />
          )
        }
      />

      {/* Rutas específicas para freelancers */}
      <Route
        path="/freelancer/defi"
        element={
          isAuthenticated && auth.user?.userType === "freelancer" ? (
            <DeFiPage auth={auth} />
          ) : (
            <Navigate to="/freelancer/dashboard" replace />
          )
        }
      />

      <Route
        path="/freelancer/work/:workId"
        element={
          isAuthenticated && auth.user?.userType === "freelancer" ? (
            <WorkDetailsPage auth={auth} />
          ) : (
            <Navigate to="/freelancer/dashboard" replace />
          )
        }
      />

      {/* Redirección por defecto - Siempre va a la página principal */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
