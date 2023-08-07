import { useState } from 'react';

export const useRegistrationSteps = () => {
  const [activeStepIndex, setActiveStepIndex] = useState<number>(
    parseInt(sessionStorage.getItem('activeStepIndex') || '0', 10)
  );

  const nextStep = () => {
    setActiveStepIndex(activeStepIndex + 1);
    sessionStorage.setItem('activeStepIndex', (activeStepIndex + 1).toString());
  };

  const previousStep = () => {
    setActiveStepIndex(activeStepIndex - 1);
    sessionStorage.setItem('activeStepIndex', (activeStepIndex - 1).toString());
  };

  return {
    activeStepIndex,
    nextStep,
    previousStep
  };
};
