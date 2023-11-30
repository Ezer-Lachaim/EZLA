import { Box, Button, Modal, Typography } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { api } from '../../../../../../Config.ts';
import { Ride, FetchError } from '../../../../../../api-client';
import EditDriverCarInfo from './EditDriverCarInfo/EditDriverCarInfo.tsx';
import EditDriverInfo from './EditDriverInfo/EditDriverInfo.tsx';
import { Driver } from '../../../../../../api-client/models/Driver.ts';

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

interface EditDriverModalProps {
  open: boolean;
  handleModal: (shouldOpen: boolean) => void;
  driver: Driver;
}

function EditDriverModal({ open, handleModal, driver }: EditDriverModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  const methods = useForm<Driver>({
    defaultValues: {
      firstName: driver.firstName,
      lastName: driver.lastName,
      nationalId: driver.nationalId,
      city: driver.city,
      cellPhone: driver.cellPhone,
      email: driver.email,
      volunteeringArea: driver.volunteeringArea,
      carColor: driver.carColor,
      carManufacturer: driver.carManufacturer,
      carModel: driver.carModel,
      numOfSeats: driver.numOfSeats,
      carPlateNumber: driver.carPlateNumber,
      carCapabilities: driver.carCapabilities
    }
  });

  const { handleSubmit, trigger } = methods;
  const stepBackOrClose = () => {
    if (activeStepIndex > 0) {
      setActiveStepIndex(activeStepIndex - 1);
    } else {
      setActiveStepIndex(0);
      handleModal(false);
    }
  };
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
          'numOfSeats'
        ]);
        break;
      default:
        break;
    }

    if (isStepValid) {
      switch (activeStepIndex) {
        case 0:
          setActiveStepIndex((prev) => prev + 1);
          break;
        case 1:
          await handleSubmit(onSubmit)();
          break;
        default:
          break;
      }
    }
  };

  const onSubmit: SubmitHandler<Ride> = async (data) => {
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      await api.driver.updateDriver({
        driver: { ...data, userId: driver.userId || '' }
      });
      window.location.reload();
    } catch (error) {
      setErrorMessage((error as FetchError).message);
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
            עריכת מתנדב
          </Typography>
          <Button color="inherit" onClick={() => handleModal(false)}>
            <ClearIcon />
          </Button>
        </div>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            {activeStepIndex === 0 && <EditDriverInfo driver={driver} />}
            {activeStepIndex === 1 && <EditDriverCarInfo driver={driver} />}
          </form>
        </FormProvider>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'end',
            gap: '10px',
            marginTop: '15px',
            alignItems: 'center'
          }}
        >
          {errorMessage && <p className="text-red-500">אירעה שגיאה: {errorMessage}</p>}
          <Button variant="outlined" color="primary" onClick={stepBackOrClose}>
            {activeStepIndex > 0 ? 'חזור' : 'ביטול'}
          </Button>
          <Button
            variant="contained"
            color="primary"
            className="text-white"
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

export default EditDriverModal;
