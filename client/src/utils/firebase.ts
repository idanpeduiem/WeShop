// Your web app's Firebase configuration

import { getAnalytics } from "@firebase/analytics";
import { initializeApp } from "@firebase/app";
import {
  browserSessionPersistence,
  getAuth,
  GoogleAuthProvider,
  setPersistence,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  UserCredential,
} from "@firebase/auth";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
class Firebase {
  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  init = () => {
    const firebaseConfig = {
      apiKey: process.env.REACT_APP_API_KEY,
      authDomain: process.env.REACT_APP_AUTH_DOMAIN,
      projectId: process.env.REACT_APP_PROJECT_ID,
      storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
      messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
      appId: process.env.REACT_APP_APP_ID,
      measurementId: process.env.REACT_APP_MEASUREMENT_ID,
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const analytics = getAnalytics(app);
  };
  signOut = async () => {
    try {
      await signOut(firebase.getFirebaseAuth());
    } catch (error) {
      console.log(error);
      throw new Error(error?.toString());
    }
  };
  signInWithEmailAndPassword = async (email: string, password: string) => {
    const auth = firebase.getFirebaseAuth();
    await setPersistence(auth, browserSessionPersistence);

    const user: UserCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return user.user;
  };
  signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    const result = await signInWithPopup(firebase.getFirebaseAuth(), provider);
    // This gives you a Google Access Token. You can use it to access the Google API.
    // const credential = GoogleAuthProvider.credentialFromResult(result);
    // const token = credential?.accessToken;
    return result.user;
  };
  getFirebaseAuth = () => {
    return getAuth();
  };
}
export const firebase = new Firebase();
