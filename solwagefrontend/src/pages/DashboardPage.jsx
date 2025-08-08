import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const DashboardPage = ({ auth }) => {
  const navigate = useNavigate();
  const { user, logout } = auth;

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">Solwage</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                Bienvenido, {user?.profile?.fullName || "Usuario"}
              </span>
              <button
                onClick={handleLogout}
                className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors duration-300"
              >
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-3xl text-white">🎉</span>
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            ¡Bienvenido a Solwage!
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Tu perfil y Smart Wallet han sido creados exitosamente. Ya puedes
            comenzar a explorar oportunidades globales.
          </p>
          <motion.button
            onClick={() => navigate("/dashboard")}
            className="mt-6 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Ir al Dashboard Principal
          </motion.button>
        </motion.div>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center mb-4">
              <span className="text-xl text-white">💼</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Smart Wallet
            </h3>
            <p className="text-gray-600 mb-4">
              Tu billetera digital está lista para recibir pagos.
            </p>
            <div className="bg-gray-50 rounded-lg p-3">
              <p className="text-sm font-mono text-gray-700 break-all">
                {user?.smartWalletAddress || "0x..."}
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mb-4">
              <span className="text-xl text-white">⭐</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Perfil Profesional
            </h3>
            <p className="text-gray-600 mb-4">
              Tu perfil está completo y visible para clientes globales.
            </p>
            <div className="space-y-2">
              <p className="text-sm text-gray-600">
                <span className="font-medium">Habilidades:</span>{" "}
                {user?.profile?.skills || "No especificadas"}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">GitHub:</span>{" "}
                {user?.profile?.github ? "Conectado" : "No conectado"}
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mb-4">
              <span className="text-xl text-white">💰</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Balance
            </h3>
            <p className="text-gray-600 mb-4">
              Tu saldo actual en stablecoins.
            </p>
            <div className="text-2xl font-bold text-green-600">$0.00 USDC</div>
            <p className="text-sm text-gray-500">Listo para recibir pagos</p>
          </motion.div>
        </div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center space-y-4"
        >
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Explorar Proyectos
            </motion.button>
            <motion.button
              className="bg-white text-purple-600 border-2 border-purple-200 px-8 py-4 rounded-xl font-semibold hover:border-purple-300 hover:bg-purple-50 transition-all duration-300 shadow-lg hover:shadow-xl"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Editar Perfil
            </motion.button>
          </div>

          <p className="text-sm text-gray-500">
            Tu cuenta fue creada el{" "}
            {new Date(user?.createdAt).toLocaleDateString()}
          </p>
        </motion.div>
      </main>
    </div>
  );
};

export default DashboardPage;
