import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const TestLoginPage = ({ auth }) => {
  const navigate = useNavigate();

  const handleTestLogin = (userType) => {
    auth.loadTestUser(userType);
    // Navegar según el tipo de usuario
    if (userType === "employer") {
      navigate("/employer/dashboard");
    } else {
      navigate("/freelancer/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl text-white">🧪</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Test Login
            </h2>
            <p className="text-gray-600">
              Selecciona un tipo de usuario para probar
            </p>
          </div>

          <div className="space-y-4">
            <motion.button
              onClick={() => handleTestLogin("freelancer")}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-4 px-6 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-600 transition-all duration-300 shadow-lg hover:shadow-xl"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center justify-center space-x-3">
                <span className="text-xl">👨‍💻</span>
                <div className="text-left">
                  <div className="font-semibold">Freelancer</div>
                  <div className="text-sm opacity-90">Carlos Rodríguez</div>
                </div>
              </div>
            </motion.button>

            <motion.button
              onClick={() => handleTestLogin("employer")}
              className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white py-4 px-6 rounded-lg font-semibold hover:from-green-600 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center justify-center space-x-3">
                <span className="text-xl">🏢</span>
                <div className="text-left">
                  <div className="font-semibold">Employer</div>
                  <div className="text-sm opacity-90">
                    María González - TechCorp
                  </div>
                </div>
              </div>
            </motion.button>
          </div>

          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500">
              Esta página es solo para testing. En producción se usaría el login
              normal.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestLoginPage;
