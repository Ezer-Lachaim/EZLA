import { Route, Routes } from 'react-router-dom';
import { ForgotPassword } from './ForgotPassword.tsx';
import { VerificationCode } from './VerificationCode/VerificationCode.tsx';

export const ForgotPasswordRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<ForgotPassword />} />
      <Route path="/verify" element={<VerificationCode />} />
    </Routes>
  );
};
