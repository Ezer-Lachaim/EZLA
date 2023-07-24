import { Box, Button, Modal, Typography } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';

import { RegistrationStepper } from '../../../../../../Client/pages/Register/components/RegistrationStepper/RegistrationStepper';
import NewDriverInfo from './NewDriverInfo/NewDriverInfo';
import NewDriverCarInfo from './NewDriverCarInfo/NewDriverCarInfo';
import { Driver } from '../../../../../../api-client';

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
          'nationalId',
          'email',
          'city',
          'lastName',
          'cellPhone',
          'volunteeringArea'
        ]);
        break;
      case 1:
        isStepValid = await trigger([
          'carManufacturer',
          'patient.lastName',
          'patient.patientId',
          'patient.hospitalId',
          'patient.hospitalBuilding',
          'patient.hospitalDept',
          'servicePeriod'
        ]);
        break;
      default:
        break;
    }

    if (true && activeStepIndex === 0) {
      setActiveStepIndex(activeStepIndex + 1);
    }
  };

  const onSubmit: SubmitHandler<Driver> = (data) => console.log(data);
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
            endIcon={activeStepIndex === 0 && <ArrowBackIcon />}
            onClick={nextStepHandler}
          >
            {activeStepIndex === 0 ? 'לשלב הבא' : 'אישור'}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default AddCustomerModal;
