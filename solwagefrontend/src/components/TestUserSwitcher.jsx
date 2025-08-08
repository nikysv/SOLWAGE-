import React from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const TestUserSwitcher = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  const handleSwitchToFreelancer = () => {
    console.log("Switching to freelancer...");
    const result = auth.loadTestUser("freelancer");
    console.log("Freelancer user loaded:", result);
    // Usar window.location para forzar la recarga y asegurar el cambio
    window.location.href = "/freelancer/dashboard";
  };

  const handleSwitchToEmployer = () => {
    console.log("Switching to employer...");
    const result = auth.loadTestUser("employer");
    console.log("Employer user loaded:", result);
    // Usar window.location para forzar la recarga y asegurar el cambio
    window.location.href = "/employer/dashboard";
  };

  const handleLogout = () => {
    auth.logout();
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-white rounded-lg shadow-lg border border-gray-200 p-4">
      <h3 className="text-sm font-semibold text-gray-900 mb-2">Test Users</h3>
      {auth.user && (
        <div className="mb-2 p-2 bg-gray-100 rounded">
          <p className="text-xs text-gray-600">Current:</p>
          <p className="text-xs font-medium">
            {auth.user.userType || "Unknown"}
          </p>
          <p className="text-xs">{auth.user.profile?.fullName || "No name"}</p>
        </div>
      )}
      <div className="space-y-2">
        <button
          onClick={handleSwitchToFreelancer}
          className="w-full bg-blue-500 text-white px-3 py-1 rounded text-xs hover:bg-blue-600 transition-colors"
        >
          Switch to Freelancer
        </button>
        <button
          onClick={handleSwitchToEmployer}
          className="w-full bg-green-500 text-white px-3 py-1 rounded text-xs hover:bg-green-600 transition-colors"
        >
          Switch to Employer
        </button>
        <button
          onClick={handleLogout}
          className="w-full bg-red-500 text-white px-3 py-1 rounded text-xs hover:bg-red-600 transition-colors"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default TestUserSwitcher;
