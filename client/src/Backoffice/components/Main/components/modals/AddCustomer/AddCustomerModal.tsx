import { Box, Button, Modal, Typography } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { RegistrationStepper } from '../../../../../../Client/pages/Register/components/RegistrationStepper/RegistrationStepper';
import NewDriverInfo from './NewDriverInfo/NewDriverInfo';
import NewDriverCarInfo from './NewDriverCarInfo/NewDriverCarInfo';
import { api } from '../../../../../../Config.ts';
import { Driver } from '../../../../../../api-client/models/Driver';

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

const steps = ['פרטי מתנדב', 'פרטי רכב'];

interface AddCustomerModalProps {
  open: boolean;
  handleModal: (shouldOpen: boolean) => void;
}
function AddCustomerModal({ open, handleModal }: AddCustomerModalProps) {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const stepBackOrClose = () => {
    if (activeStepIndex > 0) {
      setActiveStepIndex(activeStepIndex - 1);
    } else {
      setActiveStepIndex(0);
      handleModal(false);
    }
  };
  const methods = useForm<Driver>();

  const { handleSubmit, trigger } = methods;

  const nextStepHandler = async () => {
    let isStepValid = false;

    switch (activeStepIndex) {
      case 0:
        isStepValid = await trigger([
          'firstName',
          'lastName',
          'nationalId',
          'city',
          'cellPhone',
          'email',
          'volunteeringArea',
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
      if (activeStepIndex === 1) {
        await handleSubmit(onSubmit)();
      } else {
        setActiveStepIndex(activeStepIndex + 1);
      }
    }
  };

  const onSubmit: SubmitHandler<Driver> = async (data) => {
    setIsSubmitting(true);

    try {
      await api.driver.createDriver({
        driver: { ...data, password: 'initial-password' }
      });
      window.location.reload();
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
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
            הוספת מתנדב חדש
          </Typography>
          <Button color="inherit" onClick={() => handleModal(false)}>
            <ClearIcon />
          </Button>
        </div>
        <RegistrationStepper activeStepIndex={activeStepIndex} steps={steps} />
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            {activeStepIndex === 0 ? <NewDriverInfo /> : null}
            {activeStepIndex === 1 ? <NewDriverCarInfo /> : null}
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
            endIcon={activeStepIndex === 0 && <ArrowBackIcon />}
            onClick={nextStepHandler}
            disabled={isSubmitting}
          >
            {activeStepIndex === 0 ? 'לשלב הבא' : 'אישור'}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default AddCustomerModal;
