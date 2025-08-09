import { useEffect, useState } from "react";
import authService from "../services/authService";

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = authService.onAuthStateChanged(async (firebaseUser) => {
      if (firebaseUser) {
        setIsAuthenticated(true);
        setUser(firebaseUser);
        try {
          const current = await authService.getCurrentUser();
          setUserData(current.userData || null);
        } catch (e) {
          setUserData(null);
        }
      } else {
        setIsAuthenticated(false);
        setUser(null);
        setUserData(null);
      }
      setIsLoading(false);
    });

    return () => unsubscribe && unsubscribe();
  }, []);

  const loginWithGoogle = async () => {
    const result = await authService.loginWithGoogle();
    setUser(result.user);
    setUserData(result.userData || null);
    setIsAuthenticated(true);
    return result;
  };

  const completeProfile = async (userId, profileData) => {
    const result = await authService.completeUserProfile(userId, profileData);
    setUserData((prev) => ({ ...(prev || {}), ...result.userData }));
    return result;
  };

  const logout = async () => {
    await authService.logout();
    setIsAuthenticated(false);
    setUser(null);
    setUserData(null);
    // Redirigir a la landing page
    window.location.replace("/");
  };

  return {
    isAuthenticated,
    isLoading,
    user,
    userData,
    loginWithGoogle,
    completeProfile,
    logout,
  };
};

export default useAuth;
