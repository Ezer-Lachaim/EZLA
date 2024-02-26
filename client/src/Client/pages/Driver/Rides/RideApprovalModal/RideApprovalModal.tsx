import { Modal, Box, Button, IconButton, Typography } from '@mui/material';
import { Close } from '@mui/icons-material';
import { SubmitHandler, useForm } from 'react-hook-form';
import { formatPickupDateTime } from '../../../../components/TimeFunctions/TimeFunctions';
import { Ride } from '../../../../../api-client';

const commonStyle = {
  display: 'flex',
  alignItems: 'stretch',
  gap: '8px'
};

const commonTextStyle: React.CSSProperties = {
  marginRight: '8px',
  fontFamily: 'Heebo',
  fontWeight: '400',
  fontSize: '12px',
  width: '80px',
  lineHeight: '20px',
  minWidth: '0',
  wordWrap: 'break-word'
};

const boldTextStyle = {
  ...commonTextStyle,
  fontWeight: '700',
  fontSize: '16px',
  letter: '0.15px',
  width: '100%'
};

const firstTitleStyle: React.CSSProperties = {
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

export type SubmitRideInputs = {
  minutesToArrive: number;
};

const RideApprovalModal = ({
  ride,
  open,
  onClose,
  onSubmit
}: {
  ride: Ride;
  open: boolean;
  onClose: () => void;
  onSubmit: SubmitHandler<SubmitRideInputs>;
}) => {
  const { handleSubmit } = useForm<SubmitRideInputs>();

  return (
    <Modal open={open} disablePortal disableEscapeKeyDown>
      <Box className="fixed p-0 pt-0 bg-white rounded-lg shadow-lg" sx={style}>
        <form
          className="flex flex-col w-full gap-8px m-20px"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <div className="flex flex-col w-full gap-8px">
            <div className="flex flex-row w-full p-3 items-center justify-between">
              <Typography style={firstTitleStyle}>פרטי נסיעה</Typography>
              <IconButton size="small" onClick={onClose}>
                <Close />
              </IconButton>
            </div>
          </div>
          <div className="flex flex-col">
            {' '}
            {/* Adjusted to remove unnecessary width */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                margin: '20px'
              }}
            >
              <div style={commonStyle}>
                <Typography style={commonTextStyle}>מועד איסוף:</Typography>
                <Typography>
                  {formatPickupDateTime(ride?.pickupDateTime, ride?.relevantTime)}
                </Typography>
              </div>
              <div style={commonStyle}>
                <Typography style={commonTextStyle}>כמות:</Typography>
                <Typography>{ride?.passengerCount}</Typography>
              </div>
              <div style={commonStyle}>
                <Typography style={commonTextStyle}>טלפון:</Typography>
                <Typography>
                  {' '}
                  <a
                    href={`https://wa.me/972${ride?.cellphone?.replace(/-/g, '')}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {ride?.cellphone}
                  </a>{' '}
                </Typography>
              </div>
              <div style={commonStyle}>
                <Typography style={commonTextStyle}>כתובת איסוף:</Typography>
                <a
                  style={{ minWidth: '0', wordWrap: 'break-word' }}
                  href={`https://waze.com/ul?q=${ride?.origin}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  {ride?.origin}
                </a>
              </div>
              <div style={commonStyle}>
                <Typography style={commonTextStyle}>יעד נסיעה:</Typography>
                <a
                  style={{ minWidth: '0', wordWrap: 'break-word' }}
                  href={`https://waze.com/ul?q=${ride?.destination}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  {ride?.destination}
                </a>
              </div>
              <div style={commonStyle}>
                <Typography style={commonTextStyle}>תיאור הנסיעה:</Typography>
                <Typography style={{ ...boldTextStyle, fontWeight: '400' }}>
                  {ride?.comment}
                </Typography>
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <Button
              className="w-280 h-40px m-20px rounded-md gap-8"
              variant="contained"
              color="primary"
              type="submit"
              style={{ marginRight: '13px', marginLeft: '13px', marginBottom: '13px' }}
            >
              בחירת נסיעה
            </Button>
            <Button
              variant="outlined"
              color="primary"
              onClick={onClose}
              style={{ marginRight: '13px', marginLeft: '13px', marginBottom: '13px' }}
            >
              ביטול
            </Button>
          </div>
        </form>
      </Box>
    </Modal>
  );
};

export default RideApprovalModal;
