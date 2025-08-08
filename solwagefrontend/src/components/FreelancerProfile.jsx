import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const FreelancerProfile = ({ freelancer, onClose, isModal = false }) => {
  // Mock NFT data for the freelancer
  const nftData = {
    id: "nft-001",
    name: "Soulbound NFT - Carlos Rodríguez",
    description:
      "NFT Soulbound que certifica la identidad digital y reputación verificada",
    image:
      "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=300&fit=crop",
    rarity: "Legendary",
    issuedDate: "2024-01-15",
    metadata: {
      contractAddress: "0x1234567890abcdef1234567890abcdef12345678",
      tokenId: "1",
      blockchain: "Stellar",
      standard: "Soulbound",
      soulbound: true,
      verificationData: {
        kycVerified: true,
        skillsVerified: true,
        reputationVerified: true,
        workHistoryVerified: true,
      },
      skills: ["React", "Node.js", "Stellar", "Soroban", "Blockchain"],
      achievements: [
        "Top 1% Freelancers 2024",
        "Blockchain Expert Certification",
        "100% Completion Rate",
        "5-Star Average Rating",
      ],
      reputation: {
        score: 4.9,
        totalReviews: 23,
        verifiedReviews: 23,
        averageResponseTime: "2 hours",
      },
    },
  };

  const renderNFTSection = () => (
    <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-6 border border-purple-200">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-900">🪙 NFT Soulbound</h3>
        <span className="px-3 py-1 bg-purple-100 text-purple-700 text-xs rounded-full font-medium">
          {nftData.rarity}
        </span>
      </div>

      {/* Main NFT Card */}
      <div className="bg-white rounded-lg p-4 mb-6 border border-purple-200">
        <div className="flex items-center space-x-4">
          <img
            src={nftData.image}
            alt="NFT"
            className="w-16 h-16 rounded-lg object-cover"
          />
          <div className="flex-1">
            <h4 className="font-semibold text-gray-900">{nftData.name}</h4>
            <p className="text-sm text-gray-600">{nftData.description}</p>
            <div className="flex items-center space-x-2 mt-2">
              <span className="text-xs text-gray-500">
                Emitido: {nftData.issuedDate}
              </span>
              <motion.a
                href={`https://etherscan.io/token/${nftData.metadata.contractAddress}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-purple-600 hover:text-purple-700 font-medium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Ver en Etherscan →
              </motion.a>
            </div>
          </div>
        </div>
      </div>

      {/* Technical Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <h4 className="font-semibold text-gray-900 mb-3">
            📋 Información Técnica
          </h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Contrato:</span>
              <span className="font-mono text-xs text-gray-800">
                {nftData.metadata.contractAddress.slice(0, 8)}...
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Token ID:</span>
              <span className="font-medium">{nftData.metadata.tokenId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Blockchain:</span>
              <span className="font-medium">{nftData.metadata.blockchain}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Estándar:</span>
              <span className="font-medium">{nftData.metadata.standard}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Soulbound:</span>
              <span className="font-medium text-green-600">✓ Sí</span>
            </div>
          </div>
          <div className="mt-3 flex space-x-2">
            <motion.a
              href={`https://etherscan.io/token/${nftData.metadata.contractAddress}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-blue-600 hover:text-blue-700 font-medium"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Ver en Etherscan
            </motion.a>
            <motion.a
              href={`https://opensea.io/assets/${nftData.metadata.contractAddress}/${nftData.metadata.tokenId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-green-600 hover:text-green-700 font-medium"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Ver en OpenSea
            </motion.a>
          </div>
        </div>

        {/* Verification Status */}
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <h4 className="font-semibold text-gray-900 mb-3">✅ Verificación</h4>
          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">KYC Verificado:</span>
              <span className="text-green-600">✓</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Habilidades Verificadas:</span>
              <span className="text-green-600">✓</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Reputación Verificada:</span>
              <span className="text-green-600">✓</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Historial Verificado:</span>
              <span className="text-green-600">✓</span>
            </div>
          </div>
        </div>
      </div>

      {/* Reputation */}
      <div className="bg-white rounded-lg p-4 mb-6 border border-gray-200">
        <h4 className="font-semibold text-gray-900 mb-3">⭐ Reputación</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-600">
              {nftData.metadata.reputation.score}
            </div>
            <div className="text-gray-600">Puntuación Promedio</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {nftData.metadata.reputation.totalReviews}
            </div>
            <div className="text-gray-600">Reseñas Totales</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {nftData.metadata.reputation.averageResponseTime}
            </div>
            <div className="text-gray-600">Tiempo de Respuesta</div>
          </div>
        </div>
      </div>

      {/* Verified Skills */}
      <div className="bg-white rounded-lg p-4 mb-6 border border-gray-200">
        <h4 className="font-semibold text-gray-900 mb-3">
          🔧 Habilidades Verificadas
        </h4>
        <div className="flex flex-wrap gap-2">
          {nftData.metadata.skills.map((skill, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-purple-100 text-purple-700 text-sm rounded-full font-medium"
            >
              ✓ {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Achievements */}
      <div className="bg-white rounded-lg p-4 border border-gray-200">
        <h4 className="font-semibold text-gray-900 mb-3">🏆 Logros</h4>
        <div className="space-y-2">
          {nftData.metadata.achievements.map((achievement, index) => (
            <div key={index} className="flex items-center space-x-2">
              <span className="text-yellow-500">🏅</span>
              <span className="text-sm text-gray-700">{achievement}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderEnhancedReviews = () => (
    <div className="bg-white rounded-xl p-6 border border-gray-200">
      <h3 className="text-lg font-bold text-gray-900 mb-4">📝 Reseñas</h3>
      <div className="space-y-4">
        {freelancer.reviews.map((review, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <span className="text-purple-600 font-semibold text-sm">
                    {review.client.charAt(0)}
                  </span>
                </div>
                <div>
                  <div className="font-medium text-gray-900">
                    {review.client}
                  </div>
                  <div className="text-xs text-gray-500">{review.date}</div>
                </div>
              </div>
              <div className="flex items-center space-x-1">
                <span className="text-yellow-400">⭐</span>
                <span className="font-medium text-gray-700">
                  {review.rating}
                </span>
                <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                  Cliente verificado
                </span>
              </div>
            </div>
            <p className="text-gray-700 text-sm">{review.comment}</p>
            <div className="mt-2 flex items-center space-x-2">
              <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                Reseña verificada
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderSocialMedia = () => (
    <div className="bg-white rounded-xl p-6 border border-gray-200">
      <h3 className="text-lg font-bold text-gray-900 mb-4">
        🌐 Redes Sociales
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <motion.a
          href="https://github.com/carlosrodriguez"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-3 p-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
              clipRule="evenodd"
            />
          </svg>
          <span className="font-medium">GitHub</span>
        </motion.a>

        <motion.a
          href="https://linkedin.com/in/carlosrodriguez"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-3 p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z"
              clipRule="evenodd"
            />
          </svg>
          <span className="font-medium">LinkedIn</span>
        </motion.a>

        <motion.a
          href="https://twitter.com/carlosrodriguez"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-3 p-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
          </svg>
          <span className="font-medium">Twitter/X</span>
        </motion.a>

        <motion.a
          href="https://carlosrodriguez.dev"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-3 p-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-colors"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
          <span className="font-medium">Portfolio</span>
        </motion.a>
      </div>
    </div>
  );

  const renderProfileContent = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <div className="flex items-start space-x-4">
          <img
            src={freelancer.photo}
            alt={freelancer.name}
            className="w-20 h-20 rounded-full object-cover"
          />
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <h2 className="text-2xl font-bold text-gray-900">
                {freelancer.name}
              </h2>
              <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-sm rounded-full font-medium">
                ⭐ {freelancer.reputation}
              </span>
            </div>
            <p className="text-gray-600 mb-3">{freelancer.description}</p>
            <div className="flex flex-wrap gap-2">
              {freelancer.skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-purple-100 text-purple-700 text-sm rounded-full"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-gray-200">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">
              {freelancer.completedProjects}
            </div>
            <div className="text-sm text-gray-600">Proyectos Completados</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">
              ${freelancer.hourlyRate}/h
            </div>
            <div className="text-sm text-gray-600">Tarifa por Hora</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">
              {freelancer.location}
            </div>
            <div className="text-sm text-gray-600">Ubicación</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">
              {freelancer.experienceLevel}
            </div>
            <div className="text-sm text-gray-600">Nivel de Experiencia</div>
          </div>
        </div>
      </div>

      {/* NFT Section */}
      {renderNFTSection()}

      {/* Social Media */}
      {renderSocialMedia()}

      {/* Enhanced Reviews */}
      {renderEnhancedReviews()}
    </div>
  );

  if (isModal) {
    return (
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-gray-50 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-gray-50 px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h1 className="text-xl font-bold text-gray-900">
                Perfil de {freelancer.name}
              </h1>
              <motion.button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </motion.button>
            </div>
            <div className="p-6">{renderProfileContent()}</div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    );
  }

  return (
    <div className="bg-gray-50 rounded-2xl p-6">{renderProfileContent()}</div>
  );
};

export default FreelancerProfile;
