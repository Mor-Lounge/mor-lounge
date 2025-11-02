// src/contexts/FirebaseContext.js
import React, { createContext } from "react";
import { auth } from "../firebaseConfig";

export const FirebaseContext = createContext();

export function FirebaseProvider({ children }) {
  return (
    <FirebaseContext.Provider value={{ auth }}>
      {children}
    </FirebaseContext.Provider>
  );
}