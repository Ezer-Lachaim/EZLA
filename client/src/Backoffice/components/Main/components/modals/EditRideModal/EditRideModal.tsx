import { Box, Button, Modal, Typography } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { api, getGuestToken } from '../../../../../../Config.ts';
import { Ride, FetchError } from '../../../../../../api-client';
import EditRideInfo from './EditRideInfo/EditRideInfo.tsx';

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

interface EditRideModalProps {
  open: boolean;
  handleModal: (shouldOpen: boolean) => void;
  ride: Ride;
}

function EditRideModal({ open, handleModal, ride }: EditRideModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const methods = useForm<Ride>();

  const { handleSubmit, trigger } = methods;

  const nextStepHandler = async () => {
    const isStepValid = await trigger([
      'firstName',
      'lastName',
      'origin',
      'destination',
      'cellphone',
      'passengerCount',
      'comment'
    ]);

    if (isStepValid) {
      await handleSubmit(onSubmit)();
    }
  };

  const onSubmit: SubmitHandler<Ride> = async (data) => {
    setIsSubmitting(true);
    setErrorMessage(null);

    const updatedRide = {
      ...data,
      state: ride.state,
      rideId: ride.rideId
    };

    try {
      await api.ride.updateRide({
        rideId: ride.rideId || '',
        guestToken: getGuestToken() || undefined,
        ride: updatedRide
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
            עריכת נסיעה
          </Typography>
          <Button color="inherit" onClick={() => handleModal(false)}>
            <ClearIcon />
          </Button>
        </div>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <EditRideInfo ride={ride} />
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
          <Button variant="outlined" color="primary" onClick={() => handleModal(false)}>
            ביטול
          </Button>
          <Button
            variant="contained"
            color="primary"
            className="text-white"
            onClick={nextStepHandler}
            disabled={isSubmitting}
          >
            אישור
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default EditRideModal;
