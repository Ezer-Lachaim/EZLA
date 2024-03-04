import { Route } from 'react-router-dom';
import NewCustomers from './components/Main/components/NewCustomers/NewCustomers';
import Passengers from './components/Main/components/Passengers/Passengers';
import Volunteers from './components/Main/components/Volunteers/Volunteers';
import Rides from './components/Main/components/Rides/Rides';
import Settings from './components/Main/components/Settings/Settings';

const routes = [
  <Route key="" path="" element={<NewCustomers />} />,
  <Route key="rides" path="rides" element={<Rides />} />,
  <Route key="passengers" path="passengers" element={<Passengers />} />,
  <Route key="volunteers" path="volunteers" element={<Volunteers />} />,
  <Route key="settings" path="settings" element={<Settings />} />

];

export default routes;
