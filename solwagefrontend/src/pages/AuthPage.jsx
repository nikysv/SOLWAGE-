import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import RegistrationStep from "../components/auth/RegistrationStep";
import VerificationStep from "../components/auth/VerificationStep";
import ProfileCreationStep from "../components/auth/ProfileCreationStep";
import CompletionStep from "../components/auth/CompletionStep";

const AuthPage = ({ onLoginSuccess }) => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    password: "",
    userType: "",
    verificationCode: "",
    profile: {
      fullName: "",
      photoUrl: "",
      skills: "",
      experience: "",
      github: "",
      linkedin: "",
      twitter: "",
    },
  });

  const handleNextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const handlePreviousStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const updateFormData = (newData) => {
    setFormData({ ...formData, ...newData });
  };

  const handleBackToLanding = () => {
    navigate("/");
  };

  const handleProfileComplete = () => {
    // Simular creación de perfil y smart wallet
    setTimeout(() => {
      const userData = {
        email: formData.email,
        phone: formData.phone,
        userType: formData.userType || "freelancer",
        profile: formData.profile,
        smartWalletAddress: `0x${Math.random().toString(16).substr(2, 40)}`,
        createdAt: new Date().toISOString(),
        isNewUser: true, // Marcar como usuario nuevo
      };
      onLoginSuccess(userData);
      // Navegar al dashboard correcto
      if ((formData.userType || "freelancer") === "employer") {
        navigate("/employer/dashboard", { replace: true });
      } else {
        navigate("/freelancer/dashboard", { replace: true });
      }
    }, 2000);
  };

  const steps = [
    {
      id: 1,
      title: "Registro",
      component: (
        <RegistrationStep
          formData={formData}
          updateFormData={updateFormData}
          onNext={handleNextStep}
          onBack={handleBackToLanding}
        />
      ),
    },
    {
      id: 2,
      title: "Verificación",
      component: (
        <VerificationStep
          formData={formData}
          updateFormData={updateFormData}
          onNext={handleNextStep}
          onPrevious={handlePreviousStep}
        />
      ),
    },
    {
      id: 3,
      title: "Perfil",
      component: (
        <ProfileCreationStep
          formData={formData}
          updateFormData={updateFormData}
          onNext={handleNextStep}
          onPrevious={handlePreviousStep}
        />
      ),
    },
    {
      id: 4,
      title: "Finalización",
      component: (
        <CompletionStep
          formData={formData}
          onComplete={handleProfileComplete}
          onPrevious={handlePreviousStep}
        />
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            {steps.map((step, index) => (
              <div
                key={step.id}
                className={`flex items-center ${
                  index < steps.length - 1 ? "flex-1" : ""
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                    currentStep >= step.id
                      ? "bg-purple-600 text-white"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {step.id}
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`flex-1 h-1 mx-2 ${
                      currentStep > step.id ? "bg-purple-600" : "bg-gray-200"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="text-center">
            <h2 className="text-lg font-semibold text-gray-900">
              {steps[currentStep - 1].title}
            </h2>
          </div>
        </div>

        {/* Step Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl shadow-xl p-6"
          >
            {steps[currentStep - 1].component}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AuthPage;
