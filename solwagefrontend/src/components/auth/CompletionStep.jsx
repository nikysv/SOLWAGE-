import React, { useState } from "react";
import { motion } from "framer-motion";

const CompletionStep = ({ formData, onComplete, onPrevious }) => {
  const [isLoading, setIsLoading] = useState(false);
  const isEmployer = formData.userType === "employer";

  const handleComplete = () => {
    setIsLoading(true);
    onComplete();
  };

  return (
    <div>
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl text-white">🎉</span>
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">¡Casi Listo!</h3>
        <p className="text-gray-600">
          Revisa tu información antes de crear tu perfil y Smart Wallet.
        </p>
      </div>

      <div className="space-y-6">
        {/* Resumen de Información */}
        <div className="bg-gray-50 rounded-lg p-4 space-y-4">
          <h4 className="font-semibold text-gray-900 border-b border-gray-200 pb-2">
            Resumen de tu Información
          </h4>

          <div className="grid grid-cols-1 gap-4">
            <div>
              <h5 className="text-sm font-medium text-gray-700 mb-1">
                Información de Contacto
              </h5>
              <div className="text-sm text-gray-600 space-y-1">
                <p>
                  <span className="font-medium">Email:</span> {formData.email}
                </p>
                <p>
                  <span className="font-medium">Teléfono:</span>{" "}
                  {formData.phone}
                </p>
                <p>
                  <span className="font-medium">Tipo de Usuario:</span>{" "}
                  {isEmployer ? "Empresa/Empleador" : "Freelancer"}
                </p>
              </div>
            </div>

            <div>
              <h5 className="text-sm font-medium text-gray-700 mb-1">
                {isEmployer
                  ? "Información de la Empresa"
                  : "Perfil Profesional"}
              </h5>
              <div className="text-sm text-gray-600 space-y-1">
                <p>
                  <span className="font-medium">Nombre:</span>{" "}
                  {formData.profile.fullName}
                </p>
                {isEmployer ? (
                  <>
                    <p>
                      <span className="font-medium">Empresa:</span>{" "}
                      {formData.profile.companyName}
                    </p>
                    <p>
                      <span className="font-medium">Industria:</span>{" "}
                      {formData.profile.industry}
                    </p>
                  </>
                ) : (
                  <>
                    <p>
                      <span className="font-medium">Habilidades:</span>{" "}
                      {formData.profile.skills}
                    </p>
                    <p>
                      <span className="font-medium">GitHub:</span>{" "}
                      {formData.profile.github}
                    </p>
                  </>
                )}
              </div>
            </div>

            {!isEmployer && formData.profile.linkedin && (
              <div>
                <h5 className="text-sm font-medium text-gray-700 mb-1">
                  Redes Sociales
                </h5>
                <div className="text-sm text-gray-600 space-y-1">
                  {formData.profile.linkedin && (
                    <p>
                      <span className="font-medium">LinkedIn:</span>{" "}
                      {formData.profile.linkedin}
                    </p>
                  )}
                  {formData.profile.twitter && (
                    <p>
                      <span className="font-medium">Twitter:</span>{" "}
                      {formData.profile.twitter}
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Información de Smart Wallet */}
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <span className="text-purple-600 text-lg">🔐</span>
            </div>
            <div className="ml-3">
              <h4 className="text-sm font-medium text-purple-900">
                Smart Wallet Automática
              </h4>
              <p className="text-sm text-purple-700 mt-1">
                Se creará automáticamente una billetera digital asociada a tu
                cuenta. Podrás recibir pagos en stablecoins sin intermediarios
                bancarios.
              </p>
            </div>
          </div>
        </div>

        {/* Beneficios */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <span className="text-blue-600 text-lg">✨</span>
            </div>
            <div className="ml-3">
              <h4 className="text-sm font-medium text-blue-900">
                Lo que obtienes
              </h4>
              <ul className="text-sm text-blue-700 mt-1 space-y-1">
                {isEmployer ? (
                  <>
                    <li>• Capacidad para publicar ofertas de trabajo</li>
                    <li>• Acceso a talento global calificado</li>
                    <li>• Pagos instantáneos a freelancers</li>
                    <li>• Comisiones hasta 90% menores</li>
                  </>
                ) : (
                  <>
                    <li>• Acceso a oportunidades globales</li>
                    <li>• Pagos instantáneos en stablecoins</li>
                    <li>• Perfil profesional con NFTs Soulbound</li>
                    <li>• Comisiones hasta 90% menores</li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>

        {/* Botones */}
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
            type="button"
            onClick={handleComplete}
            disabled={isLoading}
            className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            whileHover={{ scale: isLoading ? 1 : 1.02 }}
            whileTap={{ scale: isLoading ? 1 : 0.98 }}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Creando Perfil...
              </div>
            ) : (
              "Crear Perfil"
            )}
          </motion.button>
        </div>

        {/* Términos y Condiciones */}
        <div className="text-center">
          <p className="text-xs text-gray-500">
            Al crear tu perfil, aceptas nuestros{" "}
            <a
              href="#"
              className="text-purple-600 hover:text-purple-700 underline"
            >
              Términos de Servicio
            </a>{" "}
            y{" "}
            <a
              href="#"
              className="text-purple-600 hover:text-purple-700 underline"
            >
              Política de Privacidad
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default CompletionStep;
