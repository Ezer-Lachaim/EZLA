import dayjs from 'dayjs';
import 'dayjs/locale/en-gb';
import { DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TextField, TextFieldProps } from '@mui/material';
import { DatePicker, DatePickerProps } from '@mui/x-date-pickers/DatePicker';

const today = dayjs();
const threeDay = dayjs().add(3, 'day');

const DAY_MS = 1000 * 60 * 60 * 24; // 24 hours in ms

function getDayStart(date: Date) {
  const clone = new Date(date);
  clone.setHours(0, 0, 0, 0);
  return clone;
}

const DayTextField = ({ value, ...props }: TextFieldProps) => {
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
      localValue = 'Yesterday';
    } else {
      localValue = dayjs(dateValue).format('DD-MM-YYYY');
    }
  }

  return <TextField {...props} value={localValue} />;
};

export default function CalenderDate<T>(props: Omit<DatePickerProps<T>, 'format'>) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={'en-gb'}>
      <DemoItem>
        <DatePicker
          label="תאריך איסוף מבוקש"
          defaultValue={today}
          maxDate={threeDay}
          disablePast
          slotProps={{
            textField: {
              required: true
            }
          }}
          {...props}
          format="YYYY-MM-DD"
          slots={{
            textField: DayTextField
          }}
        />
      </DemoItem>
    </LocalizationProvider>
  );
}
