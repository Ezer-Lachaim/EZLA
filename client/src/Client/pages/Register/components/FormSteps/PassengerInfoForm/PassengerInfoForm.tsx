import { Checkbox, FormControlLabel, TextField } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import { RideRequester, RideRequesterSpecialRequestEnum } from '../../../../../../api-client';

export const PassengerInfoForm = () => {
  const {
    register,
    formState: { errors }
  } = useFormContext<RideRequester>();

  return (
    <div className="mt-5 flex flex-col gap-6">
      <TextField
        label="שם פרטי"
        fullWidth
        autoFocus
        required
        type="text"
        error={!!errors.firstName}
        {...register('firstName', { required: true, minLength: 3 })}
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
        {...register('userId', { required: true })}
      />
      <TextField
        label="טלפון נייד של המזמין"
        fullWidth
        required
        type="number"
        placeholder="יש להזין 10 ספרות של הטלפון הנייד"
        {...register('cellPhone', { required: true })}
      />
      <TextField
        label="טלפון נייד של הנוסע (במידה והמזמין אינו הנוסע) "
        fullWidth
        type="number"
        placeholder="יש להזין 10 ספרות של הטלפון הנייד"
        {...register('passengerCellPhone', { required: true })}
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

      <div className="flex flex-col gap-2 mb-9">
        <p className="text-sm text-gray-500">בקשות מיוחדות</p>
        <FormControlLabel
          value={'WheelChair' as RideRequesterSpecialRequestEnum}
          control={<Checkbox {...register('specialRequest')} />}
          label="התאמה לכסא גלגלים"
        />
        <FormControlLabel
          value={'BabyChair' as RideRequesterSpecialRequestEnum}
          control={<Checkbox {...register('specialRequest')} />}
          label="מושב בטיחות לתינוק"
        />
        <FormControlLabel
          value={'KidsChair' as RideRequesterSpecialRequestEnum}
          control={<Checkbox {...register('specialRequest')} />}
          label="מושב בטיחות לילדים (גיל 3-8)"
        />
        <FormControlLabel
          value={'AccessibleCar' as RideRequesterSpecialRequestEnum}
          control={<Checkbox {...register('specialRequest')} />}
          label="רכב גבוה"
        />
        <FormControlLabel
          value={'WheelChairStorage' as RideRequesterSpecialRequestEnum}
          control={<Checkbox {...register('specialRequest')} />}
          label="תא מטען מתאים לכסא גלגלים"
        />
        <FormControlLabel
          value={'PatientDelivery' as RideRequesterSpecialRequestEnum}
          control={<Checkbox {...register('specialRequest')} />}
          label="משלוחים למאושפז"
        />
      </div>
    </div>
  );
};
