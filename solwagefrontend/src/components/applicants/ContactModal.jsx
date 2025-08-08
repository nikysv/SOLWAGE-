import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ContactModal = ({ applicant, isOpen, onClose, onSendMessage }) => {
  const [message, setMessage] = useState("");
  const [subject, setSubject] = useState("");

  if (!applicant || !isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message.trim() || !subject.trim()) {
      alert("Por favor completa todos los campos.");
      return;
    }

    onSendMessage({
      applicantId: applicant.id,
      applicantName: applicant.name,
      subject,
      message,
      timestamp: new Date().toISOString(),
    });

    setMessage("");
    setSubject("");
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full"
          >
            {/* Header */}
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">
                  Contactar a {applicant.name}
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
            <form onSubmit={handleSubmit} className="p-6">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Asunto
                </label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Ej: Consulta sobre el proyecto"
                  required
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mensaje
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={6}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                  placeholder="Escribe tu mensaje aquí..."
                  required
                />
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <h4 className="font-medium text-blue-900 mb-2">
                  💡 Consejos para una buena comunicación:
                </h4>
                <ul className="text-blue-700 text-sm space-y-1">
                  <li>• Sé claro sobre los requisitos del proyecto</li>
                  <li>• Menciona el presupuesto y timeline</li>
                  <li>• Pregunta sobre su experiencia relevante</li>
                  <li>• Propón una llamada o reunión si es necesario</li>
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <motion.button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Enviar Mensaje
                </motion.button>
                <motion.button
                  type="button"
                  onClick={onClose}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Cancelar
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ContactModal;
