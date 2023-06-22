import {
  Button,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput
} from '@mui/material';
import { useState } from 'react';
import { VisibilityOff, Visibility } from '@mui/icons-material';
import { SubmitHandler, useForm } from 'react-hook-form';
import withLayout from '../../components/LayoutHOC';

type Inputs = {
  email: string;
  password: string;
  repeatPassword: string;
};

const CreatePassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [noMatch, setNoMatch] = useState(false);

  const {
    handleSubmit,
    formState: { errors },
    register
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    // eslint-disable-next-line no-console
    console.log(data);

    if (data.password !== data.repeatPassword) {
      setNoMatch(true);
    } else {
      setNoMatch(false);
    }
  };
  return (
    <div className="flex flex-col items-center w-full">
      <h1 className="m-0">צרו שם משתמש וסיסמה</h1>
      <p className="text-center">
        הסיסמה חייבת לכלול לפחות 8 תווים ולהכיל: אותיות גדולות, אותיות קטנות, מספרים וסימנים כגון
        !@#?*
      </p>
      <form
        className="flex mt-7 flex-col gap-9 w-full"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <FormControl>
          <InputLabel htmlFor="email" required>
            אימייל
          </InputLabel>
          <OutlinedInput
            id="email"
            label="אימייל"
            placeholder="דוגמה: david@gmail.com"
            {...register('email', { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ })}
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
            סיסמה
          </InputLabel>
          <OutlinedInput
            id="password"
            type={showPassword ? 'text' : 'password'}
            label="סיסמה"
            placeholder="יש להקליד סיסמה"
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
            {...register('password', {
              required: true,
              pattern: /(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}/
            })}
          />
          {errors.password && (
            <FormHelperText error className="absolute top-full mr-0">
              {errors.password.type === 'required' && 'חסרה סיסמא חדשה'}
              {errors.password.type === 'pattern' && 'יש לבחור סיסמה בהתאם להנחיות המפורטות למעלה'}
            </FormHelperText>
          )}
        </FormControl>
        <FormControl variant="outlined">
          <InputLabel htmlFor="repeatPassword" required>
            וידוא סיסמה
          </InputLabel>
          <OutlinedInput
            id="repeatPassword"
            type={showPassword ? 'text' : 'password'}
            label="סיסמה"
            placeholder="יש להקליד סיסמה שוב"
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
            {...register('repeatPassword', {
              required: true,
              pattern: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
            })}
          />
          {(errors.repeatPassword || noMatch) && (
            <FormHelperText error className="absolute top-full mr-0">
              {errors.repeatPassword?.type === 'required' && 'חסרה סיסמא חדשה'}
              {errors.repeatPassword?.type === 'pattern' &&
                'יש לבחור סיסמה בהתאם להנחיות המפורטות למעלה'}
              {noMatch && 'סיסמאות אינן תואמות'}
            </FormHelperText>
          )}
        </FormControl>
        <Button variant="contained" size="large" className="w-full" type="submit">
          אישור
        </Button>
      </form>
    </div>
  );
};

export default withLayout(CreatePassword, { title: 'כניסה לשירות ההסעות', hideBackButton: true });
