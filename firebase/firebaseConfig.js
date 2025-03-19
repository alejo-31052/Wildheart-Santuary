const firebaseConfig = {
    apiKey: "AIzaSyAQ4GyWip9n68Wi4H_GffulJEJ0c_tNS9w",
    authDomain: "wildhearth-sanctuary.firebaseapp.com",
    projectId: "wildhearth-sanctuary",
    storageBucket: "wildhearth-sanctuary.appspot.com",
    messagingSenderId: "180485342604",
    appId: "1:180485342604:web:ebfd9e3499c29c7bf782a9",
    measurementId: "G-RHD3373QKD"
  };
  
  // Initialize Firebase for compat
  firebase.initializeApp(firebaseConfig);

  window.auth = firebase.auth();
window.db = firebase.firestore();