import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Step,
  StepLabel,
  Stepper,
  TextField,
} from "@mui/material";
import { fields } from "./fields";

const steps = ["פרטי הנוסע", "פרטיים רפואיים", "סיכום ואישור"];

export const OrderRide = () => {
  return (
    <Box sx={{ width: "100%" }}>
      <Stepper activeStep={0} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div className="mt-5 flex flex-col gap-4">
        {fields.map((textFieldProps) => (
          <TextField {...textFieldProps} />
        ))}
      </div>
      <div className="mt-5 flex flex-col gap-2">
        <p className="text-sm text-gray-500">בקשות מיוחדות</p>
        <FormGroup className="gap-2">
          <FormControlLabel control={<Checkbox />} label="התאמה לכסא גלגלים" />
          <FormControlLabel control={<Checkbox />} label="מושב בטיחות לתינוק" />
          <FormControlLabel
            control={<Checkbox />}
            label="מושב בטיחות לילדים (גיל 3-8)"
          />
        </FormGroup>
      </div>
    </Box>
  );
};
