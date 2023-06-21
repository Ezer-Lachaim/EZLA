import { ChangeEvent, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [validEmail, setValidEmail] = useState(true);

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target?.value);
  };

  useEffect(() => {
    validateEmail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email]);

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setValidEmail(emailRegex.test(email));
  };

  return (
    <>
      <h1>שכחתם סיסמה ?</h1>
      <p>אנא הזינו את האימייל שלכם ותקבלו קוד אימות באימייל שלכם</p>
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { width: '100%' }
        }}
        noValidate
        autoComplete="off"
        className="w-full"
      >
        <div>
          <TextField
            className="w-full"
            id="outlined-password-input"
            label="אימייל"
            placeholder="יש להקליד כתובת האימייל"
            value={email}
            onChange={handleEmailChange}
            error={!validEmail}
            helperText={!validEmail ? 'יש להקליד כתובת אימייל תקינה' : ''}
          />
        </div>
      </Box>
      <Button
        disabled={!validEmail}
        variant="contained"
        size="large"
        className="w-full"
        type="submit"
      >
        שליחה
      </Button>
    </>
  );
};
