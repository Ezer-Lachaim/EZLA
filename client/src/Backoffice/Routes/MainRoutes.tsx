import { Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import NewCustomers from '../components/Main/components/NewCustomers/NewCustomers';

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
        <div>passengers</div>
      </ProtectedRoute>
    }
  />,
  <Route
    key="volunteers"
    path="volunteers"
    element={
      <ProtectedRoute>
        <div>volunteers</div>
      </ProtectedRoute>
    }
  />
];

export default mainRoutes;
