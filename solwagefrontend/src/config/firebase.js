import { initializeApp, getApps } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Cargar configuración desde variables de entorno (Vite)
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
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
