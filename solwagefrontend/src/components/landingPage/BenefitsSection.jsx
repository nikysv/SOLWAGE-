import React from "react";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";

const BenefitsSection = () => {
  const location = useLocation();

  const benefits = [
    {
      title: "Pagos sin Bancos",
      description:
        "Recibe pagos directamente en stablecoins sin intermediarios bancarios. Transacciones instantáneas y sin comisiones ocultas.",
      icon: "💳",
      gradient: "from-green-500 to-emerald-500",
    },
    {
      title: "Reputación Digital",
      description:
        "Construye una reputación verificable en la blockchain. Cada proyecto completado mejora tu perfil profesional de forma inmutable.",
      icon: "⭐",
      gradient: "from-yellow-500 to-orange-500",
    },
    {
      title: "Bajas Comisiones",
      description:
        "Paga hasta 90% menos en comisiones comparado con plataformas tradicionales. Más ganancias en tu bolsillo.",
      icon: "💰",
      gradient: "from-purple-500 to-pink-500",
    },
  ];

  return (
    <section id="beneficios" className="py-20 sm:py-32 bg-white">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <motion.div
          key={`benefits-header-${location.pathname}`}
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            ¿Por qué elegir{" "}
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Solwage?
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Solwage revoluciona la forma en que los freelancers latinoamericanos
            trabajan y reciben pagos. Sin intermediarios, sin esperas, sin
            sorpresas.
          </p>
        </motion.div>

        <motion.div
          key={`benefits-grid-${location.pathname}`}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          {benefits.map((benefit, index) => (
            <motion.div
              key={`benefit-${index}-${location.pathname}`}
              className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 border border-gray-200 hover:border-purple-300 transition-all duration-500"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              whileHover={{
                y: -10,
                scale: 1.02,
                transition: { duration: 0.3, ease: "easeOut" },
              }}
            >
              <motion.div
                className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${benefit.gradient} flex items-center justify-center text-2xl text-white mb-6`}
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.3 }}
              >
                {benefit.icon}
              </motion.div>

              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {benefit.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          key={`benefits-cta-${location.pathname}`}
          className="text-center mt-20"
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
            ¡Únete Ahora!
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default BenefitsSection;
