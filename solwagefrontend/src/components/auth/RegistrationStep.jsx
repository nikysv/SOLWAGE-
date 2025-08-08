import React, { useState } from "react";
import { motion } from "framer-motion";
import CountryPhoneSelector from "./CountryPhoneSelector";

const RegistrationStep = ({ formData, updateFormData, onNext, onBack }) => {
  const [errors, setErrors] = useState({});
  const [selectedCountry, setSelectedCountry] = useState({
    code: "MX",
    name: "México",
    flag: "🇲🇽",
    phoneCode: "+52",
  });
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userType, setUserType] = useState(formData.userType || "");

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = "El correo electrónico es requerido";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Ingresa un correo electrónico válido";
    }

    if (!userType) {
      newErrors.userType = "Debes seleccionar un tipo de usuario";
    }

    if (!phoneNumber.trim()) {
      newErrors.phone = "El número de teléfono es requerido";
    } else if (!/^[\d\s\-\(\)]{7,}$/.test(phoneNumber.trim())) {
      newErrors.phone = "Ingresa un número de teléfono válido";
    }

    if (!password.trim()) {
      newErrors.password = "La contraseña es requerida";
    } else if (password.length < 8) {
      newErrors.password = "La contraseña debe tener al menos 8 caracteres";
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
      newErrors.password =
        "La contraseña debe contener mayúsculas, minúsculas y números";
    }

    if (!confirmPassword.trim()) {
      newErrors.confirmPassword = "Confirma tu contraseña";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Las contraseñas no coinciden";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Combinar código de país con número de teléfono
      const fullPhoneNumber = `${
        selectedCountry.phoneCode
      } ${phoneNumber.trim()}`;
      updateFormData({
        phone: fullPhoneNumber,
        password: password,
        userType: userType,
      });
      onNext();
    }
  };

  return (
    <div>
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl text-white">💼</span>
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          Crea tu Smart Wallet
        </h3>
        <p className="text-gray-600">
          Sin seed phrases, sin complicaciones. Solo tu correo y teléfono.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
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
            onChange={(e) => updateFormData({ email: e.target.value })}
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

        {/* Tipo de Usuario */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            ¿Qué tipo de usuario eres? *
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <motion.button
              type="button"
              onClick={() => setUserType("freelancer")}
              className={`p-4 border-2 rounded-lg text-left transition-all duration-300 h-full ${
                userType === "freelancer"
                  ? "border-purple-500 bg-purple-50 text-purple-700"
                  : "border-gray-300 hover:border-purple-300"
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-lg">👨‍💻</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-sm">Freelancer</h4>
                  <p className="text-xs text-gray-600 mt-1">
                    Busco oportunidades de trabajo
                  </p>
                </div>
              </div>
            </motion.button>

            <motion.button
              type="button"
              onClick={() => setUserType("employer")}
              className={`p-4 border-2 rounded-lg text-left transition-all duration-300 h-full ${
                userType === "employer"
                  ? "border-purple-500 bg-purple-50 text-purple-700"
                  : "border-gray-300 hover:border-purple-300"
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-lg">🏢</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-xs leading-tight">
                    Empresa/Empleador
                  </h4>
                  <p className="text-xs text-gray-600 mt-1">
                    Busco contratar talento
                  </p>
                </div>
              </div>
            </motion.button>
          </div>
          {errors.userType && (
            <p className="mt-1 text-sm text-red-600">{errors.userType}</p>
          )}
        </div>

        <CountryPhoneSelector
          selectedCountry={selectedCountry}
          onCountryChange={setSelectedCountry}
          phoneNumber={phoneNumber}
          onPhoneChange={setPhoneNumber}
          error={errors.phone}
        />

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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 ${
              errors.password
                ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                : "border-gray-300"
            }`}
            placeholder="••••••••"
          />
          {errors.password && (
            <p className="mt-1 text-sm text-red-600">{errors.password}</p>
          )}
          <p className="mt-1 text-xs text-gray-500">
            Mínimo 8 caracteres con mayúsculas, minúsculas y números
          </p>
        </div>

        <div>
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Confirmar Contraseña
          </label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 ${
              errors.confirmPassword
                ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                : "border-gray-300"
            }`}
            placeholder="••••••••"
          />
          {errors.confirmPassword && (
            <p className="mt-1 text-sm text-red-600">
              {errors.confirmPassword}
            </p>
          )}
        </div>

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
                Tu billetera digital se creará automáticamente sin necesidad de
                gestionar claves privadas o seed phrases.
              </p>
            </div>
          </div>
        </div>

        <div className="flex space-x-3">
          {onBack && (
            <motion.button
              type="button"
              onClick={onBack}
              className="flex-1 bg-gray-100 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-200 transition-all duration-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Atrás
            </motion.button>
          )}
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

export default RegistrationStep;
