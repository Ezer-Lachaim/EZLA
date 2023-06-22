import { Step, StepLabel, Stepper } from '@mui/material';

const steps = ['פרטי הנוסע', 'פרטיים רפואיים', 'סיכום ואישור'];

interface Props {
  activeStepIndex: number;
}

export const RegistrationStepper = ({ activeStepIndex }: Props) => {
  return (
    <Stepper activeStep={activeStepIndex} alternativeLabel className="mb-8">
      {steps.map((label) => (
        <Step key={label}>
          <StepLabel>{label}</StepLabel>
        </Step>
      ))}
    </Stepper>
  );
};
