import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  TextField
} from '@mui/material';
import { useFormContext } from 'react-hook-form';
import { Driver } from '../../../../../../../api-client';

function NewDriverInfo() {
  const {
    register,
    formState: { errors }
  } = useFormContext<Driver>();
  return (
    <>
      <div className="flex gap-4 mb-10">
        <div className="flex flex-col gap-8 flex-1">
          <FormControl>
            <TextField
              required
              label="שם פרטי"
              variant="outlined"
              fullWidth
              autoFocus
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
              required
              label="תעודת זהות"
              variant="outlined"
              fullWidth
              error={!!errors.nationalId}
              {...register('nationalId', { required: true, minLength: 9, maxLength: 9 })}
            />
            {errors.nationalId && (
              <FormHelperText error className="absolute top-full mr-0">
                {errors.nationalId.type === 'required' && 'יש להזין תעודת זהות'}
                {(errors.nationalId.type === 'minLength' ||
                  errors.nationalId.type === 'maxLength') &&
                  'יש להזין תעודת זהות עם 9 ספרות'}
              </FormHelperText>
            )}
          </FormControl>

          <FormControl>
            <TextField
              required
              label="אימייל"
              variant="outlined"
              fullWidth
              error={!!errors.email}
              {...register('email', { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ })}
            />
            {errors.email && (
              <FormHelperText error className="absolute top-full mr-0">
                {errors.email.type === 'required' && 'חסר אימייל'}
                {errors.email.type === 'pattern' && 'יש להקליד כתובת אימייל תקינה'}
              </FormHelperText>
            )}
          </FormControl>
          <FormControl>
            <TextField
              required
              label="עיר מגורים"
              variant="outlined"
              fullWidth
              error={!!errors.city}
              {...register('city', { required: true })}
            />
            {errors.city && (
              <FormHelperText error className="absolute top-full mr-0">
                {errors.city.type === 'required' && ' יש להזין עיר מגורים'}
              </FormHelperText>
            )}
          </FormControl>
        </div>
        <div className="flex flex-col gap-8 flex-1">
          <FormControl>
            <TextField
              required
              label="שם משפחה"
              variant="outlined"
              fullWidth
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
              required
              label="טלפון נייד"
              variant="outlined"
              fullWidth
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
              required
              label="אזור התנדבות"
              variant="outlined"
              fullWidth
              error={!!errors.volunteeringArea}
              {...register('volunteeringArea', { required: true, minLength: 2 })}
            />
            {errors.volunteeringArea && (
              <FormHelperText error className="absolute top-full mr-0">
                {errors.volunteeringArea.type === 'required' && 'יש להזין אזור התנדבות'}
                {errors.volunteeringArea.type === 'minLength' &&
                  'אזור התנדבות חייב להחיל לפחות 2 תווים'}
              </FormHelperText>
            )}
          </FormControl>
        </div>
      </div>
      <div>
        <FormGroup className="flex flex-row">
          <FormControlLabel
            className="mb-2 ml-5"
            control={<Checkbox {...register('isValidLicense')} required />}
            label="רישיון נהיגה בתוקף"
          />
          <FormControlLabel
            className="mb-2 "
            control={<Checkbox {...register('isValidCarLicense')} required />}
            label="רישיון רכב בתוקף"
          />
        </FormGroup>
      </div>
    </>
  );
}

export default NewDriverInfo;
