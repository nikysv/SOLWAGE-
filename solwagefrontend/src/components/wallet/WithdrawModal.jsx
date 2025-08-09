import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const WithdrawModal = ({ isOpen, onClose, walletBalance, onWithdraw }) => {
  const [amount, setAmount] = useState("");
  const [selectedCurrency, setSelectedCurrency] = useState("USDC");
  const [withdrawAddress, setWithdrawAddress] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  // Monedas disponibles para retiro
  const currencies = [
    {
      symbol: "USDC",
      name: "USD Coin",
      icon: "💵",
      network: "Stellar",
      minAmount: 1,
    },
    {
      symbol: "USDT",
      name: "Tether USD",
      icon: "💰",
      network: "Stellar",
      minAmount: 1,
    },
    {
      symbol: "XLM",
      name: "Stellar Lumens",
      icon: "⭐",
      network: "Stellar",
      minAmount: 0.5,
    },
  ];

  const selectedCurrencyData = currencies.find(
    (c) => c.symbol === selectedCurrency
  );

  const handleWithdraw = async () => {
    if (!amount || !withdrawAddress) {
      alert("Por favor completa todos los campos");
      return;
    }

    const withdrawAmount = parseFloat(amount);
    if (withdrawAmount <= 0) {
      alert("Por favor ingresa un monto válido");
      return;
    }

    if (withdrawAmount < selectedCurrencyData.minAmount) {
      alert(
        `El monto mínimo para ${selectedCurrency} es ${selectedCurrencyData.minAmount}`
      );
      return;
    }

    if (withdrawAmount > walletBalance) {
      alert("Fondos insuficientes en tu wallet");
      return;
    }

    setIsProcessing(true);

    try {
      // Simular proceso de retiro
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Llamar a la función de retiro del padre
      await onWithdraw({
        amount: withdrawAmount,
        currency: selectedCurrency,
        address: withdrawAddress,
        network: selectedCurrencyData.network,
      });

      alert(
        `¡Retiro exitoso! Has retirado ${withdrawAmount} ${selectedCurrency} a ${withdrawAddress}`
      );

      // Limpiar formulario
      setAmount("");
      setWithdrawAddress("");
      onClose();
    } catch (error) {
      alert("Error al procesar el retiro. Intenta nuevamente.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleMaxAmount = () => {
    setAmount(walletBalance.toString());
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl"
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-gray-900">Retirar Fondos</h3>
            <motion.button
              onClick={onClose}
              className="p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </motion.button>
          </div>

          {/* Saldo disponible */}
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-4 mb-6">
            <p className="text-sm text-gray-600 mb-1">Saldo disponible</p>
            <p className="text-2xl font-bold text-purple-600">
              ${walletBalance.toLocaleString()}
            </p>
          </div>

          {/* Selección de moneda */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Selecciona la moneda
            </label>
            <div className="grid grid-cols-3 gap-3">
              {currencies.map((currency) => (
                <motion.button
                  key={currency.symbol}
                  onClick={() => setSelectedCurrency(currency.symbol)}
                  className={`p-3 rounded-xl border-2 transition-all duration-200 ${
                    selectedCurrency === currency.symbol
                      ? "border-purple-500 bg-purple-50 text-purple-700"
                      : "border-gray-200 hover:border-gray-300 text-gray-600"
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="text-2xl mb-1">{currency.icon}</div>
                  <div className="text-xs font-semibold">{currency.symbol}</div>
                  <div className="text-xs text-gray-500">
                    {currency.network}
                  </div>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Monto */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Cantidad ({selectedCurrency})
            </label>
            <div className="relative">
              <input
                type="number"
                step="any"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className="w-full px-4 py-3 pr-16 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              />
              <motion.button
                onClick={handleMaxAmount}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 px-3 py-1 text-xs bg-purple-100 text-purple-600 rounded-md hover:bg-purple-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                MAX
              </motion.button>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Mínimo: {selectedCurrencyData?.minAmount} {selectedCurrency}
            </p>
          </div>

          {/* Dirección de retiro */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Dirección de {selectedCurrencyData?.network}
            </label>
            <input
              type="text"
              value={withdrawAddress}
              onChange={(e) => setWithdrawAddress(e.target.value)}
              placeholder={
                selectedCurrency === "XLM" ? "G..." : "Dirección de wallet"
              }
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            />
            <p className="text-xs text-gray-500 mt-1">
              Ingresa la dirección donde quieres recibir tus {selectedCurrency}
            </p>
          </div>

          {/* Información de red y comisiones */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-6">
            <div className="flex items-start space-x-2">
              <svg
                className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <div>
                <h4 className="text-sm font-medium text-yellow-800 mb-1">
                  Información importante
                </h4>
                <ul className="text-xs text-yellow-700 space-y-1">
                  <li>• Red: {selectedCurrencyData?.network}</li>
                  <li>• Comisión de red: ~0.00001 XLM</li>
                  <li>• Tiempo estimado: 3-5 segundos</li>
                  <li>• Verifica que la dirección sea correcta</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Botones */}
          <div className="flex space-x-3">
            <motion.button
              onClick={onClose}
              disabled={isProcessing}
              className="flex-1 py-3 px-4 border border-gray-300 rounded-xl font-medium text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Cancelar
            </motion.button>
            <motion.button
              onClick={handleWithdraw}
              disabled={isProcessing || !amount || !withdrawAddress}
              className="flex-1 py-3 px-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-medium hover:from-purple-700 hover:to-blue-700 transition-all disabled:opacity-50 shadow-lg"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isProcessing ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Procesando...
                </div>
              ) : (
                `Retirar ${amount || "0"} ${selectedCurrency}`
              )}
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default WithdrawModal;
