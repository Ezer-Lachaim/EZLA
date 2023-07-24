import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  TextField,
} from "@mui/material";

function NewDriverInfo() {
  return (
    <>
      <div className="flex gap-4 mb-5">
        <div className="flex flex-col gap-4 flex-1">
          <TextField
            required
            label="שם פרטי"
            variant="outlined"
            fullWidth
          />
          <TextField
            required
            label="תעודת זהות"
            variant="outlined"
            fullWidth
          />

          <TextField
            required
            label="אימייל"
            variant="outlined"
            fullWidth
          />
          <TextField
            required
            label="עיר מגורים"
            variant="outlined"
            fullWidth
          />
        </div>
        <div className="flex flex-col gap-4 flex-1">
          <TextField
            required
            label="שם משפחה"
            variant="outlined"
            fullWidth
          />
          <TextField
            required
            label="טלפון נייד"
            variant="outlined"
            fullWidth
          />
          <TextField
            required
            label="אזור התנדבות (בחירה מרובה)"
            variant="outlined"
            fullWidth
          />
        </div>
      </div>
      <div>
        <FormGroup className="flex flex-row">
          <FormControlLabel
            className="mb-2 ml-5"
            control={
              <Checkbox
                // checked={babyChair}
                // onChange={handleChange}
                name="babyChair"
                required
              />
            }
            label="רישיון נהיגה בתוקף"
          />
          <FormControlLabel
            className="mb-2 "
            control={
              <Checkbox
                // checked={highCar}
                // onChange={handleChange}
                name="highCar"
                required
              />
            }
            label="רישיון רכב בתוקף"
          />
        </FormGroup>
      </div>
    </>
  );
}

export default NewDriverInfo;
