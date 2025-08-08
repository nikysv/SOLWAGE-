import React from "react";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";

const DocumentationHero = () => {
  const location = useLocation();

  const scrollToArchitecture = () => {
    const element = document.getElementById("architecture-section");
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <section className="relative bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 py-20 sm:py-32 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <motion.div
          key={`bg-1-${location.pathname}`}
          className="absolute top-20 left-20 w-24 h-24 bg-purple-500 rounded-full opacity-20"
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          key={`bg-2-${location.pathname}`}
          className="absolute top-60 right-32 w-16 h-16 bg-blue-500 rounded-full opacity-30"
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
          key={`bg-3-${location.pathname}`}
          className="absolute bottom-32 left-1/4 w-20 h-20 bg-indigo-500 rounded-full opacity-25"
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
            className="inline-flex items-center px-6 py-3 rounded-full bg-white/10 backdrop-blur-sm text-white text-sm font-medium mb-8 border border-white/20"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <motion.div
              className="w-3 h-3 bg-green-400 rounded-full mr-3"
              animate={{ pulse: true }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            Cómo Funciona Solwage
          </motion.div>

          <motion.h1
            key={`title-${location.pathname}`}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Descubre{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Solwage
            </span>
          </motion.h1>

          <motion.p
            key={`description-${location.pathname}`}
            className="text-xl sm:text-2xl text-gray-300 leading-relaxed max-w-4xl mx-auto mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Te explicamos de manera sencilla cómo funciona Solwage. Desde la
            tecnología blockchain hasta cómo recibirás tus pagos. Todo lo que
            necesitas saber para empezar a trabajar.
          </motion.p>

          <motion.div
            key={`buttons-${location.pathname}`}
            className="flex justify-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            <motion.button
              onClick={scrollToArchitecture}
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Ver Cómo Funciona
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default DocumentationHero;
