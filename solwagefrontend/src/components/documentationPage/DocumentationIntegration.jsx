import React from "react";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";

const DocumentationIntegration = () => {
  const location = useLocation();

  const externalLinks = [
    {
      title: "Comenzar a Trabajar",
      description: "Crea tu perfil y encuentra tu primer proyecto",
      url: "/",
      icon: "🚀",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      title: "Ver Tecnología",
      description: "Conoce más sobre nuestra tecnología",
      url: "/tecnologia",
      icon: "⚡",
      gradient: "from-orange-500 to-red-500",
    },
    {
      title: "Soporte",
      description: "Obtén ayuda cuando la necesites",
      url: "/",
      icon: "💬",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      title: "Comunidad",
      description: "Únete a otros freelancers",
      url: "/",
      icon: "👥",
      gradient: "from-green-500 to-emerald-500",
    },
  ];

  return (
    <section className="py-20 sm:py-32 bg-gradient-to-br from-slate-50 to-gray-100">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <motion.div
          key={`integration-header-${location.pathname}`}
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            ¿Listo para{" "}
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Empezar?
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Solwage está diseñado para ser simple y accesible. No necesitas
            conocimientos técnicos para empezar a trabajar y recibir pagos.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          {/* Left side - Getting Started Info */}
          <motion.div
            key={`getting-started-info-${location.pathname}`}
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                Comienza{" "}
                <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  Hoy Mismo
                </span>
              </h3>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                Crear tu cuenta en Solwage es rápido y fácil. En minutos podrás
                empezar a buscar proyectos y recibir pagos de forma segura.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <motion.div
                  key={`step-1-${location.pathname}`}
                  className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl flex items-center justify-center text-white font-bold text-lg"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  📝
                </motion.div>
                <div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2">
                    Crea tu Perfil
                  </h4>
                  <p className="text-gray-600 leading-relaxed">
                    Completa tu perfil con tus habilidades y experiencia. Es tu
                    carta de presentación para los clientes.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <motion.div
                  key={`step-2-${location.pathname}`}
                  className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-white font-bold text-lg"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  🔍
                </motion.div>
                <div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2">
                    Encuentra Proyectos
                  </h4>
                  <p className="text-gray-600 leading-relaxed">
                    Busca proyectos que se ajusten a tus habilidades. Aplica a
                    los que te interesen.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <motion.div
                  key={`step-3-${location.pathname}`}
                  className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center text-white font-bold text-lg"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  💰
                </motion.div>
                <div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2">
                    Recibe Pagos
                  </h4>
                  <p className="text-gray-600 leading-relaxed">
                    Completa el trabajo y recibe tu pago automáticamente. Sin
                    esperas, sin intermediarios.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right side - Simple Steps */}
          <motion.div
            key={`simple-steps-${location.pathname}`}
            className="bg-gradient-to-br from-slate-900 to-gray-900 rounded-3xl p-8 text-white"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="text-xl font-bold mb-6">Proceso Simple</h4>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                  1
                </div>
                <span className="text-gray-300">Regístrate en 2 minutos</span>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                  2
                </div>
                <span className="text-gray-300">Completa tu perfil</span>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                  3
                </div>
                <span className="text-gray-300">
                  Encuentra tu primer proyecto
                </span>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                  4
                </div>
                <span className="text-gray-300">Recibe tu primer pago</span>
              </div>
            </div>
            <p className="text-gray-300 text-sm mt-6">
              Todo es automático y seguro. No necesitas conocimientos técnicos.
            </p>
          </motion.div>
        </div>

        {/* Quick Links */}
        <motion.div
          key={`quick-links-${location.pathname}`}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {externalLinks.map((link, index) => (
            <motion.a
              key={`quick-link-${index}-${location.pathname}`}
              href={link.url}
              className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300"
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
                className={`w-12 h-12 rounded-xl bg-gradient-to-r ${link.gradient} flex items-center justify-center text-2xl text-white mb-4`}
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.3 }}
              >
                {link.icon}
              </motion.div>
              <h4 className="text-lg font-bold text-gray-900 mb-2">
                {link.title}
              </h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                {link.description}
              </p>
            </motion.a>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          key={`cta-section-${location.pathname}`}
          className="text-center mt-20"
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
            Empezar Ahora
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default DocumentationIntegration;
