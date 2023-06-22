import { ChangeEvent, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import withLayout from '../../components/LayoutHOC.tsx';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [validEmail, setValidEmail] = useState(true);

  const validateEmail = (emailToValidate: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setValidEmail(emailRegex.test(emailToValidate));
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target?.value);
    validateEmail(e.target?.value);
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

export default withLayout(ForgotPassword, { title: 'החלפת סיסמא' });
