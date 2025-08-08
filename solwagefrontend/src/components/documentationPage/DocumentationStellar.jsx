import React from "react";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";

const DocumentationStellar = () => {
  const location = useLocation();

  const stellarFeatures = [
    {
      title: "Pagos Instantáneos",
      description: "Recibe tu dinero en segundos, no en días",
      icon: "⚡",
      gradient: "from-yellow-500 to-orange-500",
    },
    {
      title: "Comisiones Mínimas",
      description: "Paga menos comisiones que en otras plataformas",
      icon: "💰",
      gradient: "from-green-500 to-emerald-500",
    },
    {
      title: "Monedas Estables",
      description: "Recibe pagos en dólares sin volatilidad",
      icon: "💎",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      title: "Acceso Global",
      description: "Trabaja con clientes de cualquier país",
      icon: "🌐",
      gradient: "from-purple-500 to-pink-500",
    },
  ];

  return (
    <section className="py-20 sm:py-32 bg-gradient-to-br from-gray-50 to-slate-100">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <motion.div
          key={`stellar-header-${location.pathname}`}
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            ¿Por qué{" "}
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Blockchain?
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Usamos tecnología blockchain para hacer que los pagos sean más
            rápidos, seguros y baratos. Sin intermediarios, sin esperas, sin
            sorpresas.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          {/* Left side - Blockchain Info */}
          <motion.div
            key={`blockchain-info-${location.pathname}`}
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                Pagos del{" "}
                <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  Futuro
                </span>
              </h3>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                La tecnología blockchain elimina los intermediarios
                tradicionales. Esto significa que recibes tu dinero más rápido,
                pagas menos comisiones y tienes control total sobre tus fondos.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <motion.div
                  key={`feature-1-${location.pathname}`}
                  className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl flex items-center justify-center text-white font-bold text-lg"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  🚀
                </motion.div>
                <div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2">
                    Sin Esperas
                  </h4>
                  <p className="text-gray-600 leading-relaxed">
                    Los pagos se procesan en segundos, no en días. No más
                    esperas por transferencias bancarias o cheques en el correo.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <motion.div
                  key={`feature-2-${location.pathname}`}
                  className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-white font-bold text-lg"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  💰
                </motion.div>
                <div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2">
                    Más Dinero para Ti
                  </h4>
                  <p className="text-gray-600 leading-relaxed">
                    Comisiones mucho más bajas que las plataformas
                    tradicionales. Más ganancias en tu bolsillo.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <motion.div
                  key={`feature-3-${location.pathname}`}
                  className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center text-white font-bold text-lg"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  🌍
                </motion.div>
                <div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2">
                    Sin Fronteras
                  </h4>
                  <p className="text-gray-600 leading-relaxed">
                    Trabaja con clientes de cualquier país sin problemas de
                    cambio de moneda o transferencias internacionales.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right side - Features Grid */}
          <motion.div
            key={`features-grid-${location.pathname}`}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {stellarFeatures.map((feature, index) => (
              <motion.div
                key={`feature-card-${index}-${location.pathname}`}
                className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200"
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

        {/* Benefits Stats */}
        <motion.div
          key={`benefits-stats-${location.pathname}`}
          className="bg-white rounded-3xl p-8 shadow-xl border border-gray-200"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Beneficios para Ti
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <motion.div
              key={`stat-1-${location.pathname}`}
              className="text-center"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <div className="text-3xl font-bold text-purple-600 mb-2">
                3-5s
              </div>
              <p className="text-gray-600 text-sm">Tiempo de Pago</p>
            </motion.div>

            <motion.div
              key={`stat-2-${location.pathname}`}
              className="text-center"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <div className="text-3xl font-bold text-blue-600 mb-2">90%</div>
              <p className="text-gray-600 text-sm">Menos Comisiones</p>
            </motion.div>

            <motion.div
              key={`stat-3-${location.pathname}`}
              className="text-center"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <div className="text-3xl font-bold text-green-600 mb-2">100%</div>
              <p className="text-gray-600 text-sm">Seguridad</p>
            </motion.div>

            <motion.div
              key={`stat-4-${location.pathname}`}
              className="text-center"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <div className="text-3xl font-bold text-orange-600 mb-2">
                24/7
              </div>
              <p className="text-gray-600 text-sm">Disponibilidad</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DocumentationStellar;
