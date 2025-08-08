import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  SOROBAN_ESCROW_CONTRACT_ID,
  truncateContractId,
} from "../../constants/blockchain";

const MilestoneForm = ({
  isOpen,
  onClose,
  milestone,
  freelancerName,
  onConfirmDeposit,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [notes, setNotes] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!milestone) return;

    setIsLoading(true);

    try {
      // Simular proceso de depósito en escrow
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Llamar al callback con los datos del depósito
      if (onConfirmDeposit) {
        onConfirmDeposit({
          milestoneId: milestone.id,
          amount: milestone.amount,
          notes: notes,
          contractId: SOROBAN_ESCROW_CONTRACT_ID,
        });
      }

      alert(
        `¡Fondos depositados exitosamente! $${milestone.amount} USDC han sido bloqueados en el contrato de escrow para el hito "${milestone.title}".`
      );

      onClose();
    } catch (error) {
      alert("Error al procesar el depósito. Por favor intenta nuevamente.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    if (!isLoading) {
      setNotes("");
      onClose();
    }
  };

  if (!milestone) return null;

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
            className="bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                  <span className="text-white text-lg">🔒</span>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    Depositar Fondos en Escrow
                  </h2>
                  <p className="text-sm text-gray-600">
                    Hito: {milestone.title}
                  </p>
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
              {/* Información del hito */}
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Detalles del Hito
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Freelancer:</span>
                    <span className="font-medium text-gray-900">
                      {freelancerName}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Monto:</span>
                    <span className="font-bold text-blue-600">
                      ${milestone.amount} USDC
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Fecha límite:</span>
                    <span className="font-medium text-gray-900">
                      {new Date(milestone.dueDate).toLocaleDateString("es-ES")}
                    </span>
                  </div>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="notes"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Notas Adicionales (Opcional)
                  </label>
                  <textarea
                    id="notes"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Instrucciones específicas para el freelancer..."
                    rows={3}
                    disabled={isLoading}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors disabled:opacity-50 disabled:bg-gray-50"
                  />
                </div>

                {/* Botón de confirmar */}
                <motion.button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                  whileHover={!isLoading ? { scale: 1.02 } : {}}
                  whileTap={!isLoading ? { scale: 0.98 } : {}}
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Procesando Depósito...</span>
                    </>
                  ) : (
                    <>
                      <span>🔒</span>
                      <span>Confirmar Depósito</span>
                    </>
                  )}
                </motion.button>
              </form>

              {/* Información del Smart Contract */}
              <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg">
                <div className="flex items-center space-x-2 mb-3">
                  <span className="text-purple-600 text-lg">🛡️</span>
                  <h4 className="text-sm font-semibold text-purple-900">
                    Seguridad y Transparencia Garantizada
                  </h4>
                </div>
                <p className="text-xs text-purple-700 mb-3 leading-relaxed">
                  Los fondos se depositarán automáticamente en un contrato
                  inteligente de escrow en la red Soroban, garantizando que solo
                  se liberen cuando el hito sea completado satisfactoriamente.
                </p>
                <div className="flex items-center justify-between bg-white/50 rounded-lg p-2">
                  <span className="text-xs text-purple-600 font-medium">
                    Smart Contract ID:
                  </span>
                  <span className="text-xs text-purple-800 font-mono bg-purple-100 px-2 py-1 rounded">
                    {truncateContractId(SOROBAN_ESCROW_CONTRACT_ID, 8, 6)}
                  </span>
                </div>
                <div className="mt-2 flex items-center space-x-1">
                  <span className="text-xs text-purple-600">🌐</span>
                  <span className="text-xs text-purple-600">
                    Red: Soroban Testnet
                  </span>
                </div>
              </div>

              {/* Info adicional */}
              <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-start space-x-2">
                  <span className="text-blue-600 text-sm">💡</span>
                  <div>
                    <h4 className="text-xs font-medium text-blue-900 mb-1">
                      ¿Cómo funciona el escrow?
                    </h4>
                    <p className="text-xs text-blue-700">
                      Los fondos quedan bloqueados hasta que el freelancer
                      complete el hito. Solo tú puedes liberar los fondos una
                      vez que apruebes el trabajo entregado.
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

export default MilestoneForm;
