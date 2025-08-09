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
        setUser(firebaseUser);
        try {
          const current = await authService.getCurrentUser();
          const userData = current.userData;

          // Solo considerar autenticado si el usuario tiene datos en Firestore
          // y no requiere completar perfil
          if (
            userData &&
            !userData.requiresProfileCompletion &&
            userData.userType
          ) {
            setIsAuthenticated(true);
            setUserData(userData);
          } else {
            // Usuario existe en Firebase pero no en nuestra DB o necesita completar perfil
            setIsAuthenticated(false);
            setUserData(null);
          }
        } catch (e) {
          // Error obteniendo datos del usuario - no autenticado
          setIsAuthenticated(false);
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

    // Solo marcar como autenticado si el usuario tiene perfil completo
    if (
      result.userData &&
      !result.requiresProfileCompletion &&
      result.userData.userType
    ) {
      setIsAuthenticated(true);
      setUserData(result.userData);
    } else {
      setIsAuthenticated(false);
      setUserData(null);
    }

    return result;
  };

  const loginExistingUserWithGoogle = async () => {
    const result = await authService.loginExistingUserWithGoogle();
    setUser(result.user);

    // Los usuarios existentes siempre deben tener perfil completo
    if (result.userData && result.userData.userType) {
      setIsAuthenticated(true);
      setUserData(result.userData);
    } else {
      setIsAuthenticated(false);
      setUserData(null);
    }

    return result;
  };

  const completeProfile = async (userId, profileData) => {
    const result = await authService.completeUserProfile(userId, profileData);
    const newUserData = { ...(userData || {}), ...result.userData };
    setUserData(newUserData);

    // Marcar como autenticado una vez que el perfil esté completo
    if (newUserData.userType && !newUserData.requiresProfileCompletion) {
      setIsAuthenticated(true);
    }

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

  const clearAuthState = async () => {
    // Limpiar la sesión de Firebase sin redireccionar
    await authService.logout();
    setIsAuthenticated(false);
    setUser(null);
    setUserData(null);
  };

  return {
    isAuthenticated,
    isLoading,
    user,
    userData,
    loginWithGoogle,
    loginExistingUserWithGoogle,
    completeProfile,
    logout,
    clearAuthState,
  };
};

export default useAuth;
