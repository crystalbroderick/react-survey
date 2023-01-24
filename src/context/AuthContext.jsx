import React, { useContext, useEffect, useState } from "react";
import { auth } from "../firebase.config";
import db from "../firebase.config.js";
import { doc, setDoc } from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { Navigate } from "react-router-dom";

export const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  function signup(email, password) {
    return createUserWithEmailAndPassword(auth, email, password).then(
      (user) => {
        setDoc(doc(db, "users", user.user.uid), { email: email });
      }
    );
  }

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logout() {
    auth.signOut();
    Navigate("/login");
  }

  function resetPassword(email) {
    return sendPasswordResetEmail(auth, email);
  }

  function updateEmail(email) {
    return updateEmail(currentUser, email);
  }

  function updatePassword(password) {
    return updatePassword(currentUser, password);
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signup,
    login,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
  };
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
