import { Outlet } from "react-router-dom";
import Header from "./components/Header/Header";
import SideBar from "./components/SideBar/SideBar";

const Main = () => {
  return (
    <div>
      <Header />
      <div className="flex flex-1">
        <SideBar />
        <main className="flex flex-1 flex-col px-5 py-4">{<Outlet />}</main>
      </div>
    </div>
  );
};

export default Main;
