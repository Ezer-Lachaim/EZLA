import { Checkbox, FormControlLabel, FormGroup, TextField } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import { DriverRegistrationFormInputs } from '../AddCustomerModal.types.ts';

function NewDriverInfo() {
  const {
    register,
    formState: { errors }
  } = useFormContext<DriverRegistrationFormInputs>();

  return (
    <>
      <div className="flex gap-4 mb-5">
        <div className="flex flex-col gap-4 flex-1">
          <TextField
            label="שם פרטי"
            variant="outlined"
            fullWidth
            error={!!errors.firstName}
            {...register('firstName', { required: true })}
          />
          <TextField
            label="תעודת זהות"
            variant="outlined"
            fullWidth
            error={!!errors.nationalId}
            {...register('nationalId', { required: true })}
          />

          <TextField
            label="אימייל"
            variant="outlined"
            fullWidth
            error={!!errors.email}
            {...register('email', { required: true })}
          />
          <TextField
            label="עיר מגורים"
            variant="outlined"
            fullWidth
            error={!!errors.address}
            {...register('address', { required: true })}
          />
        </div>
        <div className="flex flex-col gap-4 flex-1">
          <TextField
            label="שם משפחה"
            variant="outlined"
            fullWidth
            error={!!errors.lastName}
            {...register('lastName', { required: true })}
          />
          <TextField
            label="טלפון נייד"
            variant="outlined"
            fullWidth
            error={!!errors.cellPhone}
            {...register('cellPhone', { required: true })}
          />
          <TextField
            label="אזור התנדבות (בחירה מרובה)"
            variant="outlined"
            fullWidth
            error={!!errors.volunteeringArea}
            {...register('volunteeringArea', { required: true })}
          />
        </div>
      </div>
      <div>
        <FormGroup className="flex flex-row">
          <FormControlLabel
            className="mb-2 ml-5"
            control={
              <Checkbox
                // checked={babyChair}
                // onChange={handleChange}
                {...register('isValidLicense', { required: true })}
                sx={errors.isValidLicense ? { color: 'red' } : {}}
              />
            }
            label="רישיון נהיגה בתוקף"
          />
          <FormControlLabel
            className="mb-2 "
            control={
              <Checkbox
                // checked={highCar}
                // onChange={handleChange}
                {...register('isValidCarLicense', { required: true })}
                sx={errors.isValidCarLicense ? { color: 'red' } : {}}
              />
            }
            label="רישיון רכב בתוקף"
          />
        </FormGroup>
      </div>
    </>
  );
}

export default NewDriverInfo;
