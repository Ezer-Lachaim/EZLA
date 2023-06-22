import React from 'react';
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
import withLayout from '../../components/LayoutHOC.tsx';

type Inputs = {
  password: string;
  confirmPassword: string;
};

const ChangePassword = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [noMatch, setNoMatch] = React.useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<Inputs>();

  // eslint-disable-next-line no-console
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);

    if (data.password !== data.confirmPassword) {
      setNoMatch(true);
    } else {
      setNoMatch(false);
    }
  };

  return (
    <div className="flex flex-col items-center w-full">
      <h1>צרו סיסמא חדשה</h1>
      <form className="flex flex-col gap-9 w-full" onSubmit={handleSubmit(onSubmit)} noValidate>
        <p>
          הסיסמא חייבת לכלול לפחות 8 תווים ולהכיל: אותיות גדולות, אותיות קטנות, מספרים וסימנים כגון
          !@#?*
        </p>
        <FormControl variant="outlined">
          <InputLabel htmlFor="password" required>
            סיסמא חדשה
          </InputLabel>
          <OutlinedInput
            id="password"
            error={!!errors.password || noMatch}
            type={showPassword ? 'text' : 'password'}
            label="סיסמא חדשה"
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
          <InputLabel htmlFor="confirmPassword" required>
            וידוא סיסמא חדשה
          </InputLabel>
          <OutlinedInput
            id="confirmPassword"
            error={!!errors.confirmPassword || noMatch}
            type={showPassword ? 'text' : 'password'}
            label="וידוא סיסמא חדשה"
            placeholder="יש להקליד סיסמה בשנית"
            required
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
            {...register('confirmPassword', {
              required: true,
              pattern: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
            })}
          />
          {(errors.confirmPassword || noMatch) && (
            <FormHelperText error className="absolute top-full mr-0">
              {errors.confirmPassword?.type === 'required' && 'חסרה סיסמא חדשה'}
              {errors.confirmPassword?.type === 'pattern' &&
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

export default withLayout(ChangePassword, { title: 'החלפת סיסמא' });
