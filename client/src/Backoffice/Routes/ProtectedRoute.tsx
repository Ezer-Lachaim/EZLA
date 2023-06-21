import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = true;
  if (!isAuthenticated) return <Navigate to="/backoffice/login" />;
  return children;
};

export default ProtectedRoute;
