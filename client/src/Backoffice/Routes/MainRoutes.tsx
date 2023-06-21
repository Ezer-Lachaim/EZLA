import { Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

const mainRoutes = [
  <Route
    key="base"
    path=""
    element={
      <ProtectedRoute>
        <div>New customers</div>
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
  />,
];

export default mainRoutes;
