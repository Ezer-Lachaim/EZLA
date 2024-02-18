import { Modal, Box, Button, IconButton } from '@mui/material';
import { Close } from '@mui/icons-material';
import CarIcon from '@mui/icons-material/DirectionsCarFilled';
import { SubmitHandler, useForm } from 'react-hook-form';

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 320,
  bgcolor: 'background.paper',
  borderRadius: '4px',
  boxShadow: 24,
  p: 2.5
};

export type SubmitRideInputs = {
  minutesToArrive: number;
};

const RideApprovalModal = ({
  open,
  onClose,
  onSubmit
}: {
  open: boolean;
  onClose: () => void;
  onSubmit: SubmitHandler<SubmitRideInputs>;
}) => {
  const { handleSubmit } = useForm<SubmitRideInputs>();

  return (
    <Modal open={open} disablePortal disableEscapeKeyDown>
      <Box sx={style}>
        <form
          className="flex flex-col w-full h-full gap-8"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <div className="flex flex-col items-center flex-grow gap-2">
            <CarIcon sx={{ fontSize: 48 }} color="secondary" />
            <h1 className="text-center m-0 text-blue-500">יוצאים לדרך</h1>
          </div>
          <div className="flex flex-col gap-4">
            <Button variant="contained" color="secondary" type="submit">
              אישור ויציאה לדרך
            </Button>
            <Button variant="outlined" color="secondary" onClick={onClose}>
              ביטול
            </Button>
          </div>
        </form>
        <IconButton size="small" className="absolute left-2 top-1" onClick={onClose}>
          <Close />
        </IconButton>
      </Box>
    </Modal>
  );
};

export default RideApprovalModal;
