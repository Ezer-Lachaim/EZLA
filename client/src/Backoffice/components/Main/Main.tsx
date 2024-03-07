import { Outlet } from 'react-router-dom';
import Header from './components/Header/Header';
import SideBar from './components/SideBar/SideBar';

const Main = () => {
  return (
    <div className="flex flex-col dvh-screen" style={{ backgroundColor: '#F5F5F5' }}>
      <Header />
      <div className="flex flex-grow pt-16 min-h-0">
        <SideBar />
        <main className="flex flex-grow flex-col p-5 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Main;
