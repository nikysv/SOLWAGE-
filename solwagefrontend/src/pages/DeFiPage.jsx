import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const DeFiPage = ({ auth }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [walletBalance, setWalletBalance] = useState(0);
  const [totalDeposited, setTotalDeposited] = useState(150);
  const [accumulatedEarnings, setAccumulatedEarnings] = useState(2.5);
  const [depositAmount, setDepositAmount] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Métricas simuladas
  const annualYield = 7.5; // APY

  // Simular carga inicial de datos
  useEffect(() => {
    const loadDeFiData = async () => {
      // Simular llamada a API
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Datos de prueba
      setWalletBalance(500);
      setIsLoading(false);
    };

    loadDeFiData();
  }, []);

  const handleDeposit = async () => {
    if (!depositAmount || parseFloat(depositAmount) <= 0) {
      alert("Por favor ingresa un monto válido");
      return;
    }

    if (parseFloat(depositAmount) > walletBalance) {
      alert("Fondos insuficientes en tu wallet");
      return;
    }

    setIsProcessing(true);

    try {
      // Simular transacción blockchain
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const amount = parseFloat(depositAmount);
      setWalletBalance((prev) => prev - amount);
      setTotalDeposited((prev) => prev + amount);

      alert(
        `¡Depósito exitoso! Has depositado $${amount} USDC para generar rendimientos.`
      );
      setDepositAmount("");
      setShowDepositModal(false);
    } catch (error) {
      alert("Error al procesar el depósito. Intenta nuevamente.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleWithdraw = async () => {
    if (!withdrawAmount || parseFloat(withdrawAmount) <= 0) {
      alert("Por favor ingresa un monto válido");
      return;
    }

    const totalAvailable = totalDeposited + accumulatedEarnings;
    if (parseFloat(withdrawAmount) > totalAvailable) {
      alert("Monto superior a los fondos disponibles");
      return;
    }

    setIsProcessing(true);

    try {
      // Simular transacción blockchain
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const amount = parseFloat(withdrawAmount);
      setWalletBalance((prev) => prev + amount);

      // Reducir del total depositado y ganancias proporcionalmente
      const withdrawFromEarnings = Math.min(amount, accumulatedEarnings);
      const withdrawFromDeposit = amount - withdrawFromEarnings;

      setAccumulatedEarnings((prev) => prev - withdrawFromEarnings);
      setTotalDeposited((prev) => prev - withdrawFromDeposit);

      alert(`¡Retiro exitoso! Has retirado $${amount} USDC a tu wallet.`);
      setWithdrawAmount("");
      setShowWithdrawModal(false);
    } catch (error) {
      alert("Error al procesar el retiro. Intenta nuevamente.");
    } finally {
      setIsProcessing(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando datos DeFi...</p>
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
                <span className="text-purple-600 font-medium">DeFi 📈</span>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => auth.logout()}
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
              Haz crecer tus ganancias 📈
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Deposita tus ingresos para generar rendimientos con nuestra
              tecnología
            </p>
          </motion.div>

          {/* Métricas de Rendimiento */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            {/* APY */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">
                    Rendimiento Anual
                  </p>
                  <p className="text-3xl font-bold text-green-600">
                    {annualYield}%
                  </p>
                  <p className="text-xs text-gray-500">APY</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
                  <span className="text-white text-xl">📊</span>
                </div>
              </div>
            </div>

            {/* Total Depositado */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Depositado</p>
                  <p className="text-3xl font-bold text-purple-600">
                    ${totalDeposited.toFixed(2)}
                  </p>
                  <p className="text-xs text-gray-500">USDC</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                  <span className="text-white text-xl">💰</span>
                </div>
              </div>
            </div>

            {/* Ganancias Acumuladas */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">
                    Ganancias Acumuladas
                  </p>
                  <p className="text-3xl font-bold text-green-600">
                    +${accumulatedEarnings.toFixed(2)}
                  </p>
                  <p className="text-xs text-gray-500">USDC</p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-yellow-500 rounded-lg flex items-center justify-center">
                  <span className="text-white text-xl">🎯</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Saldo de Wallet */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">
                  Saldo Disponible en Wallet
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  ${walletBalance.toFixed(2)} USDC
                </p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-xl">💳</span>
              </div>
            </div>
          </motion.div>

          {/* Panel de Acción */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
          >
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Gestionar Fondos
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <motion.button
                onClick={() => setShowDepositModal(true)}
                className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-4 px-6 rounded-xl font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="flex items-center justify-center space-x-2">
                  <span>💵</span>
                  <span>Depositar Fondos</span>
                </span>
              </motion.button>

              <motion.button
                onClick={() => setShowWithdrawModal(true)}
                className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-4 px-6 rounded-xl font-semibold hover:from-green-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="flex items-center justify-center space-x-2">
                  <span>💸</span>
                  <span>Retirar Fondos</span>
                </span>
              </motion.button>
            </div>
          </motion.div>

          {/* Sección de Tecnología */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
          >
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-xl">⚡</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">
                Nuestra Tecnología: Soroban
              </h3>
            </div>

            {/* Explicación de Soroban */}
            <div className="space-y-4 mb-6">
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  ¿Qué es Soroban?
                </h4>
                <p className="text-gray-700 leading-relaxed">
                  Soroban es la plataforma de contratos inteligentes de la red
                  Stellar, diseñada para ser rápida, eficiente y escalable.
                  Permite ejecutar aplicaciones descentralizadas (DApps) con
                  costos mínimos de transacción y tiempos de confirmación de 3-5
                  segundos.
                </p>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  ¿Cómo funciona nuestro DeFi?
                </h4>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <span className="text-purple-600 font-bold">1.</span>
                    <p className="text-gray-700">
                      <strong>Depósito Seguro:</strong> Tus fondos se almacenan
                      en un contrato inteligente auditado que garantiza que solo
                      tú puedes retirarlos.
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="text-purple-600 font-bold">2.</span>
                    <p className="text-gray-700">
                      <strong>Estrategias de Rendimiento:</strong> Los fondos se
                      distribuyen automáticamente en protocolos DeFi verificados
                      para generar rendimientos optimizados.
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="text-purple-600 font-bold">3.</span>
                    <p className="text-gray-700">
                      <strong>Transparencia Total:</strong> Todas las
                      transacciones son públicas y verificables en la blockchain
                      de Stellar.
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="text-purple-600 font-bold">4.</span>
                    <p className="text-gray-700">
                      <strong>Retiro Instantáneo:</strong> Puedes retirar tus
                      fondos en cualquier momento sin penalizaciones ni períodos
                      de bloqueo.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  Ventajas de Stellar/Soroban
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-green-600">💰</span>
                      <h5 className="font-medium text-green-900">
                        Costos Mínimos
                      </h5>
                    </div>
                    <p className="text-sm text-green-700">
                      Transacciones desde $0.00001 USD, permitiendo
                      micro-inversiones rentables.
                    </p>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-blue-600">⚡</span>
                      <h5 className="font-medium text-blue-900">Velocidad</h5>
                    </div>
                    <p className="text-sm text-blue-700">
                      Confirmaciones en 3-5 segundos, mucho más rápido que
                      Ethereum.
                    </p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-purple-600">🌍</span>
                      <h5 className="font-medium text-purple-900">
                        Sostenibilidad
                      </h5>
                    </div>
                    <p className="text-sm text-purple-700">
                      Red energéticamente eficiente con huella de carbono
                      mínima.
                    </p>
                  </div>
                  <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-orange-600">🔒</span>
                      <h5 className="font-medium text-orange-900">Seguridad</h5>
                    </div>
                    <p className="text-sm text-orange-700">
                      Protocolo probado con años de operación estable y segura.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Advertencias Importantes */}
            <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-4">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <span className="text-red-600 text-xl">⚠️</span>
                </div>
                <div className="ml-3">
                  <h4 className="text-lg font-medium text-red-900 mb-2">
                    Advertencias Importantes - LEE ANTES DE INVERTIR
                  </h4>
                  <ul className="text-sm text-red-800 space-y-2">
                    <li className="flex items-start">
                      <span className="text-red-600 mr-2">•</span>
                      <span>
                        <strong>Riesgo de Pérdida:</strong> Las inversiones en
                        DeFi pueden resultar en pérdida parcial o total de tu
                        capital. Solo invierte lo que puedas permitirte perder.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-600 mr-2">•</span>
                      <span>
                        <strong>Volatilidad:</strong> Los rendimientos pueden
                        fluctuar significativamente. El APY mostrado es estimado
                        y no garantizado.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-600 mr-2">•</span>
                      <span>
                        <strong>Riesgo de Contratos:</strong> Aunque auditados,
                        los contratos inteligentes pueden contener
                        vulnerabilidades no detectadas.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-600 mr-2">•</span>
                      <span>
                        <strong>Sin Garantía Gubernamental:</strong> Estos
                        fondos NO están asegurados por ninguna entidad
                        gubernamental como un banco tradicional.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-600 mr-2">•</span>
                      <span>
                        <strong>Educación Requerida:</strong> Asegúrate de
                        entender completamente los riesgos de DeFi antes de
                        participar.
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Recursos Educativos */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-3">
                <span className="text-blue-600 text-lg">📚</span>
                <h4 className="text-lg font-medium text-blue-900">
                  Aprende Más
                </h4>
              </div>
              <p className="text-sm text-blue-800 mb-3">
                Antes de invertir, te recomendamos educarte sobre DeFi y
                blockchain:
              </p>
              <div className="space-y-2">
                <a
                  href="https://developers.stellar.org/docs/smart-contracts"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-sm text-blue-700 hover:text-blue-900 transition-colors"
                >
                  <span className="mr-1">📖</span> Documentación Oficial de
                  Soroban
                </a>
                <br />
                <a
                  href="https://stellar.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-sm text-blue-700 hover:text-blue-900 transition-colors"
                >
                  <span className="mr-1">🌟</span> Red Stellar
                </a>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Modal de Depósito */}
        {showDepositModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-2xl p-6 w-full max-w-md"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Depositar Fondos
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cantidad (USDC)
                  </label>
                  <input
                    type="number"
                    value={depositAmount}
                    onChange={(e) => setDepositAmount(e.target.value)}
                    placeholder="0.00"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Disponible: ${walletBalance.toFixed(2)} USDC
                  </p>
                </div>
                <div className="flex space-x-3">
                  <button
                    onClick={() => setShowDepositModal(false)}
                    disabled={isProcessing}
                    className="flex-1 py-3 px-4 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleDeposit}
                    disabled={isProcessing}
                    className="flex-1 py-3 px-4 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors disabled:opacity-50"
                  >
                    {isProcessing ? "Procesando..." : "Depositar"}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {/* Modal de Retiro */}
        {showWithdrawModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-2xl p-6 w-full max-w-md"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Retirar Fondos
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cantidad (USDC)
                  </label>
                  <input
                    type="number"
                    value={withdrawAmount}
                    onChange={(e) => setWithdrawAmount(e.target.value)}
                    placeholder="0.00"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Disponible: $
                    {(totalDeposited + accumulatedEarnings).toFixed(2)} USDC
                  </p>
                </div>
                <div className="flex space-x-3">
                  <button
                    onClick={() => setShowWithdrawModal(false)}
                    disabled={isProcessing}
                    className="flex-1 py-3 px-4 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleWithdraw}
                    disabled={isProcessing}
                    className="flex-1 py-3 px-4 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors disabled:opacity-50"
                  >
                    {isProcessing ? "Procesando..." : "Retirar"}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DeFiPage;
