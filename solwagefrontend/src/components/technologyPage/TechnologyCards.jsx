import React from "react";
import { motion } from "framer-motion";

const TechnologyCards = () => {
  const technologies = [
    {
      title: "Smart Wallets & Contratos Inteligentes",
      description:
        "Utilizamos tecnología blockchain avanzada para asegurar tus pagos y reputación, eliminando la necesidad de intermediarios tradicionales. Tus fondos están protegidos por contratos inteligentes verificables.",
      icon: "🔐",
      gradient: "from-blue-500 to-cyan-500",
      bgColor: "bg-gradient-to-br from-blue-50 to-cyan-50",
      borderColor: "border-blue-200",
    },
    {
      title: "Pagos en Stablecoins",
      description:
        "Recibe pagos en monedas estables para evitar la volatilidad del mercado. Sin comisiones bancarias desfavorables y con transacciones instantáneas a nivel global.",
      icon: "💎",
      gradient: "from-green-500 to-emerald-500",
      bgColor: "bg-gradient-to-br from-green-50 to-emerald-50",
      borderColor: "border-green-200",
    },
    {
      title: "Generación de Rendimientos",
      description:
        "Haz que tus ganancias crezcan con opciones DeFi integradas. Genera ingresos pasivos de forma opcional mientras mantienes el control total de tus fondos.",
      icon: "📈",
      gradient: "from-purple-500 to-pink-500",
      bgColor: "bg-gradient-to-br from-purple-50 to-pink-50",
      borderColor: "border-purple-200",
    },
    {
      title: "Reputación On-Chain",
      description:
        "Tu CV se convierte en un NFT Soulbound dinámico que evoluciona con cada logro. Metadata actualizable e intransferible que contiene tu historial profesional completo.",
      icon: "⭐",
      gradient: "from-yellow-500 to-orange-500",
      bgColor: "bg-gradient-to-br from-yellow-50 to-orange-50",
      borderColor: "border-yellow-200",
    },
  ];

  return (
    <section className="py-20 sm:py-32 bg-gray-50">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Tecnologías{" "}
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Revolucionarias
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Nuestra plataforma combina las tecnologías más avanzadas para crear
            una experiencia única y segura para freelancers latinoamericanos.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {technologies.map((tech, index) => (
            <motion.div
              key={index}
              className={`group relative ${tech.bgColor} rounded-3xl p-8 border-2 ${tech.borderColor} hover:border-purple-300 transition-all duration-500`}
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
              {/* Floating icon */}
              <motion.div
                className={`absolute -top-6 left-8 w-16 h-16 rounded-2xl bg-gradient-to-br ${tech.gradient} flex items-center justify-center text-3xl shadow-xl`}
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.3 }}
              >
                {tech.icon}
              </motion.div>

              {/* Content */}
              <div className="mt-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-purple-600 transition-colors duration-300">
                  {tech.title}
                </h3>
                <p className="text-gray-700 leading-relaxed text-base">
                  {tech.description}
                </p>

                {/* Learn more link */}
                <motion.div
                  className="mt-6 flex items-center text-purple-600 font-semibold group-hover:text-purple-700 transition-colors duration-300"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <span>Saber más</span>
                  <motion.svg
                    className="w-5 h-5 ml-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    whileHover={{ x: 3 }}
                    transition={{ duration: 0.2 }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </motion.svg>
                </motion.div>
              </div>

              {/* Decorative corner */}
              <motion.div
                className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${tech.gradient} opacity-10 rounded-bl-3xl`}
                whileHover={{ opacity: 0.2 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechnologyCards;
