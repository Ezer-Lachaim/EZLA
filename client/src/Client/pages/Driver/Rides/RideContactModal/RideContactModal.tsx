import { Modal, Box, Button, IconButton, Typography, Divider } from '@mui/material';
import { Close } from '@mui/icons-material';
import CancelIcon from '@mui/icons-material/Cancel';
import CarIcon from '@mui/icons-material/DirectionsCarFilled';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import InventoryIcon from '@mui/icons-material/Inventory';
import { useState } from 'react';
import ConfirmCancelRideModal from '../../../../components/ConfirmCancelRideModal/ConfirmCancelRideModal';
import { api } from '../../../../../services/api';
import { useActiveRide } from '../../../../../hooks/activeRide';
import { Ride, RideStateEnum } from '../../../../../api-client';

const commonTextStyle = {
  marginRight: '8px',
  fontFamily: 'Heebo',
  fontWeight: '400',
  fontSize: '12px',
  width: '80px'
};

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

const RideContactModal = ({
  ride,
  open,
  onConfirm,
  onClose
}: {
  ride?: Ride;
  open: boolean;
  onConfirm: () => void;
  onClose: () => void;
}) => {
  const { reFetch: reFetchActiveRide } = useActiveRide();
  const [confirmCancelModalOpen, setConfirmCancelModalOpen] = useState(false);

  const toggleConfirmCancelModal = () => {
    setConfirmCancelModalOpen(!confirmCancelModalOpen);
  };

  const onCancel = async () => {
    if (!ride || !ride.rideId) {
      console.error('Invalid ride data. Ride ID is missing.');
      return;
    }
    try {
      await api.ride.updateRide({
        rideId: ride.rideId,
        ride: { state: RideStateEnum.WaitingForDriver }
      });
      await reFetchActiveRide();
      // navigation will occur automatically (in @../Driver.tsx)
    } catch (error) {
      console.error('Error canceling ride:', error);
    }
  };

  return (
    <Modal open={open} disablePortal disableEscapeKeyDown>
      <Box className="fixed p-0 pt-0 bg-white rounded-lg shadow-lg" sx={style}>
        <div className="flex flex-col gap-4 pt-4">
          <div className="flex flex-col justify-center items-center gap-2">
            <IconButton size="small" onClick={onClose} className="absolute left-2 top-2">
              <Close />
            </IconButton>
            <CarIcon color="primary" fontSize="large" />
            <div className="text-center">
              <Typography
                className="font-medium text-blue-500 font-heebo"
                style={{ fontSize: '22px' }}
              >
                צרו קשר עם הנוסע
              </Typography>
            </div>
          </div>
          <div>
            <Typography className="text-center" style={{ fontSize: '18px', fontWeight: '700' }}>
              חשוב ליצור קשר עם הנוסעים.
            </Typography>
            <Typography className="font-normal text-center" style={{ fontSize: '16px' }}>
              יש ליידע אותם שאתם בדרך לאסוף אותם ולמסור להם את פרטי הרכב שלכם: סוג וצבע רכב, ומספר
              רכב.
            </Typography>
          </div>
          <Divider />
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Typography className="font-semibold" style={commonTextStyle}>
                כמות:
              </Typography>
              <Typography>
                {ride?.serviceType === 'ride' ? <EmojiPeopleIcon /> : <InventoryIcon />}
                {ride?.passengerCount}
              </Typography>
            </div>
            <div className="flex items-center gap-2">
              <Typography style={commonTextStyle}>שם הנוסע:</Typography>
              <Typography
                style={{ fontWeight: '700' }}
              >{`${ride?.firstName} ${ride?.lastName}`}</Typography>
            </div>
            <div className="flex items-center gap-2">
              <Typography style={commonTextStyle}>טלפון הנוסע:</Typography>
              <Typography>
                <a
                  href={`https://wa.me/972${ride?.cellphone?.replace(/-/g, '')}`} // Use optional chaining
                  target="_blank"
                  rel="noreferrer"
                >
                  {ride?.cellphone}
                </a>
              </Typography>
            </div>
          </div>
          <div className="flex flex-col gap-4 p-4">
            <Button
              variant="contained"
              className="w-full bg-green-600 text-white"
              onClick={onConfirm}
              startIcon={<CarIcon />}
            >
              אישור ויציאה לדרך
            </Button>
            <Button
              variant="outlined"
              className="w-full border border-red-500 text-red-500"
              onClick={toggleConfirmCancelModal}
              startIcon={<CancelIcon />}
            >
              ביטול ההסעה שלי
            </Button>
          </div>
        </div>
        <ConfirmCancelRideModal
          open={confirmCancelModalOpen}
          onCancel={onCancel}
          onContinue={toggleConfirmCancelModal}
        />
      </Box>
    </Modal>
  );
};

export default RideContactModal;
