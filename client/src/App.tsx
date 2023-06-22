/* eslint-disable @typescript-eslint/no-floating-promises */
import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import mainRoutes from './Backoffice/Routes/MainRoutes';
import Backoffice from './Backoffice/Backoffice';
import Client from './Client/Client';
import ForgotPassword from './Client/pages/ForgotPassword/ForgotPassword';
import Login from './Client/pages/Login/Login.tsx';
import OrderRide from './Client/pages/OrderRide/OrderRide.tsx';
import VerificationCode from './Client/pages/ForgotPassword/VerificationCode/VerificationCode';
import { Configuration, RideApi, RideStateEnum } from './api-client';
import ProcessingUserPage from './Client/pages/ProcessingUserPage/ProcessingUserPage.tsx';
import ChangePassword from './Client/pages/ChangePassword/ChangePassword.tsx';
import ChangePasswordSuccess from './Client/pages/ChangePassword/Success/ChangePasswordSuccess.tsx';

const rideapi = new RideApi(new Configuration({ basePath: 'http://localhost:8080' }));

function App() {
  const [rideState, setRideState] = useState<RideStateEnum>();
  useEffect(() => {
    async function fetchData() {
      const ride = await rideapi.getActiveRideForUser({ userId: 'a' });
      setRideState(ride.state);
    }
    fetchData();
  }, []);
  return (
    <>
      <div>{rideState}</div>
      <BrowserRouter>
        <Routes>
          <Route path="" element={<Client />}>
            <Route path="login" element={<Login />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
            <Route path="forgot-password/verify" element={<VerificationCode />} />
            <Route path="forgot-password/change" element={<ChangePassword />} />
            <Route path="forgot-password/success" element={<ChangePasswordSuccess />} />
            <Route path="register" element={<OrderRide />} />
            <Route path="processing-user" element={<ProcessingUserPage />} />
          </Route>
          <Route path="backoffice" element={<Backoffice />}>
            {mainRoutes.map((route) => route)}
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
