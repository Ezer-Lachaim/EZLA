import Button from '@mui/material/Button';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FormControl, FormHelperText, InputLabel, OutlinedInput } from '@mui/material';
import withLayout from '../../components/LayoutHOC.tsx';

type Inputs = {
  email: string;
};

const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<Inputs>();

  // eslint-disable-next-line no-console
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

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
            <FormHelperText error className="absolute top-full">
              {errors.email.type === 'required' && 'חסר אימייל'}
              {errors.email.type === 'pattern' && 'יש להקליד כתובת אימייל תקינה'}
            </FormHelperText>
          )}
        </FormControl>
        <Button variant="contained" size="large" className="w-full" type="submit">
          שליחה
        </Button>
      </form>
    </>
  );
};

export default withLayout(ForgotPassword, { title: 'החלפת סיסמא' });
