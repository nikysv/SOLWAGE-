import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const VerificationStep = ({ formData, updateFormData, onNext, onPrevious }) => {
  const [verificationCode, setVerificationCode] = useState("");
  const [error, setError] = useState("");
  const [isResending, setIsResending] = useState(false);
  const [countdown, setCountdown] = useState(0);

  const VALID_CODE = "123456";

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleCodeChange = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 6);
    setVerificationCode(value);
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (verificationCode.length !== 6) {
      setError("Ingresa el código de 6 dígitos");
      return;
    }

    if (verificationCode === VALID_CODE) {
      updateFormData({ verificationCode });
      onNext();
    } else {
      setError("Código incorrecto. Intenta de nuevo.");
    }
  };

  const handleResendCode = () => {
    setIsResending(true);
    setTimeout(() => {
      setIsResending(false);
      setCountdown(60);
    }, 1000);
  };

  return (
    <div>
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl text-white">📧</span>
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          Verifica tu Identidad
        </h3>
        <p className="text-gray-600">
          Hemos enviado un código de verificación a{" "}
          <span className="font-semibold text-purple-600">
            {formData.email}
          </span>
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="verificationCode"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Código de Verificación
          </label>
          <input
            type="text"
            id="verificationCode"
            value={verificationCode}
            onChange={handleCodeChange}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 text-center text-2xl font-mono tracking-widest ${
              error
                ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                : "border-gray-300"
            }`}
            placeholder="123456"
            maxLength={6}
          />
          {error && (
            <p className="mt-1 text-sm text-red-600 text-center">{error}</p>
          )}
          <p className="mt-2 text-xs text-gray-500 text-center">
            Código de prueba: <span className="font-mono">123456</span>
          </p>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <span className="text-blue-600 text-lg">💡</span>
            </div>
            <div className="ml-3">
              <h4 className="text-sm font-medium text-blue-900">
                ¿No recibiste el código?
              </h4>
              <p className="text-sm text-blue-700 mt-1">
                Revisa tu carpeta de spam o solicita un nuevo código.
              </p>
            </div>
          </div>
        </div>

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
            Verificar
          </motion.button>
        </div>

        <div className="text-center">
          <button
            type="button"
            onClick={handleResendCode}
            disabled={countdown > 0 || isResending}
            className="text-sm text-purple-600 hover:text-purple-700 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors duration-300"
          >
            {isResending
              ? "Enviando..."
              : countdown > 0
              ? `Reenviar en ${countdown}s`
              : "Reenviar código"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default VerificationStep;
