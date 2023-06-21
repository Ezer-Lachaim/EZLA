import { BrowserRouter, Route, Routes } from "react-router-dom";
import Backoffice from "./Backoffice/Backoffice";
import Client from "./Client/Client";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Client />} />
        <Route path="/backoffice" element={<Backoffice />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
