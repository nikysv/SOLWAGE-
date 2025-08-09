import React, { useState } from "react";
import { motion } from "framer-motion";

const FreelancerProfileStep = ({
  formData,
  updateFormData,
  onNext,
  onBack,
  user,
}) => {
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [cvFile, setCvFile] = useState(null);

  const updateProfile = (field, value) => {
    updateFormData({
      profile: { ...(formData.profile || {}), [field]: value },
    });
  };

  const validate = () => {
    const e = {};
    if (!formData.profile?.fullName?.trim())
      e.fullName = "El nombre completo es requerido";
    if (!formData.profile?.skills?.trim())
      e.skills = "Las habilidades son requeridas";
    if (!formData.profile?.github?.trim()) e.github = "GitHub es obligatorio";
    else if (
      !/^https?:\/\/(www\.)?github\.com\//i.test(formData.profile.github)
    )
      e.github = "URL de GitHub inválida";
    if (!formData.profile?.experience?.trim())
      e.experience = "La experiencia es requerida";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setIsLoading(true);
    try {
      await onNext({
        userType: "freelancer",
        profile: {
          ...(formData.profile || {}),
          cvFileName: cvFile?.name || "",
        },
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      key="freelancer-profile"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full max-w-2xl mx-auto"
    >
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
            {user?.photoURL ? (
              <img
                src={user.photoURL}
                alt="Profile"
                className="w-12 h-12 rounded-full"
              />
            ) : (
              <span className="text-2xl text-white">👨‍💻</span>
            )}
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            Perfil de Freelancer
          </h3>
          <p className="text-gray-600">
            Completa tu perfil para encontrar los mejores proyectos
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
              Datos Básicos
            </h4>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nombre Completo
              </label>
              <input
                type="text"
                value={formData.profile?.fullName || ""}
                onChange={(e) => updateProfile("fullName", e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                  errors.fullName ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Tu nombre completo"
              />
              {errors.fullName && (
                <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Habilidades Principales
              </label>
              <input
                type="text"
                value={formData.profile?.skills || ""}
                onChange={(e) => updateProfile("skills", e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                  errors.skills ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Ej: React, Node.js, Solidity, Diseño UI/UX"
              />
              {errors.skills && (
                <p className="text-red-500 text-sm mt-1">{errors.skills}</p>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
              Experiencia
            </h4>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Experiencia Profesional
              </label>
              <textarea
                rows={4}
                value={formData.profile?.experience || ""}
                onChange={(e) => updateProfile("experience", e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                  errors.experience ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Describe tu experiencia profesional, proyectos realizados, tecnologías que dominas..."
              />
              {errors.experience && (
                <p className="text-red-500 text-sm mt-1">{errors.experience}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                CV (Opcional)
              </label>
              <div className="flex items-center space-x-4">
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => setCvFile(e.target.files?.[0] || null)}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
                />
                {cvFile && (
                  <span className="text-sm text-green-600">
                    ✓ {cvFile.name}
                  </span>
                )}
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Formatos: PDF, DOC, DOCX
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
              Redes Sociales
            </h4>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                GitHub *
              </label>
              <input
                type="url"
                value={formData.profile?.github || ""}
                onChange={(e) => updateProfile("github", e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                  errors.github ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="https://github.com/tu-usuario"
              />
              {errors.github && (
                <p className="text-red-500 text-sm mt-1">{errors.github}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                LinkedIn
              </label>
              <input
                type="url"
                value={formData.profile?.linkedin || ""}
                onChange={(e) => updateProfile("linkedin", e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="https://linkedin.com/in/tu-perfil"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Twitter/X
              </label>
              <input
                type="url"
                value={formData.profile?.twitter || ""}
                onChange={(e) => updateProfile("twitter", e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="https://twitter.com/tu-usuario"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Portfolio/Website
              </label>
              <input
                type="url"
                value={formData.profile?.portfolio || ""}
                onChange={(e) => updateProfile("portfolio", e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="https://tu-portfolio.com"
              />
            </div>
          </div>

          <div className="flex space-x-4 pt-6">
            <button
              type="button"
              onClick={onBack}
              className="flex-1 px-6 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50"
            >
              Atrás
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium rounded-lg disabled:opacity-50"
            >
              {isLoading ? "Completando..." : "Completar Perfil"}
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default FreelancerProfileStep;
