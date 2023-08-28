import { TextField } from '@mui/material';

function NewPassengerInfo() {
  return (
    <div className="flex gap-4 mb-5">
      <div className="flex flex-col gap-4 flex-1">
        <TextField required label="שם פרטי" variant="outlined" fullWidth />
        <TextField required label="תעודת זהות" variant="outlined" fullWidth />
        <TextField
          id="outlined-basic"
          label="טלפון נייד של הנוסע(במידה והמזמין אינו הנוסע)"
          variant="outlined"
          fullWidth
        />
        <TextField required label="כתובת מגורים לאיסוף/הורדה" variant="outlined" fullWidth />
      </div>
      <div className="flex flex-col gap-4 flex-1">
        <TextField required label="שם משפחה" variant="outlined" fullWidth />
        <TextField required label="טלפון נייד של המזמין" variant="outlined" fullWidth />
        <TextField required label="אימייל של המזמין" variant="outlined" fullWidth />
      </div>
    </div>
  );
}

export default NewPassengerInfo;
