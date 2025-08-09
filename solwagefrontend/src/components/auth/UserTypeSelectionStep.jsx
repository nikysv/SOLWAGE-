import React from "react";
import { motion } from "framer-motion";

const UserTypeSelectionStep = ({
  formData,
  updateFormData,
  onNext,
  onBack,
  user,
}) => {
  const updateUserType = (userType) => updateFormData({ userType });

  return (
    <motion.div
      key="user-type"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full max-w-md mx-auto"
    >
      <div className="bg-white rounded-lg shadow-lg p-8 space-y-6">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
            {user?.photoURL ? (
              <img
                src={user.photoURL}
                alt="Profile"
                className="w-12 h-12 rounded-full"
              />
            ) : (
              <span className="text-2xl text-white">👤</span>
            )}
          </div>
          <h3 className="text-xl font-semibold">
            Selecciona tu tipo de usuario
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() => updateUserType("freelancer")}
            className={`p-4 border-2 rounded-lg text-left ${
              formData.userType === "freelancer"
                ? "border-purple-500 bg-purple-50"
                : "border-gray-300 hover:border-purple-300"
            }`}
          >
            👨‍💻 Freelancer
          </button>
          <button
            type="button"
            onClick={() => updateUserType("employer")}
            className={`p-4 border-2 rounded-lg text-left ${
              formData.userType === "employer"
                ? "border-purple-500 bg-purple-50"
                : "border-gray-300 hover:border-purple-300"
            }`}
          >
            🏢 Empleador
          </button>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onBack}
            className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg font-semibold"
          >
            Atrás
          </button>
          <button
            onClick={onNext}
            disabled={!formData.userType}
            className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 disabled:opacity-50 text-white py-3 rounded-lg font-semibold"
          >
            Continuar
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default UserTypeSelectionStep;
