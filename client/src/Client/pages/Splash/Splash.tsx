import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../../assets/splashLogo.png';
import redisLogo from '../../../assets/redisLogo.svg';

export const Splash = () => {
  const navigation = useNavigate();

  useEffect(() => {
    let timerId: ReturnType<typeof setTimeout>;

    const timer = () => {
      timerId = setTimeout(() => {
        navigation('/login');
      }, 4 * 1000); // 4 sec
    };

    timer();

    return () => {
      clearTimeout(timerId);
    };
  }, [navigation]);

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen ">
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
