import React, { useState } from "react";
import { motion } from "framer-motion";
import { QRCodeSVG } from "qrcode.react";
import WithdrawModal from "./WithdrawModal";

const WalletView = ({
  walletBalance,
  setWalletBalance,
  onOpenDepositModal,
}) => {
  const [copySuccess, setCopySuccess] = useState(false);
  const [showPaymentHistory, setShowPaymentHistory] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);

  // Dirección de Smart Wallet simulada
  const walletAddress =
    "GDGK7XJVWKZ3XQBZ8VHQNRJM9L4KPGTXM2WZQY5PNHVJDSL8XMTQR3";

  const handleCopyAddress = async () => {
    try {
      await navigator.clipboard.writeText(walletAddress);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      // Fallback para navegadores que no soportan clipboard API
      const textArea = document.createElement("textarea");
      textArea.value = walletAddress;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    }
  };

  const truncateAddress = (address) => {
    if (address.length <= 12) return address;
    return `${address.slice(0, 6)}...${address.slice(-6)}`;
  };

  // Historial de pagos simulado
  const paymentHistory = [
    {
      id: 1,
      type: "deposit",
      amount: walletBalance > 2500 ? 1000 : 500,
      description: "Depósito de fondos",
      project: "Recarga de wallet",
      date: "2024-02-15T10:30:00.000Z",
      status: "completed",
      freelancer: null,
    },
    {
      id: 2,
      type: "payment",
      amount: -800,
      description: "Pago por hito completado",
      project: "Sistema DevOps",
      date: "2024-02-12T14:20:00.000Z",
      status: "completed",
      freelancer: "Ana Martínez",
    },
    {
      id: 3,
      type: "payment",
      amount: -1600,
      description: "Pago por desarrollo de Smart Contract",
      project: "Smart Contract DeFi",
      date: "2024-02-10T09:15:00.000Z",
      status: "completed",
      freelancer: "Carlos Rodríguez",
    },
    {
      id: 4,
      type: "escrow",
      amount: -400,
      description: "Fondos bloqueados en escrow",
      project: "Testing y Deployment",
      date: "2024-02-08T16:45:00.000Z",
      status: "pending",
      freelancer: "Carlos Rodríguez",
    },
    {
      id: 5,
      type: "deposit",
      amount: 2000,
      description: "Depósito inicial",
      project: "Recarga de wallet",
      date: "2024-02-05T12:00:00.000Z",
      status: "completed",
      freelancer: null,
    },
  ];

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getTransactionIcon = (type) => {
    switch (type) {
      case "deposit":
        return "💳";
      case "payment":
        return "💰";
      case "escrow":
        return "🔒";
      default:
        return "💸";
    }
  };

  const getTransactionColor = (type, amount) => {
    if (type === "deposit") return "text-green-600";
    if (type === "escrow") return "text-yellow-600";
    return "text-red-600";
  };

  const handleWithdraw = async (withdrawData) => {
    try {
      // Simular proceso de retiro
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Actualizar el balance
      setWalletBalance((prev) => prev - withdrawData.amount);

      console.log(
        `Retiro exitoso: ${withdrawData.amount} ${withdrawData.currency} a ${withdrawData.address}`
      );
    } catch (error) {
      console.error("Error en retiro:", error);
      throw error;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300"
    >
      {/* Header del Panel */}
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
            />
          </svg>
        </div>
        <div>
          <h2 className="text-xl font-bold text-purple-600">Mi Smart Wallet</h2>
          <p className="text-sm text-gray-600">Stellar Network · Soroban</p>
        </div>
      </div>

      {/* Sección de Saldo */}
      <div className="text-center mb-6">
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-6 mb-4">
          <p className="text-sm text-gray-600 mb-2">Saldo Disponible</p>
          <p className="text-4xl font-bold text-purple-600 mb-1">
            ${walletBalance.toLocaleString()}
          </p>
          <p className="text-sm text-gray-500">USDC</p>
        </div>
      </div>

      {/* Grid de información adicional */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Sección de Dirección Pública */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-gray-900">
            Dirección de la Wallet
          </h3>
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex-1 min-w-0">
                <p className="text-xs text-gray-600 mb-1">Dirección Pública</p>
                <p className="text-sm font-mono text-gray-900 truncate md:hidden">
                  {truncateAddress(walletAddress)}
                </p>
                <p className="text-sm font-mono text-gray-900 hidden md:block break-all">
                  {walletAddress}
                </p>
              </div>
              <motion.button
                onClick={handleCopyAddress}
                className={`ml-3 p-2 rounded-lg transition-all duration-200 ${
                  copySuccess
                    ? "bg-green-100 text-green-600"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {copySuccess ? (
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                  </svg>
                )}
              </motion.button>
            </div>
            {copySuccess && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-xs text-green-600 mt-2"
              >
                ¡Dirección copiada al portapapeles!
              </motion.p>
            )}
          </div>
        </div>

        {/* Sección de Código QR */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-gray-900">Código QR</h3>
          <div className="bg-white rounded-lg p-4 border border-gray-200 flex flex-col items-center">
            <div className="bg-white p-3 rounded-lg border border-gray-100">
              <QRCodeSVG
                value={walletAddress}
                size={120}
                level="M"
                includeMargin={false}
              />
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center">
              Escanea para recibir fondos
            </p>
          </div>
        </div>
      </div>

      {/* Información adicional en cards pequeñas */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-blue-50 rounded-lg p-4 text-center">
          <div className="text-lg font-bold text-blue-600">
            {paymentHistory.length}
          </div>
          <div className="text-xs text-blue-700">Transacciones</div>
        </div>
        <div className="bg-green-50 rounded-lg p-4 text-center">
          <div className="text-lg font-bold text-green-600">98.5%</div>
          <div className="text-xs text-green-700">Uptime Red</div>
        </div>
      </div>

      {/* Historial de Pagos */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">
            Control de Pagos
          </h3>
          <button
            onClick={() => setShowPaymentHistory(!showPaymentHistory)}
            className="text-sm text-purple-600 hover:text-purple-800 font-medium flex items-center space-x-1"
          >
            <span>{showPaymentHistory ? "Ocultar" : "Ver historial"}</span>
            <svg
              className={`w-4 h-4 transition-transform ${
                showPaymentHistory ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
        </div>

        {showPaymentHistory && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-gray-50 rounded-lg border border-gray-200 overflow-hidden"
          >
            <div className="max-h-64 overflow-y-auto">
              {paymentHistory.map((transaction, index) => (
                <div
                  key={transaction.id}
                  className={`p-4 border-b border-gray-200 last:border-b-0 hover:bg-white transition-colors ${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="text-xl">
                        {getTransactionIcon(transaction.type)}
                      </span>
                      <div>
                        <p className="font-medium text-gray-900 text-sm">
                          {transaction.description}
                        </p>
                        <div className="flex items-center space-x-2 text-xs text-gray-500">
                          <span>{transaction.project}</span>
                          {transaction.freelancer && (
                            <>
                              <span>•</span>
                              <span>{transaction.freelancer}</span>
                            </>
                          )}
                        </div>
                        <p className="text-xs text-gray-400 mt-1">
                          {formatDate(transaction.date)}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p
                        className={`font-bold text-sm ${getTransactionColor(
                          transaction.type,
                          transaction.amount
                        )}`}
                      >
                        {transaction.amount > 0 ? "+" : ""}$
                        {Math.abs(transaction.amount).toLocaleString()}
                      </p>
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          transaction.status === "completed"
                            ? "bg-green-100 text-green-600"
                            : "bg-yellow-100 text-yellow-600"
                        }`}
                      >
                        {transaction.status === "completed"
                          ? "Completado"
                          : "Pendiente"}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Resumen del historial */}
            <div className="bg-gray-100 p-4 border-t border-gray-200">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-xs text-gray-600">Total Depositado</p>
                  <p className="text-sm font-bold text-green-600">
                    +$
                    {paymentHistory
                      .filter((t) => t.type === "deposit")
                      .reduce((sum, t) => sum + t.amount, 0)
                      .toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-600">Total Pagado</p>
                  <p className="text-sm font-bold text-red-600">
                    $
                    {Math.abs(
                      paymentHistory
                        .filter((t) => t.type === "payment")
                        .reduce((sum, t) => sum + t.amount, 0)
                    ).toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-600">En Escrow</p>
                  <p className="text-sm font-bold text-yellow-600">
                    $
                    {Math.abs(
                      paymentHistory
                        .filter(
                          (t) => t.type === "escrow" && t.status === "pending"
                        )
                        .reduce((sum, t) => sum + t.amount, 0)
                    ).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Botones de Acción */}
      <div className="grid grid-cols-2 gap-4">
        <motion.button
          onClick={onOpenDepositModal}
          className="bg-gradient-to-r from-green-600 to-green-700 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:from-green-700 hover:to-green-800 transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center space-x-2"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
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
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
          <span>Depositar</span>
        </motion.button>

        <motion.button
          onClick={() => setShowWithdrawModal(true)}
          className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center space-x-2"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
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
              d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
            />
          </svg>
          <span>Retirar</span>
        </motion.button>
      </div>

      {/* Información de seguridad */}
      <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
        <div className="flex items-start space-x-2">
          <svg
            className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <div>
            <h4 className="text-sm font-medium text-blue-900 mb-1">
              Wallet Segura
            </h4>
            <p className="text-xs text-blue-700">
              Tu Smart Wallet está protegida por la tecnología blockchain de
              Stellar. Todas las transacciones son transparentes y verificables.
            </p>
          </div>
        </div>
      </div>

      {/* Enlaces rápidos */}
      <div className="mt-4 flex flex-wrap gap-2">
        <motion.a
          href="https://stellar.expert/explorer/public"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center space-x-1 text-xs text-purple-600 hover:text-purple-800 transition-colors"
          whileHover={{ scale: 1.05 }}
        >
          <span>🔍</span>
          <span>Ver en Explorer</span>
        </motion.a>
        <motion.a
          href="https://developers.stellar.org"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center space-x-1 text-xs text-purple-600 hover:text-purple-800 transition-colors"
          whileHover={{ scale: 1.05 }}
        >
          <span>📚</span>
          <span>Documentación</span>
        </motion.a>
      </div>

      {/* Modal de Retiro */}
      <WithdrawModal
        isOpen={showWithdrawModal}
        onClose={() => setShowWithdrawModal(false)}
        walletBalance={walletBalance}
        onWithdraw={handleWithdraw}
      />
    </motion.div>
  );
};

export default WalletView;
