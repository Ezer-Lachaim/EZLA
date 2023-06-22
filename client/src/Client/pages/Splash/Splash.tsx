import logo from '../../../assets/splashLogo.png';
import redisLogo from '../../../assets/redisLogo.svg';

export const Splash = () => {
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen fixed bg-white z-50">
      <img src={logo} alt="logo" className="mb-2.5 animate-pulse" />
      <h1 className="text-center text-blue-500 font-medium w-64">
        שירות הסעות התנדבותי למבקרים בבתי חולים{' '}
      </h1>
      <div className="absolute bottom-6 flex gap-2 items-center" dir="ltr">
        <p className="text-sm">Powered by</p>
        <img src={redisLogo} alt="Redis logo" className="h-8" />
      </div>
    </div>
  );
};
