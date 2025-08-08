import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const TechnologyHero = () => {
  return (
    <section className="relative bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 py-20 sm:py-32 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-10 left-10 w-32 h-32 bg-purple-500 rounded-full opacity-20"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-40 right-20 w-24 h-24 bg-blue-500 rounded-full opacity-30"
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 left-1/3 w-20 h-20 bg-indigo-500 rounded-full opacity-25"
          animate={{
            scale: [1, 1.3, 1],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="relative mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
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
            Tecnología Blockchain Avanzada
          </motion.div>

          <motion.h1
            className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            La{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Tecnología
            </span>
            <br />
            Detrás de Solwage
          </motion.h1>

          <motion.p
            className="text-xl sm:text-2xl text-gray-300 leading-relaxed max-w-4xl mx-auto mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Descubre cómo combinamos la potencia de Stellar y Soroban para crear
            una plataforma revolucionaria que transforma el trabajo freelance en
            Latinoamérica.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            <motion.button
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link to="/documentacion" className="block">
                Explorar Tecnología
              </Link>
            </motion.button>
            <motion.button
              className="bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/20 transition-all duration-300 border border-white/20"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Ver Demo
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default TechnologyHero;
