// firebase-config.js
// นำสคริปต์ Firebase SDK ไปโหลดใน HTML ก่อนไฟล์นี้

const firebaseConfig = {
  apiKey: "AIzaSyBt0ikC_4GPLgJOeth-CzPIq_9V_jDKmLQ",
  authDomain: "inventory-f0daa.firebaseapp.com",
  projectId: "inventory-f0daa",
  storageBucket: "inventory-f0daa.firebasestorage.app",
  messagingSenderId: "257202949333",
  appId: "1:257202949333:web:1e0ed0f840b51f874c265c",
  measurementId: "G-BHBRN5PECH"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// Global db reference
const db = firebase.database();
