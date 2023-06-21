'use client';

import React from 'react';
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
import { SubmitHandler, useForm } from 'react-hook-form';

type Inputs = {
  email: string;
  password: string;
};

export const LoginForm = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  return (
    <form className="flex flex-col gap-9 w-full" onSubmit={handleSubmit(onSubmit)}>
      <FormControl>
        <InputLabel htmlFor="email">אימייל</InputLabel>
        <OutlinedInput
          id="email"
          error={!!errors.email}
          label="אימייל"
          {...register('email', { required: true })}
        />
        {errors.email?.type === 'required' && (
          <FormHelperText error className="absolute top-full">
            חסר אימייל
          </FormHelperText>
        )}
      </FormControl>
      <FormControl variant="outlined">
        <InputLabel htmlFor="password">סיסמא</InputLabel>
        <OutlinedInput
          id="password"
          error={!!errors.password}
          type={showPassword ? 'text' : 'password'}
          label="סיסמא"
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
        {errors.password?.type === 'required' && (
          <FormHelperText error className="absolute top-full">
            חסר סיסמא
          </FormHelperText>
        )}
      </FormControl>

      <Button variant="contained" size="large" className="w-full" type="submit">
        כניסה
      </Button>
    </form>
  );
};
