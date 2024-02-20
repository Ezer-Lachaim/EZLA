import { Modal, Box, Button, IconButton, Typography, Divider } from '@mui/material';
import { Close } from '@mui/icons-material';
import CarIcon from '@mui/icons-material/DirectionsCarFilled';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import InventoryIcon from '@mui/icons-material/Inventory';
import { useState } from 'react';
import ConfirmCancelRideModal from '../../../components/ConfirmCancelRideModal/ConfirmCancelRideModal';
import { api } from '../../../../services/api';
import { useActiveRide } from '../../../../hooks/activeRide';
import { Ride, RideStateEnum } from '../../../../api-client';

const commonTextStyle = {
  marginRight: '8px',
  fontFamily: 'Heebo',
  fontWeight: '400',
  fontSize: '12px',
  width: '80px',
  Letter: '0.4px',
  align: 'right',
  lineHeight: '20px'
};

const RideContactModal = ({
  ride,
  open,
  onConfirm,
  onClose
}: {
  ride: Ride;
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
    try {
      if (!ride || !ride.rideId) {
        throw new Error('Invalid ride data. Ride ID is missing.');
      }
      await api.ride.updateRide({
        rideId: ride.rideId,
        ride: { state: RideStateEnum.DriverCanceled }
      });
      await reFetchActiveRide();
      // navigation will occur automatically (in @../Driver.tsx)
    } catch (error) {
      console.error('Error canceling ride:', error);
    }
  };

  return (
    <Modal open={open} disablePortal disableEscapeKeyDown>
      <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 bg-white rounded-lg shadow-lg p-4">
        <div className="flex flex-col gap-4">
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
            <Divider />
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
              <Typography>{`${ride?.firstName} ${ride?.lastName}`}</Typography>
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
          <div className="flex flex-col gap-4">
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
              startIcon={<Close />}
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