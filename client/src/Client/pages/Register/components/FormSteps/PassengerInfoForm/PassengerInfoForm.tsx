import { Checkbox, FormControl, FormControlLabel, FormHelperText, TextField } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import useFormPersist from 'react-hook-form-persist';
import { useEffect } from 'react';
import { RideRequesterSpecialRequestEnum } from '../../../../../../api-client';
import { RegistrationFormInputs } from '../../../Register.types';

export const PassengerInfoForm = () => {
  const {
    watch,
    setValue,
    register,
    reset,
    formState: { errors }
  } = useFormContext<RegistrationFormInputs>();

  useFormPersist('passengerInfoForm', { watch, setValue });

  useEffect(() => {
    reset({ specialRequest: [] });
  }, [reset]);

  return (
    <div className="flex flex-col gap-9">
      <FormControl>
        <TextField
          label="שם פרטי"
          fullWidth
          autoFocus
          required
          type="text"
          error={!!errors.firstName}
          {...register('firstName', { required: true, minLength: 2 })}
        />
        {errors.firstName && (
          <FormHelperText error className="absolute top-full mr-0">
            {errors.firstName.type === 'required' && 'יש להזין שם פרטי'}
            {errors.firstName.type === 'minLength' && 'שם פרטי חייב להכיל לפחות 2 תווים'}
          </FormHelperText>
        )}
      </FormControl>
      <FormControl>
        <TextField
          label="שם משפחה"
          fullWidth
          required
          type="text"
          error={!!errors.lastName}
          {...register('lastName', { required: true, minLength: 2 })}
        />
        {errors.lastName && (
          <FormHelperText error className="absolute top-full mr-0">
            {errors.lastName.type === 'required' && 'יש להזין שם משפחה'}
            {errors.lastName.type === 'minLength' && 'שם משפחה חייב להכיל לפחות 2 תווים'}
          </FormHelperText>
        )}
      </FormControl>
      <FormControl>
        <TextField
          label="תעודת זהות"
          fullWidth
          required
          type="number"
          placeholder="יש להזין 9 ספרות כולל ספרת ביקורת"
          error={!!errors.nationalId}
          {...register('nationalId', { required: true, minLength: 9, maxLength: 9 })}
        />
        {errors.nationalId && (
          <FormHelperText error className="absolute top-full mr-0">
            {errors.nationalId.type === 'required' && 'יש להזין תעודת זהות'}
            {(errors.nationalId.type === 'minLength' || errors.nationalId.type === 'maxLength') &&
              'יש להזין תעודת זהות עם 9 ספרות'}
          </FormHelperText>
        )}
      </FormControl>
      <FormControl>
        <TextField
          label="טלפון נייד של המזמין"
          fullWidth
          required
          type="text"
          placeholder="יש להזין 10 ספרות של הטלפון הנייד"
          error={!!errors.cellPhone}
          {...register('cellPhone', { required: true, pattern: /^05\d-?\d{7}$/ })}
        />
        {errors.cellPhone && (
          <FormHelperText error className="absolute top-full mr-0">
            {errors.cellPhone.type === 'required' && 'יש להזין טלפון נייד'}
            {errors.cellPhone.type === 'pattern' && 'יש להקליד מספר טלפון תקין'}
          </FormHelperText>
        )}
      </FormControl>
      <FormControl>
        <TextField
          label="טלפון נייד של הנוסע (במידה והמזמין אינו הנוסע) "
          fullWidth
          type="number"
          placeholder="יש להזין 10 ספרות של הטלפון הנייד"
          error={!!errors.passengerCellPhone}
          {...register('passengerCellPhone', { pattern: /^05\d-?\d{7}$/ })}
        />
        {errors.passengerCellPhone && (
          <FormHelperText error className="absolute top-full mr-0">
            {errors.passengerCellPhone.type === 'pattern' && 'יש להקליד מספר טלפון תקין'}
          </FormHelperText>
        )}
      </FormControl>
      <FormControl>
        <TextField
          label="אימייל של המזמין"
          fullWidth
          required
          type="email"
          placeholder="דוגמה: david@gmail.com"
          error={!!errors.email}
          {...register('email', { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ })}
        />
        {errors.email && (
          <FormHelperText error className="absolute top-full mr-0">
            {errors.email.type === 'required' && 'יש להזין אימייל'}
            {errors.email.type === 'pattern' && 'יש להקליד כתובת אימייל תקינה'}
          </FormHelperText>
        )}
      </FormControl>
      <FormControl>
        <TextField
          label="כתובת מגורים לאיסוף/הורדה"
          fullWidth
          required
          type="text"
          placeholder="יש להזין רחוב, מספר בית ועיר"
          error={!!errors.address}
          {...register('address', { required: true })}
        />
        {errors.address && (
          <FormHelperText error className="absolute top-full mr-0">
            {errors.address.type === 'required' && 'יש להזין כתובת מגורים לאיסוף והורדה'}
          </FormHelperText>
        )}
      </FormControl>
      <div className="flex flex-col gap-2 mb-9">
        <p className="text-sm text-gray-500">בקשות מיוחדות</p>
        <FormControlLabel
          value={'WheelChair' as RideRequesterSpecialRequestEnum}
          control={
            <Checkbox
              {...register('specialRequest')}
              // checked={watch('specialRequest')?.includes('WheelChair')}
            />
          }
          // checked={watch('specialRequest')?.includes('WheelChair')}
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
