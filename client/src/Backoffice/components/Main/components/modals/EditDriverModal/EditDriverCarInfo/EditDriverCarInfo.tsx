import { Checkbox, FormControl, FormControlLabel, FormHelperText, TextField } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import { DRIVER_CAPABILITIES } from '../../../Volunteers/Volunteers.constants';
import { DriverCarCapabilitiesEnum, Driver } from '../../../../../../../api-client';

function EditDriverCarInfo({ driver }: { driver: Driver }) {
  const {
    register,
    formState: { errors }
  } = useFormContext<Driver>();

  const isSpecialRequestAvailable = (value: DriverCarCapabilitiesEnum) => {
    return driver.carCapabilities?.includes(value) || false;
  };

  return (
    <div className="flex gap-4">
      <div className="flex flex-col gap-8 flex-1">
        <div className="flex flex-col gap-2">
          <p className="text-sm text-gray-500">רכב מותאם (בחירה מרובה)</p>
          {DRIVER_CAPABILITIES.map(({ value, label }) => {
            return (
              <FormControlLabel
                value={value}
                control={
                  <Checkbox
                    defaultChecked={isSpecialRequestAvailable(value)}
                    {...register(`carCapabilities`)}
                  />
                }
                label={label}
              />
            );
          })}
        </div>
      </div>
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
            label=" צבע רכב"
            variant="outlined"
            fullWidth
            error={!!errors.carColor}
            {...register('carColor', { required: true, minLength: 2 })}
          />
          {errors.carColor && (
            <FormHelperText error className="absolute top-full mr-0">
              {errors.carColor.type === 'required' && 'יש להזין שם צבע רכב'}
              {errors.carColor.type === 'minLength' && 'צבע רכב חייב להכיל לפחות 2 תווים'}
            </FormHelperText>
          )}
        </FormControl>
        <FormControl>
          <TextField
            required
            label="מספר מושבים ברכב"
            variant="outlined"
            fullWidth
            type="number"
            error={!!errors.numOfSeats}
            {...register('numOfSeats', {
              required: true,
              min: 1
            })}
          />
          {errors.numOfSeats && (
            <FormHelperText error className="absolute top-full mr-0">
              {errors.numOfSeats.type === 'required' && 'יש להזין שם מספר מושבים ברכב'}
              {errors.numOfSeats.type === 'min' && 'רכב חייב להכיל לפחות מושב אחד'}
            </FormHelperText>
          )}
        </FormControl>
      </div>
      <div className="flex flex-col gap-8 flex-1">
        <TextField
          required
          label="דגם"
          variant="outlined"
          fullWidth
          error={!!errors.carModel}
          {...register('carModel', { required: true })}
        />
        <FormControl>
          <TextField
            required
            label="מספר לוחית רכב"
            variant="outlined"
            fullWidth
            error={!!errors.carPlateNumber}
            {...register('carPlateNumber', {
              required: true,
              pattern: /^\d{7,8}$/
            })}
          />
          {errors.carPlateNumber && (
            <FormHelperText error className="absolute top-full mr-0">
              {errors.carPlateNumber.type === 'required' && 'יש להזין שם מספר לוחית רכב'}
              {errors.carPlateNumber.type === 'pattern' && 'מספר לוחית רכב צריך לכלול 7 או 8 ספרות'}
            </FormHelperText>
          )}
        </FormControl>
      </div>
    </div>
  );
}

export default EditDriverCarInfo;
