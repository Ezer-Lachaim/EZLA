/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useEffect } from 'react';
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
import { Ride, RideRequester, RideSpecialRequestEnum, RideStateEnum } from '../../../../api-client';
import { useUserContext } from '../../../../context/UserContext/UserContext.tsx';

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

const getPatientDestination = (
  hospitalName: string,
  hospitalDept: string,
  hospitalBuilding: string
) => {
  return `${hospitalName}${hospitalDept && ` / ${hospitalDept}`}${
    hospitalBuilding && ` / ${hospitalBuilding}`
  }`;
};

const OrderRide = () => {
  const { user, activeRide: ride } = useUserContext();
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors }
  } = useForm<ClientRide>({
    defaultValues: {
      origin: user?.address,
      cellphone: user?.cellPhone,
      specialRequest: {
        isWheelChair: (user as RideRequester)?.specialRequest?.includes(specialMap.isWheelChair),
        isBabySafetySeat: (user as RideRequester)?.specialRequest?.includes(
          specialMap.isBabySafetySeat
        ),
        isChildSafetySeat: (user as RideRequester)?.specialRequest?.includes(
          specialMap.isChildSafetySeat
        ),
        isHighVehicle: (user as RideRequester)?.specialRequest?.includes(specialMap.isHighVehicle),
        isWheelChairTrunk: (user as RideRequester)?.specialRequest?.includes(
          specialMap.isWheelChairTrunk
        ),
        isPatientDelivery: (user as RideRequester)?.specialRequest?.includes(
          specialMap.isPatientDelivery
        )
      }
    }
  });
  const [autofilledAddress, setAutofilledAddress] = React.useState<'source' | 'destination'>(
    'destination'
  );
  const [autofilledAddressValue, setAutofilledAddressValue] = React.useState('');

  const rideRequester = user as RideRequester;

  const passenger = user?.firstName || 'נוסע';

  useEffect(() => {
    const fetchHospitals = async () => {
      const response = await api.hospital.getHospitalList();

      if (response) {
        const hospitalName =
          response.find((hospital) => hospital.id === rideRequester.patient?.hospitalId)?.name ||
          '';

        setAutofilledAddressValue(
          getPatientDestination(
            hospitalName,
            rideRequester.patient?.hospitalDept || '',
            rideRequester.patient?.hospitalBuilding || ''
          )
        );
      }
    };

    fetchHospitals();
  }, [rideRequester]);

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

    const newRide = {
      ...data,
      ...(autofilledAddress === 'destination'
        ? {
            destination: autofilledAddressValue
          }
        : {
            origin: autofilledAddressValue
          }),
      specialRequest: specialRequestsArray,
      state: RideStateEnum.WaitingForDriver,
      rideRequester: {
        userId: user?.userId,
        firstName: user?.firstName,
        lastName: user?.lastName,
        cellPhone: user?.cellPhone
      }
    };
    const response = await api.ride.ridesPost({
      ride: newRide
    });
    console.log(response);
  };

  const onCancelRide = async () => {
    await api.ride.updateRide({
      rideId: ride?.rideId || '',
      ride: { ...ride, state: RideStateEnum.RequesterCanceled }
    });
  };

  return (
    <div className="flex flex-col items-center w-full pb-5">
      <h1 className="mt-0">שלום {passenger}! צריך הסעה?</h1>
      <form className="flex flex-col gap-9 w-full" onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="flex flex-col">
          {autofilledAddress === 'destination' ? (
            <FormControl>
              <TextField
                label="כתובת איסוף"
                type="string"
                placeholder="יש להזין כתובת"
                required
                error={!!errors?.origin}
                {...register('origin', { required: true })}
              />
              {errors.origin && (
                <FormHelperText error className="absolute top-full mr-0">
                  {errors.origin.type === 'required' && 'יש להזין כתובת מגורים לאיסוף'}
                </FormHelperText>
              )}
            </FormControl>
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
            <FormControl>
              <TextField
                label="כתובת יעד"
                type="string"
                placeholder="יש להזין כתובת"
                required
                error={!!errors?.destination}
                {...register('destination', { required: true })}
              />

              {errors.destination && (
                <FormHelperText error className="absolute top-full mr-0">
                  {errors.destination.type === 'required' && 'יש להזין כתובת מגורים יעד'}
                </FormHelperText>
              )}
            </FormControl>
          ) : (
            <div>
              <InputLabel>כתובת יעד</InputLabel>
              <span>{autofilledAddressValue}</span>
            </div>
          )}
        </div>
        <FormControl>
          <TextField
            label="טלפון ליצירת קשר"
            type="string"
            placeholder="יש להזין 10 ספרות של הטלפון הנייד"
            required
            error={!!errors?.cellphone}
            {...register('cellphone', { required: true, pattern: /^05\d-?\d{7}$/ })}
          />
          {errors.cellphone && (
            <FormHelperText error className="absolute top-full mr-0">
              {errors.cellphone.type === 'required' && 'יש להזין טלפון נייד'}
              {errors.cellphone.type === 'pattern' && 'יש להקליד מספר טלפון תקין'}
            </FormHelperText>
          )}
        </FormControl>
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
            <FormHelperText error className="absolute top-full mr-0">
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
            checked={watch().specialRequest?.isBabySafetySeat}
            label="מושב בטיחות לתינוק"
          />
          <FormControlLabel
            control={<Checkbox {...register('specialRequest.isChildSafetySeat')} />}
            checked={watch().specialRequest?.isChildSafetySeat}
            label="מושב בטיחות לילדים (גיל 3-8)"
          />
          <FormControlLabel
            control={<Checkbox {...register('specialRequest.isHighVehicle')} />}
            checked={watch().specialRequest?.isHighVehicle}
            label="רכב גבוה"
          />
          <FormControlLabel
            control={<Checkbox {...register('specialRequest.isWheelChairTrunk')} />}
            checked={watch().specialRequest?.isWheelChairTrunk}
            label="תא מטען מתאים לכסא גלגלים"
          />
          <FormControlLabel
            control={<Checkbox {...register('specialRequest.isPatientDelivery')} />}
            checked={watch().specialRequest?.isPatientDelivery}
            label="משלוחים למאושפז"
          />
        </div>

        <Button variant="contained" size="large" className="w-full" type="submit">
          הזמינו נסיעה
        </Button>
      </form>

      <SearchingDriverModal
        open={ride?.state === RideStateEnum.WaitingForDriver}
        onClose={onCancelRide}
      />
    </div>
  );
};
export default withLayout(OrderRide, {
  title: 'הזמנת הסעה לביקור חולים',
  hideFooter: true,
  showLogoutButton: true
});
