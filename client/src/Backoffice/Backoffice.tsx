import { Navigate } from 'react-router-dom';
import Main from './components/Main/Main';

const Backoffice = () => {
  const isAuthenticated = true;
  return !isAuthenticated ? <Navigate to="/login" /> : <Main />;
};

export default Backoffice;
