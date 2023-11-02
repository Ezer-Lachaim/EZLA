import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthRoute, AuthRouteLoginAccess } from './AuthRoute';
import { UserRoleEnum } from './api-client';
import { UserContextProvider } from './context/UserContext/UserContext';
import Backoffice from './Backoffice/Backoffice';
import backOfficeRoutes from './Backoffice/Routes';
import Client from './Client/Client';
import clientRoutes from './Client/Routes';
import NotFound from './Client/pages/NotFound/NotFound.tsx';
import { initFirebaseCloudMessaging } from './init-firebase.ts';

const queryClient = new QueryClient();

function App() {
  useEffect(() => {
    const timerId = setTimeout(() => {
      initFirebaseCloudMessaging();
    }, 2 * 1000);

    return () => {
      clearTimeout(timerId);
    };
  }, []);

  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <UserContextProvider>
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
        </UserContextProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
