import {
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField
} from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { GetHospitalList200ResponseInner } from '../../../../../../api-client';
import { RegistrationFormInputs } from '../../../Register.types';
import { api } from '../../../../../../Config';

export const PatientInfoForm = () => {
  const [isServiceForMe, setIsServiceForMe] = useState(false);
  const [hospitals, setHospitals] = useState<GetHospitalList200ResponseInner[]>([]);

  const {
    register,
    control,
    watch,
    formState: { errors },
    setValue
  } = useFormContext<RegistrationFormInputs>();

  useEffect(() => {
    const fetchHospitals = async () => {
      const response = await api.hospital.getHospitalList();

      if (response) {
        setHospitals(response);
      }
    };

    fetchHospitals();
  }, []);

  const onSelectHospital = (event: SelectChangeEvent<number>) => {
    setValue('patient.hospitalId', event.target.value as number);
  };

  const serviceForMeHandler = () => {
    if (isServiceForMe) {
      setValue('patient.firstName', '');
      setValue('patient.lastName', '');
      setValue('patient.nationalId', '');
    } else {
      const { firstName, lastName, userId } = watch();
      setValue('patient.firstName', firstName);
      setValue('patient.lastName', lastName);
      setValue('patient.nationalId', userId);
    }

    setIsServiceForMe(!isServiceForMe);
  };

  return (
    <div className="flex flex-col gap-4 mb-5">
      <FormControlLabel
        control={<Checkbox onClick={serviceForMeHandler} />}
        label="השירות מיועד לטיפול עבור עצמי"
      />
      <TextField
        label="המטופל שם פרטי"
        fullWidth
        autoFocus
        variant={isServiceForMe ? 'filled' : 'outlined'}
        disabled={isServiceForMe}
        required
        type="text"
        error={!!errors.patient?.firstName}
        {...register('patient.firstName', { required: true })}
      />
      <TextField
        label="המטופל שם משפחה"
        fullWidth
        required
        variant={isServiceForMe ? 'filled' : 'outlined'}
        disabled={isServiceForMe}
        type="text"
        error={!!errors.patient?.lastName}
        {...register('patient.lastName', { required: true })}
      />
      <TextField
        label="המטופל תעודת זהות"
        fullWidth
        required
        variant={isServiceForMe ? 'filled' : 'outlined'}
        disabled={isServiceForMe}
        type="number"
        placeholder="טקסט הסבר"
        error={!!errors.patient?.nationalId}
        {...register('patient.nationalId', { required: true, minLength: 9 })}
      />
      <FormControl fullWidth>
        <InputLabel id="hospital-label">בית החולים לאיסוף והורדה</InputLabel>
        <Select
          labelId="hospital-label"
          defaultValue={hospitals[0]?.id}
          {...register('patient.hospitalId', { required: true })}
          label="בית החולים לאיסוף והורדה"
          placeholder="בחרו בית חולים"
          onChange={onSelectHospital}
        >
          {hospitals.map((hospital) => (
            <MenuItem key={hospital.id} value={hospital.id}>
              {hospital.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        label="בניין בביה”ח"
        fullWidth
        type="text"
        placeholder="טקסט הסבר"
        error={!!errors.patient?.hospitalBuilding}
        {...register('patient.hospitalBuilding')}
      />
      <TextField
        label="מחלקה"
        fullWidth
        type="text"
        placeholder="טקסט הסבר"
        error={!!errors.patient?.hospitalDept}
        {...register('patient.hospitalDept')}
      />
      <Controller
        control={control}
        name="startServiceDate"
        render={({ field }) => (
          <DatePicker
            label="תחילת התקופה בה תזדקקו לשירות ההסעות"
            format="DD/MM/YYYY"
            slotProps={{
              textField: {
                required: true,
                placeholder: 'בחירת תאריך התחלה'
              }
            }}
            onChange={(date) => field.onChange(date as Date)}
            value={field.value}
          />
        )}
      />

      <Controller
        control={control}
        name="endServiceDate"
        render={({ field }) => (
          <DatePicker
            label="סיום התקופה בה תזדקקו לשירות ההסעות"
            format="DD/MM/YYYY"
            slotProps={{
              textField: {
                required: true,
                placeholder: 'בחירת תאריך סיום'
              }
            }}
            onChange={(date) => field.onChange(date as Date)}
            value={field.value}
          />
        )}
      />
      <TextField
        label="הסיבה לשימוש בשירות ההסעות "
        fullWidth
        type="text"
        placeholder="טקסט הסבר"
        multiline
        rows={3}
        required
        error={!!errors.patient?.message}
        {...register('patient.message')}
      />
      <FormControlLabel
        control={<Checkbox {...register('isApproveTerms', { required: true })} />}
        label={
          <p>
            הנני מאשר/ת כי קראתי את <Link to="/terms">תקנון האתר</Link> ואת{' '}
            <Link to="/privacy">מדיניות הפרטיות</Link> ומסכים לתנאיהם
          </p>
        }
      />
    </div>
  );
};
