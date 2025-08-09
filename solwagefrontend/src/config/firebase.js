import { initializeApp, getApps } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Cargar configuración desde variables de entorno (Vite)
const firebaseConfig = {
  apiKey: "AIzaSyB8jBDw4Wk3yeX16LXECl28AiTiDXnESZ0",
  authDomain: "solwageprueba.firebaseapp.com",
  projectId: "solwageprueba",
  storageBucket: "solwageprueba.firebasestorage.app",
  messagingSenderId: "986855481225",
  appId: "1:986855481225:web:80ad00606d61f0168b8b58",
  measurementId: "G-5VDGJ5413Q",
};

// Validación básica de variables requeridas
const missingKeys = Object.entries(firebaseConfig)
  .filter(([_, v]) => !v)
  .map(([k]) => k);
if (missingKeys.length > 0) {
  // No lanzar error para permitir el arranque del dev server, pero avisar claramente
  console.warn(
    `Faltan variables de entorno Firebase: ${missingKeys.join(", ")}. ` +
      "Configura tu .env.local con VITE_FIREBASE_*."
  );
}

// Inicializar app (evitar reinicialización en HMR)
const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);

// Servicios
const auth = getAuth(app);
const db = getFirestore(app);

// Proveedor de Google
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });

export { app, auth, db, googleProvider };
