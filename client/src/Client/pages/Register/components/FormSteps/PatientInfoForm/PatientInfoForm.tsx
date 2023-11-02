import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField
} from '@mui/material';
import 'dayjs/locale/he';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Controller, FieldError, useFormContext } from 'react-hook-form';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useFormPersist from 'react-hook-form-persist';
import { GetHospitalList200ResponseInner } from '../../../../../../api-client';
import { RegistrationFormInputs } from '../../../Register.types';
import { useApiContext } from '../../../../../../contexts/ApiContext';

const adapter = new AdapterDayjs();

export const PatientInfoForm = () => {
  const api = useApiContext();
  const [isServiceForMe, setIsServiceForMe] = useState(false);
  const [hospitals, setHospitals] = useState<GetHospitalList200ResponseInner[]>([]);

  const {
    register,
    control,
    watch,
    formState: { errors },
    setValue
  } = useFormContext<RegistrationFormInputs>();

  useFormPersist('passengerInfoForm', { watch, setValue });

  useEffect(() => {
    const fetchHospitals = async () => {
      const response = await api.hospital.getHospitalList();

      if (response) {
        setHospitals(response);
      }
    };

    fetchHospitals();
  }, [api.hospital]);

  const onSelectHospital = (event: SelectChangeEvent<number>) => {
    setValue('patient.hospitalId', event.target.value as number);
  };

  const serviceForMeHandler = () => {
    if (isServiceForMe) {
      setValue('patient.firstName', '');
      setValue('patient.lastName', '');
      setValue('patient.nationalId', '');
    } else {
      const { firstName, lastName, nationalId } = watch();
      setValue('patient.firstName', firstName);
      setValue('patient.lastName', lastName);
      setValue('patient.nationalId', nationalId);
    }

    setIsServiceForMe(!isServiceForMe);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="he">
      <div className="flex flex-col gap-9 mb-5">
        <FormControlLabel
          control={<Checkbox onClick={serviceForMeHandler} />}
          label="השירות מיועד לטיפול עבור עצמי"
        />
        <FormControl>
          <TextField
            label="המטופל שם פרטי"
            fullWidth
            autoFocus
            variant={isServiceForMe ? 'filled' : 'outlined'}
            disabled={isServiceForMe}
            required
            type="text"
            error={!!errors.patient?.firstName}
            {...register('patient.firstName', { required: true, minLength: 2 })}
          />
          {errors.patient?.firstName && (
            <FormHelperText error className="absolute top-full mr-0">
              {errors.patient?.firstName.type === 'required' && 'יש להזין שם פרטי'}
              {errors.patient?.firstName.type === 'minLength' && 'שם פרטי חייב להכיל לפחות 2 תווים'}
            </FormHelperText>
          )}
        </FormControl>
        <FormControl>
          <TextField
            label="המטופל שם משפחה"
            fullWidth
            required
            variant={isServiceForMe ? 'filled' : 'outlined'}
            disabled={isServiceForMe}
            type="text"
            error={!!errors.patient?.lastName}
            {...register('patient.lastName', { required: true, minLength: 2 })}
          />
          {errors.patient?.lastName && (
            <FormHelperText error className="absolute top-full mr-0">
              {errors.patient?.lastName.type === 'required' && 'יש להזין שם משפחה'}
              {errors.patient?.lastName.type === 'minLength' && 'שם משפחה חייב להכיל לפחות 2 תווים'}
            </FormHelperText>
          )}
        </FormControl>
        <FormControl>
          <TextField
            label="המטופל תעודת זהות"
            fullWidth
            required
            variant={isServiceForMe ? 'filled' : 'outlined'}
            disabled={isServiceForMe}
            type="number"
            placeholder="יש להזין 9 ספרות כולל ספרת ביקורת"
            error={!!errors.patient?.nationalId}
            {...register('patient.nationalId', { required: true, minLength: 9 })}
          />
          {errors.patient?.nationalId && (
            <FormHelperText error className="absolute top-full mr-0">
              {errors.patient?.nationalId.type === 'required' && 'יש להזין תעודת זהות'}
              {(errors.patient?.nationalId.type === 'minLength' ||
                errors.patient?.nationalId.type === 'maxLength') &&
                'יש להזין תעודת זהות עם 9 ספרות'}
            </FormHelperText>
          )}
        </FormControl>
        <FormControl fullWidth required>
          <InputLabel id="hospital-label" required>
            בית החולים לאיסוף והורדה
          </InputLabel>
          <Select
            labelId="hospital-label"
            defaultValue={hospitals[0]?.id}
            {...register('patient.hospitalId', { required: true })}
            label="בית החולים לאיסוף והורדה"
            placeholder="בחרו בית חולים"
            onChange={onSelectHospital}
            error={!!errors.patient?.hospitalId}
          >
            {hospitals.map((hospital) => (
              <MenuItem key={hospital.id} value={hospital.id}>
                {hospital.name}
              </MenuItem>
            ))}
          </Select>
          {errors.patient?.hospitalId && (
            <FormHelperText error className="absolute top-full mr-0">
              {errors.patient?.hospitalId.type === 'required' && 'יש לבחור בית חולים'}
            </FormHelperText>
          )}
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
          rules={{ required: true }}
          render={({ field }) => (
            <FormControl fullWidth required>
              <DatePicker
                label="תחילת התקופה בה תזדקקו לשירות ההסעות"
                format="DD/MM/YYYY"
                slotProps={{
                  textField: {
                    required: true,
                    placeholder: 'בחירת תאריך התחלה',
                    error: !!errors.startServiceDate
                  }
                }}
                disablePast
                onChange={(date) => field.onChange(date?.toDate())}
                value={field.value && adapter.date(field.value)}
              />
              {errors.startServiceDate && (
                <FormHelperText error className="absolute top-full mr-0">
                  {errors.startServiceDate.type === 'required' && 'יש להזין תאריך התחלה'}
                </FormHelperText>
              )}
            </FormControl>
          )}
        />

        <Controller
          control={control}
          name="endServiceDate"
          rules={{ required: true }}
          render={({ field }) => (
            <FormControl fullWidth required>
              <DatePicker
                label="סיום התקופה בה תזדקקו לשירות ההסעות"
                format="DD/MM/YYYY"
                slotProps={{
                  textField: {
                    required: true,
                    placeholder: 'בחירת תאריך סיום',
                    error: !!errors.endServiceDate
                  }
                }}
                disablePast
                onChange={(date) => field.onChange(date?.toDate())}
                value={field.value && adapter.date(field.value)}
              />
              {errors.endServiceDate && (
                <FormHelperText error className="absolute top-full mr-0">
                  {errors.endServiceDate.type === 'required' && 'יש להזין תאריך סיום'}
                </FormHelperText>
              )}
            </FormControl>
          )}
        />

        <FormControl fullWidth required>
          <TextField
            label="הסיבה לשימוש בשירות ההסעות"
            fullWidth
            type="text"
            placeholder="טקסט הסבר"
            multiline
            rows={3}
            required
            error={!!errors.patient?.message}
            {...register('patient.message', { required: true })}
          />
          {errors.patient?.message && (
            <FormHelperText error className="absolute top-full mr-0">
              {(errors.patient?.message as FieldError).type === 'required' &&
                'חסרה הסיבה לשימוש שירות ההסעות'}
            </FormHelperText>
          )}
        </FormControl>
        <div>
          <FormControlLabel
            control={
              <Checkbox
                {...register('isApproveTerms', { required: true })}
                sx={errors.isApproveTerms ? { color: 'red' } : {}}
              />
            }
            label={
              <p>
                הנני מאשר/ת כי קראתי את{' '}
                <a href="/terms.html" target="_blank">
                  תקנון האתר
                </a>{' '}
                ואת ואת <Link to="/privacy">מדיניות הפרטיות</Link> ומסכים לתנאיהם
              </p>
            }
          />
          {errors.isApproveTerms && (
            <FormHelperText error>
              {errors.isApproveTerms.type === 'required' && 'יש לאשר קריאת תקנון האתר'}
            </FormHelperText>
          )}
        </div>
      </div>
    </LocalizationProvider>
  );
};
