import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import {
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  InputLabel,
  Select,
  FormHelperText,
  FormControl,
  MenuItem
} from '@mui/material';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import withLayout from '../../../components/LayoutHOC.tsx';
import SearchingDriverModal from './SearchingDriverModal.tsx';

type Inputs = {
  sourceAddress: string;
  destinationAddress: string;
  passengerPhone: string;
  numberOfPassengers: number;
  specialRequests: {
    isWheelChair: boolean;
    isBabySafetySeat: boolean;
    isChildSafetySeat: boolean;
    isHighVehicle: boolean;
    isWheelChairTrunk: boolean;
    isPatientDelivery: boolean;
  };
};

const OrderRide = () => {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors }
  } = useForm<Inputs>();
  const [autofilledAddress, setAutofilledAddress] = React.useState<'source' | 'destination'>(
    'destination'
  );
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const passenger = '[שם נוסע]';
  const autofilledAddressValue = 'בי”ח תל השומר / נשים ויולדות / מחלקת יולדות א';

  const onSwitchAutofilled = () => {
    setAutofilledAddress(autofilledAddress === 'source' ? 'destination' : 'source');
  };

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    // eslint-disable-next-line no-console
    console.log(data);

    setIsModalOpen(true);
  };

  return (
    <div className="flex flex-col items-center w-full pb-5">
      <h1 className="mt-0">שלום {passenger}! צריך הסעה?</h1>
      <form className="flex flex-col gap-9 w-full" onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="flex flex-col">
          {autofilledAddress === 'destination' ? (
            <TextField
              label="כתובת איסוף"
              type="string"
              placeholder="יש להזין כתובת"
              required
              error={!!errors?.sourceAddress}
              helperText={errors?.sourceAddress && 'חסרה כתובת איסוף'}
              {...register('sourceAddress', { required: true })}
            />
          ) : (
            <div>
              <InputLabel htmlFor="email">כתובת איסוף</InputLabel>
              <span>{autofilledAddressValue}</span>
            </div>
          )}
          <div className="flex justify-center m-3">
            <Button
              variant="outlined"
              size="small"
              className="w-8 min-w-0"
              onClick={onSwitchAutofilled}
            >
              <SwapVertIcon />
            </Button>
          </div>
          {autofilledAddress === 'source' ? (
            <TextField
              label="כתובת יעד"
              type="string"
              placeholder="יש להזין כתובת"
              required
              error={!!errors?.destinationAddress}
              helperText={errors?.destinationAddress && 'חסרה כתובת יעד'}
              {...register('destinationAddress', { required: true })}
            />
          ) : (
            <div>
              <InputLabel htmlFor="email">כתובת יעד</InputLabel>
              <span>{autofilledAddressValue}</span>
            </div>
          )}
        </div>
        <TextField
          label="טלפון ליצירת קשר"
          type="number"
          placeholder="יש להזין 10 ספרות של הטלפון הנייד"
          required
          error={!!errors?.passengerPhone}
          helperText={errors?.passengerPhone && 'חסר מספר טלפון'}
          {...register('passengerPhone', { required: true })}
        />
        <FormControl>
          <InputLabel htmlFor="numberOfPassengers" required>
            מספר נוסעים
          </InputLabel>
          <Select
            id="numberOfPassengers"
            label="מספר נוסעים"
            error={!!errors?.numberOfPassengers}
            {...register('numberOfPassengers', { required: true })}
          >
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={2}>2</MenuItem>
            <MenuItem value={3}>3</MenuItem>
            <MenuItem value={4}>4</MenuItem>
            <MenuItem value={5}>5</MenuItem>
          </Select>
          {errors.numberOfPassengers?.type === 'required' && (
            <FormHelperText error className="absolute top-full">
              יש לבחור מספר נוסעים
            </FormHelperText>
          )}
        </FormControl>
        <div className="flex flex-col gap-2">
          <p className="text-sm text-gray-500">בקשות מיוחדות</p>
          <FormControlLabel
            control={<Checkbox {...register('specialRequests.isWheelChair')} />}
            checked={watch().specialRequests?.isWheelChair}
            label="התאמה לכסא גלגלים"
          />
          <FormControlLabel
            control={<Checkbox {...register('specialRequests.isBabySafetySeat')} />}
            label="מושב בטיחות לתינוק"
          />
          <FormControlLabel
            control={<Checkbox {...register('specialRequests.isChildSafetySeat')} />}
            label="מושב בטיחות לילדים (גיל 3-8)"
          />
          <FormControlLabel
            control={<Checkbox {...register('specialRequests.isHighVehicle')} />}
            label="רכב גבוה"
          />
          <FormControlLabel
            control={<Checkbox {...register('specialRequests.isWheelChairTrunk')} />}
            label="תא מטען מתאים לכסא גלגלים"
          />
          <FormControlLabel
            control={<Checkbox {...register('specialRequests.isPatientDelivery')} />}
            label="משלוחים למאושפז"
          />
        </div>

        <Button variant="contained" size="large" className="w-full" type="submit">
          הזמינו נסיעה
        </Button>
      </form>

      <SearchingDriverModal open={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default withLayout(OrderRide, {
  title: 'הזמנת הסעה לביקור חולים',
  hideBackButton: true,
  hideFooter: true
});
