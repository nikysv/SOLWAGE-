import { useState, useEffect } from "react";

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Test users data
  const testUsers = {
    freelancer: {
      id: "1",
      email: "freelancer@test.com",
      phone: "+52 555 123 4567",
      userType: "freelancer",
      profile: {
        fullName: "Carlos Rodríguez",
        photoUrl: "",
        skills: "React, Node.js, TypeScript, Stellar, Soroban",
        experience:
          "Desarrollador full-stack con 4 años de experiencia en aplicaciones web y blockchain. Especializado en React, Node.js y smart contracts en Stellar.",
        github: "https://github.com/pruebarg",
        linkedin: "https://linkedin.com/in/pruebarg",
        twitter: "https://twitter.com/pruebarg",
      },
      smartWalletAddress: "0x7a8b9c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8",
      createdAt: "2024-01-15T10:30:00.000Z",
      isNewUser: false,
    },
    employer: {
      id: "2",
      email: "employer@test.com",
      phone: "+52 555 987 6543",
      userType: "employer",
      profile: {
        fullName: "María González",
        photoUrl: "",
        companyName: "TechCorp Solutions",
        industry: "technology",
        companyDescription:
          "Empresa líder en desarrollo de software y soluciones tecnológicas innovadoras. Especializada en aplicaciones blockchain y fintech.",
      },
      smartWalletAddress: "0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0",
      createdAt: "2024-01-10T14:20:00.000Z",
      isNewUser: false,
    },
  };

  // Simular verificación de autenticación al cargar
  useEffect(() => {
    const checkAuth = () => {
      // En una implementación real, aquí verificarías tokens, cookies, etc.
      const savedUser = localStorage.getItem("solwage_user");
      if (savedUser) {
        try {
          const userData = JSON.parse(savedUser);
          setUser(userData);
          setIsAuthenticated(true);
        } catch (error) {
          console.error("Error parsing user data:", error);
          localStorage.removeItem("solwage_user");
        }
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const login = (userData) => {
    // Simular login exitoso
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem("solwage_user", JSON.stringify(userData));
  };

  const logout = () => {
    // Simular logout
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("solwage_user");

    // Redirigir a la página principal después del logout
    window.location.href = "/";
  };

  const register = (userData) => {
    // Simular registro exitoso
    const newUser = {
      ...userData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      smartWalletAddress: `0x${Math.random().toString(16).substr(2, 40)}`, // Simular dirección de wallet
    };

    setUser(newUser);
    setIsAuthenticated(true);
    localStorage.setItem("solwage_user", JSON.stringify(newUser));

    return newUser;
  };

  // Función para cargar usuarios de prueba
  const loadTestUser = (userType) => {
    const testUser = testUsers[userType];
    if (testUser) {
      setUser(testUser);
      setIsAuthenticated(true);
      localStorage.setItem("solwage_user", JSON.stringify(testUser));
      return testUser;
    }
    return null;
  };

  return {
    isAuthenticated,
    user,
    isLoading,
    login,
    logout,
    register,
    loadTestUser, // Exportar la función para testing
  };
};

export default useAuth;
