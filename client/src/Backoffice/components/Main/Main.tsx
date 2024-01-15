import { Outlet } from 'react-router-dom';
import Header from './components/Header/Header';
import SideBar from './components/SideBar/SideBar';

const Main = () => {
  return (
    <div className="flex flex-col dvh-screen">
      <Header />
      <div className="flex flex-1">
        <SideBar />
        <main className="flex overflow-hidden flex-1 flex-col px-5 py-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Main;
