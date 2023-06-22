import { Modal, Box, Button, IconButton } from '@mui/material';
import { Cancel, Close } from '@mui/icons-material';
import car from '../../../../assets/car.png';

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 320,
  height: 300,
  bgcolor: 'background.paper',
  borderRadius: '4px',
  boxShadow: 24,
  p: 2.5
};

const SearchingDriverModal = ({ open, onClose }: { open: boolean; onClose: () => undefined }) => {
  return (
    <Modal open={open} disablePortal disableEscapeKeyDown>
      <Box sx={style}>
        <div className="flex flex-col w-full h-full">
          <div className="flex flex-col justify-center flex-grow">
            <div className="flex justify-center mb-2">
              <img src={car} alt="car" className="w-20" />
            </div>
            <h1>מחפשים עבורכם מתנדב...</h1>
          </div>
          <Button variant="outlined" color="error" className="flex gap-2" onClick={onClose}>
            <Cancel color="error" fontSize="small" />
            ביטול נסיעה
          </Button>
        </div>
        <IconButton size="small" className="absolute left-2 top-1" onClick={onClose}>
          <Close />
        </IconButton>
      </Box>
    </Modal>
  );
};

export default SearchingDriverModal;
