import { useState, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import {
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  InputLabel,
  FormHelperText,
  FormControl,
  IconButton,
  MenuItem,
  styled,
  Select,
  SelectChangeEvent,
  OutlinedInput,
  ListItemText,
  Tab,
  Tabs
} from '@mui/material';
import {
  AddCircleOutlineOutlined,
  RemoveCircleOutlineOutlined,
  Inventory,
  EmojiPeople
} from '@mui/icons-material';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import { Link, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import withLayout from '../../../components/LayoutHOC.tsx';
import { api } from '../../../../services/api';
import { useUserStore } from '../../../../services/auth/user';
import { setToken as setGuestToken } from '../../../../services/auth/guest';
import {
  Ride,
  RideRequester,
  RideServiceTypeEnum,
  RideSpecialRequestEnum,
  RideStateEnum
} from '../../../../api-client';
import { useActiveRide } from '../../../../hooks/activeRide';

interface OrderRideFormData {
  ride: Ride;
  isApproveTerms: boolean;
  selectedSpecialRequests: (RideSpecialRequestEnum | string)[];
}

const specialRequestLabels: { [key: string]: string } = {
  isWheelChair: 'התאמה לכסא גלגלים',
  isBabySafetySeat: 'מושב בטיחות לתינוק',
  isChildSafetySeat: 'מושב בטיחות לילדים (גיל 3-8)',
  isHighVehicle: 'רכב גבוה',
  isWheelChairTrunk: 'תא מטען מתאים לכסא גלגלים'
};

const deliverySpecialRequestLabels: { [key: string]: string } = {
  isFood: 'מזון',
  isMilitaryEquipment: 'ציוד צבאי',
  isMedicalEquipment: 'ציוד רפואי',
  isHolyItems: 'תשמישי קדושה',
  isLargeVolume: 'נפח גדול',
  isSmallVolume: 'נפח קטן',
  isHeavyWeight: 'משקל כבד',
  isFragile: 'שביר'
};

const specialMap: {
  [key: string]: RideSpecialRequestEnum;
} = {
  isWheelChair: RideSpecialRequestEnum.WheelChair,
  isBabySafetySeat: RideSpecialRequestEnum.BabyChair,
  isChildSafetySeat: RideSpecialRequestEnum.KidsChair,
  isHighVehicle: RideSpecialRequestEnum.AccessibleCar,
  isWheelChairTrunk: RideSpecialRequestEnum.WheelChairStorage,
  isFood: RideSpecialRequestEnum.Food,
  isMilitaryEquipment: RideSpecialRequestEnum.MilitaryEquipment,
  isMedicalEquipment: RideSpecialRequestEnum.MedicalEquipment,
  isHolyItems: RideSpecialRequestEnum.HolyItems,
  isLargeVolume: RideSpecialRequestEnum.LargeVolume,
  isSmallVolume: RideSpecialRequestEnum.SmallVolume,
  isHeavyWeight: RideSpecialRequestEnum.HeavyWeight,
  isFragile: RideSpecialRequestEnum.Fragile
};

const CustomFontSizeContainer = styled('div')(() => ({
  fontSize: 20,
  '& .MuiInputBase-input': {
    fontSize: 20
  },
  '& .MuiInputLabel-root': {
    fontSize: 20
  },
  '& .MuiButtonBase-root': {
    fontSize: 20
  },
  '& .MuiOutlinedInput-root': {
    '& .MuiOutlinedInput-notchedOutline': {
      legend: {
        fontSize: 15
      }
    }
  }
}));

enum DestinationSourceEnum {
  Destination,
  Source
}

const OrderRide = () => {
  const user = useUserStore((state) => state.user) as RideRequester;
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
      selectedSpecialRequests: []
    }
  });
  const [quantity, setQuantity] = useState<number>(1);
  const handleIncrement = () => {
    if (quantity < 12) {
      setQuantity((prevQuantity) => prevQuantity + 1);
      setValue('ride.passengerCount', quantity + 1);
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
      setValue('ride.passengerCount', quantity - 1);
    }
  };
  const [selectedSpecialRequests, setSelectedSpecialRequests] = useState<string[]>([]);

  const handleSpecialRequestsChange = (
    event: SelectChangeEvent<typeof selectedSpecialRequests>
  ) => {
    const {
      target: { value }
    } = event;
    setSelectedSpecialRequests(typeof value === 'string' ? value.split(',') : value);
  };

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
    const specialRequestsArray = selectedSpecialRequests.map((request) => specialMap[request]);

    if (!user) {
      setGuestToken(uuidv4());
    }

    const newRide: Ride = {
      ...data.ride,
      serviceType: rideOrDelivery,
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

  const [rideOrDelivery, setRideOrDelivery] = useState<RideServiceTypeEnum>('ride');

  const handleDeliveryDriverButtonClick = (newValue: RideServiceTypeEnum) => {
    setRideOrDelivery(newValue);
  };

  return (
    <CustomFontSizeContainer className="flex flex-col items-center w-full pb-5">
      <h1 className="mt-0">שלום{user?.firstName && ` ${user?.firstName}`}, צריכים הסעה?</h1>
      <form className="flex flex-col gap-9 w-full" onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="flex border border-blue-500 rounded-lg">
          <Tabs
            value={rideOrDelivery}
            onChange={(event, newValue) => handleDeliveryDriverButtonClick(newValue)}
            className="flex-grow"
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            TabIndicatorProps={{ style: { backgroundColor: 'transparent' } }}
          >
            <Tab
              value="ride"
              icon={<EmojiPeople />}
              iconPosition="start"
              label="נוסעים"
              className={`transition-all duration-300 ease-in-out ${
                rideOrDelivery === 'ride' ? 'bg-blue-500 text-white rounded-r-lg' : 'text-blue-500'
              }`}
            />
            <Tab
              value="delivery"
              icon={<Inventory />}
              iconPosition="start"
              label="משלוחים"
              className={`transition-all duration-300 ease-in-out ${
                rideOrDelivery === 'delivery'
                  ? 'bg-blue-500 text-white rounded-l-lg'
                  : 'text-blue-500'
              }`}
            />
          </Tabs>
        </div>
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
          <InputLabel htmlFor="passengerCount" />
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <IconButton aria-label="decrement" onClick={handleDecrement} disabled={quantity === 1}>
              <RemoveCircleOutlineOutlined />
            </IconButton>
            <TextField
              id="passengerCount"
              variant="outlined"
              value={quantity}
              inputProps={{ min: 1, max: 12, inputMode: 'numeric' }}
              label={rideOrDelivery === 'delivery' ? 'מספר חבילות/ארגזים' : 'מספר נוסעים'}
            />
            {errors.ride?.passengerCount?.type === 'required' && (
              <FormHelperText error className="absolute top-full mr-0">
                יש לבחור מספר נוסעים
              </FormHelperText>
            )}
            <IconButton aria-label="increment" onClick={handleIncrement}>
              <AddCircleOutlineOutlined />
            </IconButton>
          </div>
          {errors.ride?.passengerCount?.type === 'required' && (
            <FormHelperText error className="absolute top-full mr-0">
              יש לבחור מספר נוסעים
            </FormHelperText>
          )}
        </FormControl>
        <FormControl>
          <TextField
            label="תיאור הנסיעה"
            type="string"
            required={!user}
            placeholder="הסבר קצר לגבי תיאור הנסיעה"
            multiline
            rows={2}
            maxRows={2}
            error={!!errors?.ride?.comment}
            {...register('ride.comment', {
              maxLength: 100,
              required: !user
            })}
            inputProps={{
              maxLength: 100
            }}
          />
          <span
            className={`absolute top-1 left-1 text-xs ${
              (watch().ride?.comment?.length || 0) >= 100 ? 'text-red-500' : ''
            }`}
          >
            {watch().ride?.comment?.length || 0} / 100
          </span>
          {errors.ride?.comment && (
            <FormHelperText error className="absolute top-full mr-0">
              {errors.ride.comment.type === 'required' && 'יש להזין את תיאור הנסיעה'}
              {errors.ride.comment.type === 'maxLength' && 'חרגתם מאורך ההודעה המותר'}
            </FormHelperText>
          )}
        </FormControl>
        <FormControl className="flex flex-col gap-2">
          <InputLabel id="multiple-checkbox-label">בקשות מיוחדות</InputLabel>
          <Select
            labelId="multiple-checkbox-label"
            id="multiple-checkbox"
            multiple
            value={selectedSpecialRequests}
            onChange={handleSpecialRequestsChange}
            input={
              <OutlinedInput
                label="בקשות מיוחדות"
                // {rideOrDelivery === 'delivery' ? 'בקשות אחרות' : 'בקשות מיוחדות'}
              />
            }
            renderValue={(selected) => {
              return Array.isArray(selected)
                ? selected
                    .map((value) =>
                      rideOrDelivery === 'delivery'
                        ? deliverySpecialRequestLabels[value]
                        : specialRequestLabels[value]
                    )
                    .join(', ')
                : '';
            }}
          >
            {Object.keys(
              rideOrDelivery === 'delivery' ? deliverySpecialRequestLabels : specialRequestLabels
            ).map((key) => (
              <MenuItem key={key} value={key}>
                <Checkbox checked={selectedSpecialRequests.indexOf(key) > -1} />
                <ListItemText
                  primary={
                    rideOrDelivery === 'delivery'
                      ? deliverySpecialRequestLabels[key]
                      : specialRequestLabels[key]
                  }
                />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
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
    </CustomFontSizeContainer>
  );
};

const OrderRideWrapper = () => {
  const navigate = useNavigate();
  const user = useUserStore((state) => state.user);

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
