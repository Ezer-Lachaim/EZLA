import { useState } from 'react';
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form';
import { Button, FormHelperText } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import withLayout from '../../components/LayoutHOC.tsx';
import { RegistrationStepper } from './components/RegistrationStepper/RegistrationStepper.tsx';
import { useRegistrationSteps } from './hooks/useRegistrationSteps.ts';
import { ResponseError, RideRequester } from '../../../api-client/index.ts';
import { RegistrationFormInputs } from './Register.types.ts';
import { FormSteps } from './components/FormSteps/FormSteps.tsx';
import { api, setToken } from '../../../Config.ts';
// import { Configuration, UserApi } from '../../../api-client/index.ts';
// import { BASE_API_URL } from '../../../Config.ts';

// const userApi = new UserApi(new Configuration({ basePath: BASE_API_URL }));
const steps = ['פרטי הנוסע', 'פרטיים רפואיים', 'סיכום ואישור'];

const Register = () => {
  const navigation = useNavigate();
  const { activeStepIndex, nextStep } = useRegistrationSteps();
  const methods = useForm<RegistrationFormInputs>();
  const [submitError, setSubmitError] = useState<number | null>(null);

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
    try {
      const { user, token } = await api.user.createUser({
        createUserRequest: { user: data }
      });

      if (user) {
        setToken(token || '');
        navigation('/processing-user');
      }
    } catch (error) {
      if ((error as ResponseError).response.status === 409) {
        setSubmitError(409);
      }
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
            >
              סיום הרשמה
            </Button>
          )}
          {submitError === 409 && (
            <FormHelperText error className="text-center text-lg">
              כבר קיים משתמש עם אימייל זהה
            </FormHelperText>
          )}
        </form>
      </FormProvider>
    </div>
  );
};

export default withLayout(Register, {
  title: 'הרשמה לשירות ההסעות'
});
