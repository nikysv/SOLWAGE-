import React, { useState } from "react";
import { motion } from "framer-motion";

const ProfileCreationStep = ({
  formData,
  updateFormData,
  onNext,
  onPrevious,
}) => {
  const [errors, setErrors] = useState({});
  const isEmployer = formData.userType === "employer";

  const validateForm = () => {
    const newErrors = {};

    if (!formData.profile.fullName.trim()) {
      newErrors.fullName = "El nombre completo es requerido";
    }

    if (isEmployer) {
      // Validación específica para empleadores
      if (!formData.profile.companyName?.trim()) {
        newErrors.companyName = "El nombre de la empresa es requerido";
      }
      if (!formData.profile.industry?.trim()) {
        newErrors.industry = "La industria es requerida";
      }
    } else {
      // Validación específica para freelancers
      if (!formData.profile.skills?.trim()) {
        newErrors.skills = "Las habilidades son requeridas";
      }
      if (!formData.profile.experience?.trim()) {
        newErrors.experience = "La experiencia es requerida";
      }
      if (!formData.profile.github?.trim()) {
        newErrors.github = "La URL de GitHub es requerida";
      } else if (!formData.profile.github.includes("github.com")) {
        newErrors.github = "Ingresa una URL válida de GitHub";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onNext();
    }
  };

  const updateProfile = (field, value) => {
    updateFormData({
      profile: {
        ...formData.profile,
        [field]: value,
      },
    });
  };

  return (
    <div>
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl text-white">
            {isEmployer ? "🏢" : "👤"}
          </span>
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          {isEmployer ? "Perfil de Empresa" : "Crea tu Perfil Profesional"}
        </h3>
        <p className="text-gray-600">
          {isEmployer
            ? "Completa la información de tu empresa para comenzar a contratar talento."
            : "Completa tu información para conectar con oportunidades globales."}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Datos Básicos */}
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
            Datos Básicos
          </h4>

          <div>
            <label
              htmlFor="fullName"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              {isEmployer
                ? "Nombre Completo (Representante)"
                : "Nombre Completo"}
            </label>
            <input
              type="text"
              id="fullName"
              value={formData.profile.fullName}
              onChange={(e) => updateProfile("fullName", e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 ${
                errors.fullName
                  ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                  : "border-gray-300"
              }`}
              placeholder={isEmployer ? "Juan Pérez" : "Juan Pérez"}
            />
            {errors.fullName && (
              <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>
            )}
          </div>

          {isEmployer && (
            <>
              <div>
                <label
                  htmlFor="companyName"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Nombre de la Empresa *
                </label>
                <input
                  type="text"
                  id="companyName"
                  value={formData.profile.companyName || ""}
                  onChange={(e) => updateProfile("companyName", e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 ${
                    errors.companyName
                      ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                      : "border-gray-300"
                  }`}
                  placeholder="TechCorp Solutions"
                />
                {errors.companyName && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.companyName}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="industry"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Industria *
                </label>
                <select
                  id="industry"
                  value={formData.profile.industry || ""}
                  onChange={(e) => updateProfile("industry", e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 ${
                    errors.industry
                      ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                      : "border-gray-300"
                  }`}
                >
                  <option value="">Selecciona una industria</option>
                  <option value="technology">Tecnología</option>
                  <option value="finance">Finanzas</option>
                  <option value="healthcare">Salud</option>
                  <option value="education">Educación</option>
                  <option value="ecommerce">E-commerce</option>
                  <option value="consulting">Consultoría</option>
                  <option value="marketing">Marketing</option>
                  <option value="other">Otra</option>
                </select>
                {errors.industry && (
                  <p className="mt-1 text-sm text-red-600">{errors.industry}</p>
                )}
              </div>
            </>
          )}

          <div>
            <label
              htmlFor="photoFile"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              {isEmployer
                ? "Logo de la Empresa (Opcional)"
                : "Foto de Perfil (Opcional)"}
            </label>
            <input
              type="file"
              id="photoFile"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  // Simular URL de la imagen subida
                  const fakeUrl = URL.createObjectURL(file);
                  updateProfile("photoUrl", fakeUrl);
                }
              }}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
            />
            <p className="mt-1 text-xs text-gray-500">
              Formatos soportados: JPG, PNG, GIF. Máximo 5MB.
            </p>
          </div>
        </div>

        {!isEmployer && (
          <>
            {/* Habilidades - Solo para freelancers */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
                Habilidades
              </h4>

              <div>
                <label
                  htmlFor="skills"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Habilidades Técnicas
                </label>
                <input
                  type="text"
                  id="skills"
                  value={formData.profile.skills}
                  onChange={(e) => updateProfile("skills", e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 ${
                    errors.skills
                      ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                      : "border-gray-300"
                  }`}
                  placeholder="React, Node.js, Stellar, Soroban, TypeScript"
                />
                {errors.skills && (
                  <p className="mt-1 text-sm text-red-600">{errors.skills}</p>
                )}
                <p className="mt-1 text-xs text-gray-500">
                  Separa las habilidades con comas.
                </p>
              </div>
            </div>

            {/* Experiencia - Solo para freelancers */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
                Experiencia
              </h4>

              <div>
                <label
                  htmlFor="experience"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Descripción de Experiencia
                </label>
                <textarea
                  id="experience"
                  value={formData.profile.experience}
                  onChange={(e) => updateProfile("experience", e.target.value)}
                  rows={4}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 resize-none ${
                    errors.experience
                      ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                      : "border-gray-300"
                  }`}
                  placeholder="Desarrollador full-stack con 3 años de experiencia en React, Node.js y blockchain. Especializado en aplicaciones descentralizadas y smart contracts."
                />
                {errors.experience && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.experience}
                  </p>
                )}
              </div>
            </div>

            {/* Redes Sociales - Solo para freelancers */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
                Redes Sociales
              </h4>

              <div>
                <label
                  htmlFor="github"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  GitHub *
                </label>
                <input
                  type="url"
                  id="github"
                  value={formData.profile.github}
                  onChange={(e) => updateProfile("github", e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 ${
                    errors.github
                      ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                      : "border-gray-300"
                  }`}
                  placeholder="https://github.com/tuusuario"
                />
                {errors.github && (
                  <p className="mt-1 text-sm text-red-600">{errors.github}</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="linkedin"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    LinkedIn (Opcional)
                  </label>
                  <input
                    type="url"
                    id="linkedin"
                    value={formData.profile.linkedin}
                    onChange={(e) => updateProfile("linkedin", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300"
                    placeholder="https://linkedin.com/in/tuusuario"
                  />
                </div>

                <div>
                  <label
                    htmlFor="twitter"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    X/Twitter (Opcional)
                  </label>
                  <input
                    type="url"
                    id="twitter"
                    value={formData.profile.twitter}
                    onChange={(e) => updateProfile("twitter", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300"
                    placeholder="https://twitter.com/tuusuario"
                  />
                </div>
              </div>
            </div>
          </>
        )}

        {/* Información adicional para empleadores */}
        {isEmployer && (
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
              Información de la Empresa
            </h4>

            <div>
              <label
                htmlFor="companyDescription"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Descripción de la Empresa (Opcional)
              </label>
              <textarea
                id="companyDescription"
                value={formData.profile.companyDescription || ""}
                onChange={(e) =>
                  updateProfile("companyDescription", e.target.value)
                }
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 resize-none"
                placeholder="Describe brevemente tu empresa, misión y valores..."
              />
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <span className="text-blue-600 text-lg">💼</span>
                </div>
                <div className="ml-3">
                  <h4 className="text-sm font-medium text-blue-900">
                    Capacidad de Publicar Empleos
                  </h4>
                  <p className="text-sm text-blue-700 mt-1">
                    Una vez completado tu perfil, podrás crear y publicar
                    ofertas de trabajo para encontrar el mejor talento.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="flex space-x-3">
          <motion.button
            type="button"
            onClick={onPrevious}
            className="flex-1 bg-gray-100 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-200 transition-all duration-300"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Atrás
          </motion.button>
          <motion.button
            type="submit"
            className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Continuar
          </motion.button>
        </div>
      </form>
    </div>
  );
};

export default ProfileCreationStep;
