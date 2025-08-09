import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const UserNotRegisteredModal = ({
  isOpen,
  onClose,
  userEmail,
  userDisplayName,
}) => {
  const navigate = useNavigate();
  const { clearAuthState } = useAuth();

  const handleRegister = () => {
    onClose();
    navigate("/auth");
  };

  const handleLoginDifferentAccount = () => {
    onClose();
    navigate("/auth");
  };

  const handleCancel = async () => {
    // Limpiar completamente el estado de autenticación
    await clearAuthState();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={handleCancel}
      >
        <motion.div
          className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl"
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Icono de usuario no encontrado */}
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-orange-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.232 15.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              ¡No estás registrado!
            </h3>
            <p className="text-gray-600">
              El email{" "}
              <span className="font-semibold text-purple-600">{userEmail}</span>{" "}
              no está registrado en Solwage.
            </p>
          </div>

          {/* Mensaje explicativo */}
          <div className="bg-purple-50 border border-purple-200 rounded-xl p-4 mb-6">
            <div className="flex items-start space-x-3">
              <div className="w-5 h-5 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg
                  className="w-3 h-3 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-purple-800 mb-1">
                  ¿Primera vez en Solwage?
                </h4>
                <p className="text-sm text-purple-700">
                  Para acceder a la plataforma, primero debes crear una cuenta.
                  El proceso es rápido y te permitirá aprovechar todas las
                  funcionalidades de Solwage.
                </p>
              </div>
            </div>
          </div>

          {/* Botones de acción */}
          <div className="space-y-3">
            <motion.button
              onClick={handleRegister}
              className="w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white py-3 px-6 rounded-xl font-semibold hover:from-purple-700 hover:to-purple-800 transition-all duration-300 shadow-lg hover:shadow-xl"
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.98 }}
            >
              🚀 ¡Regístrate ahora!
            </motion.button>

            <motion.button
              onClick={handleLoginDifferentAccount}
              className="w-full bg-gray-100 text-gray-700 py-3 px-6 rounded-xl font-semibold hover:bg-gray-200 transition-all duration-300"
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.98 }}
            >
              Registrar otra cuenta
            </motion.button>

            <motion.button
              onClick={handleCancel}
              className="w-full text-gray-500 py-2 px-4 rounded-lg hover:text-gray-700 transition-all duration-300"
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.98 }}
            >
              Cancelar
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default UserNotRegisteredModal;
