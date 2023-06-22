import { TextFieldProps } from '@mui/material';

export const fields: TextFieldProps[] = [
  {
    label: 'שם פרטי',
    required: true,
    fullWidth: true,
    type: '',
    autoFocus: true
  },
  {
    label: 'שם משפחה',
    required: true,
    fullWidth: true
  },
  {
    label: 'תעודת זהות',
    required: true,
    fullWidth: true,
    placeholder: 'יש להזין 9 ספרות כולל ספרת ביקורת',
    type: 'number'
  },
  {
    label: 'טלפון נייד של המזמין',
    required: true,
    fullWidth: true,
    placeholder: 'יש להזין 10 ספרות של הטלפון הנייד',
    type: 'number'
  },
  {
    label: 'טלפון נייד של הנוסע (במידה והמזמין אינו הנוסע) ',
    fullWidth: true,
    placeholder: 'יש להזין 10 ספרות של הטלפון הנייד',
    type: 'number'
  },
  {
    label: 'אימייל של המזמין',
    fullWidth: true,
    placeholder: 'דוגמה: david@gmail.com',
    type: 'email',
    required: true
  },
  {
    label: 'כתובת מגורים לאיסוף/הורדה',
    fullWidth: true,
    placeholder: 'יש להזין רחוב, מספר בית ועיר',
    type: 'text',
    required: true
  }
];
