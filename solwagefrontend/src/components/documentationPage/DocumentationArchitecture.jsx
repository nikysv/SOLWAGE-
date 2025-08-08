import React from "react";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";

const DocumentationArchitecture = () => {
  const location = useLocation();

  const architectureLayers = [
    {
      title: "Tu Interfaz",
      description:
        "La aplicación web que usas para encontrar trabajo y gestionar proyectos",
      components: ["Buscar Proyectos", "Gestionar Pagos", "Ver tu Reputación"],
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-gradient-to-br from-blue-50 to-cyan-50",
      borderColor: "border-blue-200",
    },
    {
      title: "Seguridad Automática",
      description:
        "Sistema que protege tus pagos y garantiza que recibas tu dinero",
      components: [
        "Pagos Seguros",
        "Reputación Verificable",
        "Protección de Fondos",
      ],
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-gradient-to-br from-purple-50 to-pink-50",
      borderColor: "border-purple-200",
    },
    {
      title: "Red Blockchain",
      description:
        "La tecnología que hace todo posible de forma segura y transparente",
      components: [
        "Transacciones Rápidas",
        "Bajas Comisiones",
        "Seguridad Total",
      ],
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-gradient-to-br from-green-50 to-emerald-50",
      borderColor: "border-green-200",
    },
  ];

  return (
    <section id="architecture-section" className="py-20 sm:py-32 bg-white">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <motion.div
          key={`architecture-header-${location.pathname}`}
          className="text-center mb-20"
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
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Solwage está diseñado para ser simple y seguro. Te explicamos cómo
            funciona todo el proceso, desde que encuentras un proyecto hasta que
            recibes tu pago.
          </p>
        </motion.div>

        {/* Architecture Diagram */}
        <motion.div
          key={`architecture-grid-${location.pathname}`}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          {architectureLayers.map((layer, index) => (
            <motion.div
              key={`layer-${index}-${location.pathname}`}
              className={`${layer.bgColor} rounded-3xl p-8 border-2 ${layer.borderColor} hover:border-purple-300 transition-all duration-500`}
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
                className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${layer.color} flex items-center justify-center text-2xl text-white mb-6`}
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.3 }}
              >
                {index === 0 ? "💻" : index === 1 ? "🔒" : "⚡"}
              </motion.div>

              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {layer.title}
              </h3>
              <p className="text-gray-700 leading-relaxed mb-6">
                {layer.description}
              </p>

              <div className="space-y-3">
                {layer.components.map((component, idx) => (
                  <motion.div
                    key={`component-${index}-${idx}-${location.pathname}`}
                    className="flex items-center space-x-3"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{
                      delay: index * 0.2 + idx * 0.1,
                      duration: 0.5,
                    }}
                  >
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span className="text-gray-700 font-medium">
                      {component}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Flow Diagram */}
        <motion.div
          key={`flow-diagram-${location.pathname}`}
          className="bg-gradient-to-br from-slate-50 to-gray-100 rounded-3xl p-8 border border-gray-200"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Proceso Completo
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
            <motion.div
              key={`step-1-${location.pathname}`}
              className="text-center"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white text-2xl mx-auto mb-3">
                1
              </div>
              <p className="text-sm font-semibold text-gray-700">
                Encuentras un Proyecto
              </p>
            </motion.div>

            <motion.div
              key={`step-2-${location.pathname}`}
              className="text-center"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center text-white text-2xl mx-auto mb-3">
                2
              </div>
              <p className="text-sm font-semibold text-gray-700">
                Aceptas el Trabajo
              </p>
            </motion.div>

            <motion.div
              key={`step-3-${location.pathname}`}
              className="text-center"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center text-white text-2xl mx-auto mb-3">
                3
              </div>
              <p className="text-sm font-semibold text-gray-700">
                Completas el Proyecto
              </p>
            </motion.div>

            <motion.div
              key={`step-4-${location.pathname}`}
              className="text-center"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center text-white text-2xl mx-auto mb-3">
                4
              </div>
              <p className="text-sm font-semibold text-gray-700">
                Recibes tu Pago
              </p>
            </motion.div>

            <motion.div
              key={`step-5-${location.pathname}`}
              className="text-center"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center text-white text-2xl mx-auto mb-3">
                5
              </div>
              <p className="text-sm font-semibold text-gray-700">
                Mejoras tu Reputación
              </p>
            </motion.div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-600 leading-relaxed">
              Todo el proceso es automático y seguro. Los pagos se procesan en
              segundos y tu reputación crece con cada proyecto completado.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DocumentationArchitecture;
