import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import useAuth from "../hooks/useAuth";
import SmartWalletService from "../lib/web3/smartWalletService";

const walletService = new SmartWalletService();

const FreelancerWalletPage = ({ auth }) => {
  const fallbackAuth = useAuth();
  const { userData } = auth || fallbackAuth;

  const walletAddress = userData?.smartWalletAddress || "";

  const [balance, setBalance] = useState("0");
  const [history, setHistory] = useState([]);
  const [to, setTo] = useState("");
  const [amount, setAmount] = useState("");
  const [selectedCurrency, setSelectedCurrency] = useState("USDC");
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    const load = async () => {
      if (!walletAddress) return;
      const b = await walletService.getBalance(walletAddress);
      setBalance(b);
      try {
        const info = await walletService.getSafeWalletInfo(walletAddress);
        setHistory(info.transactions || []);
      } catch (_) {}
    };
    load();
  }, [walletAddress]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!walletAddress || !to || !amount) return;
    setIsSending(true);
    try {
      const receipt = await walletService.sendTransaction(
        walletAddress,
        to,
        amount,
        "0x"
      );
      // Refresh
      const info = await walletService.getSafeWalletInfo(walletAddress);
      setHistory(info.transactions || []);
      setTo("");
      setAmount("");
      alert(`Transacción simulada enviada: ${receipt.hash}`);
    } catch (e) {
      alert("No se pudo enviar la transacción");
    } finally {
      setIsSending(false);
    }
  };

  if (!walletAddress) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center">
        <div className="text-center text-gray-600">
          No tienes una Smart Wallet asignada todavía.
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      {/* Header del Freelancer */}
      <div className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Solwage
              </h1>
              <nav className="hidden md:flex items-center space-x-6">
                <button
                  onClick={() => window.history.back()}
                  className="text-gray-600 hover:text-purple-600 transition-colors"
                >
                  ← Volver al Dashboard
                </button>
                <span className="text-purple-600 font-medium">
                  Mi Wallet 💰
                </span>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => (auth || fallbackAuth).logout()}
                className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-600 transition-all duration-300"
              >
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="p-4 md:p-6 pt-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Encabezado */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-3xl md:text-4xl font-bold text-purple-900 mb-2">
              Mi Smart Wallet Stellar 💰
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Gestiona tus fondos XLM, envía transacciones en la red Stellar y
              revisa tu historial
            </p>
          </motion.div>

          {/* Información de la Wallet */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
          >
            <h2 className="text-xl font-semibold mb-4">
              Información de la Wallet
            </h2>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-600">Dirección</p>
                <p className="font-mono break-all text-sm bg-gray-50 p-2 rounded">
                  {walletAddress}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Balance</p>
                <p className="text-3xl font-bold text-purple-600">
                  ${balance} USDC
                </p>
                <p className="text-xs text-gray-500">
                  Red Stellar • También disponible: USDT, XLM
                </p>
              </div>
            </div>
          </motion.div>

          {/* Enviar Transacción */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
          >
            <h3 className="text-lg font-semibold mb-4">Enviar Fondos</h3>
            <form onSubmit={handleSend} className="space-y-4">
              {/* Selección de moneda */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Seleccionar moneda
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {["USDC", "USDT", "XLM"].map((currency) => (
                    <button
                      key={currency}
                      type="button"
                      onClick={() => setSelectedCurrency(currency)}
                      className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                        selectedCurrency === currency
                          ? "border-purple-500 bg-purple-50 text-purple-700"
                          : "border-gray-200 hover:border-gray-300 text-gray-600"
                      }`}
                    >
                      <div className="text-sm font-semibold">{currency}</div>
                      <div className="text-xs text-gray-500">
                        {currency === "USDC"
                          ? "💵 USD Coin"
                          : currency === "USDT"
                          ? "💰 Tether"
                          : "⭐ Stellar"}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Dirección Stellar de destino
                </label>
                <input
                  type="text"
                  placeholder="G..."
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Monto ({selectedCurrency})
                </label>
                <input
                  type="number"
                  step="any"
                  placeholder="0.0"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Red: Stellar • Comisión: ~0.00001 XLM
                </p>
              </div>
              <button
                type="submit"
                disabled={isSending}
                className="w-full bg-purple-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
              >
                {isSending ? "Enviando..." : "Enviar Transacción"}
              </button>
            </form>
          </motion.div>

          {/* Historial de Transacciones */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
          >
            <h3 className="text-lg font-semibold mb-4">
              Historial de Transacciones
            </h3>
            <div className="space-y-3">
              {history.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500">
                    No hay transacciones registradas
                  </p>
                </div>
              ) : (
                history.map((tx) => (
                  <div
                    key={tx.hash}
                    className="border border-gray-200 rounded-lg p-4"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm">
                      <div>
                        <span className="font-medium">Hash:</span>
                        <p className="font-mono break-all text-gray-600">
                          {tx.hash}
                        </p>
                      </div>
                      <div>
                        <span className="font-medium">Para:</span>
                        <p className="font-mono text-gray-600">{tx.to}</p>
                      </div>
                      <div>
                        <span className="font-medium">Valor:</span>
                        <p className="text-gray-600">
                          {tx.value} {tx.currency || selectedCurrency}
                        </p>
                        <span
                          className={`inline-block px-2 py-1 rounded-full text-xs ${
                            tx.status === "confirmed"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {tx.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default FreelancerWalletPage;
