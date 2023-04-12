import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import isAuthentication from "./Authentication";
import { Route } from "react-router-dom";
import Cookies from "js-cookie";

const ProtectedRoutes = () => {
  const token = Cookies.get("token");

  if (token) {
    localStorage.setItem(token);
    return <Outlet />;
  } else {
    <Navigate to="/login" />;
    return null;
  }
};

export default ProtectedRoutes;
