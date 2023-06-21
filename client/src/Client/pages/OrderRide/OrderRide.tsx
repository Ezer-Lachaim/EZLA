import { Box, Step, StepLabel, Stepper } from '@mui/material';

const steps = ['פרטי הנוסע', 'פרטיים רפואיים', 'סיכום ואישור'];

export const OrderRide = () => {
  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={0} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
};
