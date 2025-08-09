import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import CompletionStep from "../components/auth/CompletionStep";

const WelcomePage = ({ auth }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const fallbackAuth = useAuth();
  const { user, userData } = auth || fallbackAuth;

  const walletAddress =
    location.state?.walletAddress || userData?.smartWalletAddress || "";
  const userType = location.state?.userType || userData?.userType || "";
  const profile = location.state?.profile || userData?.profile || {};

  const formData = {
    userType,
    profile,
  };

  const handleContinue = () => {
    if (userType === "employer")
      navigate("/employer/dashboard", { replace: true });
    else if (userType === "freelancer")
      navigate("/freelancer/dashboard", { replace: true });
    else navigate("/dashboard", { replace: true });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <CompletionStep
            formData={formData}
            user={user}
            walletAddress={walletAddress}
            onComplete={handleContinue}
          />
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
