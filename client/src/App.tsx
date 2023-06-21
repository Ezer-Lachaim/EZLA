import { BrowserRouter, Route, Routes } from "react-router-dom";
import Backoffice from "./Backoffice/Backoffice";
import Client from "./Client/Client";
import mainRoutes from "./Backoffice/Routes/MainRoutes";
import authRoutes from "./Backoffice/Routes/AuthRoutes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Client />} />
        <Route path="/backoffice" element={<Backoffice />}>
          {mainRoutes.map((route) => route)}
          {authRoutes.map((route) => route)}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
