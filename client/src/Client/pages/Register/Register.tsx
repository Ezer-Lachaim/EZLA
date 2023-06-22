import withLayout from '../../components/LayoutHOC.tsx';
import { RegistrationForm } from './components/RegistrationForm/RegistrationForm.tsx';
import { RegistrationSteps } from './components/RegistrationSteps/RegistrationSteps.tsx';

const Register = () => {
  return (
    <div className="w-full">
      <RegistrationSteps activeStepIndex={0} />
      <RegistrationForm />
    </div>
  );
};

export default withLayout(Register, { title: 'הרשמה לשירות ההסעות' });
