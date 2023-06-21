import { Navigate } from "react-router-dom";

const RedirectToMainIfLoggedIn = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const isAuthenticated = true;
  if (isAuthenticated) return <Navigate to="/backoffice" />;
  return children;
};

export default RedirectToMainIfLoggedIn;
