import withLayout from '../../../components/LayoutHOC.tsx';
import car from '../../../../assets/car.png';
import { useUserContext } from '../../../../context/UserContext/UserContext.tsx';

const Riding = () => {
  const { activeRide: ride } = useUserContext();

  return (
    <div className="w-full overflow-auto">
      <div className="flex justify-center mb-2">
        <img src={car} alt="car" className="w-20" />
      </div>
      <h2 className="text-center text-blue-600">נוסעים ליעד</h2>
      <p className="text-center">{ride?.destination}</p>
    </div>
  );
};

export default withLayout(Riding, {
  title: 'נסיעה פעילה',
  showLogoutButton: true
});
