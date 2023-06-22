import { Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import NewCustomers from '../components/Main/components/NewCustomers/NewCustomers';
import Passengers from '../components/Main/components/Passengers/Passengers';
import Volunteers from '../components/Main/components/Volunteers/Volunteers';

const mainRoutes = [
  <Route
    key="base"
    path=""
    element={
      <ProtectedRoute>
        <NewCustomers />
      </ProtectedRoute>
    }
  />,
  <Route
    key="passengers"
    path="passengers"
    element={
      <ProtectedRoute>
        <Passengers />
      </ProtectedRoute>
    }
  />,
  <Route
    key="volunteers"
    path="volunteers"
    element={
      <ProtectedRoute>
        <Volunteers />
      </ProtectedRoute>
    }
  />
];

export default mainRoutes;
