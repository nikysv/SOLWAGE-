import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "../pages/landingPageView/LandingPage";
import TechnologyPage from "../pages/technologyView/TechnologyPage";
import DocumentationPage from "../pages/documentationView/DocumentationPage";
import { AuthPage } from "../pages/AuthPage";
import LoginPage from "../pages/LoginPage";
import DashboardPage from "../pages/DashboardPage";
import FreelancerDashboard from "../pages/FreelancerDashboard";
import EmployerDashboardPage from "../pages/EmployerDashboardPage";
import JobManagementPage from "../pages/JobManagementPage";
import JobCreationPage from "../pages/JobCreationPage";
import DeFiPage from "../pages/DeFiPage";
import WorkDetailsPage from "../pages/WorkDetailsPage";
import MilestoneReviewPage from "../pages/MilestoneReviewPage";
import WelcomePage from "../pages/WelcomePage";
import FreelancerWalletPage from "../pages/FreelancerWalletPage";
import Layout from "../components/layout/Layout";

const AppRoutes = ({ auth }) => {
  const { isAuthenticated, isLoading } = auth;

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
      {/* Rutas públicas */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/tecnologia" element={<TechnologyPage />} />
      <Route path="/documentacion" element={<DocumentationPage />} />

      {/* Autenticación */}
      <Route path="/auth" element={<AuthPage auth={auth} />} />
      <Route path="/login" element={<LoginPage auth={auth} />} />

      {/* Bienvenida explícita */}
      <Route
        path="/welcome"
        element={
          isAuthenticated ? (
            <WelcomePage auth={auth} />
          ) : (
            <Navigate to="/auth" replace />
          )
        }
      />

      {/* Protegidas */}
      <Route
        path="/employer/dashboard"
        element={
          isAuthenticated && auth.userData?.userType === "employer" ? (
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
          isAuthenticated && auth.userData?.userType === "freelancer" ? (
            <FreelancerDashboard auth={auth} />
          ) : (
            <Navigate to="/auth" replace />
          )
        }
      />

      <Route
        path="/dashboard"
        element={
          isAuthenticated && auth.userData ? (
            auth.userData.userType === "employer" ? (
              <Navigate to="/employer/dashboard" replace />
            ) : auth.userData.userType === "freelancer" ? (
              <Navigate to="/freelancer/dashboard" replace />
            ) : (
              <Navigate to="/auth" replace />
            )
          ) : (
            <Navigate to="/auth" replace />
          )
        }
      />

      {/* Empleador */}
      <Route
        path="/employer/jobs/create"
        element={
          isAuthenticated && auth.userData?.userType === "employer" ? (
            <JobCreationPage auth={auth} />
          ) : (
            <Navigate to="/employer/dashboard" replace />
          )
        }
      />
      <Route
        path="/employer/jobs/:jobId"
        element={
          isAuthenticated && auth.userData?.userType === "employer" ? (
            <JobManagementPage auth={auth} />
          ) : (
            <Navigate to="/employer/dashboard" replace />
          )
        }
      />
      <Route
        path="/employer/jobs/:jobId/milestone/:milestoneId/review"
        element={
          isAuthenticated && auth.userData?.userType === "employer" ? (
            <MilestoneReviewPage auth={auth} />
          ) : (
            <Navigate to="/employer/dashboard" replace />
          )
        }
      />
      <Route
        path="/employer/trabajos"
        element={
          isAuthenticated && auth.userData?.userType === "employer" ? (
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
          isAuthenticated && auth.userData?.userType === "employer" ? (
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
          isAuthenticated && auth.userData?.userType === "employer" ? (
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
          isAuthenticated && auth.userData?.userType === "employer" ? (
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

      {/* Freelancer */}
      <Route
        path="/freelancer/defi"
        element={
          isAuthenticated && auth.userData?.userType === "freelancer" ? (
            <DeFiPage auth={auth} />
          ) : (
            <Navigate to="/freelancer/dashboard" replace />
          )
        }
      />
      <Route
        path="/freelancer/work/:workId"
        element={
          isAuthenticated && auth.userData?.userType === "freelancer" ? (
            <WorkDetailsPage auth={auth} />
          ) : (
            <Navigate to="/freelancer/dashboard" replace />
          )
        }
      />
      <Route
        path="/freelancer/wallet"
        element={
          isAuthenticated && auth.userData?.userType === "freelancer" ? (
            <FreelancerWalletPage auth={auth} />
          ) : (
            <Navigate to="/freelancer/dashboard" replace />
          )
        }
      />
      {/* Redirección por defecto */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
