import { Box, Button, Modal, Typography } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import SpecialRequirements from './SpecialRequirements/SpecialRequirements';
import MedicalRequirements from './MedicalRequirements/MedicalRequirements';
import { RegistrationStepper } from '../../../../../../Client/pages/Register/components/RegistrationStepper/RegistrationStepper';
import NewDriverInfo from './NewDriverInfo/NewDriverInfo';
import NewDriverCarInfo from './NewDriverCarInfo/NewDriverCarInfo';
import NewPassengerInfo from './NewPassengerInfo/NewPassengerInfo';
import { DriverRegistrationFormInputs } from './AddCustomerModal.types.ts';
import { api } from '../../../../../../Config.ts';

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 670,
  bgcolor: 'background.paper',
  borderRadius: '4px',
  boxShadow: 24,
  p: 2
};
const customerOptions = {
  volunteer: 'מתנדב',
  passenger: 'נוסע'
};
const steps = {
  passenger: ['פרטי נוסע', 'פרטים רפואיים'],
  volunteer: ['פרטי מתנדב', 'פרטי רכב']
};

interface AddCustomerModalProps {
  open: boolean;
  handleModal: (shouldOpen: boolean) => void;
  customerType: keyof typeof customerOptions;
}

function AddCustomerModal({ open, handleModal, customerType }: AddCustomerModalProps) {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const stepBackOrClose = () => {
    if (activeStepIndex) {
      setActiveStepIndex(activeStepIndex - 1);
    } else {
      handleModal(false);
    }
  };
  const methods = useForm<DriverRegistrationFormInputs>();

  const { handleSubmit, trigger } = methods;

  const nextStepHandler = async () => {
    let isStepValid = false;

    switch (activeStepIndex) {
      case 0:
        isStepValid = await trigger([
          'firstName',
          'lastName',
          'nationalId',
          'cellPhone',
          'email',
          'volunteeringArea',
          'address',
          'isValidLicense',
          'isValidCarLicense'
        ]);
        break;
      case 1:
        isStepValid = await trigger([
          'carManufacturer',
          'carModel',
          'carColor',
          'carPlateNumber',
          'numOfSeats',
          'carCapabilities'
        ]);
        break;
      default:
        break;
    }

    if (isStepValid) {
      setActiveStepIndex(activeStepIndex + 1);
    } else if (activeStepIndex === 2) {
      await handleSubmit(onSubmit)();
    }
  };

  const onSubmit: SubmitHandler<DriverRegistrationFormInputs> = async (data) => {
    console.log(data);

    const response = await api.driver.createDriver({
      driver: { ...data, password: 'initial-password' }
    });

    console.log('response', response);
    handleModal(false);
  };
  return (
    <Modal
      open={open}
      onClose={() => handleModal(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      disablePortal
    >
      <Box sx={style}>
        <div className="flex justify-between mb-2">
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {` הוספת ${customerOptions[customerType]} חדש`}
          </Typography>
          <Button color="inherit" onClick={() => handleModal(false)}>
            <ClearIcon />
          </Button>
        </div>
        <RegistrationStepper activeStepIndex={activeStepIndex} steps={steps[customerType]} />
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            {/* first step passenger */}
            {customerType === 'passenger' && !activeStepIndex ? <NewPassengerInfo /> : null}
            {customerType === 'passenger' && !activeStepIndex ? <SpecialRequirements /> : null}

            {/* second step passenger */}
            {customerType === 'passenger' && activeStepIndex ? <MedicalRequirements /> : null}

            {/* first step driver */}
            {customerType === 'volunteer' && !activeStepIndex ? <NewDriverInfo /> : null}

            {/* second step driver */}
            {customerType === 'volunteer' && activeStepIndex ? <NewDriverCarInfo /> : null}
          </form>
        </FormProvider>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'end',
            gap: '10px',
            marginTop: '15px'
          }}
        >
          <Button variant="outlined" color="primary" onClick={stepBackOrClose}>
            {activeStepIndex > 0 ? 'חזור' : 'ביטול'}
          </Button>
          <Button
            variant="contained"
            color="primary"
            className="text-white"
            endIcon={<ArrowBackIcon />}
            onClick={nextStepHandler}
          >
            לשלב הבא
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default AddCustomerModal;
