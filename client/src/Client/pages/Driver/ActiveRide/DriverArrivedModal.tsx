import { Modal, Box, Button } from '@mui/material';
import { Flag, Phone } from '@mui/icons-material';
import { useState } from 'react';
import PassengersMissingModal from './PassengersMissingModal.tsx';

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

const DriverArrivedModal = ({
  open,
  onContinue,
  requesterPhone,
  onCancel
}: {
  open: boolean;
  onContinue: () => void;
  requesterPhone: string;
  onCancel: () => void;
}) => {
  const [isPassengersMissingModalOpen, setIsPassengersMissingModalOpen] = useState(false);

  return (
    <div>
      <Modal open={open} disablePortal disableEscapeKeyDown>
        <Box sx={style}>
          <div className="flex flex-col w-full h-full gap-5">
            <div className="flex flex-col justify-center flex-grow">
              <div className="flex justify-center">
                <Flag color="primary" className="w-12 h-12" />
              </div>
              <h1 className="text-center my-3 text-[22px]">הגעת לכתובת האיסוף</h1>
            </div>
            <p className="text-center text-lg text-gray-600">
              אסוף את הנוסעים והתחילו בנסיעה לכתובת היעד
            </p>
            <button
              type="button"
              className="underline text-blue-600"
              onClick={() => setIsPassengersMissingModalOpen(true)}
            >
              הנוסע/ים לא הגיעו לנקודת האיסוף
            </button>
            <Button variant="outlined" className="flex gap-2" href={`tel:${requesterPhone}`}>
              <Phone />
              צור קשר
            </Button>
            <Button variant="contained" className="flex gap-2" onClick={onContinue}>
              התחילו נסיעה
            </Button>
          </div>
        </Box>
      </Modal>
      <PassengersMissingModal
        open={isPassengersMissingModalOpen}
        requesterPhone={requesterPhone}
        onContinue={onContinue}
        onClose={() => setIsPassengersMissingModalOpen(false)}
        onCancel={() => {
          onCancel();
        }}
      />
    </div>
  );
};

export default DriverArrivedModal;
