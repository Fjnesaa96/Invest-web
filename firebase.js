<script type="module">
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyCyXfGd92WDVlKapqTtfUAlElfwICxjzNc",
    authDomain: "indocapital-21d1f.firebaseapp.com",
    projectId: "indocapital-21d1f",
    storageBucket: "indocapital-21d1f.firebasestorage.app",
    messagingSenderId: "434461925094",
    appId: "1:434461925094:web:c104a84f62a887efd0e527",
    measurementId: "G-F62Q0YETB5"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
</script>
