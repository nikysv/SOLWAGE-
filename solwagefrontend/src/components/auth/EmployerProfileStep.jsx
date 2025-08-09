import React, { useState } from "react";
import { motion } from "framer-motion";

const EmployerProfileStep = ({ formData, updateFormData, onNext, onBack, user }) => {
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const industries = [
    "Tecnología",
    "Finanzas",
    "Salud",
    "Educación",
    "E-commerce",
    "Marketing",
    "Consultoría",
    "Manufactura",
    "Servicios",
    "Otro",
  ];

  const companySizes = [
    "1-10 empleados",
    "11-50 empleados",
    "51-200 empleados",
    "201-500 empleados",
    "500+ empleados",
  ];

  const updateProfile = (field, value) => {
    updateFormData({ profile: { ...(formData.profile || {}), [field]: value } });
  };

  const validate = () => {
    const e = {};
    if (!formData.profile?.fullName?.trim()) e.fullName = "Nombre del representante es requerido";
    if (!formData.profile?.companyName?.trim()) e.companyName = "Nombre de la empresa es requerido";
    if (!formData.profile?.companyDescription?.trim()) e.companyDescription = "Descripción de la empresa es requerida";
    if (!formData.profile?.industry?.trim()) e.industry = "Selecciona una industria";
    if (!formData.profile?.website?.trim()) e.website = "El sitio web es requerido";
    else if (!/^https?:\/\//i.test(formData.profile.website)) e.website = "URL inválida";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setIsLoading(true);
    try {
      await onNext({ userType: "employer", profile: { ...(formData.profile || {}) } });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      key="employer-profile"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full max-w-2xl mx-auto"
    >
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
            {user?.photoURL ? (
              <img src={user.photoURL} alt="Profile" className="w-12 h-12 rounded-full" />
            ) : (
              <span className="text-2xl text-white">🏢</span>
            )}
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Perfil de Empresa</h3>
          <p className="text-gray-600">Completa el perfil de tu empresa para contratar talento</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">Datos del representante y empresa</h4>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Nombre Completo (Representante)</label>
              <input
                type="text"
                value={formData.profile?.fullName || ""}
                onChange={(e) => updateProfile("fullName", e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${errors.fullName ? "border-red-500" : "border-gray-300"}`}
                placeholder="Tu nombre completo"
              />
              {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Nombre de la Empresa</label>
              <input
                type="text"
                value={formData.profile?.companyName || ""}
                onChange={(e) => updateProfile("companyName", e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${errors.companyName ? "border-red-500" : "border-gray-300"}`}
                placeholder="Nombre de tu empresa"
              />
              {errors.companyName && <p className="text-red-500 text-sm mt-1">{errors.companyName}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Descripción de la Empresa</label>
              <textarea
                rows={4}
                value={formData.profile?.companyDescription || ""}
                onChange={(e) => updateProfile("companyDescription", e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${errors.companyDescription ? "border-red-500" : "border-gray-300"}`}
                placeholder="¿Qué hace tu empresa? Misión, visión, productos..."
              />
              {errors.companyDescription && <p className="text-red-500 text-sm mt-1">{errors.companyDescription}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Industria</label>
              <select
                value={formData.profile?.industry || ""}
                onChange={(e) => updateProfile("industry", e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${errors.industry ? "border-red-500" : "border-gray-300"}`}
              >
                <option value="">Selecciona una industria</option>
                {industries.map((i) => (
                  <option key={i} value={i}>
                    {i}
                  </option>
                ))}
              </select>
              {errors.industry && <p className="text-red-500 text-sm mt-1">{errors.industry}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Tamaño de la Empresa</label>
              <select
                value={formData.profile?.companySize || ""}
                onChange={(e) => updateProfile("companySize", e.target.value)}
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent border-gray-300"
              >
                <option value="">Selecciona el tamaño</option>
                {companySizes.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Sitio Web</label>
              <input
                type="url"
                value={formData.profile?.website || ""}
                onChange={(e) => updateProfile("website", e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${errors.website ? "border-red-500" : "border-gray-300"}`}
                placeholder="https://tu-empresa.com"
              />
              {errors.website && <p className="text-red-500 text-sm mt-1">{errors.website}</p>}
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">Redes Sociales</h4>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">LinkedIn</label>
              <input type="url" value={formData.profile?.linkedin || ""} onChange={(e) => updateProfile("linkedin", e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" placeholder="https://linkedin.com/company/tu-empresa" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Twitter/X</label>
              <input type="url" value={formData.profile?.twitter || ""} onChange={(e) => updateProfile("twitter", e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" placeholder="https://twitter.com/tu-empresa" />
            </div>
          </div>

          <div className="flex space-x-4 pt-6">
            <button type="button" onClick={onBack} className="flex-1 px-6 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50">Atrás</button>
            <button type="submit" disabled={isLoading} className="flex-1 px-6 py-3 bg-gradient-to-r from-green-600 to-blue-600 text-white font-medium rounded-lg disabled:opacity-50">
              {isLoading ? "Completando..." : "Completar Perfil"}
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default EmployerProfileStep;
