import { Box, Button, Modal, Typography } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { api } from '../../../../../../Config.ts';
import { RidesGetStateEnum } from '../../../../../../api-client';

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  borderRadius: '4px',
  boxShadow: 24,
  p: 2
};
interface CancelRideModalProps {
  open: boolean;
  handleModal: (shouldOpen: boolean) => void;
  rideId: string;
}
function CancelRideModal({ open, handleModal, rideId }: CancelRideModalProps) {
  const handleSubmit = async () => {
    if (rideId) {
      await api.ride.updateRide({
        rideId,
        ride: { state: RidesGetStateEnum.Canceled }
      });

      window.location.reload();
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
        <div className="flex justify-between">
          <Typography id="modal-modal-title" variant="h6" component="h2">
            ביטול בקשת נסיעה
          </Typography>
          <Button className="p-0" color="inherit" onClick={() => handleModal(false)}>
            <ClearIcon />
          </Button>
        </div>
        <Typography id="modal-modal-description" sx={{ mt: 2, mb: 2 }}>
          האם את.ה בטוח.ה שברצונך לבטל את הבקשה לנסיעה?
        </Typography>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'end',
            gap: '10px',
            marginTop: '15px'
          }}
        >
          <Button variant="outlined" onClick={() => handleModal(false)}>
            סגור
          </Button>
          <Button onClick={handleSubmit} variant="contained" color="primary" className="text-white">
            המשך
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default CancelRideModal;
