import dayjs from 'dayjs';
import { TextField, TextFieldProps } from '@mui/material';
import { DatePicker, DatePickerProps } from '@mui/x-date-pickers';
import { getDayStart, DAY_MS } from '../../../../../utils/datetime';

function generateTextField(format: string | undefined) {
  return ({ value, ...props }: TextFieldProps) => {
    let localValue = '';
    if (value) {
      const dateValue = new Date((value as string).replace(/[^0-9-]/g, ''));

      const today = getDayStart(new Date());
      const tomorrow = new Date(today.getTime() + DAY_MS);
      const dayAfterTomorrow = new Date(tomorrow.getTime() + DAY_MS);
      if (dateValue >= today && dateValue < tomorrow) {
        localValue = 'היום';
      } else if (dateValue >= tomorrow && dateValue < dayAfterTomorrow) {
        localValue = 'מחר';
      } else {
        localValue = dayjs(dateValue).format(format);
      }
    }

    return <TextField {...props} value={localValue} />;
  };
}

export default function DayPicker<TDate>(props: DatePickerProps<TDate>) {
  return (
    <DatePicker
      {...props}
      format="YYYY-MM-DD"
      slots={{
        textField: generateTextField(props.format)
      }}
    />
  );
}
