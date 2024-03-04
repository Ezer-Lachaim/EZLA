import { Box, Switch, TextField, Typography } from '@mui/material';
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
    <div className="mt-20 gap-5 bg-white h-full p-5">
        <Box sx={{fontWeight: '500', fontSize: '22px', color: '#007DFF'}}>
           הגדרות 
        </Box>
      <div className="flex flex-row mt-10">
        <Typography className=" text-lg font-normal ml-10  opacity-80">
          מינימום התראה להזמנת נסיעה (שעות) <br />
          <p className=" text-base opacity-60">נוסעים לא יוכלו להזמין נסיעה במועד מוקדם מהמינימום זמן שנקבע</p>
        </Typography>

        <TextField
          className="mt-5 w-40"
          id="hours"
          style={{ backgroundColor: 'white' }}
          required
          label="מינימום התראה בשעות"
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
      <div>
        <Typography className="text-base  opacity-80">
          <Switch checked={isRoundTripEnabled} onChange={handleRoundTripToggle} />
          בקשה לנסיעה הלוך ושוב
          <p className="opacity-60">הנוסע יוכל לבקש נסיעה הלוך ושוב. זוהי אינדיקציה בלבד. לא יווצרו שתי נסיעות.</p>
        </Typography>
      </div>
    </div>
  );
};

export default Settings;
