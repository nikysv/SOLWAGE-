import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import BackButton from "../components/common/BackButton";

const LoginPage = ({ auth }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showVerification, setShowVerification] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [countdown, setCountdown] = useState(0);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "El correo electrónico es requerido";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Ingresa un correo electrónico válido";
    }

    if (!formData.password.trim()) {
      newErrors.password = "La contraseña es requerida";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateVerification = () => {
    const newErrors = {};

    if (!verificationCode.trim()) {
      newErrors.verificationCode = "El código de verificación es requerido";
    } else if (verificationCode !== "123456") {
      newErrors.verificationCode = "Código de verificación incorrecto";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsLoading(true);

      // Simular envío de código de verificación
      setTimeout(() => {
        setIsLoading(false);
        setShowVerification(true);
        setCountdown(60);

        // Iniciar countdown
        const timer = setInterval(() => {
          setCountdown((prev) => {
            if (prev <= 1) {
              clearInterval(timer);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
      }, 1500);
    }
  };

  const handleVerification = async (e) => {
    e.preventDefault();
    if (validateVerification()) {
      setIsLoading(true);

      // Simular verificación exitosa
      setTimeout(() => {
        const userData = {
          email: formData.email,
          smartWalletAddress: `0x${Math.random().toString(16).substr(2, 40)}`,
          createdAt: new Date().toISOString(),
          isNewUser: false, // Marcar como usuario existente
        };

        auth.login(userData);
        setIsLoading(false);
        // Navegar según el tipo de usuario (asumiendo employer por defecto en login manual)
        navigate("/employer/dashboard");
      }, 1500);
    }
  };

  const handleResendCode = () => {
    setCountdown(60);
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Limpiar error del campo cuando el usuario empiece a escribir
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {/* Header con botón de regreso */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-between mb-6">
            <BackButton />
            <div className="flex-1"></div>
          </div>

          <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl text-white">🔐</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            {showVerification ? "Verificar Código" : "Iniciar Sesión"}
          </h2>
          <p className="text-gray-600">
            {showVerification
              ? "Ingresa el código enviado a tu correo"
              : "Accede a tu cuenta de Solwage"}
          </p>
        </div>

        {/* Formulario */}
        <motion.form
          onSubmit={showVerification ? handleVerification : handleSubmit}
          className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="space-y-6">
            {!showVerification ? (
              <>
                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Correo Electrónico
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 ${
                      errors.email
                        ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                        : "border-gray-300"
                    }`}
                    placeholder="tu@email.com"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                  )}
                </div>

                {/* Password */}
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Contraseña
                  </label>
                  <input
                    type="password"
                    id="password"
                    value={formData.password}
                    onChange={(e) =>
                      handleInputChange("password", e.target.value)
                    }
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 ${
                      errors.password
                        ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                        : "border-gray-300"
                    }`}
                    placeholder="••••••••"
                  />
                  {errors.password && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.password}
                    </p>
                  )}
                </div>
              </>
            ) : (
              <>
                {/* Información del usuario */}
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <span className="text-purple-600 text-lg">📧</span>
                    </div>
                    <div className="ml-3">
                      <h4 className="text-sm font-medium text-purple-900">
                        Código enviado
                      </h4>
                      <p className="text-sm text-purple-700 mt-1">
                        Hemos enviado un código de verificación a{" "}
                        {formData.email}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Código de verificación */}
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
                    onChange={(e) => setVerificationCode(e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 ${
                      errors.verificationCode
                        ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                        : "border-gray-300"
                    }`}
                    placeholder="123456"
                    maxLength={6}
                  />
                  {errors.verificationCode && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.verificationCode}
                    </p>
                  )}
                  <p className="mt-1 text-xs text-gray-500">
                    Ingresa el código de 6 dígitos enviado a tu correo
                  </p>
                </div>

                {/* Reenviar código */}
                <div className="text-center space-y-2">
                  <p className="text-sm text-gray-600 mb-2">
                    ¿No recibiste el código?
                  </p>
                  <button
                    type="button"
                    onClick={handleResendCode}
                    disabled={countdown > 0}
                    className={`text-sm font-medium transition-colors duration-300 ${
                      countdown > 0
                        ? "text-gray-400 cursor-not-allowed"
                        : "text-purple-600 hover:text-purple-700"
                    }`}
                  >
                    {countdown > 0
                      ? `Reenviar en ${countdown}s`
                      : "Reenviar código"}
                  </button>

                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => setShowVerification(false)}
                      className="text-sm text-gray-500 hover:text-gray-700 transition-colors duration-300"
                    >
                      ← Volver al login
                    </button>
                  </div>
                </div>
              </>
            )}

            {/* Botón de envío */}
            <motion.button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={{ scale: isLoading ? 1 : 1.02 }}
              whileTap={{ scale: isLoading ? 1 : 0.98 }}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  {showVerification ? "Verificando..." : "Enviando código..."}
                </div>
              ) : showVerification ? (
                "Verificar Código"
              ) : (
                "Enviar Código"
              )}
            </motion.button>

            {/* Enlaces adicionales */}
            <div className="text-center space-y-3">
              <p className="text-sm text-gray-600">
                ¿No tienes cuenta?{" "}
                <Link
                  to="/auth"
                  className="text-purple-600 hover:text-purple-700 font-medium transition-colors duration-300"
                >
                  Regístrate aquí
                </Link>
              </p>
              <p className="text-sm text-gray-500">
                ¿Olvidaste tu contraseña?{" "}
                <button
                  type="button"
                  className="text-purple-600 hover:text-purple-700 font-medium transition-colors duration-300"
                  onClick={() =>
                    alert("Función de recuperación de contraseña en desarrollo")
                  }
                >
                  Recupérala
                </button>
              </p>
            </div>
          </div>
        </motion.form>
      </motion.div>
    </div>
  );
};

export default LoginPage;
