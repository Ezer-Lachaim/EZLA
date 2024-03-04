import { Switch, TextField, Typography } from '@mui/material';
import { ChangeEvent, useState } from 'react';

const Settings = () => {
  const [isRoundTripEnabled, setIsRoundTripEnabled] = useState(false);
  const [inviteTimeLimit, setInviteTimeLimit] = useState(24);

  const handleRoundTripToggle = () => {
    setIsRoundTripEnabled(!isRoundTripEnabled);
  };

  const handleInviteTimeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const hours = parseInt(e.target.value, 10);
    setInviteTimeLimit(hours);
  };

  return (
    <div className='mt-20 gap-5'>
      <div>
        <Typography className="text-lg text-blue-500">
        <Switch checked={isRoundTripEnabled} onChange={handleRoundTripToggle} />

          הפעל נסיעה הלוך וחזור
        </Typography>
      </div>
      <div className='flex flex-col mt-10'>
        <Typography className=' text-lg font-semibold text-blue-500'>
          מגבלת שעות שרק אחריהן ניתן להזמין:
          </Typography>

          <TextField
          className='mt-5 w-40'
                id="hours"
                style={{backgroundColor: 'white'}}
                required
                label="מספר שעות"
                value={inviteTimeLimit}
                onChange={handleInviteTimeChange}
                type="number"
                inputProps={{ min: 0, inputMode: 'numeric' }}
                defaultValue={1}
                sx={{
                  '& input[type="number"]::-webkit-inner-spin-button, & input[type="number"]::-webkit-outer-spin-button':
                    {
                      opacity: 1
                    }
                }}
              />
      </div>
    </div>
  );
};

export default Settings;
