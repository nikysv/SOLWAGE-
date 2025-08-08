import React from "react";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";

const DocumentationSoroban = () => {
  const location = useLocation();

  const sorobanFeatures = [
    {
      title: "Seguridad Total",
      description: "Tus fondos están protegidos por tecnología avanzada",
      icon: "🔒",
      gradient: "from-orange-500 to-red-500",
    },
    {
      title: "Sin Intermediarios",
      description: "Eliminamos los intermediarios tradicionales",
      icon: "⚡",
      gradient: "from-green-500 to-emerald-500",
    },
    {
      title: "Transparencia",
      description: "Puedes verificar cada transacción",
      icon: "👁️",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      title: "Automatización",
      description: "Todo funciona automáticamente",
      icon: "🤖",
      gradient: "from-purple-500 to-pink-500",
    },
  ];

  return (
    <section className="py-20 sm:py-32 bg-white">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <motion.div
          key={`soroban-header-${location.pathname}`}
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Seguridad y{" "}
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Confianza
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Tu seguridad es nuestra prioridad. Usamos la tecnología más avanzada
            para proteger tus pagos y garantizar que siempre recibas tu dinero.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          {/* Left side - Security Info */}
          <motion.div
            key={`security-info-${location.pathname}`}
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                Protección{" "}
                <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  Automática
                </span>
              </h3>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                Los contratos inteligentes actúan como un intermediario digital
                que protege tanto al freelancer como al cliente. Los fondos se
                liberan automáticamente cuando se cumplen las condiciones.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <motion.div
                  key={`security-feature-1-${location.pathname}`}
                  className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center text-white font-bold text-lg"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  🔒
                </motion.div>
                <div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2">
                    Fondos Protegidos
                  </h4>
                  <p className="text-gray-600 leading-relaxed">
                    Tu dinero está seguro hasta que completas el trabajo. El
                    cliente no puede retirar los fondos sin tu aprobación.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <motion.div
                  key={`security-feature-2-${location.pathname}`}
                  className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center text-white font-bold text-lg"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  ⚡
                </motion.div>
                <div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2">
                    Sin Intermediarios
                  </h4>
                  <p className="text-gray-600 leading-relaxed">
                    No hay bancos ni empresas intermediarias. Los contratos
                    inteligentes manejan todo automáticamente.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <motion.div
                  key={`security-feature-3-${location.pathname}`}
                  className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center text-white font-bold text-lg"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  👁️
                </motion.div>
                <div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2">
                    Totalmente Transparente
                  </h4>
                  <p className="text-gray-600 leading-relaxed">
                    Puedes verificar cada transacción en la blockchain. No hay
                    secretos ni comisiones ocultas.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right side - Features Grid */}
          <motion.div
            key={`soroban-features-grid-${location.pathname}`}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {sorobanFeatures.map((feature, index) => (
              <motion.div
                key={`soroban-feature-card-${index}-${location.pathname}`}
                className="bg-gradient-to-br from-slate-50 to-gray-100 rounded-2xl p-6 border border-gray-200"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{
                  y: -5,
                  scale: 1.02,
                  transition: { duration: 0.3, ease: "easeOut" },
                }}
              >
                <motion.div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center text-2xl text-white mb-4`}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  {feature.icon}
                </motion.div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">
                  {feature.title}
                </h4>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Security Features */}
        <motion.div
          key={`security-features-${location.pathname}`}
          className="bg-gradient-to-br from-slate-900 to-gray-900 rounded-3xl p-8 text-white"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h3 className="text-2xl font-bold text-white mb-8 text-center">
            Características de Seguridad
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              key={`security-card-1-${location.pathname}`}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
              whileHover={{ scale: 1.02, y: -2 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-3xl mb-4">💼</div>
              <h4 className="text-xl font-bold mb-3">Escrow Automático</h4>
              <p className="text-gray-300 text-sm leading-relaxed">
                Los fondos se mantienen seguros hasta que el proyecto se
                completa satisfactoriamente.
              </p>
            </motion.div>

            <motion.div
              key={`security-card-2-${location.pathname}`}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
              whileHover={{ scale: 1.02, y: -2 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-3xl mb-4">⭐</div>
              <h4 className="text-xl font-bold mb-3">Reputación Verificable</h4>
              <p className="text-gray-300 text-sm leading-relaxed">
                Tu historial de trabajo es inmutable y verificable. Construye
                una reputación sólida.
              </p>
            </motion.div>

            <motion.div
              key={`security-card-3-${location.pathname}`}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
              whileHover={{ scale: 1.02, y: -2 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-3xl mb-4">🔒</div>
              <h4 className="text-xl font-bold mb-3">Protección de Datos</h4>
              <p className="text-gray-300 text-sm leading-relaxed">
                Tus datos personales están protegidos. Solo compartes lo que
                necesitas para el trabajo.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DocumentationSoroban;
