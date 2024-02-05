import { Theme } from '@mui/material/styles';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import dayjs from 'dayjs';
import { TextField, TextFieldProps } from '@mui/material';

export const menuHours = ['שעה', 'שעתיים', '3 שעות', '4 שעות', '5 שעות', '6 שעות', '7 שעות'];

export function getStyles(name: string, personName: string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium
  };
}


const DAY_MS = 1000 * 60 * 60 * 24; // 24 hours in ms

function getDayStart(date: Date) {
  const clone = new Date(date);
  clone.setHours(0, 0, 0, 0);
  return clone;
}

export const DayTextField = ({ value, ...props }: TextFieldProps) => {
  let localValue = '';
  if (value) {
    const dateValue = new Date((value as string).replace(/[^0-9-]/g, ''));

    const today = getDayStart(new Date());
    const tomorrow = new Date(today.getTime() + DAY_MS);
    const dayAfterTomorrow = new Date(tomorrow.getTime() + DAY_MS);
    const yesterday = new Date(today.getTime() - DAY_MS);
    if (dateValue >= today && dateValue < tomorrow) {
      localValue = 'היום';
    } else if (dateValue >= tomorrow && dateValue < dayAfterTomorrow) {
      localValue = 'מחר';
    } else if (dateValue >= yesterday && dateValue < today) {
      localValue = 'אתמול';
    } else {
      localValue = dayjs(dateValue).format('DD-MM-YYYY');
    }
  }

  return <TextField {...props} value={localValue} />;
};



dayjs.extend(utc);
dayjs.extend(timezone);
let today = dayjs.tz(dayjs(), 'Asia/Jerusalem');

export const fixTimeUpDayjs = () => {
  today = today.add(3, 'hour');
  const minutes = today.minute() % 10;
  if (minutes < 5) {
    today = today.add(5 - minutes, 'minute');
  } else {
    today = today.add(10 - minutes, 'minute');
  }
};