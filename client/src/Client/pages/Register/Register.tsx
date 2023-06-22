import { useForm, FormProvider, SubmitHandler } from 'react-hook-form';
import { Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import withLayout from '../../components/LayoutHOC.tsx';
import { RegistrationStepper } from './components/RegistrationStepper/RegistrationStepper.tsx';
import { useRegistrationSteps } from './hooks/useRegistrationSteps.ts';
import { FormSteps } from './components/FormSteps/FormSteps.tsx';
import { RideRequester } from '../../../api-client/index.ts';
// import { Configuration, UserApi } from '../../../api-client/index.ts';
// import { BASE_API_URL } from '../../../Config.ts';

// const userApi = new UserApi(new Configuration({ basePath: BASE_API_URL }));

const Register = () => {
  const { activeStepIndex, nextStep } = useRegistrationSteps();
  const methods = useForm<RideRequester>();

  const { handleSubmit, trigger } = methods;

  const nextStepHandler = async () => {
    let isStepValid = false;

    switch (activeStepIndex) {
      case 0:
        isStepValid = await trigger([
          'firstName',
          'lastName',
          'userId',
          'cellPhone',
          'passengerCellPhone',
          'email',
          'address',
          'specialRequest'
        ]);
        break;
      case 1:
        isStepValid = await trigger([
          'patient.lastName',
          'patient.lastName',
          'patient.patientId',
          'patient.hospitalId',
          'patient.hospitalBuilding',
          'patient.hospitalDept',
          'startServiceDate',
          'endServiceDate',
          'patient.message'
        ]);
        break;
      default:
        break;
    }

    if (isStepValid) {
      nextStep();
    }
  };

  const onSubmit: SubmitHandler<RideRequester> = (data) => console.log(data);

  return (
    <div className="w-full h-full flex flex-col">
      <RegistrationStepper activeStepIndex={activeStepIndex} />
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col flex-grow">
          <FormSteps activeStepIndex={activeStepIndex} />
          <Button
            variant="contained"
            className="w-full mb-5"
            size="large"
            endIcon={<ArrowBackIcon />}
            onClick={nextStepHandler}
          >
            {activeStepIndex === 2 ? 'סיום הרשמה' : 'המשיכו לשלב הבא'}
          </Button>
        </form>
      </FormProvider>
    </div>
  );
};

export default withLayout(Register, { title: 'הרשמה לשירות ההסעות' });
