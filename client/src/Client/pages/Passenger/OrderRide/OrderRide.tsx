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
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import withLayout from '../../../components/LayoutHOC.tsx';
import { api } from '../../../../Config.ts';
import { Ride, RideSpecialRequestEnum, RideStateEnum } from '../../../../api-client';
import { useUserContext } from '../../../../context/UserContext/UserContext.tsx';

interface OrderRideFormData {
  ride: Ride;
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
  const { user } = useUserContext();
  const navigate = useNavigate();
  const {
    register,
    watch,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<OrderRideFormData>({
    defaultValues: {
      ride: {
        cellphone: user?.cellPhone
      }
    }
  });

  const [isOrderRideLoading, setIsOrderRideLoading] = React.useState(false);

  const onSubmit: SubmitHandler<OrderRideFormData> = async (data) => {
    setIsOrderRideLoading(true);
    const specialRequestsArray = Object.keys(data.specialRequest || {}).reduce(
      (acc: RideSpecialRequestEnum[], cur) => {
        if (data.specialRequest?.[cur]) {
          acc.push(getSpecialEnum(cur));
        }
        return acc;
      },
      []
    );

    const rideToken = uuidv4();
    localStorage.setItem('guestToken', rideToken);

    const newRide: Ride = {
      ...data.ride,
      specialRequest: specialRequestsArray,
      state: RideStateEnum.WaitingForDriver,
      guestToken: rideToken
    };

    await api.ride.ridesPost({
      ride: newRide
    });

    navigate('/passenger/searching-driver');
  };

  const onSwapAddresses = () => {
    const { origin } = watch().ride;
    const { destination } = watch().ride;
    setValue('ride.origin', destination);
    setValue('ride.destination', origin);
  };

  return (
    <div className="flex flex-col items-center w-full pb-5">
      <h1 className="mt-0">שלום{user?.firstName && ` ${user?.firstName}`}! צריכים הסעה?</h1>
      <form className="flex flex-col gap-9 w-full" onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="flex flex-col">
          <FormControl>
            <TextField
              label="כתובת איסוף"
              autoFocus
              type="string"
              placeholder="יש להזין שם רחוב, מספר בית ועיר"
              required
              value={watch().ride?.origin || ''}
              error={!!errors?.ride?.origin}
              {...register('ride.origin', { required: true })}
            />
            {errors.ride?.origin && (
              <FormHelperText error className="absolute top-full mr-0">
                {errors.ride.origin.type === 'required' && 'יש להזין כתובת מגורים לאיסוף'}
              </FormHelperText>
            )}
          </FormControl>

          <div className="flex justify-center m-3">
            <Button
              variant="outlined"
              size="small"
              className="w-8 min-w-0"
              onClick={onSwapAddresses}
            >
              <SwapVertIcon />
            </Button>
          </div>

          <FormControl>
            <TextField
              label="כתובת יעד"
              type="string"
              placeholder="יש להזין שם רחוב, מספר בית ועיר"
              required
              value={watch().ride?.destination || ''}
              error={!!errors?.ride?.destination}
              {...register('ride.destination', { required: true })}
            />

            {errors.ride?.destination && (
              <FormHelperText error className="absolute top-full mr-0">
                {errors.ride.destination.type === 'required' && 'יש להזין כתובת מגורים יעד'}
              </FormHelperText>
            )}
          </FormControl>
        </div>
        <FormControl>
          <InputLabel htmlFor="passengerCount" required>
            מספר נוסעים
          </InputLabel>
          <Select
            id="passengerCount"
            label="מספר נוסעים"
            error={!!errors?.ride?.passengerCount}
            {...register('ride.passengerCount', { required: true })}
          >
            <MenuItem value={0}>0</MenuItem>
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={2}>2</MenuItem>
            <MenuItem value={3}>3</MenuItem>
            <MenuItem value={4}>4</MenuItem>
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={6}>6</MenuItem>
            <MenuItem value={7}>7</MenuItem>
            <MenuItem value={8}>8</MenuItem>
            <MenuItem value={9}>9</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={11}>11</MenuItem>
            <MenuItem value={12}>12</MenuItem>
          </Select>
          {errors.ride?.passengerCount?.type === 'required' && (
            <FormHelperText error className="absolute top-full mr-0">
              יש לבחור מספר נוסעים
            </FormHelperText>
          )}
        </FormControl>
        <FormControl>
          <TextField
            label="מטרת הנסיעה"
            type="string"
            required
            placeholder="הסבר קצר לגבי מטרת הנסיעה"
            error={!!errors?.ride?.comment}
            {...register('ride.comment', {
              maxLength: 50,
              required: true
            })}
          />
          <span
            className={`absolute top-1 left-1 text-xs ${
              (watch().ride?.comment?.length || 0) >= 50 ? 'text-red-500' : ''
            }`}
          >
            {watch().ride?.comment?.length || 0} / 50
          </span>
          {errors.ride?.comment && (
            <FormHelperText error className="absolute top-full mr-0">
              {errors.ride.comment.type === 'maxLength' && 'הגעתם למקסימום אורך ההודעה המותר'}
            </FormHelperText>
          )}
        </FormControl>

        <p className=" -my-4 text-center">פרטי מזמין ההסעה</p>
        <FormControl>
          <TextField
            label="שם פרטי"
            fullWidth
            required
            type="text"
            error={!!errors.ride?.firstName}
            {...register('ride.firstName', { required: true, minLength: 2 })}
          />
          {errors.ride?.firstName && (
            <FormHelperText error className="absolute top-full mr-0">
              {errors.ride.firstName.type === 'required' && 'יש להזין שם פרטי'}
              {errors.ride.firstName.type === 'minLength' && 'שם פרטי חייב להכיל לפחות 2 תווים'}
            </FormHelperText>
          )}
        </FormControl>
        <FormControl>
          <TextField
            label="שם משפחה"
            fullWidth
            required
            type="text"
            error={!!errors.ride?.lastName}
            {...register('ride.lastName', { required: true, minLength: 2 })}
          />
          {errors.ride?.lastName && (
            <FormHelperText error className="absolute top-full mr-0">
              {errors.ride.lastName.type === 'required' && 'יש להזין שם משפחה'}
              {errors.ride.lastName.type === 'minLength' && 'שם משפחה חייב להכיל לפחות 2 תווים'}
            </FormHelperText>
          )}
        </FormControl>
        <FormControl>
          <TextField
            label="טלפון ליצירת קשר"
            type="string"
            placeholder="יש להזין 10 ספרות של הטלפון הנייד"
            required
            error={!!errors?.ride?.cellphone}
            {...register('ride.cellphone', {
              required: true,
              pattern: /^05\d-?\d{7}$/
            })}
          />
          {errors.ride?.cellphone && (
            <FormHelperText error className="absolute top-full mr-0">
              {errors.ride.cellphone.type === 'required' && 'יש להזין טלפון נייד'}
              {errors.ride.cellphone.type === 'pattern' && 'יש להקליד מספר טלפון תקין'}
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
            label="משלוחים"
          />
        </div>

        <Button
          variant="contained"
          size="large"
          className="w-full"
          type="submit"
          disabled={isOrderRideLoading}
        >
          {isOrderRideLoading ? 'טוען...' : 'הזמינו נסיעה'}
        </Button>
      </form>
    </div>
  );
};

const OrderRideWrapper = () => {
  const navigate = useNavigate();

  const OrderRideComponent = withLayout(OrderRide, {
    onBackClick: () => {
      navigate('/first-signup');
    },
    title: 'הזמנת הסעה',
    showBackButton: true
  });

  return <OrderRideComponent />;
};

export default OrderRideWrapper;
