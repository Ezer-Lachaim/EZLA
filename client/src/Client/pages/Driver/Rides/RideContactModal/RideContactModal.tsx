import { Modal, Box, Button, IconButton, Typography, Divider } from '@mui/material';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import { Close } from '@mui/icons-material';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Ride } from '../../../../../api-client';
import CarIcon from '@mui/icons-material/DirectionsCarFilled';
import { SubmitRideInputs } from '../RideApprovalModal/RideApprovalModal';

const commonStyle = {
  display: 'flex',
  alignItems: 'stretch',
  gap: '8px'
};

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

const boldTextStyle = {
  ...commonTextStyle,
  fontWeight: '700',
  fontSize: '16px',
  width: '195px',
  letter: '0.15px'
};

const firstTitleStyle = {
  ...boldTextStyle,
  fontWeight: '500',
  fontSize: '22px',
  color: '#007DFF'
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
  onCancel,
}: {
  ride?: Ride;
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}) => {

  return (
    <Modal open={open} disablePortal disableEscapeKeyDown>
      <Box
        className="fixed top-109 left-27 w-320 h-auto p-0 pt-0 pb-20 bg-white rounded-lg shadow-lg flex flex-col gap-20"
        sx={style}
      >
        <div className="flex flex-col w-full h-full gap-8">
          <div className="flex flex-col w-full h-full gap-8">
            <div className="flex flex-row w-80 h-14 p-3 items-center justify-between">
              <IconButton size="large" onClick={onCancel}>
                <DirectionsCarIcon />
              </IconButton>
              <Typography style={firstTitleStyle}>צרו קשר עם הנוסע</Typography>
              <IconButton size="small" onClick={onCancel}>
                <Close />
              </IconButton>
            </div>
            <div>
              <Typography style={boldTextStyle}>חשוב ליצור קשר עם הנוסעים</Typography>
              <Typography style={commonTextStyle}>
                יש ליידע אותם שאתם בדרך לאסוף אותם ולמסור להם את פרטי הרכב שלכם: סוג וצבע רכב, ומספר
                רכב.
              </Typography>
            </div>
            <Divider />
            <div className="flex items-center gap-2">
              <div style={commonStyle}>
                <Typography style={commonTextStyle}>כמות:</Typography>
                <Typography style={boldTextStyle}>{ride?.passengerCount}</Typography>
              </div>
              <div style={commonStyle}>
                <Typography style={commonTextStyle}>שם הנוסע:</Typography>
                <Typography style={boldTextStyle}>{`${ride?.firstName} ${ride?.comment}`}</Typography>
              </div>
              <div style={commonStyle}>
                <Typography style={commonTextStyle}>טלפון הנוסע:</Typography>
                <Typography style={boldTextStyle}>{`tel:${ride?.cellphone}`}</Typography>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <Button
              className="w-280 h-40px p-[13px 16px] m-20px rounded-md gap-8"
              variant="contained"
              color="primary"
              type="submit"
              startIcon={<CarIcon />}
              onClick={onConfirm}
            >
              אישור ויציאה לדרך
            </Button>
            <Button variant="outlined" color="primary" startIcon={<Close />} onClick={onCancel}>
              ביטול ההסעה שלי
            </Button>
          </div>
        </div>
      </Box>
    </Modal>
  );
};

export default RideContactModal;