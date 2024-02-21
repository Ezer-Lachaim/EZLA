import { Navigate, Outlet, Route } from 'react-router-dom';
import { AuthRoute, AuthRouteLoginAccess, AuthRouteInitialPasswordAccess } from '../AuthRoute';
import { UserRegistrationStateEnum, UserRoleEnum } from '../api-client';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword';
import Login from './pages/Login/Login.tsx';
import Register from './pages/Register/Register.tsx';
import VerificationCode from './pages/ForgotPassword/VerificationCode/VerificationCode';
import ProcessingUserPage from './pages/ProcessingUserPage/ProcessingUserPage';
import ChangePassword from './pages/ChangePassword/ChangePassword';
import ChangePasswordSuccess from './pages/ChangePassword/Success/ChangePasswordSuccess';
import ChangePasswordError from './pages/ChangePassword/Error/ChangePasswordError';
import CreatePassword from './pages/CreatePassword/CreatePassword';
import Passenger from './pages/Passenger/Passenger';
import OrderRide from './pages/Passenger/OrderRide/OrderRide';
import Driver from './pages/Driver/Driver';
import Rides from './pages/Driver/Rides/Rides';
import FirstSignUp from './pages/FirstSignUp/FirstSignUp';
import Terms from './pages/Terms/Terms';
import Privacy from './pages/Privacy/Privacy.tsx';
import Logout from './pages/Login/Logout';
import DriverActiveRide from './pages/Driver/ActiveRide/ActiveRide';
import PassengerActiveRide from './pages/Passenger/ActiveRide/ActiveRide';
import DriverRiding from './pages/Driver/Riding/Riding';
import DriverArrived from './pages/Passenger/DriverArrived/DriverArrived';
import PassengerRiding from './pages/Passenger/Riding/Riding';
import DriverRideCompleted from './pages/Driver/RideCompleted/RideCompleted';
import PassengerRideCompleted from './pages/Passenger/RideCompleted/RideCompleted';
import SearchingDriver from './pages/Passenger/SearchingDriver/SearchingDriver.tsx';

const routes = [
  <Route key="empty" index element={<Navigate to="/first-signup" replace />} />,
  <Route
    key="login"
    path="login"
    element={
      <AuthRoute>
        <Login />
      </AuthRoute>
    }
  />,
  <Route key="logout" path="logout" element={<Logout />} />,
  <Route
    key="firstSignup"
    path="first-signup"
    element={
      <AuthRoute>
        <FirstSignUp />
      </AuthRoute>
    }
  />,
  <Route key="terms" path="terms" element={<Terms />} />,
  <Route key="privacy" path="privacy" element={<Privacy />} />,
  <Route
    key="forgotPassword"
    path="forgot-password"
    element={
      <AuthRoute>
        <Outlet />
      </AuthRoute>
    }
  >
    <Route index element={<ForgotPassword />} />
    <Route path="verify" element={<VerificationCode />} />
    <Route path="change" element={<ChangePassword />} />
    <Route path="error" element={<ChangePasswordError />} />
    <Route path="success" element={<ChangePasswordSuccess />} />
  </Route>,
  <Route
    key="register"
    path="register"
    element={
      <AuthRoute>
        <Register />
      </AuthRoute>
    }
  />,
  <Route
    key="processingUser"
    path="processing-user"
    element={
      <AuthRoute
        AuthLoginAccess={AuthRouteLoginAccess.LoggedIn}
        AuthRegistrationState={UserRegistrationStateEnum.Pending}
      >
        <ProcessingUserPage />
      </AuthRoute>
    }
  />,
  <Route
    key="createPassword"
    path="create-password"
    element={
      <AuthRoute
        AuthLoginAccess={AuthRouteLoginAccess.LoggedIn}
        AuthInitialPasswordAccess={AuthRouteInitialPasswordAccess.NotCreated}
      >
        <CreatePassword />
      </AuthRoute>
    }
  />,
  <Route
    key="passenger"
    path="passenger"
    element={
      <AuthRoute
        AuthLoginAccess={AuthRouteLoginAccess.GuestAllowed}
        AuthRoleAccess={UserRoleEnum.Requester}
      >
        <Passenger />
      </AuthRoute>
    }
  >
    <Route path="order-ride" element={<OrderRide />} />
    <Route path="searching-driver" element={<SearchingDriver />} />
    <Route path="active" element={<PassengerActiveRide />} />
    <Route path="driver-arrived" element={<DriverArrived />} />
    <Route path="riding" element={<PassengerRiding />} />
    <Route path="completed" element={<PassengerRideCompleted />} />
  </Route>,
  <Route
    key="driver"
    path="driver"
    element={
      <AuthRoute
        AuthLoginAccess={AuthRouteLoginAccess.LoggedIn}
        AuthRoleAccess={UserRoleEnum.Driver}
      >
        <Driver />
      </AuthRoute>
    }
  >
    <Route path="rides" element={<Rides />} />
    <Route path="active" element={<DriverActiveRide />} />
    <Route path="riding" element={<DriverRiding />} />
    <Route path="completed" element={<DriverRideCompleted />} />
  </Route>
];

export default routes;
