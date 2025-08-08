import React, { useState } from "react";
import { motion } from "framer-motion";
import BackButton from "../components/common/BackButton";

const JobCreationPage = ({ auth }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    budget: "",
    duration: "",
    skills: "",
    isLongTerm: false,
    milestones: [],
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState({});

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Limpiar error del campo
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "El título es requerido";
    }

    if (!formData.description.trim()) {
      newErrors.description = "La descripción es requerida";
    }

    if (!formData.budget || formData.budget <= 0) {
      newErrors.budget = "El presupuesto debe ser mayor a 0";
    }

    if (!formData.duration) {
      newErrors.duration = "La duración es requerida";
    }

    if (!formData.skills.trim()) {
      newErrors.skills = "Las habilidades son requeridas";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      // Simular creación del trabajo
      const jobData = {
        id: Date.now().toString(),
        employerId: auth.user.id,
        employerName: auth.user.profile.fullName,
        title: formData.title,
        description: formData.description,
        budget: parseFloat(formData.budget),
        duration: formData.duration,
        skills: formData.skills.split(",").map((skill) => skill.trim()),
        isLongTerm: formData.isLongTerm,
        status: "Abierto",
        createdAt: new Date().toISOString(),
        applicants: 0,
        milestones: formData.isLongTerm ? formData.milestones : [],
      };

      // En una implementación real, aquí se enviaría al backend
      console.log("Creando trabajo:", jobData);

      // Simular éxito
      alert("¡Trabajo publicado exitosamente!");
      navigate("/employer/dashboard");
    } catch (error) {
      console.error("Error al publicar trabajo:", error);
      alert("Error al publicar el trabajo. Intenta de nuevo.");
    }
  };

  const addMilestone = () => {
    setFormData((prev) => ({
      ...prev,
      milestones: [
        ...prev.milestones,
        {
          id: Date.now(),
          title: "",
          description: "",
          amount: "",
          dueDate: "",
        },
      ],
    }));
  };

  const updateMilestone = (index, field, value) => {
    setFormData((prev) => ({
      ...prev,
      milestones: prev.milestones.map((milestone, i) =>
        i === index ? { ...milestone, [field]: value } : milestone
      ),
    }));
  };

  const removeMilestone = (index) => {
    setFormData((prev) => ({
      ...prev,
      milestones: prev.milestones.filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <BackButton />
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl text-white">📝</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Publicar Nuevo Trabajo
            </h1>
            <p className="text-gray-600">
              Crea una oferta de trabajo atractiva para encontrar el talento
              perfecto
            </p>
          </div>
        </motion.div>

        {/* Formulario */}
        <motion.form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="space-y-8">
            {/* Información Básica */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Información del Trabajo
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Título del Trabajo *
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors ${
                      errors.title ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Ej: Desarrollador Frontend React"
                  />
                  {errors.title && (
                    <p className="text-red-500 text-sm mt-1">{errors.title}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Presupuesto (USD) *
                  </label>
                  <input
                    type="number"
                    value={formData.budget}
                    onChange={(e) =>
                      handleInputChange("budget", e.target.value)
                    }
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors ${
                      errors.budget ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="500"
                    min="1"
                  />
                  {errors.budget && (
                    <p className="text-red-500 text-sm mt-1">{errors.budget}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Duración *
                  </label>
                  <select
                    value={formData.duration}
                    onChange={(e) =>
                      handleInputChange("duration", e.target.value)
                    }
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors ${
                      errors.duration ? "border-red-500" : "border-gray-300"
                    }`}
                  >
                    <option value="">Selecciona la duración</option>
                    <option value="1-3 días">1-3 días</option>
                    <option value="1 semana">1 semana</option>
                    <option value="2-3 semanas">2-3 semanas</option>
                    <option value="1 mes">1 mes</option>
                    <option value="2-3 meses">2-3 meses</option>
                    <option value="6+ meses">6+ meses</option>
                  </select>
                  {errors.duration && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.duration}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Habilidades Requeridas *
                  </label>
                  <input
                    type="text"
                    value={formData.skills}
                    onChange={(e) =>
                      handleInputChange("skills", e.target.value)
                    }
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors ${
                      errors.skills ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="React, TypeScript, Node.js"
                  />
                  {errors.skills && (
                    <p className="text-red-500 text-sm mt-1">{errors.skills}</p>
                  )}
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Descripción Detallada *
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    handleInputChange("description", e.target.value)
                  }
                  rows={6}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors ${
                    errors.description ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Describe detalladamente el trabajo, responsabilidades, requisitos técnicos, etc."
                />
                {errors.description && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.description}
                  </p>
                )}
              </div>
            </div>

            {/* Configuración de Hitos */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">
                  Configuración de Hitos
                </h2>
                <div className="flex items-center space-x-3">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.isLongTerm}
                      onChange={(e) =>
                        handleInputChange("isLongTerm", e.target.checked)
                      }
                      className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">
                      Proyecto a largo plazo
                    </span>
                  </label>
                </div>
              </div>

              {formData.isLongTerm && (
                <div className="bg-purple-50 rounded-lg p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Definir Hitos
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Divide tu proyecto en hitos para un mejor control y pagos
                    por etapas.
                  </p>

                  {formData.milestones.map((milestone, index) => (
                    <div
                      key={milestone.id}
                      className="bg-white rounded-lg p-4 mb-4 border border-purple-200"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="font-medium text-gray-900">
                          Hito {index + 1}
                        </h4>
                        <button
                          type="button"
                          onClick={() => removeMilestone(index)}
                          className="text-red-500 hover:text-red-700"
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
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Título
                          </label>
                          <input
                            type="text"
                            value={milestone.title}
                            onChange={(e) =>
                              updateMilestone(index, "title", e.target.value)
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            placeholder="Ej: Diseño de UI"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Presupuesto (USD)
                          </label>
                          <input
                            type="number"
                            value={milestone.amount}
                            onChange={(e) =>
                              updateMilestone(index, "amount", e.target.value)
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            placeholder="100"
                            min="1"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Fecha Límite
                          </label>
                          <input
                            type="date"
                            value={milestone.dueDate}
                            onChange={(e) =>
                              updateMilestone(index, "dueDate", e.target.value)
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          />
                        </div>
                      </div>

                      <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Descripción
                        </label>
                        <textarea
                          value={milestone.description}
                          onChange={(e) =>
                            updateMilestone(
                              index,
                              "description",
                              e.target.value
                            )
                          }
                          rows={2}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          placeholder="Describe qué se debe entregar en este hito"
                        />
                      </div>
                    </div>
                  ))}

                  <motion.button
                    type="button"
                    onClick={addMilestone}
                    className="w-full py-3 px-4 border-2 border-dashed border-purple-300 rounded-lg text-purple-600 hover:border-purple-400 hover:text-purple-700 transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    + Agregar Hito
                  </motion.button>
                </div>
              )}
            </div>

            {/* Botones de Acción */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
              <motion.button
                type="button"
                onClick={() => window.history.back()}
                className="flex-1 px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Cancelar
              </motion.button>

              <motion.button
                type="submit"
                className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Publicar Trabajo
              </motion.button>
            </div>
          </div>
        </motion.form>
      </div>
    </div>
  );
};

export default JobCreationPage;
