import { Navigate } from "react-router-dom";

import { useAuth } from "../hooks/useAuth";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: string[];
}

const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const { isAuthenticated, user } = useAuth();

  /**
   * User not logged in
   */
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  /**
   * Wait until profile is loaded
   */
  if (!user) {
    return null;
  }

  /**
   * Admin has full access
   */
  if (user.role === "ADMIN") {
    return <>{children}</>;
  }

  /**
   * Role Based Authorization
   */
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
