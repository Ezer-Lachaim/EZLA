import { Route } from "react-router-dom";
import RedirectToMainIfLoggedIn from "./RedirectToMainIfLoggedIn";

const AuthRoutes = [
  <Route
    key="login"
    path="login"
    element={
      <RedirectToMainIfLoggedIn>
        <div>Login</div>
      </RedirectToMainIfLoggedIn>
    }
  />,
];

export default AuthRoutes;
