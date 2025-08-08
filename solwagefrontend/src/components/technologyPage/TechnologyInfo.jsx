import React from "react";
import { motion } from "framer-motion";

const TechnologyInfo = () => {
  return (
    <section className="py-20 sm:py-32 bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="relative mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Construido sobre{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Stellar
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Nuestra infraestructura está construida sobre una de las redes
            blockchain más confiables y eficientes del mundo.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Features */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-start space-x-4">
              <motion.div
                className="w-12 h-12 bg-gradient-to-r from-green-400 to-blue-500 rounded-xl flex items-center justify-center text-white font-bold text-lg"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.3 }}
              >
                ⚡
              </motion.div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">
                  Transacciones Instantáneas
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  Procesamiento de pagos en segundos, no en días. Sin esperas ni
                  demoras bancarias.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <motion.div
                className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-500 rounded-xl flex items-center justify-center text-white font-bold text-lg"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.3 }}
              >
                🔒
              </motion.div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">
                  Seguridad Máxima
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  Contratos inteligentes verificables que protegen tus fondos y
                  garantizan transparencia total.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <motion.div
                className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center text-white font-bold text-lg"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.3 }}
              >
                💰
              </motion.div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">
                  Bajas Comisiones
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  Comisiones mínimas comparadas con plataformas tradicionales.
                  Más ganancias para ti.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right side - CTA */}
          <motion.div
            className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="text-center">
              <h3 className="text-2xl font-bold text-white mb-4">
                ¿Listo para el Futuro?
              </h3>
              <p className="text-gray-300 mb-8 leading-relaxed">
                Únete a la revolución del trabajo freelance con tecnología
                blockchain de vanguardia.
              </p>

              <div className="space-y-4">
                <motion.button
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-lg"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Comenzar Ahora
                </motion.button>

                <motion.button
                  className="w-full bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/20 transition-all duration-300 border border-white/20"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Ver Documentación
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TechnologyInfo;
