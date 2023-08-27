import { Step, StepLabel, Stepper } from '@mui/material';

interface Props {
  activeStepIndex: number;
  steps: string[];
}

export const RegistrationStepper = ({ activeStepIndex, steps }: Props) => {
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
