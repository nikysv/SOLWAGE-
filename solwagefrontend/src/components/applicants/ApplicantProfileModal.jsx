import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const ApplicantProfileModal = ({
  applicant,
  isOpen,
  onClose,
  onContact,
  onHire,
  onReject,
}) => {
  if (!applicant || !isOpen) return null;

  const { profile } = applicant;

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span
        key={i}
        className={`text-lg ${
          i < rating ? "text-yellow-500" : "text-gray-300"
        }`}
      >
        ★
      </span>
    ));
  };

  const openExternalLink = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const openNFTExplorer = () => {
    const explorerUrl = `https://stellar.expert/account/${profile.nftAddress}`;
    openExternalLink(explorerUrl);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">
                  Perfil de {applicant.name}
                </h2>
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
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column - Basic Info */}
                <div className="lg:col-span-1">
                  <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-6 mb-6">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold text-xl">
                          {applicant.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </span>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">
                          {applicant.name}
                        </h3>
                        <p className="text-gray-600">{applicant.skills}</p>
                        <div className="flex items-center space-x-1 mt-1">
                          {renderStars(applicant.reputation)}
                          <span className="text-sm text-gray-600 ml-1">
                            {applicant.reputation}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-gray-500">Tarifa por Hora</p>
                        <p className="font-semibold text-gray-900">
                          ${applicant.hourlyRate}/hora
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Reputación</p>
                        <p className="font-semibold text-gray-900">
                          {applicant.reputation}/5.0
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Postuló el</p>
                        <p className="font-semibold text-gray-900">
                          {new Date(applicant.appliedAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Social Links */}
                  <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">
                      Enlaces Sociales
                    </h4>
                    <div className="space-y-3">
                      <motion.button
                        onClick={() => openExternalLink(profile.github)}
                        className="w-full flex items-center space-x-3 p-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <svg
                          className="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                        <span>Ver GitHub</span>
                      </motion.button>

                      <motion.button
                        onClick={() => openExternalLink(profile.linkedin)}
                        className="w-full flex items-center space-x-3 p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <svg
                          className="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                        </svg>
                        <span>Ver LinkedIn</span>
                      </motion.button>

                      <motion.button
                        onClick={() => openExternalLink(profile.twitter)}
                        className="w-full flex items-center space-x-3 p-3 bg-blue-400 text-white rounded-lg hover:bg-blue-500 transition-colors"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <svg
                          className="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                        </svg>
                        <span>Ver Twitter</span>
                      </motion.button>

                      <motion.button
                        onClick={() => openExternalLink(profile.portfolio)}
                        className="w-full flex items-center space-x-3 p-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9m0 9c-5 0-9-4-9-9s4-9 9-9"
                          />
                        </svg>
                        <span>Ver Portfolio</span>
                      </motion.button>

                      <motion.button
                        onClick={openNFTExplorer}
                        className="w-full flex items-center space-x-3 p-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg hover:from-purple-600 hover:to-blue-600 transition-colors"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 10V3L4 14h7v7l9-11h-7z"
                          />
                        </svg>
                        <span>Ver NFT en Explorer</span>
                      </motion.button>
                    </div>
                  </div>
                </div>

                {/* Right Column - Experience & Reviews */}
                <div className="lg:col-span-2">
                  {/* Experience */}
                  <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">
                      Experiencia
                    </h4>
                    <p className="text-gray-700 leading-relaxed">
                      {profile.experience}
                    </p>
                  </div>

                  {/* Reviews */}
                  <div className="bg-white border border-gray-200 rounded-xl p-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">
                      Reseñas ({profile.reviews.length})
                    </h4>
                    <div className="space-y-4">
                      {profile.reviews.map((review) => (
                        <div
                          key={review.id}
                          className="border-b border-gray-100 pb-4 last:border-b-0"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center space-x-2">
                              <span className="font-medium text-gray-900">
                                {review.reviewer}
                              </span>
                              <div className="flex items-center">
                                {renderStars(review.rating)}
                              </div>
                            </div>
                            <span className="text-sm text-gray-500">
                              {review.date}
                            </span>
                          </div>
                          <p className="text-gray-700">{review.comment}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 mt-6 pt-6 border-t border-gray-200">
                <motion.button
                  onClick={() => onContact(applicant)}
                  className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Contactar
                </motion.button>
                <motion.button
                  onClick={() => onHire(applicant.id)}
                  className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Contratar
                </motion.button>
                <motion.button
                  onClick={() => onReject(applicant.id)}
                  className="flex-1 px-6 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Rechazar
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ApplicantProfileModal;
