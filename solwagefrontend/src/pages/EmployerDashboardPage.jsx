import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import TalentSearchSection from "../components/TalentSearchSection";
import JobCard from "../components/jobs/JobCard";
import useJobManagement from "../hooks/useJobManagement";
import DepositModal from "../components/ui/DepositModal";
import WalletView from "../components/wallet/WalletView";
import ExecutiveSummary from "../components/dashboard/ExecutiveSummary";
import NotificationCenter from "../components/dashboard/NotificationCenter";
import ActivityTimeline from "../components/dashboard/ActivityTimeline";
import ReferralProgram from "../components/dashboard/ReferralProgram";

const EmployerDashboardPage = ({ auth, initialTab = "dashboard" }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [jobsFilter, setJobsFilter] = useState("all"); // "all", "open", "contracted"
  const [isDepositModalOpen, setIsDepositModalOpen] = useState(false);
  const [walletBalance, setWalletBalance] = useState(2500); // Saldo inicial de la wallet

  const [activeTab, setActiveTab] = useState(initialTab);

  // Use the job management hook
  const jobManagement = useJobManagement();

  // Mock data for summary metrics
  const [summaryMetrics, setSummaryMetrics] = useState({
    activeJobs: 0,
    totalApplicants: 0,
    escrowAmount: 0,
  });

  const handleLogout = () => {
    auth.logout();
  };

  const handleCreateJob = () => {
    navigate("/employer/jobs/create");
  };

  const handleJobClick = (jobId) => {
    navigate(`/employer/jobs/${jobId}`);
  };

  const handleOpenDepositModal = () => {
    setIsDepositModalOpen(true);
  };

  const handleCloseDepositModal = () => {
    setIsDepositModalOpen(false);
  };

  // Actualizar el tab activo cuando cambie el initialTab
  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  // Simulate data loading
  useEffect(() => {
    const loadData = async () => {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock summary metrics
      setSummaryMetrics({
        activeJobs: jobManagement.jobs.length,
        totalApplicants: 47,
        escrowAmount: 12500,
      });

      setIsLoading(false);
    };

    loadData();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "Abierto":
        return "bg-green-100 text-green-800";
      case "En Curso":
        return "bg-blue-100 text-blue-800";
      case "Completado":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const renderDashboardContent = () => {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Cargando dashboard...</p>
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-6 text-white"
        >
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">
                Dashboard del Empleador
              </h2>
              <p className="text-purple-100">
                Bienvenido, {auth.user?.profile?.fullName || "Empleador"}
              </p>
              <p className="text-purple-200 text-sm mt-1">
                Gestiona tus proyectos y monitorea el progreso en tiempo real
              </p>
            </div>
            <div className="hidden md:block">
              <span className="text-4xl">🚀</span>
            </div>
          </div>
        </motion.div>

        {/* Executive Summary */}
        <ExecutiveSummary
          jobManagement={jobManagement}
          walletBalance={walletBalance}
        />

        {/* Notifications and Timeline Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <NotificationCenter jobManagement={jobManagement} />
          <ActivityTimeline
            jobManagement={jobManagement}
            walletBalance={walletBalance}
          />
        </div>

        {/* Programa de Referidos */}
        <ReferralProgram userType="employer" />

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
        >
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Acciones Rápidas
              </h3>
              <p className="text-gray-600">
                Gestiona tus trabajos y encuentra el mejor talento
              </p>
            </div>
            <div className="flex space-x-3">
              <motion.button
                onClick={() => navigate("/employer/talento")}
                className="bg-gradient-to-r from-green-500 to-blue-500 text-white py-3 px-6 rounded-lg font-semibold hover:from-green-600 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Buscar Talento
              </motion.button>
              <motion.button
                onClick={handleCreateJob}
                className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Publicar Trabajo
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    );
  };

  const renderJobsList = () => {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Cargando trabajos...</p>
          </div>
        </div>
      );
    }

    // Filter jobs based on selected filter
    const filteredJobs = (() => {
      switch (jobsFilter) {
        case "open":
          return jobManagement.getJobsByStatus(false);
        case "contracted":
          return jobManagement.getJobsByStatus(true);
        default:
          return jobManagement.jobs;
      }
    })();

    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h2 className="text-2xl font-bold text-gray-900">Mis Trabajos</h2>

          <div className="flex items-center space-x-4">
            {/* Filter Buttons */}
            <div className="flex bg-gray-100 rounded-lg p-1">
              <motion.button
                onClick={() => setJobsFilter("all")}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                  jobsFilter === "all"
                    ? "bg-white text-purple-600 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Todos
              </motion.button>
              <motion.button
                onClick={() => setJobsFilter("open")}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                  jobsFilter === "open"
                    ? "bg-white text-purple-600 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Vacantes Abiertas
              </motion.button>
              <motion.button
                onClick={() => setJobsFilter("contracted")}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                  jobsFilter === "contracted"
                    ? "bg-white text-purple-600 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Con Contratado
              </motion.button>
            </div>

            <motion.button
              onClick={handleCreateJob}
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-2 px-6 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              + Nuevo Trabajo
            </motion.button>
          </div>
        </div>

        {/* Job Status Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total de Trabajos</p>
                <p className="text-2xl font-bold text-gray-900">
                  {jobManagement.jobs.length}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-blue-600 text-xl">📋</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Vacantes Abiertas</p>
                <p className="text-2xl font-bold text-green-600">
                  {jobManagement.getJobsByStatus(false).length}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <span className="text-green-600 text-xl">🔓</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Con Contratado</p>
                <p className="text-2xl font-bold text-purple-600">
                  {jobManagement.getJobsByStatus(true).length}
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <span className="text-purple-600 text-xl">👥</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <AnimatePresence>
            {filteredJobs.map((job, index) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <JobCard job={job} onClick={handleJobClick} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredJobs.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-gray-400 text-2xl">📝</span>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {jobsFilter === "all"
                ? "No hay trabajos publicados"
                : jobsFilter === "open"
                ? "No hay vacantes abiertas"
                : "No hay trabajos con freelancer contratado"}
            </h3>
            <p className="text-gray-600">
              {jobsFilter === "all"
                ? "Comienza publicando tu primer trabajo"
                : jobsFilter === "open"
                ? "Todos los trabajos tienen freelancers asignados"
                : "Aún no has contratado freelancers"}
            </p>
          </div>
        )}
      </div>
    );
  };

  const renderTalentSearch = () => {
    return <TalentSearchSection auth={auth} />;
  };

  const renderProfile = () => {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900">Perfil de Empresa</h2>
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Información Básica
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nombre de la Empresa
                  </label>
                  <p className="text-gray-900">
                    {auth.user?.profile?.companyName || "No especificada"}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Industria
                  </label>
                  <p className="text-gray-900">
                    {auth.user?.profile?.industry || "No especificada"}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Representante
                  </label>
                  <p className="text-gray-900">
                    {auth.user?.profile?.fullName || "No especificado"}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <p className="text-gray-900">
                    {auth.user?.email || "No especificado"}
                  </p>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Smart Wallet
              </h3>
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <div className="flex items-center space-x-3">
                  <span className="text-purple-600 text-lg">🔐</span>
                  <div>
                    <h4 className="text-sm font-medium text-purple-900">
                      Dirección de Wallet
                    </h4>
                    <p className="text-sm text-purple-700 font-mono">
                      {auth.user?.smartWalletAddress || "No disponible"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderWalletView = () => {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Mi Smart Wallet</h2>
          <div className="text-sm text-gray-600">Red Stellar · Blockchain</div>
        </div>

        <WalletView
          walletBalance={walletBalance}
          setWalletBalance={setWalletBalance}
          onOpenDepositModal={handleOpenDepositModal}
        />
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-4">
              <Link to="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">S</span>
                </div>
                <span className="text-xl font-bold text-gray-900">Solwage</span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <button
                onClick={() => navigate("/employer/dashboard")}
                className={`px-3 py-2 rounded-lg font-medium transition-all duration-300 ${
                  activeTab === "dashboard"
                    ? "bg-purple-100 text-purple-700"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Dashboard
              </button>
              <button
                onClick={() => navigate("/employer/talento")}
                className={`px-3 py-2 rounded-lg font-medium transition-all duration-300 ${
                  activeTab === "talento"
                    ? "bg-purple-100 text-purple-700"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Talento
              </button>
              <button
                onClick={() => navigate("/employer/trabajos")}
                className={`px-3 py-2 rounded-lg font-medium transition-all duration-300 ${
                  activeTab === "trabajos"
                    ? "bg-purple-100 text-purple-700"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Mis Trabajos
              </button>
              <button
                onClick={() => navigate("/employer/wallet")}
                className={`px-3 py-2 rounded-lg font-medium transition-all duration-300 ${
                  activeTab === "wallet"
                    ? "bg-purple-100 text-purple-700"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Mi Wallet
              </button>
              <button
                onClick={() => navigate("/employer/perfil")}
                className={`px-3 py-2 rounded-lg font-medium transition-all duration-300 ${
                  activeTab === "perfil"
                    ? "bg-purple-100 text-purple-700"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Perfil
              </button>
            </nav>

            {/* User Menu */}
            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-semibold">
                    {auth.user?.profile?.fullName?.charAt(0) || "E"}
                  </span>
                </div>
                <span className="text-sm font-medium text-gray-700">
                  {auth.user?.profile?.fullName || "Empleador"}
                </span>
              </div>
              <motion.button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-600 transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Cerrar Sesión
              </motion.button>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="md:hidden p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {showMobileMenu && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <div className="px-4 py-2 space-y-1">
              <button
                onClick={() => {
                  navigate("/employer/dashboard");
                  setShowMobileMenu(false);
                }}
                className={`w-full text-left px-3 py-2 rounded-lg font-medium ${
                  activeTab === "dashboard"
                    ? "bg-purple-100 text-purple-700"
                    : "text-gray-600"
                }`}
              >
                Dashboard
              </button>
              <button
                onClick={() => {
                  navigate("/employer/talento");
                  setShowMobileMenu(false);
                }}
                className={`w-full text-left px-3 py-2 rounded-lg font-medium ${
                  activeTab === "talento"
                    ? "bg-purple-100 text-purple-700"
                    : "text-gray-600"
                }`}
              >
                Talento
              </button>
              <button
                onClick={() => {
                  navigate("/employer/trabajos");
                  setShowMobileMenu(false);
                }}
                className={`w-full text-left px-3 py-2 rounded-lg font-medium ${
                  activeTab === "trabajos"
                    ? "bg-purple-100 text-purple-700"
                    : "text-gray-600"
                }`}
              >
                Mis Trabajos
              </button>
              <button
                onClick={() => {
                  navigate("/employer/perfil");
                  setShowMobileMenu(false);
                }}
                className={`w-full text-left px-3 py-2 rounded-lg font-medium ${
                  activeTab === "perfil"
                    ? "bg-purple-100 text-purple-700"
                    : "text-gray-600"
                }`}
              >
                Perfil
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="pt-24 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {activeTab === "dashboard" && renderDashboardContent()}
          {activeTab === "talento" && renderTalentSearch()}
          {activeTab === "trabajos" && renderJobsList()}
          {activeTab === "wallet" && renderWalletView()}
          {activeTab === "perfil" && renderProfile()}
        </div>
      </main>

      {/* Deposit Modal */}
      <DepositModal
        isOpen={isDepositModalOpen}
        onClose={handleCloseDepositModal}
        walletBalance={walletBalance}
        setWalletBalance={setWalletBalance}
      />
    </div>
  );
};

export default EmployerDashboardPage;
