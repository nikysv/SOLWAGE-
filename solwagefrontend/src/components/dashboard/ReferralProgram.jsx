import React, { useState } from "react";
import { motion } from "framer-motion";

const ReferralProgram = ({ userType }) => {
  const [copied, setCopied] = useState(false);
  const [referralCode] = useState(() => {
    // Generar código de referido simulado
    const prefix = userType === "employer" ? "EMP" : "FRE";
    const randomCode = Math.random().toString(36).substring(2, 8).toUpperCase();
    return `${prefix}${randomCode}`;
  });

  const [stats] = useState({
    totalReferrals: userType === "employer" ? 2 : 3,
    successfulReferrals: userType === "employer" ? 1 : 2,
    pendingRewards: userType === "employer" ? 1 : 1,
    earnedRewards: userType === "employer" ? "$15 descuento" : "$4 USDC",
  });

  const handleCopyCode = () => {
    navigator.clipboard.writeText(referralCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const employerContent = {
    title: "🏢 Programa de Referidos Empresariales",
    description:
      "¿Conoces a otras empresas que podrían beneficiarse de Solwage? Ayúdanos a crecer nuestra comunidad de empleadores y recibe recompensas reales por ello. Por cada empresa que refieras y complete su primera contratación exitosa, obtendrás un descuento del 5% en tu próxima comisión. No solo estarás ayudando a otros empresarios a encontrar talento de calidad, sino que también estarás construyendo un ecosistema más robusto donde todos ganamos. Nuestro programa se autofinancia a través de una pequeña porción de las comisiones, garantizando que sea sostenible y justo para toda la comunidad.",
    cta: "Comparte tu código empresarial y empieza a ahorrar hoy.",
    benefit: "5% descuento en comisiones",
    rewardIcon: "💰",
    shareText: "¡Únete a Solwage! Usa mi código de referido empresarial",
  };

  const freelancerContent = {
    title: "🚀 Programa de Referidos Freelancer",
    description:
      "Tu red de contactos es tu mayor activo, ¡y queremos premiarte por compartirla! Invita a tus colegas freelancers más talentosos a unirse a Solwage y ambos recibirán un bono de $2 USDC cuando tu referido complete su primer trabajo exitoso. Estamos construyendo más que una plataforma; estamos creando una comunidad donde el talento se apoya mutuamente. Cada freelancer que se suma fortalece nuestro ecosistema, mejora la calidad de los proyectos y crea más oportunidades para todos. El programa se sustenta con una pequeña parte de las comisiones de los empleadores, sin afectar tus ganancias.",
    cta: "Comparte tu código de referido y ayuda a crecer nuestra familia de freelancers.",
    benefit: "$2 USDC por referido",
    rewardIcon: "🎁",
    shareText: "¡Únete a Solwage como freelancer! Usa mi código de referido",
  };

  const content = userType === "employer" ? employerContent : freelancerContent;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
    >
      {/* Header */}
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
          <span className="text-white text-xl">{content.rewardIcon}</span>
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900">{content.title}</h2>
          <p className="text-sm text-gray-600">
            {content.benefit} • Gana mientras ayudas a crecer la comunidad
          </p>
        </div>
      </div>

      {/* Descripción */}
      <div className="mb-6">
        <p className="text-gray-700 text-sm leading-relaxed mb-4">
          {content.description}
        </p>
        <p className="text-purple-600 font-medium text-sm">{content.cta}</p>
      </div>

      {/* Tu código de referido */}
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-4 mb-6">
        <h3 className="text-sm font-semibold text-gray-900 mb-3">
          Tu Código de Referido
        </h3>
        <div className="flex items-center space-x-3">
          <div className="flex-1 bg-white rounded-lg p-3 border border-gray-200">
            <div className="font-mono text-lg font-bold text-center text-purple-600 tracking-widest">
              {referralCode}
            </div>
          </div>
          <motion.button
            onClick={handleCopyCode}
            className={`px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
              copied
                ? "bg-green-100 text-green-700 border border-green-200"
                : "bg-purple-600 text-white hover:bg-purple-700"
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {copied ? "✓ Copiado" : "Copiar"}
          </motion.button>
        </div>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-blue-50 rounded-lg p-3 text-center">
          <div className="text-lg font-bold text-blue-600">
            {stats.totalReferrals}
          </div>
          <div className="text-xs text-blue-700">Referidos Totales</div>
        </div>
        <div className="bg-green-50 rounded-lg p-3 text-center">
          <div className="text-lg font-bold text-green-600">
            {stats.successfulReferrals}
          </div>
          <div className="text-xs text-green-700">Exitosos</div>
        </div>
        <div className="bg-yellow-50 rounded-lg p-3 text-center">
          <div className="text-lg font-bold text-yellow-600">
            {stats.pendingRewards}
          </div>
          <div className="text-xs text-yellow-700">Pendientes</div>
        </div>
        <div className="bg-purple-50 rounded-lg p-3 text-center">
          <div className="text-lg font-bold text-purple-600">
            {stats.earnedRewards}
          </div>
          <div className="text-xs text-purple-700">Ganado</div>
        </div>
      </div>

      {/* Botones de acción */}
      <div className="flex flex-col sm:flex-row gap-3">
        <motion.button
          onClick={() => {
            const url = `https://solwage.com/register?ref=${referralCode}`;
            const text = `${content.shareText}: ${referralCode}\n\n${url}`;
            if (navigator.share) {
              navigator.share({ title: "Solwage Referral", text, url });
            } else {
              navigator.clipboard.writeText(text);
              alert("Link de referido copiado al portapapeles");
            }
          }}
          className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center space-x-2"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <span>📱</span>
          <span>Compartir Código</span>
        </motion.button>

        <motion.button
          className="flex-1 sm:flex-none bg-gray-100 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-200 transition-all duration-300 flex items-center justify-center space-x-2"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <span>📊</span>
          <span>Ver Historial</span>
        </motion.button>
      </div>

      {/* Información adicional */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg border-l-4 border-purple-400">
        <h4 className="font-semibold text-gray-900 text-sm mb-2">
          💡 ¿Cómo funciona?
        </h4>
        <ul className="text-xs text-gray-600 space-y-1">
          <li>
            • Comparte tu código con{" "}
            {userType === "employer" ? "empresas" : "freelancers"}
          </li>
          <li>• Ellos se registran usando tu código</li>
          <li>
            •{" "}
            {userType === "employer"
              ? "Cuando completen su primera contratación"
              : "Cuando completen su primer trabajo"}
            , ¡ambos reciben la recompensa!
          </li>
          <li>
            • El programa es{" "}
            {userType === "employer" ? "autofinanciado" : "sostenible"} y justo
            para todos
          </li>
        </ul>
      </div>
    </motion.div>
  );
};

export default ReferralProgram;
