import React from "react";
import { motion } from "framer-motion";

const TechnologyReputation = () => {
  const reputationFeatures = [
    {
      title: "NFT Soulbound Dinámico",
      description:
        "Un único NFT Soulbound (intransferible) que evoluciona con tu carrera. La metadata se actualiza automáticamente con cada logro, manteniendo tu historial completo en un solo token.",
      icon: "🔗",
      gradient: "from-emerald-500 to-teal-500",
      features: ["Intransferible", "Metadata dinámica", "Historial completo"],
    },
    {
      title: "Reputación Verificable",
      description:
        "Sistema de reputación transparente donde cada review, calificación y testimonio se almacena en smart contracts. Imposible de manipular o falsificar.",
      icon: "⭐",
      gradient: "from-yellow-500 to-orange-500",
      features: [
        "Reviews verificables",
        "Calificaciones reales",
        "Historial completo",
      ],
    },
    {
      title: "Billetera Profesional",
      description:
        "Tu billetera se convierte en tu identidad profesional. El NFT Soulbound contiene tu CV completo y credenciales verificables que puedes mostrar a cualquier cliente.",
      icon: "💼",
      gradient: "from-purple-500 to-pink-500",
      features: ["Identidad digital", "CV Soulbound", "Acceso global"],
    },
  ];

  return (
    <section className="py-20 sm:py-32 bg-gradient-to-br from-slate-50 to-gray-100">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Reputación{" "}
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              On-Chain
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Tu carrera profesional se convierte en un NFT Soulbound dinámico que
            evoluciona con cada logro. Un único token intransferible que
            contiene tu historial completo.
          </p>
        </motion.div>

        {/* Main feature showcase */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          {/* Left side - Visual representation */}
          <div className="relative">
            <motion.div
              className="bg-white rounded-3xl p-8 shadow-2xl border border-gray-200"
              whileHover={{ y: -5, scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center mb-6">
                <motion.div
                  className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center text-2xl text-white mr-4"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  👤
                </motion.div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    Carlos Rodríguez
                  </h3>
                  <p className="text-purple-600 font-semibold">
                    Desarrollador Full-Stack
                  </p>
                  <p className="text-sm text-gray-500">NFT Soulbound #1</p>
                </div>
              </div>

              {/* NFT Badges */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <motion.div
                  className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 border border-green-200"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold mr-3">
                      ✓
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">
                        Proyectos Completados
                      </p>
                      <p className="text-2xl font-bold text-green-600">47</p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-4 border border-blue-200"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold mr-3">
                      ⭐
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">
                        Rating Promedio
                      </p>
                      <p className="text-2xl font-bold text-blue-600">4.9</p>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* NFT Metadata Updates */}
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-900 mb-3">
                  Actualizaciones Recientes
                </h4>
                <motion.div
                  className="flex items-center p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-white mr-3">
                    🔄
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">
                      Proyecto E-commerce
                    </p>
                    <p className="text-sm text-gray-600">
                      Metadata actualizada hace 2 días
                    </p>
                  </div>
                  <div className="text-purple-600 font-bold">+1 Logro</div>
                </motion.div>

                <motion.div
                  className="flex items-center p-3 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border border-yellow-200"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center text-white mr-3">
                    🎯
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">
                      Certificación React
                    </p>
                    <p className="text-sm text-gray-600">
                      Metadata actualizada hace 1 semana
                    </p>
                  </div>
                  <div className="text-yellow-600 font-bold">+1 Skill</div>
                </motion.div>

                <motion.div
                  className="flex items-center p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center text-white mr-3">
                    🔒
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">NFT Soulbound</p>
                    <p className="text-sm text-gray-600">
                      Intransferible - Solo tuyo
                    </p>
                  </div>
                  <div className="text-green-600 font-bold">Soulbound</div>
                </motion.div>
              </div>
            </motion.div>

            {/* Floating elements */}
            <motion.div
              className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-sm"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              🔗
            </motion.div>
          </div>

          {/* Right side - Features */}
          <div className="space-y-8">
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                Tu CV como{" "}
                <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  NFT Soulbound
                </span>
              </h3>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                Un único NFT Soulbound (intransferible) que evoluciona con tu
                carrera. Cada logro actualiza la metadata del token, manteniendo
                tu historial completo en un solo NFT que solo te pertenece a ti.
              </p>
            </div>

            <div className="space-y-4">
              {reputationFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  className="flex items-start space-x-4"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <motion.div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center text-2xl text-white shadow-lg`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    {feature.icon}
                  </motion.div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-2">
                      {feature.title}
                    </h4>
                    <p className="text-gray-600 leading-relaxed mb-3">
                      {feature.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {feature.features.map((item, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <motion.button
            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            Crear mi NFT Soulbound
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default TechnologyReputation;
