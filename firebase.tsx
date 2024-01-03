import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

  const firebaseConfig = {
    apiKey: "AIzaSyD8jVMVWI84VTRT41GgVLYALHdXZddf9rU",
    authDomain: "pathanti.firebaseapp.com",
    projectId: "pathanti",
    storageBucket: "pathanti.appspot.com",
    messagingSenderId: "882166439342",
    appId: "1:882166439342:web:e5f09383e56311cde57c3f"
  };
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  export const auth = getAuth(app);
  export default app;