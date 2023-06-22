import logo from '../../../assets/logo.png';
import withLayout from '../../components/LayoutHOC.tsx';

const Terms = () => {
  return (
    <div className="flex flex-col items-center w-full">
      <img src={logo} alt="logo" className="mb-2.5" />
      <h1 className="text-center">תקנון האתר</h1>
    </div>
  );
};

export default withLayout(Terms, { title: 'תקנון האתר עזר לחיים' });
