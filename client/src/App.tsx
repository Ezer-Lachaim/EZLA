import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import mainRoutes from './Backoffice/Routes/MainRoutes';
import Backoffice from './Backoffice/Backoffice';
import Client from './Client/Client';
import ForgotPassword from './Client/pages/ForgotPassword/ForgotPassword';
import Login from './Client/pages/Login/Login.tsx';
import Register from './Client/pages/Register/Register.tsx';
import VerificationCode from './Client/pages/ForgotPassword/VerificationCode/VerificationCode';
import ProcessingUserPage from './Client/pages/ProcessingUserPage/ProcessingUserPage.tsx';
import ChangePassword from './Client/pages/ChangePassword/ChangePassword.tsx';
import ChangePasswordSuccess from './Client/pages/ChangePassword/Success/ChangePasswordSuccess.tsx';
import CreatePassword from './Client/pages/CreatePassword/CreatePassword.tsx';
import Passenger from './Client/pages/Passenger/Passenger.tsx';
import OrderRide from './Client/pages/Passenger/OrderRide/OrderRide.tsx';
import Driver from './Client/pages/Driver/Driver.tsx';
import Rides from './Client/pages/Driver/Rides/Rides.tsx';
import { UserContextProvider } from './context/UserContext/UserContext.tsx';
import FirstSignUp from './Client/pages/FirstSignUp/FirstSignUp.tsx';
import Terms from './Client/pages/Terms/Terms.tsx';
import Privacy from './Client/pages/Privacy/Privacy.tsx';
import { Splash } from './Client/pages/Splash/Splash.tsx';

function App() {
  const [shouldDisplaySplash, setShouldDisplaySplash] = useState(true);

  useEffect(() => {
    let timerId: ReturnType<typeof setTimeout>;

    const timer = () => {
      timerId = setTimeout(() => {
        setShouldDisplaySplash(false);
      }, 4 * 1000); // 4 sec
    };

    timer();

    return () => {
      clearTimeout(timerId);
    };
  }, []);

  return (
    <BrowserRouter>
      <UserContextProvider>
        <Routes>
          <Route path="" element={<Client />}>
            <Route path="splash" element={<Splash />} />
            <Route path="login" element={<Login />} />
            <Route path="first-signup" element={<FirstSignUp />} />
            <Route path="terms" element={<Terms />} />
            <Route path="privacy" element={<Privacy />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
            <Route path="forgot-password/verify" element={<VerificationCode />} />
            <Route path="forgot-password/change" element={<ChangePassword />} />
            <Route path="forgot-password/success" element={<ChangePasswordSuccess />} />
            <Route path="register" element={<Register />} />
            <Route path="rides" element={<Rides />} />
            <Route path="processing-user" element={<ProcessingUserPage />} />
            <Route path="create-password" element={<CreatePassword />} />
            <Route path="passenger" element={<Passenger />}>
              <Route path="order-ride" element={<OrderRide />} />
            </Route>
            <Route path="driver" element={<Driver />}>
              <Route path="rides" element={<Rides />} />
            </Route>
          </Route>
          <Route path="backoffice" element={<Backoffice />}>
            {mainRoutes.map((route) => route)}
          </Route>
        </Routes>
        {shouldDisplaySplash && <Navigate replace to="/splash" />}
      </UserContextProvider>
    </BrowserRouter>
  );
}

export default App;
