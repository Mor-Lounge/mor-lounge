// src/components/PrivateRoute.js
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";

export default function PrivateRoute({ auth, children }) {
  const [user, loading] = useAuthState(auth);

  if (loading) return <div>Yükleniyor...</div>;
  if (!user) return <Navigate to="/" replace />;

  return children;
}