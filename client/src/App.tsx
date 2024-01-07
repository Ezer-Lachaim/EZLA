import { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthRoute, AuthRouteLoginAccess } from './AuthRoute';
import { UserRoleEnum } from './api-client';
import { initApiMiddlewares as initAuthApiMiddlewares } from './services/auth';
import { init as initUserAuth, useUserStore } from './services/auth/user';
import { init as initMessaging } from './services/messaging';
import Backoffice from './Backoffice/Backoffice';
import backOfficeRoutes from './Backoffice/Routes';
import Client from './Client/Client';
import clientRoutes from './Client/Routes';
import NotFound from './Client/pages/NotFound/NotFound.tsx';

function App() {
  const isUserInitiated = useUserStore((state) => state.isUserInitiated);

  useEffect(() => {
    initAuthApiMiddlewares();
    initUserAuth();

    const timerId = setTimeout(() => {
      initMessaging();
    }, 2 * 1000);

    return () => {
      clearTimeout(timerId);
    };
  }, []);

  if (!isUserInitiated) {
    return null;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<Client />}>
          {clientRoutes.map((route) => route)}
        </Route>
        <Route
          path="backoffice"
          element={
            <AuthRoute
              AuthLoginAccess={AuthRouteLoginAccess.LoggedIn}
              AuthRoleAccess={UserRoleEnum.Admin}
            >
              <Backoffice />
            </AuthRoute>
          }
        >
          {backOfficeRoutes.map((route) => route)}
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
