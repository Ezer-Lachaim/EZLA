import Checkbox from '@mui/material/Checkbox';
import { Dayjs } from 'dayjs';
import 'dayjs/locale/he';
import React, { useState } from 'react';
import { FormControlLabel, MenuItem, TextField } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const hospitals = [
  { value: 'IChilov', label: 'איכילוב' },
  { value: 'Asaf', label: 'אסף הרופא' },
  { value: 'barziali', label: 'ברזילאי' },
  { value: 'telShomer', label: 'תל השומר' },
  { value: 'hadasa-har-zofim', label: 'הדסה הר הצופים' },
  { value: 'hadasa-ein-karam', label: 'הדסה עין כרם' },
  { value: 'wolfson', label: 'וולפסון' }
];
function MedicalRequirements() {
  const [state, setState] = useState({
    wheelChair: false,
    smallKidChair: false,
    baggageWheelChair: false,
    babyChair: false,
    highCar: false,
    shipment: false
  });

  // TODO unused function!
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked
    });
  };

  const [isServiceForSelf, setIsServiceForSelf] = useState(false);
  const [value, setValue] = useState<Dayjs | null>(null);
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="he">
      <div className="">
        <FormControlLabel
          control={
            <Checkbox
              checked={isServiceForSelf}
              onChange={(e) => setIsServiceForSelf(e.target.checked)}
              name="shipment"
            />
          }
          label="השירות מיועד לטיפול עבור עצמי"
        />
        <div className="flex gap-4 mt-6">
          <div className="flex flex-col gap-4 flex-1">
            <TextField
              required
              id="outlined-basic"
              label="המטופל שם פרטי"
              variant="outlined"
              fullWidth
              disabled={isServiceForSelf}
            />
            <TextField
              required
              id="outlined-basic"
              label="המטופל תעודת זהות"
              variant="outlined"
              fullWidth
              disabled={isServiceForSelf}
            />
            <TextField id="outlined-basic" label="בניין בביה״ח" variant="outlined" fullWidth />
            <DatePicker
              value={value}
              onChange={(newValue) => setValue(newValue)}
              label="תחילת התקופה בה תזדקקו לשירות ההסעות"
              disablePast
              format="DD/MM/YYYY"
              slotProps={{
                textField: {
                  required: true
                }
              }}
            />
            <TextField
              id="outlined-basic"
              required
              label="הסיבה לשימוש בשירות ההסעות"
              variant="outlined"
              fullWidth
              multiline
              maxRows={4}
            />
          </div>
          <div className="flex flex-col gap-4 flex-1">
            <TextField
              required
              id="outlined-basic"
              label="המטופל שם משפחה"
              variant="outlined"
              fullWidth
              disabled={isServiceForSelf}
            />
            <TextField id="outlined-select-currency" select label="בית חולים לאיסוף והורדה">
              {hospitals.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField id="outlined-basic" required label="מחלקה" variant="outlined" fullWidth />
            <DatePicker
              value={value}
              onChange={(newValue) => setValue(newValue)}
              label="סיום התקופה בה תזדקקו לשירות ההסעות"
              views={['year', 'month', 'day']}
              disablePast
              format="DD/MM/YYYY"
              slotProps={{
                textField: {
                  required: true
                }
              }}
            />
            <FormControlLabel
              label="הנני מאשר/ת כי קראתי את תקנון האתר ואת מדיניות הפרטיות ומסכים לתנאיהם"
              control={<Checkbox />}
            />
          </div>
        </div>
      </div>
    </LocalizationProvider>
  );
}

export default MedicalRequirements;
