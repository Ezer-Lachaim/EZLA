// import * as React from 'react';
// import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { TimePicker } from '@mui/x-date-pickers/TimePicker';
// import { renderTimeViewClock } from '@mui/x-date-pickers/timeViewRenderers';
// import utc from 'dayjs/plugin/utc';
// import timezone from 'dayjs/plugin/timezone';
// import dayjs, { Dayjs } from 'dayjs';

// dayjs.extend(utc);
// dayjs.extend(timezone);
// const today = dayjs();
// // function fixTimeUp(minutes: number, hours: number ) {
// //   if (minutes >= 55){
// //     minutes = 0
// //     hours++
//     // return [minutes, hours]
// //   } else if (minutes < 10) {
// //     if (minutes < 5) {
// //       minutes = 5;
// //     } else {
// //       minutes = 0;
// //     }
// //     return minutes;
// //   }
// //   if (minutes >= 10) {
// //     let b = Math.floor(minutes / 10);
// //     let c = minutes % 10;
// //     if (c < 5) {
// //       b = b * 10 + 5;
// //     } else {
// //       b = (b + 1) * 10;
// //     }
// //     return b;
// //   }
// // }

// export default function TimePickerViewRenderers() {
//   const [value, setValue] = React.useState<Dayjs | null>(dayjs.tz(today, 'Asia/Jerusalem'));
//   // console.log(value.$D);
//   // console.log(fixTimeUp(55));
//   // setValue(...value.$DfixTimeUp(value.$D))

//   return (
//     <LocalizationProvider dateAdapter={AdapterDayjs}>
//       <DemoContainer components={['TimePicker']}>
//         <TimePicker
//           label="שעת איסוף"
//           disablePast
//           ampm={false}
//           value={value}
//           onChange={setValue}
//           // timezone="Asia/ Israel"
//           // defaultValue="11:11"
//           viewRenderers={{
//             hours: renderTimeViewClock,
//             minutes: renderTimeViewClock
//           }}
//         />
//       </DemoContainer>
//     </LocalizationProvider>
//   );
// }
