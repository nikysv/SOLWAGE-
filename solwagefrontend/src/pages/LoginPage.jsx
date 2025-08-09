import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import BackButton from "../components/common/BackButton";
import UserNotRegisteredModal from "../components/auth/UserNotRegisteredModal";

const LoginPage = ({ auth }) => {
  const navigate = useNavigate();
  const fallbackAuth = useAuth();
  const { loginExistingUserWithGoogle } = auth || fallbackAuth;

  const [showNotRegisteredModal, setShowNotRegisteredModal] = useState(false);
  const [notRegisteredUserData, setNotRegisteredUserData] = useState(null);

  const handleGoogleLogin = async () => {
    try {
      const result = await loginExistingUserWithGoogle();

      if (result.requiresProfileCompletion) {
        // Solo pasamos los datos serializables del usuario
        const userInfo = {
          uid: result.user.uid,
          email: result.user.email,
          displayName: result.user.displayName,
          photoURL: result.user.photoURL,
        };
        navigate("/auth", {
          replace: true,
          state: { step: "user-type", userInfo },
        });
        return;
      }

      if (result.userData?.userType === "employer") {
        navigate("/employer/dashboard", { replace: true });
      } else if (result.userData?.userType === "freelancer") {
        navigate("/freelancer/dashboard", { replace: true });
      } else {
        navigate("/dashboard", { replace: true });
      }
    } catch (error) {
      console.error("Error en login con Google:", error);

      if (error.code === "auth/user-not-registered") {
        // Usuario no registrado - mostrar modal
        const userInfo = error.userInfo || {};
        setNotRegisteredUserData({
          email: userInfo.email || "Email no disponible",
          displayName: userInfo.displayName || "Usuario",
        });
        setShowNotRegisteredModal(true);
      } else {
        // Otros errores
        console.error("Error específico:", error.message);
        alert(
          `Error: ${
            error.message ||
            "No se pudo iniciar sesión con Google. Intenta de nuevo."
          }`
        );
      }
    }
  };

  const handleCloseModal = () => {
    setShowNotRegisteredModal(false);
    setNotRegisteredUserData(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <div className="flex items-center justify-between mb-6">
            <BackButton />
            <div className="flex-1"></div>
          </div>

          <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl text-white">🔐</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Iniciar Sesión
          </h2>
          <p className="text-gray-600">Accede a tu cuenta de Solwage</p>
        </div>

        <motion.div
          className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 hover:bg-gray-50 text-gray-800 py-3 rounded-lg font-semibold"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
              className="w-5 h-5"
            >
              <path
                fill="#FFC107"
                d="M43.611 20.083H42V20H24v8h11.303C33.739 31.26 29.24 34 24 34c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.156 7.961 3.039l5.657-5.657C34.046 4.14 29.268 2 24 2 12.955 2 4 10.955 4 22s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.651-.389-3.917z"
              />
              <path
                fill="#FF3D00"
                d="M6.306 14.691l6.571 4.819C14.473 16.03 18.879 13 24 13c3.059 0 5.842 1.156 7.961 3.039l5.657-5.657C34.046 4.14 29.268 2 24 2 15.317 2 7.996 6.709 4.363 13.388l1.943 1.303z"
              />
              <path
                fill="#4CAF50"
                d="M24 42c5.17 0 9.86-1.977 13.409-5.192l-6.191-5.238C29.142 33.335 26.715 34 24 34c-5.22 0-9.709-3.727-11.298-8.739l-6.5 5.017C9.806 36.793 16.367 42 24 42z"
              />
              <path
                fill="#1976D2"
                d="M43.611 20.083H42V20H24v8h11.303C34.92 31.26 29.24 34 24 34c-5.22 0-9.709-3.727-11.298-8.739l-6.5 5.017C9.806 36.793 16.367 42 24 42c8.837 0 19-6.5 19-20 0-1.341-.138-2.651-.389-3.917z"
              />
            </svg>
            Continuar con Google
          </button>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-1 border-t border-gray-300"></div>
            <span className="px-4 text-gray-500 text-sm">o</span>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>

          {/* Botón de registro */}
          <motion.button
            onClick={() => navigate("/auth")}
            className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white py-3 px-6 rounded-lg font-semibold hover:from-purple-700 hover:to-purple-800 transition-all duration-300 shadow-lg hover:shadow-xl"
            whileHover={{ y: -1, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
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
                d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
              />
            </svg>
            ¿No tienes cuenta? Regístrate
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Modal de usuario no registrado */}
      <UserNotRegisteredModal
        isOpen={showNotRegisteredModal}
        onClose={handleCloseModal}
        userEmail={notRegisteredUserData?.email}
        userDisplayName={notRegisteredUserData?.displayName}
      />
    </div>
  );
};

export default LoginPage;
