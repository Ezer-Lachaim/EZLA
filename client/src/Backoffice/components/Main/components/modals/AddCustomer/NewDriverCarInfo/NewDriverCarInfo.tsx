import { FormControl, FormHelperText, TextField } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import { Driver } from '../../../../../../../api-client';
import CarCapabilitiesSelect from './components/CarCapabilitiesSelect';

function NewDriverCarInfo() {
  const {
    register,
    formState: { errors }
  } = useFormContext<Driver>();

  return (
    <div className="flex gap-4 mb-5">
      <div className="flex flex-col gap-8 flex-1">
        <FormControl>
          <TextField
            required
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
            required
            label="צבע רכב"
            variant="outlined"
            fullWidth
            {...register('carColor', { required: true, minLength: 2 })}
          />
        </FormControl>
        <TextField
          label="מספר מושבים ברכב"
          variant="outlined"
          fullWidth
          required
          type="number"
          {...register('numOfSeats', { required: true })}
        />
      </div>
      <div className="flex flex-col gap-8 flex-1">
        <TextField
          required
          label="דגם"
          variant="outlined"
          fullWidth
          {...register('carModel', { required: true })}
        />
        <TextField
          required
          label="מספר לוחית רכב"
          variant="outlined"
          fullWidth
          {...register('carPlateNumber', { required: true })}
        />
        <TextField
          required
          label="רכב מותאים (בחירה מרובה)"
          variant="outlined"
          fullWidth
          {...register('carCapabilities')}
        />
        <CarCapabilitiesSelect />
      </div>
    </div>
  );
}

export default NewDriverCarInfo;
