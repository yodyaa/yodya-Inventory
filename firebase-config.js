
  // Firebase config
  const firebaseConfig = {
      apiKey: "AIzaSyBt0ikC_4GPLgJOeth-CzPIq_9V_jDKmLQ",
      authDomain: "inventory-f0daa.firebaseapp.com",
      databaseURL: "https://inventory-f0daa-default-rtdb.asia-southeast1.firebasedatabase.app",
      projectId: "inventory-f0daa",
      storageBucket: "inventory-f0daa.firebasestorage.app",
      messagingSenderId: "257202949333",
      appId: "1:257202949333:web:1e0ed0f840b51f874c265c",
      measurementId: "G-BHBRN5PECH"  };
  

  // init app
  firebase.initializeApp(firebaseConfig);

  // เรียกใช้ storage ได้แบบ v8
  const storage = firebase.storage();
  const db = firebase.firestore();
  const auth = firebase.auth();

  // export ไปใช้ได้ ถ้าใช้แบบ module
  window.storage = storage;
  window.db = db;
  window.auth = auth;
