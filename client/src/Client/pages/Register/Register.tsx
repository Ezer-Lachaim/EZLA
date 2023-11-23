import { useState } from 'react';
import { UserCredential, AuthError } from 'firebase/auth';
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form';
import { Button, FormHelperText } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import generator from 'generate-password-browser';
import withLayout from '../../components/LayoutHOC.tsx';
import { RegistrationStepper } from './components/RegistrationStepper/RegistrationStepper.tsx';
import { useRegistrationSteps } from './hooks/useRegistrationSteps.ts';
import { RideRequester } from '../../../api-client';
import { RegistrationFormInputs } from './Register.types.ts';
import { FormSteps } from './components/FormSteps/FormSteps.tsx';
import { authCreateUser, authDeleteUser } from '../../../services/firebase';
import { useUserStore } from '../../../services/user';
import { api } from '../../../services/api';

const steps = ['פרטי הנוסע', 'פרטיים רפואיים', 'סיכום ואישור'];

const Register = ({
  activeStepIndex,
  nextStep
}: {
  activeStepIndex: number;
  nextStep: () => void;
}) => {
  const setUser = useUserStore((state) => state.setUser);
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
    if (!data.email) {
      return;
    }

    setSubmitError(null);
    setIsSubmitting(true);

    let firebaseUser: UserCredential | undefined;
    try {
      // create a firebase user with a temporary password
      const generatedPass = generator.generate({
        length: 20,
        numbers: true
      });
      firebaseUser = await authCreateUser(data.email, generatedPass);

      // set the user data on the db
      const { user } = await api.user.createUser({
        createUserRequest: {
          user: {
            ...data,
            startServiceDate: new Date(data.startServiceDate || ''),
            endServiceDate: new Date(data.endServiceDate || '')
          }
        }
      });

      setUser(user);
      sessionStorage.removeItem('activeStepIndex');
      navigation('/processing-user');
    } catch (error) {
      // try to delete the created firebase user in case of an error in saving the user to the db
      if (firebaseUser) {
        try {
          await authDeleteUser(firebaseUser.user);
        } catch (e) {
          /* empty */
        }
      }

      if ((error as AuthError)?.code === 'auth/email-already-in-use') {
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
