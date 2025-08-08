import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";

const HowItWorksSection = () => {
  const location = useLocation();
  const [activeView, setActiveView] = useState("freelancers");

  const freelancerFeatures = [
    {
      title: "Crea tu Smart Wallet",
      description:
        "Configura tu billetera digital en minutos y comienza a recibir pagos instantáneos",
      icon: "💼",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      title: "Recibe Pagos Directos",
      description:
        "Obtén pagos en stablecoins sin intermediarios bancarios ni comisiones ocultas",
      icon: "💰",
      gradient: "from-green-500 to-emerald-500",
    },
    {
      title: "Construye tu Reputación",
      description:
        "Desarrolla tu perfil profesional con NFTs Soulbound que evolucionan con tu carrera",
      icon: "⭐",
      gradient: "from-yellow-500 to-orange-500",
    },
  ];

  const employerFeatures = [
    {
      title: "Publicación Gratuita",
      description:
        "Publica tus proyectos sin costo alguno. Solo pagas cuando encuentras al talento ideal",
      icon: "📝",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      title: "Seguridad Garantizada",
      description:
        "Los contratos de escrow protegen tus fondos hasta que el trabajo se complete satisfactoriamente",
      icon: "🔒",
      gradient: "from-orange-500 to-red-500",
    },
    {
      title: "Comisiones Bajas",
      description:
        "Paga hasta 90% menos en comisiones comparado con otras plataformas",
      icon: "💎",
      gradient: "from-indigo-500 to-purple-500",
    },
  ];

  return (
    <section className="py-20 sm:py-32 bg-gradient-to-br from-gray-50 to-white">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <motion.div
          key={`how-it-works-header-${location.pathname}`}
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            ¿Cómo Funciona{" "}
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Solwage?
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-12">
            Solwage está diseñado para ser simple y efectivo tanto para
            freelancers como para quienes contratan. Descubre cómo funciona
            desde tu perspectiva.
          </p>

          {/* Toggle Switch */}
          <motion.div
            key={`toggle-${location.pathname}`}
            className="inline-flex bg-white rounded-2xl p-1 shadow-lg border border-gray-200"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <button
              onClick={() => setActiveView("freelancers")}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                activeView === "freelancers"
                  ? "bg-purple-600 text-white shadow-md"
                  : "text-gray-700 hover:text-purple-600"
              }`}
            >
              Para quienes buscan trabajo
            </button>
            <button
              onClick={() => setActiveView("employers")}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                activeView === "employers"
                  ? "bg-purple-600 text-white shadow-md"
                  : "text-gray-700 hover:text-purple-600"
              }`}
            >
              Para quienes contratan
            </button>
          </motion.div>
        </motion.div>

        {/* Dynamic Content */}
        <AnimatePresence mode="wait">
          {activeView === "freelancers" ? (
            <motion.div
              key={`freelancers-content-${location.pathname}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-16"
            >
              <motion.h3
                key={`freelancers-title-${location.pathname}`}
                className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                Encuentra Oportunidades Globales
              </motion.h3>
              <motion.p
                key={`freelancers-description-${location.pathname}`}
                className="text-lg text-gray-600 max-w-3xl mx-auto mb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                Conecta con clientes de todo el mundo y construye tu carrera
                profesional con tecnología blockchain de vanguardia.
              </motion.p>

              <motion.div
                key={`freelancers-grid-${location.pathname}`}
                className="grid grid-cols-1 md:grid-cols-3 gap-8"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                {freelancerFeatures.map((feature, index) => (
                  <motion.div
                    key={`freelancer-feature-${index}-${location.pathname}`}
                    className="bg-white rounded-3xl p-8 shadow-lg border border-gray-200 hover:border-purple-300 transition-all duration-500"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + index * 0.1, duration: 0.6 }}
                    whileHover={{
                      y: -10,
                      scale: 1.02,
                      transition: { duration: 0.3, ease: "easeOut" },
                    }}
                  >
                    <motion.div
                      className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center text-2xl text-white mb-6 mx-auto`}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.3 }}
                    >
                      {feature.icon}
                    </motion.div>
                    <h4 className="text-xl font-bold text-gray-900 mb-4">
                      {feature.title}
                    </h4>
                    <p className="text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key={`employers-content-${location.pathname}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-16"
            >
              <motion.h3
                key={`employers-title-${location.pathname}`}
                className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                Contrata Talento Digital en Minutos
              </motion.h3>
              <motion.p
                key={`employers-description-${location.pathname}`}
                className="text-lg text-gray-600 max-w-3xl mx-auto mb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                Encuentra freelancers calificados de Latinoamérica y el mundo
                con un proceso simple, seguro y sin complicaciones.
              </motion.p>

              <motion.div
                key={`employers-grid-${location.pathname}`}
                className="grid grid-cols-1 md:grid-cols-3 gap-8"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                {employerFeatures.map((feature, index) => (
                  <motion.div
                    key={`employer-feature-${index}-${location.pathname}`}
                    className="bg-white rounded-3xl p-8 shadow-lg border border-gray-200 hover:border-purple-300 transition-all duration-500"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + index * 0.1, duration: 0.6 }}
                    whileHover={{
                      y: -10,
                      scale: 1.02,
                      transition: { duration: 0.3, ease: "easeOut" },
                    }}
                  >
                    <motion.div
                      className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center text-2xl text-white mb-6 mx-auto`}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.3 }}
                    >
                      {feature.icon}
                    </motion.div>
                    <h4 className="text-xl font-bold text-gray-900 mb-4">
                      {feature.title}
                    </h4>
                    <p className="text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* CTA Section */}
        <motion.div
          key={`how-it-works-cta-${location.pathname}`}
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <motion.button
            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            {activeView === "freelancers"
              ? "Empezar a Trabajar"
              : "Publicar Proyecto"}
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
