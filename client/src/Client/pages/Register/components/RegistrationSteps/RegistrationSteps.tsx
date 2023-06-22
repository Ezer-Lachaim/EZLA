import { Step, StepLabel, Stepper } from '@mui/material';

const steps = ['פרטי הנוסע', 'פרטיים רפואיים', 'סיכום ואישור'];

interface Props {
  activeStepIndex: number;
}

export const RegistrationSteps = ({ activeStepIndex }: Props) => {
  return (
    <Stepper activeStep={activeStepIndex} alternativeLabel>
      {steps.map((label) => (
        <Step key={label}>
          <StepLabel>{label}</StepLabel>
        </Step>
      ))}
    </Stepper>
  );
};
