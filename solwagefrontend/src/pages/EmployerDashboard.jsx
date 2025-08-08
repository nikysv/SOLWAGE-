import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const EmployerDashboard = ({ auth }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleLogout = () => {
    auth.logout();
  };

  const handleCreateJob = () => {
    // TODO: Implement job creation functionality
    console.log("Creating new job posting...");
  };

  const renderDashboardContent = () => {
    return (
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">
                ¡Bienvenido, {auth.user?.profile?.fullName || "Empleador"}!
              </h2>
              <p className="text-blue-100">
                Estás listo para encontrar el mejor talento para tu empresa.
              </p>
            </div>
            <div className="hidden md:block">
              <span className="text-4xl">🏢</span>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-xl">📝</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Crear Oferta</h3>
                <p className="text-sm text-gray-600">
                  Publica una nueva oferta de trabajo
                </p>
              </div>
            </div>
            <motion.button
              onClick={handleCreateJob}
              className="w-full mt-4 bg-gradient-to-r from-green-500 to-blue-500 text-white py-2 px-4 rounded-lg font-semibold hover:from-green-600 hover:to-blue-600 transition-all duration-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Crear Oferta
            </motion.button>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-xl">👥</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Ver Candidatos</h3>
                <p className="text-sm text-gray-600">
                  Revisa las aplicaciones recibidas
                </p>
              </div>
            </div>
            <motion.button
              className="w-full mt-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 px-4 rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Ver Candidatos
            </motion.button>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-xl">📊</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Analytics</h3>
                <p className="text-sm text-gray-600">
                  Estadísticas de tus ofertas
                </p>
              </div>
            </div>
            <motion.button
              className="w-full mt-4 bg-gradient-to-r from-orange-500 to-red-500 text-white py-2 px-4 rounded-lg font-semibold hover:from-orange-600 hover:to-red-600 transition-all duration-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Ver Analytics
            </motion.button>
          </motion.div>
        </div>

        {/* Company Info */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Información de tu Empresa
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-700 mb-2">Empresa</h4>
              <p className="text-gray-900">
                {auth.user?.profile?.companyName || "No especificada"}
              </p>
            </div>
            <div>
              <h4 className="font-medium text-gray-700 mb-2">Industria</h4>
              <p className="text-gray-900">
                {auth.user?.profile?.industry || "No especificada"}
              </p>
            </div>
            <div>
              <h4 className="font-medium text-gray-700 mb-2">Representante</h4>
              <p className="text-gray-900">
                {auth.user?.profile?.fullName || "No especificado"}
              </p>
            </div>
            <div>
              <h4 className="font-medium text-gray-700 mb-2">Email</h4>
              <p className="text-gray-900">
                {auth.user?.email || "No especificado"}
              </p>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Actividad Reciente
          </h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm">📝</span>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">
                  Perfil completado
                </p>
                <p className="text-xs text-gray-500">
                  Tu perfil de empresa ha sido creado exitosamente
                </p>
              </div>
              <span className="text-xs text-gray-400">Hoy</span>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm">✅</span>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">
                  Smart Wallet creada
                </p>
                <p className="text-xs text-gray-500">
                  Tu billetera digital está lista para recibir pagos
                </p>
              </div>
              <span className="text-xs text-gray-400">Hoy</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderJobPostings = () => {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">
            Mis Ofertas de Trabajo
          </h2>
          <motion.button
            onClick={handleCreateJob}
            className="bg-gradient-to-r from-green-500 to-blue-500 text-white py-2 px-6 rounded-lg font-semibold hover:from-green-600 hover:to-blue-600 transition-all duration-300"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            + Nueva Oferta
          </motion.button>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl text-gray-400">📝</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No tienes ofertas aún
            </h3>
            <p className="text-gray-600 mb-6">
              Crea tu primera oferta de trabajo para comenzar a encontrar
              talento
            </p>
            <motion.button
              onClick={handleCreateJob}
              className="bg-gradient-to-r from-green-500 to-blue-500 text-white py-3 px-8 rounded-lg font-semibold hover:from-green-600 hover:to-blue-600 transition-all duration-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Crear Primera Oferta
            </motion.button>
          </div>
        </div>
      </div>
    );
  };

  const renderCandidates = () => {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900">Candidatos</h2>
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl text-gray-400">👥</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No hay candidatos aún
            </h3>
            <p className="text-gray-600">
              Los candidatos aparecerán aquí cuando publiques ofertas de trabajo
            </p>
          </div>
        </div>
      </div>
    );
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
                onClick={() => setActiveTab("dashboard")}
                className={`px-3 py-2 rounded-lg font-medium transition-all duration-300 ${
                  activeTab === "dashboard"
                    ? "bg-purple-100 text-purple-700"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Dashboard
              </button>
              <button
                onClick={() => setActiveTab("ofertas")}
                className={`px-3 py-2 rounded-lg font-medium transition-all duration-300 ${
                  activeTab === "ofertas"
                    ? "bg-purple-100 text-purple-700"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Mis Ofertas
              </button>
              <button
                onClick={() => setActiveTab("candidatos")}
                className={`px-3 py-2 rounded-lg font-medium transition-all duration-300 ${
                  activeTab === "candidatos"
                    ? "bg-purple-100 text-purple-700"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Candidatos
              </button>
              <button
                onClick={() => setActiveTab("perfil")}
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
                  setActiveTab("dashboard");
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
                  setActiveTab("ofertas");
                  setShowMobileMenu(false);
                }}
                className={`w-full text-left px-3 py-2 rounded-lg font-medium ${
                  activeTab === "ofertas"
                    ? "bg-purple-100 text-purple-700"
                    : "text-gray-600"
                }`}
              >
                Mis Ofertas
              </button>
              <button
                onClick={() => {
                  setActiveTab("candidatos");
                  setShowMobileMenu(false);
                }}
                className={`w-full text-left px-3 py-2 rounded-lg font-medium ${
                  activeTab === "candidatos"
                    ? "bg-purple-100 text-purple-700"
                    : "text-gray-600"
                }`}
              >
                Candidatos
              </button>
              <button
                onClick={() => {
                  setActiveTab("perfil");
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
          {activeTab === "ofertas" && renderJobPostings()}
          {activeTab === "candidatos" && renderCandidates()}
          {activeTab === "perfil" && renderProfile()}
        </div>
      </main>
    </div>
  );
};

export default EmployerDashboard;
