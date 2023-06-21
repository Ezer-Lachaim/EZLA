import { Route, Routes } from 'react-router-dom';
import { OrderRide } from './pages/OrderRide/OrderRide.tsx';
import { Login } from './pages/Login/Login.tsx';
import { ForgotPasswordRouter } from './pages/ForgotPassword/ForgotPasswordRouter.tsx';

const Client = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPasswordRouter />} />
      <Route path="/order-ride" element={<OrderRide />} />
    </Routes>
  );
};

export default Client;
