import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  SOROBAN_ESCROW_CONTRACT_ID,
  truncateContractId,
} from "../../constants/blockchain";

const DepositModal = ({ isOpen, onClose, walletBalance, setWalletBalance }) => {
  const [depositAmount, setDepositAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!depositAmount || parseFloat(depositAmount) <= 0) {
      alert("Por favor ingresa un monto válido");
      return;
    }

    setIsLoading(true);

    // Simular proceso de depósito
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const newBalance = walletBalance + parseFloat(depositAmount);
      setWalletBalance(newBalance);

      alert(
        `¡Depósito exitoso! Se han añadido $${parseFloat(
          depositAmount
        ).toLocaleString()} a tu Smart Wallet.`
      );

      // Limpiar formulario y cerrar modal
      setDepositAmount("");
      onClose();
    } catch (error) {
      alert("Error al procesar el depósito. Por favor intenta nuevamente.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    if (!isLoading) {
      setDepositAmount("");
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={handleClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                  <span className="text-white text-lg">💰</span>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    Añadir Fondos
                  </h2>
                  <p className="text-sm text-gray-600">Smart Wallet</p>
                </div>
              </div>
              <button
                onClick={handleClose}
                disabled={isLoading}
                className="text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50"
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
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Current Balance */}
              <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-4 mb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Saldo Actual</p>
                    <p className="text-2xl font-bold text-gray-900">
                      ${walletBalance.toLocaleString()}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
                    <span className="text-white text-lg">💳</span>
                  </div>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="depositAmount"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Cantidad a Depositar (USD)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                      $
                    </span>
                    <input
                      type="number"
                      id="depositAmount"
                      value={depositAmount}
                      onChange={(e) => setDepositAmount(e.target.value)}
                      placeholder="0.00"
                      min="0"
                      step="0.01"
                      disabled={isLoading}
                      className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors disabled:opacity-50 disabled:bg-gray-50"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Ingresa el monto en stablecoins (USDC/USDT)
                  </p>
                </div>

                {/* Quick Amount Buttons */}
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-3">
                    Cantidades Rápidas
                  </p>
                  <div className="grid grid-cols-3 gap-2">
                    {[100, 500, 1000].map((amount) => (
                      <button
                        key={amount}
                        type="button"
                        onClick={() => setDepositAmount(amount.toString())}
                        disabled={isLoading}
                        className="px-3 py-2 text-sm border border-gray-300 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-colors disabled:opacity-50"
                      >
                        ${amount}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={
                    isLoading ||
                    !depositAmount ||
                    parseFloat(depositAmount) <= 0
                  }
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Procesando...</span>
                    </>
                  ) : (
                    <>
                      <span>Confirmar Depósito</span>
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 7l5 5m0 0l-5 5m5-5H6"
                        />
                      </svg>
                    </>
                  )}
                </motion.button>
              </form>

              {/* Información del Smart Contract */}
              <div className="mt-4 p-3 bg-purple-50 border border-purple-200 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-purple-600 text-sm">🔐</span>
                  <h4 className="text-xs font-semibold text-purple-900">
                    Protegido por Smart Contract Soroban
                  </h4>
                </div>
                <p className="text-xs text-purple-700 mb-2">
                  Los fondos se depositarán de forma segura en el contrato de
                  escrow descentralizado.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-purple-600">
                    ID del Contrato:
                  </span>
                  <span className="text-xs text-purple-800 font-mono bg-purple-100 px-2 py-1 rounded">
                    {truncateContractId(SOROBAN_ESCROW_CONTRACT_ID)}
                  </span>
                </div>
              </div>

              {/* Info */}
              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-start space-x-3">
                  <span className="text-blue-600 text-lg">ℹ️</span>
                  <div>
                    <h4 className="text-sm font-medium text-blue-900 mb-1">
                      Información Importante
                    </h4>
                    <p className="text-xs text-blue-700">
                      Los fondos se depositan en tu Smart Wallet y estarán
                      disponibles inmediatamente para contratar freelancers y
                      liberar pagos por hitos.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DepositModal;
