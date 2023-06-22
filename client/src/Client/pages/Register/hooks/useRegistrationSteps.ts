import { useState } from 'react';

export const useRegistrationSteps = () => {
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);

  const nextStep = () => {
    setActiveStepIndex(activeStepIndex + 1);
  };

  const previousStep = () => {
    setActiveStepIndex(activeStepIndex - 1);
  };

  return {
    activeStepIndex,
    nextStep,
    previousStep
  };
};
