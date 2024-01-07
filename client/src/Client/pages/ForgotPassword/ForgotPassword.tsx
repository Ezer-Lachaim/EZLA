import Button from '@mui/material/Button';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FormControl, FormHelperText, InputLabel, OutlinedInput } from '@mui/material';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import withLayout from '../../components/LayoutHOC.tsx';
import useLocationHash from '../../hooks/useLocationHash';
import {
  checkActionCode,
  confirmPasswordReset,
  sendPasswordResetEmail
} from '../../../services/auth/user';
import { ChangePasswordForm } from '../ChangePassword/ChangePassword';

type Inputs = {
  email: string;
};

const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<Inputs>();
  const [success, setSuccess] = useState<boolean | null>(null);
  const [expiredCode, setIsExpiredCode] = useState<boolean | null>(null);
  const navigate = useNavigate();
  const actionCode = useLocationHash().oobCode;

  useEffect(() => {
    async function checkCode() {
      if (actionCode) {
        try {
          await checkActionCode(actionCode);
          setIsExpiredCode(false);
        } catch (e) {
          navigate('error');
        }
      }
    }
    checkCode();
  }, [actionCode, navigate]);

  const onSubmit: SubmitHandler<Inputs> = async ({ email }) => {
    try {
      await sendPasswordResetEmail(email);
      setSuccess(true);
    } catch (e) {
      setSuccess(false);
    }
  };

  if (actionCode) {
    return expiredCode == null ? (
      <p>טוען...</p>
    ) : (
      <ChangePasswordForm
        onSubmitData={async (data) => {
          try {
            await confirmPasswordReset(actionCode, data.password);
            navigate('success');
          } catch (e) {
            navigate('error');
          }
        }}
      />
    );
  }

  return (
    <>
      <h1>שכחתם סיסמה ?</h1>
      <form className="flex flex-col gap-9 w-full" onSubmit={handleSubmit(onSubmit)}>
        <p>אנא הזינו את האימייל שלכם ותקבלו קוד אימות באימייל שלכם</p>
        <FormControl>
          <InputLabel htmlFor="email">אימייל</InputLabel>
          <OutlinedInput
            id="email"
            error={!!errors.email}
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
        <Button
          variant="contained"
          size="large"
          className="w-full"
          type="submit"
          disabled={!!success}
        >
          שליחה
        </Button>
        {success && <p>הודעת אימות נשלחה לאימייל שלך</p>}
        {success === false && <p>אירעה שגיאה בשליחת האימייל</p>}
      </form>
    </>
  );
};

export default withLayout(ForgotPassword, { title: 'החלפת סיסמא', showBackButton: true });
