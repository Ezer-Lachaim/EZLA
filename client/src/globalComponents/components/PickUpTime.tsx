import * as React from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import {
  renderDigitalClockTimeView,
  renderMultiSectionDigitalClockTimeView,
  renderTimeViewClock
} from '@mui/x-date-pickers/timeViewRenderers';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import dayjs, { Dayjs } from 'dayjs';

dayjs.extend(utc);
dayjs.extend(timezone);
let today = dayjs.tz(dayjs(), 'Asia/Jerusalem');

function fixTimeUpDayjs() {
  today = today.add(3, 'hour');
  const minutes = today.$m % 10;
  if (minutes < 5) {
    today = today.add(5 - minutes, 'minute');
  } else {
    today = today.add(10 - minutes, 'minute');
  }
}
fixTimeUpDayjs();

export default function PickUpTime() {
  const [timeInIsrael, setTimeInIsrael] = React.useState<Dayjs | null>(today);

  return (
    <TimePicker
      sx={{ width: '100%' }}
      label="שעת איסוף"
      disablePast
      ampm={false}
      value={timeInIsrael}
      onChange={setTimeInIsrael}
      // viewRenderers={{
      //   minutes: renderMultiSectionDigitalClockTimeView,
      //   hours: renderMultiSectionDigitalClockTimeView
      // }}
      views={['minutes', 'hours']}
      slotProps={{
        textField: {
          required: true
        }
      }}
    />
  );
}
