import { BrowserRouter, Route, Routes } from "react-router-dom";
import Backoffice from "./Backoffice/Backoffice";
import Client from "./Client/Client";
import { Login } from "./Client/pages/Login/Login.tsx";
import { ForgotPasswordRouter } from "./Client/pages/ForgotPassword/ForgotPasswordRouter.tsx";
import { OrderRide } from "./Client/pages/OrderRide/OrderRide.tsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Client />}>
          <Route path="login" element={<Login />} />
          <Route path="forgot-password" element={<ForgotPasswordRouter />} />
          <Route path="order-ride" element={<OrderRide />} />
        </Route>
        <Route path="/backoffice" element={<Backoffice />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
