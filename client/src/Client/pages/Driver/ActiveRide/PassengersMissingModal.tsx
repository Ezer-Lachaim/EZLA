import { Modal, Box, Button, IconButton } from '@mui/material';
import { Error, Close } from '@mui/icons-material';

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 320,
  height: 385,
  bgcolor: 'background.paper',
  borderRadius: '4px',
  boxShadow: 24,
  p: 2.5
};

const PassengersMissingModal = ({
  open,
  requesterPhone,
  onContinue,
  onClose,
  onCancel
}: {
  open: boolean;
  requesterPhone: string;
  onContinue: () => void;
  onClose: () => void;
  onCancel: () => void;
}) => {
  return (
    <Modal open={open} disablePortal disableEscapeKeyDown hideBackdrop>
      <Box sx={style}>
        <div className="flex flex-col w-full h-full gap-5">
          <div className="flex flex-col justify-center flex-grow">
            <div className="flex justify-center">
              <Error color="warning" className="w-12 h-12" />
            </div>
            <h1 className="text-center text-orange-600 my-3 text-[22px]">הנוסעים לא הגיעו</h1>
          </div>
          <p className="text-center text-lg text-gray-600">
            הנוסעים לא הגיעו לנקודת האיסוף?
            <br />
            <br />
            האם ברצונכם ליצור איתם קשר -
            <br />
            <a href={`tel:${requesterPhone}`}>צרו קשר</a>.
          </p>
          <Button variant="outlined" color="error" className="flex gap-2" onClick={onCancel}>
            ביטול הנסיעה
          </Button>
          <Button variant="contained" className="flex gap-2" onClick={onContinue}>
            התחילו נסיעה
          </Button>
        </div>
        <IconButton size="small" className="absolute left-2 top-1" onClick={onClose}>
          <Close />
        </IconButton>
      </Box>
    </Modal>
  );
};

export default PassengersMissingModal;
