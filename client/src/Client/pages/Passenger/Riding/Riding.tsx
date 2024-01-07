import withLayout from '../../../components/LayoutHOC.tsx';
import car from '../../../../assets/car.png';
import { useActiveRide } from '../../../../hooks/activeRide';

const Riding = () => {
  const { activeRide: ride } = useActiveRide();

  return (
    <div className="w-full h-full flex flex-col justify-center gap-10 items-center">
      <img src={car} alt="car" className="w-20 animate-bounce" />
      <div>
        <h1 className="text-center m-0">נוסעים ליעד</h1>
        <p className="text-center">{ride?.destination}</p>
      </div>
    </div>
  );
};

export default withLayout(Riding, {
  title: 'נסיעה פעילה',
  showLogoutButton: true
});
