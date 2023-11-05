import { useState } from 'react';
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form';
import { Button, FormHelperText } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import withLayout from '../../components/LayoutHOC.tsx';
import { RegistrationStepper } from './components/RegistrationStepper/RegistrationStepper.tsx';
import { useRegistrationSteps } from './hooks/useRegistrationSteps.ts';
import { ResponseError, RideRequester } from '../../../api-client';
import { RegistrationFormInputs } from './Register.types.ts';
import { FormSteps } from './components/FormSteps/FormSteps.tsx';
import { useAuthStore } from '../../../services/auth';
import { api } from '../../../services/api';
import { useUserContext } from '../../../contexts/UserContext';

const steps = ['פרטי הנוסע', 'פרטיים רפואיים', 'סיכום ואישור'];

const Register = ({
  activeStepIndex,
  nextStep
}: {
  activeStepIndex: number;
  nextStep: () => void;
}) => {
  const setToken = useAuthStore((state) => state.setToken);
  const { setUser } = useUserContext();
  const navigation = useNavigate();
  const methods = useForm<RegistrationFormInputs>();
  const [submitError, setSubmitError] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { handleSubmit, trigger } = methods;

  const nextStepHandler = async () => {
    let isStepValid = false;

    switch (activeStepIndex) {
      case 0:
        isStepValid = await trigger(
          [
            'firstName',
            'lastName',
            'nationalId',
            'cellPhone',
            'passengerCellPhone',
            'email',
            'address',
            'specialRequest'
          ],
          { shouldFocus: true }
        );
        break;
      case 1:
        isStepValid = await trigger(
          [
            'patient.firstName',
            'patient.lastName',
            'patient.nationalId',
            'patient.hospitalId',
            'patient.hospitalBuilding',
            'patient.hospitalDept',
            'startServiceDate',
            'endServiceDate',
            'patient.message',
            'isApproveTerms'
          ],
          { shouldFocus: true }
        );
        break;
      default:
        break;
    }

    if (isStepValid) {
      nextStep();
    }
  };

  const onSubmit: SubmitHandler<RideRequester> = async (data) => {
    setSubmitError(null);
    setIsSubmitting(true);
    try {
      const newUser: RideRequester = {
        ...data,
        startServiceDate: new Date(data.startServiceDate || ''),
        endServiceDate: new Date(data.endServiceDate || '')
      };

      const { user, token } = await api.user.createUser({
        createUserRequest: { user: newUser }
      });

      if (user) {
        setUser(user);
        setToken(token || null); // in case of null user will be set to null automatically
        sessionStorage.removeItem('activeStepIndex');
        navigation('/processing-user');
      }
    } catch (error) {
      if ((error as ResponseError)?.response?.status === 409) {
        setSubmitError(409);
      } else {
        setSubmitError(500);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full h-full flex flex-col">
      <RegistrationStepper activeStepIndex={activeStepIndex} steps={steps} />
      <FormProvider {...methods}>
        <form noValidate className="flex flex-col flex-grow">
          <FormSteps activeStepIndex={activeStepIndex} />
          {activeStepIndex < 2 ? (
            <Button
              variant="contained"
              className="w-full mb-5"
              size="large"
              endIcon={<ArrowBackIcon />}
              onClick={nextStepHandler}
            >
              המשיכו לשלב הבא
            </Button>
          ) : (
            <Button
              variant="contained"
              className="w-full mb-5"
              size="large"
              endIcon={<ArrowBackIcon />}
              onClick={handleSubmit(onSubmit)}
              disabled={isSubmitting}
            >
              סיום הרשמה
            </Button>
          )}
          {submitError === 409 && (
            <FormHelperText error className="text-center text-lg">
              כבר קיים משתמש עם אימייל זהה
            </FormHelperText>
          )}
          {(submitError === 400 || submitError === 500) && (
            <FormHelperText error className="text-center text-lg">
              אירעה שגיאה
            </FormHelperText>
          )}
        </form>
      </FormProvider>
    </div>
  );
};

const RegisterWrapper = () => {
  const { activeStepIndex, nextStep, previousStep } = useRegistrationSteps();
  const navigate = useNavigate();

  const ActualRegister = withLayout(Register, {
    componentProps: { activeStepIndex, nextStep },
    onBackClick: () => {
      if (activeStepIndex === 0) {
        navigate(-1);
        return;
      }
      previousStep();
    },
    title: 'הרשמה לשירות ההסעות'
  });

  return <ActualRegister />;
};

export default RegisterWrapper;
