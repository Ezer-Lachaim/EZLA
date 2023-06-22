import { PassengerInfoForm } from './PassengerInfoForm/PassengerInfoForm';
import { PatientInfoForm } from './PatientInfoForm/PatientInfoForm';

interface Props {
  activeStepIndex: number;
}

const formStepsArray = [<PassengerInfoForm />, <PatientInfoForm />];

export const FormSteps = ({ activeStepIndex }: Props) => {
  return formStepsArray[activeStepIndex];
};
