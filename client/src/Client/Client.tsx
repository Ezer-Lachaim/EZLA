import { Outlet } from 'react-router-dom';
import { NavBar } from './components/NavBar/NavBar';
import { Footer } from './components/Footer/Footer';

const Client = () => {
  return (
    <div className="h-screen flex flex-col m-0">
      <NavBar title="הרשמה לשירות" hasGoBack />
      <div className="relative flex-1 bg-white max-h-full overflow-auto">
        <main className="flex items-center flex-col p-5 box-border">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Client;
