import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
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
import Logout from './Client/pages/Login/Logout';
import ActiveRide from './Client/pages/Driver/ActiveRide/ActiveRide';
import PassengerActiveRide from './Client/pages/Passenger/ActiveRide/ActiveRide';
import { initFirebaseCloudMessaging } from './init-firebase.ts';
import Riding from './Client/pages/Driver/Riding/Riding';
import DriverArrived from './Client/pages/Passenger/DriverArrived/DriverArrived';
import PassengerRiding from './Client/pages/Passenger/Riding/Riding';
import RideCompleted from './Client/pages/Driver/RideCompleted/RideCompleted';
import PassengerRideCompleted from './Client/pages/Passenger/RideCompleted/RideCompleted';
import NotFound from './Client/pages/NotFound/NotFound.tsx';

const queryClient = new QueryClient();

function App() {
  useEffect(() => {
    const timerId = setTimeout(() => {
      initFirebaseCloudMessaging();
    }, 2 * 1000);

    return () => {
      clearTimeout(timerId);
    };
  }, []);

  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
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
                <Route path="driver-arrived" element={<DriverArrived />} />
                <Route path="riding" element={<PassengerRiding />} />
                <Route path="completed" element={<PassengerRideCompleted />} />
              </Route>
              <Route path="driver" element={<Driver />}>
                <Route path="rides" element={<Rides />} />
                <Route path="active" element={<ActiveRide />} />
                <Route path="riding" element={<Riding />} />
                <Route path="completed" element={<RideCompleted />} />
              </Route>
            </Route>
            <Route path="backoffice" element={<Backoffice />}>
              {mainRoutes.map((route) => route)}
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </UserContextProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
