import { Navigate } from 'react-router-dom';
import { useUserContext } from '../../context/UserContext/UserContext';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useUserContext();
  if (!user) return <Navigate to="/login" />;
  if (user.role !== 'Admin') return <Navigate to="/" />;
  return children;
};

export default ProtectedRoute;
