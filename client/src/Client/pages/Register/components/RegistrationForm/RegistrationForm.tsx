import { Button, Checkbox, FormControlLabel, TextField } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { RegistrationFormInputs } from './RegistrationForm.types';

const registrationDefaultValues: RegistrationFormInputs = {
  firstName: '',
  lastName: '',
  id: '',
  registerPhone: '',
  passengerPhone: '',
  email: '',
  address: '',
  specialRequests: {
    isWheelChair: false,
    isBabySafetySeat: false,
    isChildSafetySeat: false,
    isHighVehicle: false,
    isWheelChairTrunk: false,
    isPatientDelivery: false
  }
};

export const RegistrationForm = () => {
  const {
    register,
    watch,
    handleSubmit,
    formState: { isDirty, isValid }
  } = useForm<RegistrationFormInputs>({
    defaultValues: registrationDefaultValues
  });

  // eslint-disable-next-line no-console
  const onSubmit: SubmitHandler<RegistrationFormInputs> = (data) => console.log(data);

  return (
    <form className="mt-5 flex flex-col gap-4" noValidate onSubmit={handleSubmit(onSubmit)}>
      <TextField
        label="שם פרטי"
        fullWidth
        autoFocus
        required
        type="text"
        {...register('firstName', { required: true })}
      />
      <TextField
        label="שם משפחה"
        fullWidth
        required
        type="text"
        {...register('lastName', { required: true })}
      />
      <TextField
        label="תעודת זהות"
        fullWidth
        required
        type="number"
        placeholder="יש להזין 9 ספרות כולל ספרת ביקורת"
        {...register('id', { required: true })}
      />
      <TextField
        label="טלפון נייד של המזמין"
        fullWidth
        required
        type="number"
        placeholder="יש להזין 10 ספרות של הטלפון הנייד"
        {...register('registerPhone', { required: true })}
      />
      <TextField
        label="טלפון נייד של הנוסע (במידה והמזמין אינו הנוסע) "
        fullWidth
        type="number"
        placeholder="יש להזין 10 ספרות של הטלפון הנייד"
        {...register('passengerPhone', { required: true })}
      />
      <TextField
        label="אימייל של המזמין"
        fullWidth
        required
        type="email"
        placeholder="דוגמה: david@gmail.com"
        {...register('email', { required: true })}
      />
      <TextField
        label="כתובת מגורים לאיסוף/הורדה"
        fullWidth
        required
        type="text"
        placeholder="יש להזין רחוב, מספר בית ועיר"
        {...register('address', { required: true })}
      />

      <div className="mt-5 flex flex-col gap-2 mb-5">
        <p className="text-sm text-gray-500">בקשות מיוחדות</p>
        <FormControlLabel
          control={<Checkbox {...register('specialRequests.isWheelChair')} />}
          checked={watch().specialRequests.isWheelChair}
          label="התאמה לכסא גלגלים"
        />
        <FormControlLabel
          control={<Checkbox {...register('specialRequests.isBabySafetySeat')} />}
          label="מושב בטיחות לתינוק"
        />
        <FormControlLabel
          control={<Checkbox {...register('specialRequests.isChildSafetySeat')} />}
          label="מושב בטיחות לילדים (גיל 3-8)"
        />
        <FormControlLabel
          control={<Checkbox {...register('specialRequests.isHighVehicle')} />}
          label="רכב גבוה"
        />
        <FormControlLabel
          control={<Checkbox {...register('specialRequests.isWheelChairTrunk')} />}
          label="תא מטען מתאים לכסא גלגלים"
        />
        <FormControlLabel
          control={<Checkbox {...register('specialRequests.isPatientDelivery')} />}
          label="משלוחים למאושפז"
        />
      </div>
      <Button
        variant="contained"
        size="large"
        endIcon={<ArrowBackIcon />}
        type="submit"
        disabled={!isDirty || !isValid}
      >
        המשיכו לשלב הבא
      </Button>
    </form>
  );
};
