/* eslint-disable @typescript-eslint/ban-ts-comment */
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
import { api } from '../../../../Config.ts';
import { Ride, RideSpecialRequestEnum, RideStateEnum } from '../../../../api-client';
import { useUserContext } from '../../../../context/UserContext/UserContext.tsx';

// type Inputs = {
//   sourceAddress: string;
//   destinationAddress: string;
//   passengerPhone: string;
//   numberOfPassengers: number;
//   specialRequests: {
//     isWheelChair: boolean;
//     isBabySafetySeat: boolean;
//     isChildSafetySeat: boolean;
//     isHighVehicle: boolean;
//     isWheelChairTrunk: boolean;
//     isPatientDelivery: boolean;
//   };
// };

interface ClientRide extends Omit<Ride, 'specialRequest'> {
  specialRequest: {
    isWheelChair: boolean;
    isBabySafetySeat: boolean;
    isChildSafetySeat: boolean;
    isHighVehicle: boolean;
    isWheelChairTrunk: boolean;
    isPatientDelivery: boolean;
    [indexer: string]: boolean;
  };
}

const specialMap = {
  isWheelChair: RideSpecialRequestEnum.WheelChair,
  isBabySafetySeat: RideSpecialRequestEnum.BabyChair,
  isChildSafetySeat: RideSpecialRequestEnum.KidsChair,
  isHighVehicle: RideSpecialRequestEnum.AccessibleCar,
  isWheelChairTrunk: RideSpecialRequestEnum.WheelChairStorage,
  isPatientDelivery: RideSpecialRequestEnum.PatientDelivery
};

const getSpecialEnum = (boolName: string): RideSpecialRequestEnum => {
  // @ts-ignore
  return specialMap[boolName];
};

const OrderRide = () => {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors }
  } = useForm<ClientRide>();
  const [autofilledAddress, setAutofilledAddress] = React.useState<'source' | 'destination'>(
    'destination'
  );
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const { user } = useUserContext();

  const passenger = user?.firstName || 'נוסע';
  const autofilledAddressValue = 'בי”ח תל השומר / נשים ויולדות / מחלקת יולדות א';

  const onSwitchAutofilled = () => {
    setAutofilledAddress(autofilledAddress === 'source' ? 'destination' : 'source');
  };

  const onSubmit: SubmitHandler<ClientRide> = async (data) => {
    const specialRequestsArray = Object.keys(data.specialRequest || {}).reduce(
      (acc: RideSpecialRequestEnum[], cur) => {
        if (data.specialRequest?.[cur]) {
          acc.push(getSpecialEnum(cur));
        }
        return acc;
      },
      []
    );

    const ride = {
      ...data,
      specialRequest: specialRequestsArray,
      state: RideStateEnum.WaitingForDriver
    };
    const response = await api.ride.ridesPost({
      ride: {
        ...ride,
        rideRequester: {
          userId: user?.userId,
          firstName: user?.firstName,
          lastName: user?.lastName
        }
      }
    });
    console.log(ride);
    console.log(response);
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
              error={!!errors?.origin}
              helperText={errors?.origin && 'חסרה כתובת איסוף'}
              {...register('origin', { required: true })}
            />
          ) : (
            <div>
              <InputLabel>כתובת איסוף</InputLabel>
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
              error={!!errors?.destination}
              helperText={errors?.destination && 'חסרה כתובת יעד'}
              {...register('destination', { required: true })}
            />
          ) : (
            <div>
              <InputLabel>כתובת יעד</InputLabel>
              <span>{autofilledAddressValue}</span>
            </div>
          )}
        </div>
        <TextField
          label="טלפון ליצירת קשר"
          type="number"
          placeholder="יש להזין 10 ספרות של הטלפון הנייד"
          required
          error={!!errors?.cellphone}
          helperText={errors?.cellphone && 'חסר מספר טלפון'}
          {...register('cellphone', { required: true })}
        />
        <FormControl>
          <InputLabel htmlFor="passengerCount" required>
            מספר נוסעים
          </InputLabel>
          <Select
            id="passengerCount"
            label="מספר נוסעים"
            error={!!errors?.passengerCount}
            {...register('passengerCount', { required: true })}
          >
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={2}>2</MenuItem>
            <MenuItem value={3}>3</MenuItem>
            <MenuItem value={4}>4</MenuItem>
            <MenuItem value={5}>5</MenuItem>
          </Select>
          {errors.passengerCount?.type === 'required' && (
            <FormHelperText error className="absolute top-full">
              יש לבחור מספר נוסעים
            </FormHelperText>
          )}
        </FormControl>
        <div className="flex flex-col gap-2">
          <p className="text-sm text-gray-500">בקשות מיוחדות</p>
          <FormControlLabel
            control={<Checkbox {...register('specialRequest.isWheelChair')} />}
            checked={watch().specialRequest?.isWheelChair}
            label="התאמה לכסא גלגלים"
          />
          <FormControlLabel
            control={<Checkbox {...register('specialRequest.isBabySafetySeat')} />}
            label="מושב בטיחות לתינוק"
          />
          <FormControlLabel
            control={<Checkbox {...register('specialRequest.isChildSafetySeat')} />}
            label="מושב בטיחות לילדים (גיל 3-8)"
          />
          <FormControlLabel
            control={<Checkbox {...register('specialRequest.isHighVehicle')} />}
            label="רכב גבוה"
          />
          <FormControlLabel
            control={<Checkbox {...register('specialRequest.isWheelChairTrunk')} />}
            label="תא מטען מתאים לכסא גלגלים"
          />
          <FormControlLabel
            control={<Checkbox {...register('specialRequest.isPatientDelivery')} />}
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
  hideFooter: true,
  showLogoutButton: true
});
