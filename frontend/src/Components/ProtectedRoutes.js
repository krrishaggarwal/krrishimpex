import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isAdmin = sessionStorage.getItem("adminToken");

  return isAdmin ? children : <Navigate to="/admin" replace />;
};

export default ProtectedRoute;
