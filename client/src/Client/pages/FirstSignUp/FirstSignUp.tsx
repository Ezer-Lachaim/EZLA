import { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import FaceIcon from '@mui/icons-material/Face';
import CarIcon from '@mui/icons-material/DirectionsCarFilled';
import logo from '../../../assets/logo.png';
import withLayout from '../../components/LayoutHOC.tsx';
import { Splash } from '../Splash/Splash.tsx';

const FirstSignUp = () => {
  const navigation = useNavigate();
  const [shouldDisplaySplash, setShouldDisplaySplash] = useState(true);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setShouldDisplaySplash(false);
    }, 2 * 1000);

    return () => {
      clearTimeout(timerId);
    };
  }, []);

  return (
    <div className="flex flex-col items-center w-full">
      <img src={logo} alt="logo" className="mb-2.5" />
      <h1 className="text-center">שירות הסעות התנדבותי למבקרים בבתי חולים</h1>
      <p className="text-center text-sm">
        מרכז &#39;עזר לחיים&#39; נוסד במטרה להקל ולהוריד מסבלם של החולים ובני משפחתם מתוך ידיעה
        ברורה שהעזרה והסיוע מצילים ומוסיפים חיים ונותנים כוח לחולה להתמודד בדרך לבריאות.
      </p>
      <Button
        variant="contained"
        color="secondary"
        className="w-full mb-6 mt-10"
        size="large"
        endIcon={<FaceIcon />}
        onClick={() => {
          navigation('/register');
        }}
      >
        הרשמה לשירות ההסעות
      </Button>
      <Button
        variant="contained"
        className="w-full mb-5"
        size="large"
        disabled
        endIcon={<CarIcon />}
      >
        כניסה ראשונה כמתנדב
      </Button>
      <p className="text-xs text-center">
        מחפשים להצטרף לשירותנו כמתנדבים?💪❤️ <br />
        התקשרו לשירות הלקוחות למטה!
      </p>

      <div className="flex gap-2 absolute bottom-20">
        <p>משתמש רשום,</p>
        <Link to="/login">כניסה למערכת</Link>
      </div>

      {shouldDisplaySplash && <Splash />}
    </div>
  );
};

export default withLayout(FirstSignUp, { hideNavbar: true });
