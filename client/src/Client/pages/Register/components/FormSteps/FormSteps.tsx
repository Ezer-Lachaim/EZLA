import { PassengerInfoForm } from './PassengerInfoForm/PassengerInfoForm';
import { PatientInfoForm } from './PatientInfoForm/PatientInfoForm';
import { SummaryAndApproval } from './SummaryAndApproval/SummaryAndApproval';

interface Props {
  activeStepIndex: number;
}

const formStepsArray = [<PassengerInfoForm />, <PatientInfoForm />, <SummaryAndApproval />];

export const FormSteps = ({ activeStepIndex }: Props) => {
  return formStepsArray[activeStepIndex];
};
