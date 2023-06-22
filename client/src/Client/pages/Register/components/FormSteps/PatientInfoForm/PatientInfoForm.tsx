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
import { GetHospitalList200ResponseInner, RideRequester } from '../../../../../../api-client';

const hospitals: GetHospitalList200ResponseInner[] = [
  {
    name: 'בי״ח איכילוב',
    id: 1
  }
];

export const PatientInfoForm = () => {
  const {
    register,
    control,
    formState: { errors }
  } = useFormContext<RideRequester>();

  const onSelectHospital = (event: SelectChangeEvent<number>) => {
    register('patient.hospitalId', {
      value: event.target.value as number
    });
  };

  return (
    <div className="flex flex-col gap-4 mb-5">
      <FormControlLabel control={<Checkbox />} label="השירות מיועד לטיפול עבור עצמי" />
      <TextField
        label="המטופל שם פרטי"
        fullWidth
        autoFocus
        required
        type="text"
        error={!!errors.patient?.firstName}
        {...register('patient.firstName', { required: true, minLength: 3 })}
      />
      <TextField
        label="המטופל שם משפחה"
        fullWidth
        required
        type="text"
        error={!!errors.patient?.lastName}
        {...register('patient.firstName', { required: true, minLength: 3 })}
      />
      <TextField
        label="המטופל תעודת זהות"
        fullWidth
        required
        type="number"
        placeholder="טקסט הסבר"
        error={!!errors.patient?.patientId}
        {...register('patient.patientId', { required: true, minLength: 9 })}
      />
      <FormControl fullWidth>
        <InputLabel id="hospital-label">בית החולים לאיסוף והורדה</InputLabel>
        <Select
          labelId="hospital-label"
          defaultValue={hospitals[0].id}
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
        control={<Checkbox />}
        label="הנני מאשר/ת כי קראתי את תקנון האתר ואת
מדיניות הפרטיות ומסכים לתנאיהם"
      />
    </div>
  );
};
