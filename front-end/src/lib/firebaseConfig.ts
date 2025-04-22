
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // Importar o módulo de autenticação

// Sua configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAQ3GJZMK1R4xjoZMvTdlfCWZp3_HXdJDs",
  authDomain: "saas-eb399.firebaseapp.com",
  projectId: "saas-eb399",
  storageBucket: "saas-eb399.firebasestorage.app",
  messagingSenderId: "1060830397064",
  appId: "1:1060830397064:web:a56c6983cb7e4ce53a153d",
  measurementId: "G-98H5FHYKYK"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app); // Exporta a instância de autenticação