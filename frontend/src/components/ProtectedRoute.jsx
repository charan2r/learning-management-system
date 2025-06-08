import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  // If token or role is not present, redirect to login
  if (!token || !role) {
    return <Navigate to="/login" replace />;
  }

  //  redirect to correct dashboard based on role
  if (!allowedRoles.includes(role)) {
    return <Navigate to={`/${role}`} replace />;
  }

  return children;
};

export default ProtectedRoute;
