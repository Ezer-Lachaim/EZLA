import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import mainRoutes from './Backoffice/Routes/MainRoutes';
import Backoffice from './Backoffice/Backoffice';
import Client from './Client/Client';
import ForgotPassword from './Client/pages/ForgotPassword/ForgotPassword';
import Login from './Client/pages/Login/Login.tsx';
import Register from './Client/pages/Register/Register.tsx';
import VerificationCode from './Client/pages/ForgotPassword/VerificationCode/VerificationCode';
import ProcessingUserPage from './Client/pages/ProcessingUserPage/ProcessingUserPage';
import ChangePassword from './Client/pages/ChangePassword/ChangePassword';
import ChangePasswordSuccess from './Client/pages/ChangePassword/Success/ChangePasswordSuccess';
import CreatePassword from './Client/pages/CreatePassword/CreatePassword';
import Passenger from './Client/pages/Passenger/Passenger';
import OrderRide from './Client/pages/Passenger/OrderRide/OrderRide';
import Driver from './Client/pages/Driver/Driver';
import Rides from './Client/pages/Driver/Rides/Rides';
import { UserContextProvider } from './context/UserContext/UserContext';
import FirstSignUp from './Client/pages/FirstSignUp/FirstSignUp';
import Terms from './Client/pages/Terms/Terms';
import Privacy from './Client/pages/Privacy/Privacy';
import { Splash } from './Client/pages/Splash/Splash';
import Logout from './Client/pages/Login/Logout';
import ActiveRide from './Client/pages/Driver/ActiveRide/ActiveRide';
import PassengerActiveRide from './Client/pages/Passenger/ActiveRide/ActiveRide';
import { initFirebaseCloudMessaging } from './init-firebase.ts';
import Riding from "./Client/pages/Driver/Riding/Riding.tsx";

function App() {
  const [shouldDisplaySplash, setShouldDisplaySplash] = useState(true);

  useEffect(() => {
    let timerId: ReturnType<typeof setTimeout>;

    const timer = () => {
      timerId = setTimeout(() => {
        initFirebaseCloudMessaging();
        setShouldDisplaySplash(false);
      }, 2 * 1000);
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
            <Route path="login" element={<Login />} />
            <Route path="logout" element={<Logout />} />
            <Route path="first-signup" element={<FirstSignUp />} />
            <Route path="terms" element={<Terms />} />
            <Route path="privacy" element={<Privacy />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
            <Route path="forgot-password/verify" element={<VerificationCode />} />
            <Route path="forgot-password/change" element={<ChangePassword />} />
            <Route path="forgot-password/success" element={<ChangePasswordSuccess />} />
            <Route path="register" element={<Register />} />
            <Route path="processing-user" element={<ProcessingUserPage />} />
            <Route path="create-password" element={<CreatePassword />} />
            <Route path="passenger" element={<Passenger />}>
              <Route path="order-ride" element={<OrderRide />} />
              <Route path="active" element={<PassengerActiveRide />} />
            </Route>
            <Route path="driver" element={<Driver />}>
              <Route path="rides" element={<Rides />} />
              <Route path="active" element={<ActiveRide />} />
              <Route path="riding" element={<Riding />} />
            </Route>
          </Route>
          <Route path="backoffice" element={<Backoffice />}>
            {mainRoutes.map((route) => route)}
          </Route>
        </Routes>
        {shouldDisplaySplash && <Splash />}
      </UserContextProvider>
    </BrowserRouter>
  );
}

export default App;
