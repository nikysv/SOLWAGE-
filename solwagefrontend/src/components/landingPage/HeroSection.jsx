import React from "react";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";

const HeroSection = () => {
  const location = useLocation();

  const stats = [
    { number: "10K+", label: "Freelancers" },
    { number: "50K+", label: "Proyectos" },
    { number: "95%", label: "Satisfacción" },
  ];

  return (
    <section className="relative bg-gradient-to-br from-purple-50 via-white to-blue-50 py-20 sm:py-32 overflow-hidden">
      {/* Animated background blobs */}
      <div className="absolute inset-0">
        <motion.div
          key={`blob-1-${location.pathname}`}
          className="absolute top-20 left-20 w-32 h-32 bg-purple-300 rounded-full opacity-20"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          key={`blob-2-${location.pathname}`}
          className="absolute top-60 right-32 w-24 h-24 bg-blue-300 rounded-full opacity-30"
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          key={`blob-3-${location.pathname}`}
          className="absolute bottom-32 left-1/4 w-28 h-28 bg-pink-300 rounded-full opacity-25"
          animate={{
            scale: [1, 1.4, 1],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="relative mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <motion.div
          key={`hero-content-${location.pathname}`}
          className="text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            key={`badge-${location.pathname}`}
            className="inline-flex items-center px-6 py-3 rounded-full bg-purple-100 text-purple-700 text-sm font-medium mb-8"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <motion.div
              className="w-3 h-3 bg-green-400 rounded-full mr-3"
              animate={{ pulse: true }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            Plataforma de Freelancers Latinoamericanos
          </motion.div>

          <motion.h1
            key={`title-${location.pathname}`}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-8 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Solwage:{" "}
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              El Futuro del Trabajo
            </span>
          </motion.h1>

          <motion.p
            key={`description-${location.pathname}`}
            className="text-xl sm:text-2xl text-gray-600 leading-relaxed max-w-4xl mx-auto mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            La plataforma de talento digital diseñada para Latinoamérica. ¿Estás
            buscando una manera de trabajar y recibir pagos de forma justa y sin
            las complicaciones de las plataformas tradicionales como Upwork o
            Freelancer? Solwage te conecta con oportunidades globales,
            permitiéndote recibir pagos directamente en stablecoins,
            construyendo una reputación digital verificable y ahorrando en altas
            comisiones.
          </motion.p>

          <motion.div
            key={`buttons-${location.pathname}`}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            <motion.button
              className="bg-gradient-to-r from-purple-600 to-purple-700 text-white px-8 py-4 rounded-xl font-semibold hover:from-purple-700 hover:to-purple-800 transition-all duration-300 shadow-lg hover:shadow-xl"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Empezar Ahora
            </motion.button>
            <motion.button
              className="bg-white text-purple-600 px-8 py-4 rounded-xl font-semibold hover:bg-purple-50 transition-all duration-300 border-2 border-purple-200 hover:border-purple-300"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Ver Demo
            </motion.button>
          </motion.div>

          {/* Stats */}
          <motion.div
            key={`stats-${location.pathname}`}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={`stat-${index}-${location.pathname}`}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1 + index * 0.1, duration: 0.6 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-3xl sm:text-4xl font-bold text-purple-600 mb-2">
                  {stat.number}
                </div>
                <p className="text-gray-600 font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
