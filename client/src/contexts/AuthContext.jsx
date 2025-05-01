import { createContext, useContext, useState, useEffect, useMemo } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import { initializeApp } from "firebase/app";

// Initialize Firebase (you'll need to add your own config)
const firebaseConfig = {
  apiKey: "AIzaSyCjmKYNA6A6SEpm6ZrVGVUae786_WPpeJo",
  authDomain: "terranova-16514.firebaseapp.com",
  projectId: "terranova-16514",
  storageBucket: "terranova-16514.firebasestorage.app",
  messagingSenderId: "1087607325842",
  appId: "1:1087607325842:web:81fd8da55ff03c7e71524b",
  measurementId: "G-W74SX41MT6",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Create AND export the auth context
export const AuthContext = createContext(); // <-- Added export here

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Monitor auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  // Clear error state at the beginning of auth operations
  const clearError = () => setError(null);

  // Sign up function
  const signup = async (email, password, displayName) => {
    clearError();
    setLoading(true); // Indicate loading during signup
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      // Update profile with display name *before* setting user state if possible
      if (displayName) {
        await updateProfile(userCredential.user, { displayName });
        // Manually update the user object with displayName for immediate reflection
        setUser({ ...userCredential.user, displayName });
      } else {
        setUser(userCredential.user); // Set user state if no display name update needed
      }
      setLoading(false);
      return userCredential.user;
    } catch (err) {
      console.error("Signup Error:", err.message);
      setError(err.message);
      setLoading(false);
      // Consider returning null or false instead of throwing,
      // so the UI component can handle the error message display.
      return null; // Or throw err; if you prefer handling it higher up
    }
  };

  // Sign in function
  const login = async (email, password) => {
    clearError();
    setLoading(true); // Indicate loading during login
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      // onAuthStateChanged will update the user state
      setLoading(false);
      return userCredential.user;
    } catch (err) {
      console.error("Login Error:", err.message);
      setError(err.message);
      setLoading(false);
      return null; // Or throw err;
    }
  };

  // Sign out function
  const logout = async () => {
    clearError();
    // No need to setLoading(true) for logout unless there's a noticeable delay
    try {
      await signOut(auth);
      // onAuthStateChanged will set user to null
    } catch (err) {
      console.error("Logout Error:", err.message);
      setError(err.message);
      // throw err; // Or handle as needed
    }
  };

  // Memoize the context value to prevent unnecessary re-renders
  // Only recreate the value object if its contents change
  const value = useMemo(
    () => ({
      user,
      loading,
      error,
      signup,
      login,
      logout,
    }),
    [user, loading, error]
  ); // Dependencies for useMemo

  return (
    <AuthContext.Provider value={value}>
      {/* You might want to render a loading indicator globally here */}
      {/* {loading ? <YourGlobalLoadingSpinner /> : children} */}
      {children}
    </AuthContext.Provider>
  );
};
