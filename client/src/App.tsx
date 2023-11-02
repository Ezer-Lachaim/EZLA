import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthRoute, AuthRouteLoginAccess } from './AuthRoute';
import { UserRoleEnum } from './api-client';
import { useInitFirebaseCloudMessaging } from './hooks/firebase.ts';
import { Contexts } from './contexts';
import Backoffice from './Backoffice/Backoffice';
import backOfficeRoutes from './Backoffice/Routes';
import Client from './Client/Client';
import clientRoutes from './Client/Routes';
import NotFound from './Client/pages/NotFound/NotFound.tsx';

function App() {
  useInitFirebaseCloudMessaging();

  return (
    <Contexts>
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
    </Contexts>
  );
}

export default App;
