import { useEffect, useState } from 'react';
import { Button, IconButton } from '@mui/material';
import { Close } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import FaceIcon from '@mui/icons-material/Face';
import CarIcon from '@mui/icons-material/DirectionsCarFilled';
import logo from '../../../assets/logo.png';
import useServerEnvSettings from '../../../hooks/serverEnvSettings';
import withLayout from '../../components/LayoutHOC.tsx';
import infoImg from '../../../assets/info.png';
import { Splash } from '../Splash/Splash.tsx';

const FirstSignUp = () => {
  const navigation = useNavigate();
  const serverEnvSettings = useServerEnvSettings();
  const [shouldDisplaySplash, setShouldDisplaySplash] = useState(true);
  const [shouldDisplayInfo, setShouldDisplayInfo] = useState(true);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setShouldDisplaySplash(false);
    }, 2 * 1000);

    const infoDisplayed = localStorage.getItem('info-displayed');
    if (infoDisplayed === 'true') {
      setShouldDisplayInfo(false);
    }

    return () => {
      clearTimeout(timerId);
    };
  }, []);

  const onInfoContinue = () => {
    setShouldDisplayInfo(false);
    localStorage.setItem('info-displayed', 'true');
  };

  // render the page only once the env settings are fetched
  if (!serverEnvSettings) {
    return null;
  }

  return (
    <div className="flex flex-col items-center w-full">
      <img src={logo} alt="logo" className="mb-2.5" />
      <h1 className="text-center">
        שירות הסעות התנדבותי
        {serverEnvSettings?.allowGuestRideMode ? '' : ' למבקרים בבית חולים ' }
      </h1>
      <p className="text-center text-sm">
        מרכז &#39;עזר לחיים&#39; נוסד במטרה להקל ולהוריד מסבלם של החולים ובני משפחתם מתוך ידיעה
        ברורה שהעזרה והסיוע מצילים ומוסיפים חיים ונותנים כוח לחולה להתמודד בדרך לבריאות.
      </p>
      <p className="text-center text-sm font-bold">לאור המצב פתחנו את השירות לכל מי שזקוק להסעה.</p>
      <Button
        variant="contained"
        color="secondary"
        className="w-full text-lg mb-6 mt-10"
        size="large"
        endIcon={<FaceIcon />}
        onClick={() =>
          navigation(serverEnvSettings?.allowGuestRideMode ? '/passenger/order-ride' : '/register')
        }
      >
        {serverEnvSettings?.allowGuestRideMode ? 'הזמנת נסיעה' : 'הרשמה לשירות ההסעות'}
      </Button>
      <Button
        variant="contained"
        className="w-full text-lg mb-5"
        size="large"
        endIcon={<CarIcon />}
        onClick={() => {
          navigation('/login?driverFirstLogin=1');
        }}
      >
        כניסה ראשונה כמתנדב
      </Button>
      <p className="text-md text-center">
        מחפשים להצטרף לקהילת המתנדבים?💪❤️ <br />
        למילוי טופס הצטרפות הקישו&nbsp;
        <a
          href={
            serverEnvSettings?.allowGuestRideMode
              ? 'https://docs.google.com/forms/d/e/1FAIpQLSdjJ5XnpOe4NsFZjuCfm-Ksz3RjYidoOvoiTmf1cv4BvxaacQ/viewform'
              : 'https://forms.gle/fRAY1H2HLyZrpZAR6'
          }
        >
          כאן
        </a>
        <br />
        או התקשרו לשירות הלקוחות 033-730440
      </p>

      <div className="flex gap-2 absolute bottom-20">
        <p>משתמש רשום,</p>
        <Link to="/login">כניסה למערכת</Link>
      </div>

      {serverEnvSettings?.allowGuestRideMode && shouldDisplayInfo && (
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
        <div
          className="flex flex-col items-center justify-center w-screen dvh-screen fixed bg-white z-50 top-0 left-0 bg-contain bg-no-repeat bg-center"
          style={{ backgroundImage: `url(${infoImg})` }}
          onClick={onInfoContinue}
        >
          <IconButton className="absolute left-1 top-1" onClick={onInfoContinue}>
            <Close />
          </IconButton>
          <Button
            variant="contained"
            color="error"
            size="large"
            className="absolute bottom-5"
            onClick={onInfoContinue}
          >
            המשך
          </Button>
        </div>
      )}

      {shouldDisplaySplash && <Splash />}
    </div>
  );
};

export default withLayout(FirstSignUp, { hideNavbar: true });
