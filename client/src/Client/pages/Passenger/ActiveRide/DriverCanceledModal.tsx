import { Modal, Box, Button, IconButton } from '@mui/material';
import { Cancel, Close } from '@mui/icons-material';

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 320,
  height: 378,
  bgcolor: 'background.paper',
  borderRadius: '4px',
  boxShadow: 24,
  p: 2.5
};

const DriverCanceledModal = ({
  open,
  onCancel,
  onNewRide
}: {
  open: boolean;
  onCancel: () => void;
  onNewRide: () => void;
}) => {
  return (
    <Modal open={open} disablePortal disableEscapeKeyDown>
      <Box sx={style}>
        <div className="flex flex-col w-full h-full gap-5">
          <div className="flex flex-col justify-center flex-grow">
            <div className="flex justify-center">
              <Cancel color="error" className="w-12 h-12" />
            </div>
            <h1 className="text-red-600 text-center my-3 text-[22px]">נסיעתך בוטלה</h1>
          </div>
          <p className="text-center text-lg text-gray-600">
            לצערנו המתנדב.ת ביטל.ה את הנסיעה שהזמנתם.
            <br />
            האם להמשיך לחפש לכם הסעה חלופית?
          </p>
          <Button variant="contained" className="flex gap-2" onClick={onNewRide}>
            הזמנת נסיעה חדשה
          </Button>
          <Button variant="outlined" className="flex gap-2" onClick={onCancel}>
            לא, תודה
          </Button>
        </div>
        <IconButton size="small" className="absolute left-2 top-1" onClick={onCancel}>
          <Close />
        </IconButton>
      </Box>
    </Modal>
  );
};

export default DriverCanceledModal;
