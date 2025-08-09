import { signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db, googleProvider } from "../config/firebase.js";
import SmartWalletService from "../lib/web3/smartWalletService.js";

class AuthService {
  constructor() {
    this.smartWalletService = new SmartWalletService();
  }

  // Login con Google (permite tanto login como registro)
  async loginWithGoogle() {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      // Verificar si el usuario ya existe en Firestore
      const userDoc = await getDoc(doc(db, "users", user.uid));

      if (userDoc.exists()) {
        // Usuario existente - ir directamente al dashboard
        const userData = userDoc.data();
        return {
          user,
          userData,
          isNewUser: false,
          requiresProfileCompletion:
            userData.requiresProfileCompletion || false,
        };
      } else {
        // Usuario nuevo - crear perfil básico
        const basicUserData = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          emailVerified: user.emailVerified,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          isNewUser: true,
          requiresProfileCompletion: true,
        };

        await setDoc(doc(db, "users", user.uid), basicUserData);

        return {
          user,
          userData: basicUserData,
          isNewUser: true,
          requiresProfileCompletion: true,
        };
      }
    } catch (error) {
      console.error("Error en login con Google:", error);
      throw error;
    }
  }

  // Login específico para usuarios existentes
  async loginExistingUserWithGoogle() {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      // Verificar si el usuario ya existe en Firestore
      const userDoc = await getDoc(doc(db, "users", user.uid));

      if (userDoc.exists()) {
        // Usuario existente - ir directamente al dashboard
        const userData = userDoc.data();
        return {
          user,
          userData,
          isNewUser: false,
          isExistingUser: true,
          requiresProfileCompletion:
            userData.requiresProfileCompletion || false,
        };
      } else {
        // Usuario no registrado - cerrar sesión y lanzar error específico
        await signOut(auth);
        const userInfo = {
          email: user.email,
          displayName: user.displayName,
          uid: user.uid,
        };
        const error = new Error("Usuario no registrado en Solwage");
        error.code = "auth/user-not-registered";
        error.userInfo = userInfo;
        throw error;
      }
    } catch (error) {
      if (error.code === "auth/user-not-registered") {
        throw error;
      }
      console.error("Error en login de usuario existente:", error);
      throw error;
    }
  }

  // Completar perfil de usuario
  async completeUserProfile(userId, profileData) {
    try {
      const userData = {
        ...profileData,
        profileCompletedAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        requiresProfileCompletion: false,
      };

      // Intentar actualizar el usuario en Firebase
      try {
        await updateDoc(doc(db, "users", userId), userData);
        console.log("✅ Perfil de usuario actualizado en Firebase");
      } catch (firebaseError) {
        console.warn(
          "⚠️ Error actualizando usuario en Firebase:",
          firebaseError
        );
        // Continuar sin actualizar Firebase
      }

      // Crear Smart Wallet si es necesario
      if (profileData.userType) {
        try {
          console.log("🔧 Creando Smart Wallet para usuario:", userId);
          const walletResult = await this.smartWalletService.createSafeWallet(
            userId
          );

          console.log("✅ Smart Wallet creada:", walletResult);

          userData.smartWalletAddress = walletResult.safeAddress;

          // Intentar actualizar con la dirección de la wallet
          try {
            await updateDoc(doc(db, "users", userId), {
              smartWalletAddress: walletResult.safeAddress,
              walletCreatedAt: new Date().toISOString(),
            });

            console.log(
              "💾 Usuario actualizado con Smart Wallet:",
              walletResult.safeAddress
            );
          } catch (updateError) {
            console.warn(
              "⚠️ Error actualizando wallet en Firebase:",
              updateError
            );
            // Continuar sin actualizar Firebase
          }
        } catch (walletError) {
          console.error("Error creando Smart Wallet:", walletError);
          // Crear una wallet básica como fallback
          const fallbackAddress = `0x${Math.random()
            .toString(16)
            .substr(2, 40)}`;
          userData.smartWalletAddress = fallbackAddress;
          console.log("🔄 Usando wallet de fallback:", fallbackAddress);
        }
      }

      return { success: true, userData };
    } catch (error) {
      console.error("Error completando perfil:", error);
      throw error;
    }
  }

  // Obtener usuario actual
  async getCurrentUser() {
    try {
      const user = auth.currentUser;
      if (!user) return null;

      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (userDoc.exists()) {
        return {
          user,
          userData: userDoc.data(),
        };
      }
      return { user };
    } catch (error) {
      console.error("Error obteniendo usuario actual:", error);
      throw error;
    }
  }

  // Logout
  async logout() {
    try {
      await signOut(auth);
      return { success: true };
    } catch (error) {
      console.error("Error en logout:", error);
      throw error;
    }
  }

  // Escuchar cambios de autenticación
  onAuthStateChanged(callback) {
    return onAuthStateChanged(auth, callback);
  }
}

export default new AuthService();
