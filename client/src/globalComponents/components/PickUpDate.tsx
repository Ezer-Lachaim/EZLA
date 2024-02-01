import dayjs, { Dayjs } from 'dayjs';
import { TextField, TextFieldProps } from '@mui/material';
import { DatePicker, DatePickerProps } from '@mui/x-date-pickers/DatePicker';

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
      localValue = 'אתמול';
    } else {
      localValue = dayjs(dateValue).format('DD-MM-YYYY');
    }
  }

  return <TextField {...props} value={localValue} />;
};

export default function PickUpDate(props: Omit<DatePickerProps<Dayjs>, 'format'>) {
  return (
    <DatePicker
      label="תאריך איסוף מבוקש"
      defaultValue={dayjs()}
      maxDate={dayjs().add(3, 'day')}
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
  );
}
