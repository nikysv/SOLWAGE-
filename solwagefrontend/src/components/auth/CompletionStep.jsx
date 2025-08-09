import React, { useState } from "react";
import { motion } from "framer-motion";

const CompletionStep = ({
  formData,
  user,
  walletAddress,
  onComplete,
  onPrevious,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const isEmployer = formData.userType === "employer";
  const displayName =
    formData?.profile?.fullName || user?.displayName || "Usuario";

  const handleComplete = () => {
    if (walletAddress) {
      onComplete && onComplete();
      return;
    }
    setIsLoading(true);
    onComplete && onComplete();
  };

  const handleCopy = async () => {
    if (!walletAddress) return;
    try {
      await navigator.clipboard.writeText(walletAddress);
    } catch (_) {}
  };

  const isWelcome = Boolean(walletAddress);

  return (
    <div>
      <div className="text-center mb-6">
        <div
          className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
            isWelcome
              ? "bg-gradient-to-br from-purple-600 to-blue-600"
              : "bg-gradient-to-br from-green-500 to-emerald-500"
          }`}
        >
          <span className="text-2xl text-white">🎉</span>
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          {isWelcome
            ? `¡Bienvenido a Solwage, ${displayName}!`
            : "¡Casi Listo!"}
        </h3>
        <p className="text-gray-600">
          {isWelcome
            ? "Tu cuenta ha sido configurada correctamente."
            : "Revisa tu información antes de crear tu perfil y Smart Wallet."}
        </p>
      </div>

      <div className="space-y-6">
        {/* Datos del Usuario */}
        <div className="bg-gray-50 rounded-lg p-4 space-y-4">
          <h4 className="font-semibold text-gray-900 border-b border-gray-200 pb-2">
            {isWelcome ? "Tus datos" : "Resumen de tu Información"}
          </h4>

          <div className="grid grid-cols-1 gap-4">
            <div>
              <h5 className="text-sm font-medium text-gray-700 mb-1">
                Información
              </h5>
              <div className="text-sm text-gray-600 space-y-1">
                {user?.email && (
                  <p>
                    <span className="font-medium">Email:</span> {user.email}
                  </p>
                )}
                <p>
                  <span className="font-medium">Tipo de Usuario:</span>{" "}
                  {isEmployer ? "Empresa/Empleador" : "Freelancer"}
                </p>
                <p>
                  <span className="font-medium">Nombre:</span>{" "}
                  {formData?.profile?.fullName || displayName}
                </p>
                {isEmployer ? (
                  <>
                    {formData?.profile?.companyName && (
                      <p>
                        <span className="font-medium">Empresa:</span>{" "}
                        {formData.profile.companyName}
                      </p>
                    )}
                    {formData?.profile?.industry && (
                      <p>
                        <span className="font-medium">Industria:</span>{" "}
                        {formData.profile.industry}
                      </p>
                    )}
                    {formData?.profile?.website && (
                      <p>
                        <span className="font-medium">Sitio Web:</span>{" "}
                        {formData.profile.website}
                      </p>
                    )}
                  </>
                ) : (
                  <>
                    {formData?.profile?.skills && (
                      <p>
                        <span className="font-medium">Habilidades:</span>{" "}
                        {formData.profile.skills}
                      </p>
                    )}
                    {formData?.profile?.github && (
                      <p>
                        <span className="font-medium">GitHub:</span>{" "}
                        {formData.profile.github}
                      </p>
                    )}
                    {formData?.profile?.linkedin && (
                      <p>
                        <span className="font-medium">LinkedIn:</span>{" "}
                        {formData.profile.linkedin}
                      </p>
                    )}
                    {formData?.profile?.twitter && (
                      <p>
                        <span className="font-medium">Twitter:</span>{" "}
                        {formData.profile.twitter}
                      </p>
                    )}
                    {formData?.profile?.portfolio && (
                      <p>
                        <span className="font-medium">Portfolio:</span>{" "}
                        {formData.profile.portfolio}
                      </p>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Wallet */}
        {isWelcome ? (
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-4 border border-purple-200">
            <div className="font-semibold text-gray-900 mb-2">
              Tu Smart Wallet
            </div>
            <div className="bg-white rounded-lg p-3 border border-purple-200">
              <p className="text-sm text-gray-600 mb-1">Tu billetera es:</p>
              <p className="text-sm font-mono text-gray-900 break-all">
                {walletAddress}
              </p>
              <div className="mt-3 flex gap-3">
                <button
                  onClick={handleCopy}
                  className="px-3 py-2 text-sm border rounded-md hover:bg-gray-50"
                >
                  Copiar
                </button>
              </div>
            </div>
          </div>
        ) : (
          <>
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
                    Se creará automáticamente una billetera digital asociada a
                    tu cuenta.
                  </p>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Botones */}
        <div className="flex space-x-3">
          {onPrevious && !isWelcome && (
            <motion.button
              type="button"
              onClick={onPrevious}
              className="flex-1 bg-gray-100 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-200 transition-all duration-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Atrás
            </motion.button>
          )}
          <motion.button
            type="button"
            onClick={handleComplete}
            disabled={isLoading}
            className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700`}
            whileHover={{ scale: isLoading ? 1 : 1.02 }}
            whileTap={{ scale: isLoading ? 1 : 0.98 }}
          >
            {isWelcome ? (
              "Ir al dashboard"
            ) : isLoading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Creando Perfil...
              </div>
            ) : (
              "Crear Perfil"
            )}
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default CompletionStep;
