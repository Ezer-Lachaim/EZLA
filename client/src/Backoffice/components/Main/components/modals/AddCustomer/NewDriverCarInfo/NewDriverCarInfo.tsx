import { Checkbox, FormControlLabel, TextField } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import { DriverRegistrationFormInputs } from '../AddCustomerModal.types.ts';
import { DriverCarCapabilitiesEnum } from '../../../../../../../api-client';

function NewDriverCarInfo() {
  const {
    register,
    formState: { errors }
  } = useFormContext<DriverRegistrationFormInputs>();
  return (
    <div className="flex gap-4 mb-5">
      <div className="flex flex-col gap-4 flex-1">
        <TextField
          label="יצרן"
          variant="outlined"
          fullWidth
          error={!!errors.carManufacturer}
          {...register('carManufacturer', { required: true })}
        />
        <TextField
          label=" צבע רכב"
          variant="outlined"
          fullWidth
          error={!!errors.carColor}
          {...register('carColor', { required: true })}
        />
        <TextField
          label="מספר מושבים ברכב"
          variant="outlined"
          fullWidth
          type="number"
          error={!!errors.numOfSeats}
          {...register('numOfSeats', { required: true })}
        />
      </div>
      <div className="flex flex-col gap-4 flex-1">
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
          <FormControlLabel
            value={'WheelChair' as DriverCarCapabilitiesEnum}
            control={<Checkbox {...register('carCapabilities')} />}
            label="התאמה לכסא גלגלים"
          />
          <FormControlLabel
            value={'BabyChair' as DriverCarCapabilitiesEnum}
            control={<Checkbox {...register('carCapabilities')} />}
            label="מושב בטיחות לתינוק"
          />
          <FormControlLabel
            value={'KidsChair' as DriverCarCapabilitiesEnum}
            control={<Checkbox {...register('carCapabilities')} />}
            label="מושב בטיחות לילדים (גיל 3-8)"
          />
          <FormControlLabel
            value={'AccessibleCar' as DriverCarCapabilitiesEnum}
            control={<Checkbox {...register('carCapabilities')} />}
            label="רכב גבוה"
          />
          <FormControlLabel
            value={'WheelChairStorage' as DriverCarCapabilitiesEnum}
            control={<Checkbox {...register('carCapabilities')} />}
            label="תא מטען מתאים לכסא גלגלים"
          />
          <FormControlLabel
            value={'PatientDelivery' as DriverCarCapabilitiesEnum}
            control={<Checkbox {...register('carCapabilities')} />}
            label="משלוחים למאושפז"
          />
        </div>
      </div>
    </div>
  );
}

export default NewDriverCarInfo;
