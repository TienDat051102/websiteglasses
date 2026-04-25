import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { customer, loading } = useAuth();
  const location = useLocation();

  if (loading) return null;

  if (!customer) {
    return (
      <Navigate
        to="/buyer/login"
        replace
        state={{ redirect: location.pathname }}
      />
    );
  }

  return children;
};

export default ProtectedRoute;
