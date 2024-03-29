import {
  Checkbox,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Grid,
  Box
} from '@mui/material';
import { useFormContext } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { TimePicker } from '@mui/x-date-pickers';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import InventoryIcon from '@mui/icons-material/Inventory';
import dayjs, { Dayjs } from 'dayjs';
import { Ride, RideServiceTypeEnum } from '../../../../../../../api-client';
import { DRIVER_CAPABILITIES } from '../../../Volunteers/Volunteers.constants';
import DayPicker from '../../../DayPicker/DayPicker';
import { getHoursArray, getMenuHoursLabel } from '../../../../../../../utils/datetime';

const menuHours = getHoursArray(7);

function EditRideInfo() {
  const {
    register,
    watch,
    setValue,
    formState: { errors }
  } = useFormContext<Ride>();

  const selectedSpecialRequests = watch('specialRequest', []);
  const serviceType = watch('serviceType');

  // For pickupDateTime
  const [pickupDate, setPickupDate] = useState<Dayjs | null>(dayjs(watch('pickupDateTime')));
  const [pickupTime, setPickupTime] = useState<Dayjs | null>(dayjs(watch('pickupDateTime')));

  useEffect(() => {
    if (!pickupDate || !pickupTime) {
      setValue('pickupDateTime', undefined);
      return;
    }

    const joined = pickupDate
      .clone()
      .hour(pickupTime.hour())
      .minute(pickupTime.minute())
      .second(0)
      .millisecond(0);

    setValue('pickupDateTime', joined.toDate());
  }, [pickupDate, pickupTime, setValue]);

  return (
    <div className="flex gap-4">
      <div className="flex flex-col gap-8 flex-1">
        <FormControl>
          <TextField
            required
            label="שם פרטי"
            variant="outlined"
            fullWidth
            error={!!errors.firstName}
            {...register('firstName', { required: true, minLength: 2 })}
          />
          {errors.firstName && (
            <FormHelperText error className="absolute top-full mr-0">
              {errors.firstName.type === 'required' && 'יש להזין ערך'}
              {errors.firstName.type === 'minLength' && 'חייב להכיל לפחות 2 תווים'}
            </FormHelperText>
          )}
        </FormControl>
        <FormControl>
          <TextField
            required
            label="כתובת איסוף"
            variant="outlined"
            fullWidth
            error={!!errors.origin}
            {...register('origin', { required: true, minLength: 2 })}
          />
          {errors.origin && (
            <FormHelperText error className="absolute top-full mr-0">
              {errors.origin.type === 'required' && 'יש להזין ערך'}
              {errors.origin.type === 'minLength' && 'חייב להכיל לפחות 2 תווים'}
            </FormHelperText>
          )}
        </FormControl>
        <FormControl>
          <TextField
            required
            label="טלפון ליצירת קשר"
            variant="outlined"
            fullWidth
            type="string"
            error={!!errors.cellphone}
            {...register('cellphone', {
              required: true,
              pattern: /^05\d-?\d{7}$/
            })}
          />
          {errors.cellphone && (
            <FormHelperText error className="absolute top-full mr-0">
              {errors.cellphone.type === 'required' && 'יש להזין ערך'}
              {errors.cellphone.type === 'pattern' && 'יש להקליד מספר טלפון תקין'}
            </FormHelperText>
          )}
        </FormControl>

        <FormControl>
          <DayPicker
            label="תאריך איסוף מבוקש"
            maxDate={dayjs().add(3, 'day')}
            disablePast
            value={pickupDate}
            onChange={(date) => setPickupDate(date)}
            format="DD/MM/YYYY"
          />
        </FormControl>
        <FormControl sx={{ width: '100%' }} required>
          <InputLabel id="relevant-time-label" required>
            כמה זמן רלוונטי
          </InputLabel>
          <Select
            labelId="relevant-time-label"
            aria-labelledby="relevant-time-label"
            id="relevant-time"
            value={watch('relevantTime')}
            onChange={(e) => setValue('relevantTime', e.target.value as number)}
            label="כמה זמן רלוונטי"
            required
          >
            {menuHours.map((hour) => (
              <MenuItem key={hour} value={hour}>
                {getMenuHoursLabel(hour)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <div className="flex flex-col gap-8 flex-1">
          <FormControl className="flex flex-col gap-2">
            <InputLabel id="special-requests-label">בקשות מיוחדות</InputLabel>
            <Select
              labelId="special-requests-label"
              aria-labelledby="special-requests-label"
              id="special-requests"
              multiple
              input={<OutlinedInput label="בקשות מיוחדות" />}
              {...register('specialRequest')}
              value={selectedSpecialRequests}
              renderValue={(selected: unknown[]) =>
                (selected as string[])
                  .map(
                    (value) =>
                      DRIVER_CAPABILITIES.find((capability) => capability.value === value)?.label
                  )
                  .join(', ')
              }
              style={{ maxWidth: '310px' }}
            >
              {DRIVER_CAPABILITIES.map(({ value, label }) => (
                <MenuItem key={value} value={value}>
                  <Checkbox checked={(selectedSpecialRequests ?? []).includes(value)} />
                  {label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </div>
      <div className="flex flex-col gap-8 flex-1">
        <FormControl>
          <TextField
            required
            label="שם משפחה"
            variant="outlined"
            fullWidth
            error={!!errors.lastName}
            {...register('lastName', { required: true, minLength: 2 })}
          />
          {errors.lastName && (
            <FormHelperText error className="absolute top-full mr-0">
              {errors.lastName.type === 'required' && 'יש להזין ערך'}
              {errors.lastName.type === 'minLength' && 'חייב להכיל לפחות 2 תווים'}
            </FormHelperText>
          )}
        </FormControl>
        <FormControl>
          <TextField
            required
            label="כתובת יעד"
            variant="outlined"
            fullWidth
            error={!!errors.destination}
            {...register('destination', { required: true, minLength: 2 })}
          />
          {errors.destination && (
            <FormHelperText error className="absolute top-full mr-0">
              {errors.destination.type === 'required' && 'יש להזין ערך'}
              {errors.destination.type === 'minLength' && 'חייב להכיל לפחות 2 תווים'}
            </FormHelperText>
          )}
        </FormControl>
        <FormControl>
          <Grid container justifyContent="space-between">
            <Grid item xs={6}>
              <Box>
                <InputLabel id="serviceType">סוגי נסיעה</InputLabel>
                <Select
                  style={{ width: '98%', padding: 0, height: 54 }}
                  labelId="serviceType"
                  id="serviceType"
                  defaultValue={serviceType}
                  label="סוגי נסיעה *"
                >
                  <MenuItem
                    value={RideServiceTypeEnum.Ride}
                    onClick={() => setValue('serviceType', RideServiceTypeEnum.Ride)}
                  >
                    <EmojiPeopleIcon /> נסיעה
                  </MenuItem>
                  <MenuItem
                    value={RideServiceTypeEnum.Delivery}
                    onClick={() => setValue('serviceType', RideServiceTypeEnum.Delivery)}
                  >
                    <InventoryIcon /> משלוח
                  </MenuItem>
                </Select>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <TextField
                style={{ width: '100%' }}
                id="passengerCount"
                required
                label="כמות"
                type="number"
                inputProps={{ min: 1, max: 12, inputMode: 'numeric' }}
                defaultValue={1}
                error={!!errors?.passengerCount}
                {...register('passengerCount', { required: true })}
                sx={{
                  '& input[type="number"]::-webkit-inner-spin-button, & input[type="number"]::-webkit-outer-spin-button':
                    {
                      opacity: 1
                    }
                }}
              />
            </Grid>
          </Grid>
        </FormControl>
        <FormControl>
          <TimePicker
            sx={{ width: '100%' }}
            label="שעת איסוף"
            disablePast
            ampm={false}
            value={pickupTime}
            onChange={(date) => setPickupTime(date)}
            views={['minutes', 'hours']}
          />
        </FormControl>
        <FormControl>
          <TextField
            label="תיאור הנסיעה"
            type="string"
            placeholder="הסבר קצר לגבי תיאור הנסיעה"
            multiline
            maxRows={2}
            error={!!errors?.comment}
            {...register('comment', {
              maxLength: 100
            })}
            inputProps={{
              maxLength: 100
            }}
          />
          <span
            className={`absolute top-1 left-1 text-xs ${
              (watch().comment?.length || 0) >= 100 ? 'text-red-500' : ''
            }`}
          >
            {watch().comment?.length || 0} / 100
          </span>
          {errors.comment && (
            <FormHelperText error className="absolute top-full mr-0">
              {errors.comment.type === 'maxLength' && 'הגעתם למקסימום אורך ההודעה המותר'}
            </FormHelperText>
          )}
        </FormControl>
      </div>
    </div>
  );
}

export default EditRideInfo;
