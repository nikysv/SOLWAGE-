import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import FreelancerProfileStep from "../components/auth/FreelancerProfileStep";
import EmployerProfileStep from "../components/auth/EmployerProfileStep";
import CompletionStep from "../components/auth/CompletionStep";

const AuthPage = ({ auth }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const fallbackAuth = useAuth();
  const {
    loginWithGoogle,
    completeProfile,
    user: authUser,
    userData: authUserData,
  } = auth || fallbackAuth;

  const [currentStep, setCurrentStep] = useState("google-login");
  const [currentUser, setCurrentUser] = useState(null);
  const [smartWalletAddress, setSmartWalletAddress] = useState(null);
  const [formData, setFormData] = useState({
    userType: "",
    profile: {},
  });

  // Evitar sobreescrituras del flujo una vez iniciado
  const bootstrappedRef = useRef(false);

  useEffect(() => {
    if (bootstrappedRef.current) return; // solo boot una vez

    if (authUser) {
      setCurrentUser(authUser);
      if (
        !authUserData ||
        authUserData.requiresProfileCompletion ||
        !authUserData.userType
      ) {
        setCurrentStep("user-type");
      } else {
        if (authUserData.userType === "employer")
          navigate("/employer/dashboard");
        else if (authUserData.userType === "freelancer")
          navigate("/freelancer/dashboard");
        else navigate("/dashboard");
      }
      bootstrappedRef.current = true;
      return;
    }

    if (location.state?.user) {
      setCurrentUser(location.state.user);
    } else if (location.state?.userInfo) {
      // Crear un objeto user básico a partir de userInfo serializable
      const userFromInfo = {
        uid: location.state.userInfo.uid,
        email: location.state.userInfo.email,
        displayName: location.state.userInfo.displayName,
        photoURL: location.state.userInfo.photoURL,
      };
      setCurrentUser(userFromInfo);
    }
    if (
      location.state?.step === "user-type" ||
      location.state?.step === "profile"
    ) {
      setCurrentStep("user-type");
    }
    bootstrappedRef.current = true;
  }, [authUser, authUserData, location.state, navigate]);

  const handleGoogleLoginSuccess = async () => {
    try {
      const result = await loginWithGoogle();
      setCurrentUser(result.user);

      if (result.isNewUser || result.requiresProfileCompletion) {
        setCurrentStep("user-type");
      } else {
        if (result.userData?.userType === "employer") {
          navigate("/employer/dashboard");
        } else if (result.userData?.userType === "freelancer") {
          navigate("/freelancer/dashboard");
        } else {
          navigate("/dashboard");
        }
      }

      return result;
    } catch (error) {
      console.error("Error en login con Google:", error);
      throw error;
    }
  };

  const handleUserTypeSelected = () => {
    if (formData.userType) {
      setCurrentStep("profile");
    }
  };

  const handleProfileComplete = async (payload) => {
    try {
      const result = await completeProfile(currentUser.uid, payload);

      const finalUserType = result?.userData?.userType || formData.userType;
      const finalWallet = result?.userData?.smartWalletAddress || null;

      if (
        result?.userData?.userType &&
        result.userData.userType !== formData.userType
      ) {
        setFormData((prev) => ({
          ...prev,
          userType: result.userData.userType,
        }));
      }
      if (finalWallet) {
        setSmartWalletAddress(finalWallet);
      }

      navigate("/welcome", {
        replace: true,
        state: {
          walletAddress: finalWallet,
          userType: finalUserType,
          profile: payload?.profile || formData.profile,
        },
      });
    } catch (error) {
      console.error("Error completando perfil:", error);
      throw error;
    }
  };

  const handleBackToLogin = () => {
    setCurrentStep("google-login");
    setCurrentUser(null);
    setSmartWalletAddress(null);
  };

  const handleBackToUserType = () => setCurrentStep("user-type");

  const updateFormData = (newData) => setFormData({ ...formData, ...newData });

  const handleBackToLanding = () => navigate("/");

  const handleWelcomeContinue = () => {
    if (formData.userType === "employer") navigate("/employer/dashboard");
    else if (formData.userType === "freelancer")
      navigate("/freelancer/dashboard");
    else navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Solwage</h1>
          <p className="text-gray-600">
            {currentStep === "google-login" && "Inicia sesión para continuar"}
            {currentStep === "user-type" && "Selecciona tu tipo de usuario"}
            {currentStep === "profile" && "Completa tu perfil"}
          </p>
        </div>

        <AnimatePresence mode="wait">
          {currentStep === "google-login" && (
            <motion.div
              key="google-login"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="w-full max-w-md mx-auto"
            >
              <div className="bg-white rounded-lg shadow-lg p-8">
                <button
                  onClick={handleGoogleLoginSuccess}
                  className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 hover:bg-gray-50 text-gray-800 py-3 rounded-lg font-semibold"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 48 48"
                    className="w-5 h-5"
                  >
                    <path
                      fill="#FFC107"
                      d="M43.611 20.083H42V20H24v8h11.303C33.739 31.26 29.24 34 24 34c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.156 7.961 3.039l5.657-5.657C34.046 4.14 29.268 2 24 2 15.317 2 7.996 6.709 4.363 13.388l1.943 1.303z"
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
              </div>
            </motion.div>
          )}

          {currentStep === "user-type" && (
            <motion.div
              key="user-type"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="w-full max-w-md mx-auto"
            >
              <div className="bg-white rounded-lg shadow-lg p-8 space-y-6">
                <h3 className="text-xl font-semibold">
                  Selecciona tu tipo de usuario
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => updateFormData({ userType: "freelancer" })}
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
                    onClick={() => updateFormData({ userType: "employer" })}
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
                    onClick={handleBackToLogin}
                    className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg font-semibold"
                  >
                    Atrás
                  </button>
                  <button
                    onClick={handleUserTypeSelected}
                    disabled={!formData.userType}
                    className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 disabled:opacity-50 text-white py-3 rounded-lg font-semibold"
                  >
                    Continuar
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {currentStep === "profile" && formData.userType === "freelancer" && (
            <FreelancerProfileStep
              formData={formData}
              updateFormData={updateFormData}
              onNext={(data) => handleProfileComplete(data)}
              onBack={handleBackToUserType}
              user={currentUser}
            />
          )}

          {currentStep === "profile" && formData.userType === "employer" && (
            <EmployerProfileStep
              formData={formData}
              updateFormData={updateFormData}
              onNext={(data) => handleProfileComplete(data)}
              onBack={handleBackToUserType}
              user={currentUser}
            />
          )}

          {/* Fallback inline por si no hay navegación a /welcome */}
          {currentStep === "welcome" && (
            <motion.div
              key="welcome"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="w-full max-w-md mx-auto"
            >
              <div className="bg-white rounded-lg shadow-lg p-0">
                <div className="p-8">
                  <CompletionStep
                    formData={formData}
                    user={currentUser}
                    walletAddress={smartWalletAddress}
                    onComplete={() => navigate("/dashboard", { replace: true })}
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="text-center">
          <button
            onClick={handleBackToLanding}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            ← Volver al inicio
          </button>
        </div>
      </div>
    </div>
  );
};

export { AuthPage };
export default AuthPage;
