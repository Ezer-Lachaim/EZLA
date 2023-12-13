import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import {
  Button,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Link, useSearchParams } from 'react-router-dom';
import logo from '../../../assets/logo.png';
import withLayout from '../../components/LayoutHOC.tsx';
import { signIn } from '../../../services/auth/user';
import { setNotificationsToken } from '../../../services/messaging';
import { ResponseError } from '../../../api-client';
import PwaInstall from '../../components/PwaInstall/PwaInstall';

type Inputs = {
  email: string;
  password: string;
};

const Login = () => {
  const [searchParams] = useSearchParams();
  const [showPassword, setShowPassword] = useState(false);
  const [isDriverFirstLogin] = useState(searchParams.has('driverFirstLogin'));
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async ({ email, password }) => {
    try {
      await signIn(email, password);
      // navigation will occur automatically in 'AuthRoute' (it re-renders each time a user is set)

      setNotificationsToken();
    } catch (e) {
      if ((e as ResponseError).response?.status === 401) {
        setError('email', { type: '401' });
        setError('password', { type: '401' }, { shouldFocus: true });
      }
    }
  };

  return (
    <div className="flex flex-col items-center w-full max-w-lg">
      <img src={logo} alt="logo" className="mb-2.5" />
      <h1>כניסה למערכת</h1>
      <form className="flex flex-col gap-9 w-full" onSubmit={handleSubmit(onSubmit)} noValidate>
        <FormControl>
          <InputLabel htmlFor="email" required>
            אימייל
          </InputLabel>
          <OutlinedInput
            id="email"
            error={!!errors.email}
            label="אימייל"
            placeholder={isDriverFirstLogin ? 'האימייל שאיתו נרשמתם' : 'דוגמה: david@gmail.com'}
            {...register('email', {
              required: true,
              pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            })}
          />
          {errors.email && (
            <FormHelperText error className="absolute top-full mr-0">
              {errors.email.type === 'required' && 'חסר אימייל'}
              {errors.email.type === 'pattern' && 'יש להקליד כתובת אימייל תקינה'}
            </FormHelperText>
          )}
        </FormControl>
        <FormControl variant="outlined">
          <InputLabel htmlFor="password" required>
            סיסמא
          </InputLabel>
          <OutlinedInput
            id="password"
            error={!!errors.password}
            type={showPassword ? 'text' : 'password'}
            label="סיסמא"
            placeholder={isDriverFirstLogin ? 'הזינו את מספר תעודת הזהות שלכם' : 'יש להקליד סיסמה'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowPassword((show) => !show)}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            {...register('password', { required: true })}
          />
          {errors.password && (
            <FormHelperText error className="absolute top-full mr-0">
              {errors.password.type === 'required' && 'חסרה סיסמא'}
              {errors.password.type === '401' && 'האימייל או סיסמה שהקלדתם אינם נכונים.'}
            </FormHelperText>
          )}
        </FormControl>

        <Button variant="contained" size="large" className="w-full" type="submit">
          כניסה
        </Button>
      </form>
      <Link to="/forgot-password" className="mt-5">
        שכחתי סיסמא
      </Link>

      <PwaInstall />

      <div className="absolute bottom-20">
        <span>אין לך חשבון?</span>
        &nbsp;
        <Link to="/first-signup">חזרה למסך הפתיחה</Link>
      </div>
    </div>
  );
};

export default withLayout(Login, { hideNavbar: true });
