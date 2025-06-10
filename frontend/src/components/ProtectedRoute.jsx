import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  // If token or role is not present, redirect to login
  if (!token || !role) {
    return <Navigate to="/login" replace />;
  }

  // If role is not in allowedRoles, redirect to login
  if (!allowedRoles.includes(role)) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
