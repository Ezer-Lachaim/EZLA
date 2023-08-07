import { Checkbox, FormControl, FormControlLabel, FormHelperText, TextField } from '@mui/material';
import { useFormContext } from 'react-hook-form';

import { Driver } from '../../../../../../../api-client/models/Driver';
import { DRIVER_CAPABILITIES } from '../../../Volunteers/Volunteers.constants';

function NewDriverCarInfo() {
  const {
    register,
    formState: { errors }
  } = useFormContext<Driver>();
  return (
    <div className="flex gap-4 mb-10">
      <div className="flex flex-col gap-8 flex-1">
        <FormControl>
          <TextField
            label="יצרן"
            variant="outlined"
            fullWidth
            error={!!errors.carManufacturer}
            {...register('carManufacturer', { required: true, minLength: 2 })}
          />
          {errors.carManufacturer && (
            <FormHelperText error className="absolute top-full mr-0">
              {errors.carManufacturer.type === 'required' && 'יש להזין שם יצרן'}
              {errors.carManufacturer.type === 'minLength' && 'יצרן חייב להכיל לפחות 2 תווים'}
            </FormHelperText>
          )}
        </FormControl>
        <FormControl>
          <TextField
            label=" צבע רכב"
            variant="outlined"
            fullWidth
            error={!!errors.carColor}
            {...register('carColor', { required: true, minLength: 2 })}
          />
        </FormControl>
        <TextField
          label="מספר מושבים ברכב"
          variant="outlined"
          fullWidth
          type="number"
          error={!!errors.numOfSeats}
          {...register('numOfSeats', { required: true })}
        />
      </div>
      <div className="flex flex-col gap-8 flex-1">
        <TextField
          label="דגם"
          variant="outlined"
          fullWidth
          error={!!errors.carModel}
          {...register('carModel', { required: true })}
        />
        <TextField
          label="מספר לוחית רכב"
          variant="outlined"
          fullWidth
          error={!!errors.carPlateNumber}
          {...register('carPlateNumber', { required: true })}
        />
        <div className="flex flex-col gap-2 mb-9">
          <p className="text-sm text-gray-500">רכב מותאם (בחירה מרובה)</p>
          {DRIVER_CAPABILITIES.map(({ value, label }) => (
            <FormControlLabel
              value={value}
              control={<Checkbox {...register('carCapabilities')} />}
              label={label}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default NewDriverCarInfo;
