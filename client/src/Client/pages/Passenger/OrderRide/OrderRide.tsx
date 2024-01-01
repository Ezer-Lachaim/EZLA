import { useState, useEffect } from 'react';
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
import { Link, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import withLayout from '../../../components/LayoutHOC.tsx';
import { api } from '../../../../services/api';
import { useAuthStore } from '../../../../services/auth';
import { Ride, RideRequester, RideSpecialRequestEnum, RideStateEnum } from '../../../../api-client';
import { useActiveRide } from '../../../../hooks/useActiveRide';

interface OrderRideFormData {
  ride: Ride;
  isApproveTerms: boolean;
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

const specialMap: {
  [key: string]: RideSpecialRequestEnum;
} = {
  isWheelChair: RideSpecialRequestEnum.WheelChair,
  isBabySafetySeat: RideSpecialRequestEnum.BabyChair,
  isChildSafetySeat: RideSpecialRequestEnum.KidsChair,
  isHighVehicle: RideSpecialRequestEnum.AccessibleCar,
  isWheelChairTrunk: RideSpecialRequestEnum.WheelChairStorage,
  isPatientDelivery: RideSpecialRequestEnum.PatientDelivery
};

enum DestinationSourceEnum {
  Destination,
  Source
}

const OrderRide = () => {
  const user = useAuthStore((state) => state.user) as RideRequester;
  const setGuestToken = useAuthStore((state) => state.setGuestToken);
  const { reFetch: reFetchActiveRide } = useActiveRide();
  const [autofilledAddress, setAutofilledAddress] = useState<DestinationSourceEnum>(
    DestinationSourceEnum.Destination
  );
  const [isOrderRideLoading, setIsOrderRideLoading] = useState(false);
  const {
    register,
    watch,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<OrderRideFormData>({
    defaultValues: {
      ride: {
        origin: user?.address,
        firstName: user?.firstName,
        lastName: user?.lastName,
        cellphone: user?.cellPhone
      },
      specialRequest: {
        isWheelChair: user?.specialRequest?.includes(specialMap.isWheelChair),
        isBabySafetySeat: user?.specialRequest?.includes(specialMap.isBabySafetySeat),
        isChildSafetySeat: user?.specialRequest?.includes(specialMap.isChildSafetySeat),
        isHighVehicle: user?.specialRequest?.includes(specialMap.isHighVehicle),
        isWheelChairTrunk: user?.specialRequest?.includes(specialMap.isWheelChairTrunk),
        isPatientDelivery: user?.specialRequest?.includes(specialMap.isPatientDelivery)
      }
    }
  });

  useEffect(() => {
    if (!user) {
      return;
    }

    (async () => {
      const hospitals = await api.hospital.getHospitalList();

      if (hospitals) {
        const hospitalName =
          hospitals.find((hospital) => hospital.id === user.patient?.hospitalId)?.name || '';
        const hospitalDept = user.patient?.hospitalDept || '';
        const hospitalBuilding = user.patient?.hospitalBuilding || '';

        const value = `${hospitalName}${hospitalDept && ` / ${hospitalDept}`}${
          hospitalBuilding && ` / ${hospitalBuilding}`
        }`;
        if (autofilledAddress === DestinationSourceEnum.Destination) {
          setValue('ride.destination', value);
        } else {
          setValue('ride.origin', value);
        }
      }
    })();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit: SubmitHandler<OrderRideFormData> = async (data) => {
    setIsOrderRideLoading(true);
    const specialRequestsArray = Object.keys(data.specialRequest || {}).reduce(
      (acc: RideSpecialRequestEnum[], cur) => {
        if (data.specialRequest?.[cur]) {
          acc.push(specialMap[cur]);
        }
        return acc;
      },
      []
    );

    if (!user) {
      setGuestToken(uuidv4());
    }

    const newRide: Ride = {
      ...data.ride,
      specialRequest: specialRequestsArray,
      state: RideStateEnum.WaitingForDriver
    };

    await api.ride.ridesPost({
      ride: newRide
    });
    await reFetchActiveRide();
    // navigation will occur automatically (in @../Passenger.tsx)
  };

  const onSwapAddresses = () => {
    const { origin, destination } = watch().ride;
    setValue('ride.origin', destination);
    setValue('ride.destination', origin);

    setAutofilledAddress(
      autofilledAddress === DestinationSourceEnum.Source
        ? DestinationSourceEnum.Destination
        : DestinationSourceEnum.Source
    );
  };

  return (
    <div className="flex flex-col items-center w-full pb-5">
      <h1 className="mt-0">שלום{user?.firstName && ` ${user?.firstName}`}! צריכים הסעה?</h1>
      <form className="flex flex-col gap-9 w-full" onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="flex flex-col">
          {!user || autofilledAddress === DestinationSourceEnum.Destination ? (
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
          ) : (
            <div>
              <InputLabel>כתובת איסוף</InputLabel>
              <span>{watch().ride?.origin || ''}</span>
            </div>
          )}

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

          {!user || autofilledAddress === DestinationSourceEnum.Source ? (
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
          ) : (
            <div>
              <InputLabel>כתובת יעד</InputLabel>
              <span>{watch().ride?.destination || ''}</span>
            </div>
          )}
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
            label={user ? 'הערה' : 'מטרת הנסיעה'}
            type="string"
            required={!user}
            placeholder="הסבר קצר לגבי מטרת הנסיעה"
            error={!!errors?.ride?.comment}
            {...register('ride.comment', {
              maxLength: 50,
              required: !user
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
              {errors.ride.comment.type === 'required' && 'יש להזין את מטרת הנסיעה'}
              {errors.ride.comment.type === 'maxLength' && 'הגעתם למקסימום אורך ההודעה המותר'}
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

        <p className=" -my-4 text-center">פרטי מזמין ההסעה </p>
        <FormControl>
          <TextField
            label="שם פרטי"
            fullWidth
            required
            disabled={!!user}
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
            disabled={!!user}
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

        {!user && (
          <div>
            <FormControlLabel
              control={
                <Checkbox
                  {...register('isApproveTerms', { required: true })}
                  sx={errors.isApproveTerms ? { color: 'red' } : {}}
                />
              }
              label={
                <p>
                  הנני מאשר/ת כי קראתי את{' '}
                  <a href="/terms.html" target="_blank">
                    תקנון האתר
                  </a>{' '}
                  ואת ואת{' '}
                  <Link to="/privacy" target="_blank">
                    מדיניות הפרטיות
                  </Link>{' '}
                  ומסכים לתנאיהם
                </p>
              }
            />
            {errors.isApproveTerms && (
              <FormHelperText error>
                {errors.isApproveTerms.type === 'required' && 'יש לאשר קריאת תקנון האתר'}
              </FormHelperText>
            )}
          </div>
        )}

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
  const user = useAuthStore((state) => state.user);

  const OrderRideComponent = withLayout(
    OrderRide,
    user
      ? {
          title: 'הזמנת הסעה לביקור חולים',
          showLogoutButton: true
        }
      : {
          title: 'הזמנת הסעה',
          showBackButton: true,
          onBackClick: () => {
            navigate('/first-signup');
          }
        }
  );

  return <OrderRideComponent />;
};

export default OrderRideWrapper;
