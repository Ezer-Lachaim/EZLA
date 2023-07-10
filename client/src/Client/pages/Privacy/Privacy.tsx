import logo from '../../../assets/logo.png';
import withLayout from '../../components/LayoutHOC.tsx';

const Privacy = () => {
  return (
    <div className="flex flex-col items-center w-full">
      <img src={logo} alt="logo" className="mb-2.5" />
      <h1 className="text-center">מדיניות הפרטיות</h1>
    </div>
  );
};

export default withLayout(Privacy, { title: 'מדיניות הפרטיות עזר לחיים' });
