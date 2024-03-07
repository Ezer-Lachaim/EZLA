import { Modal, Box, Button, IconButton, Typography } from '@mui/material';
import { Close } from '@mui/icons-material';
import { SubmitHandler, useForm } from 'react-hook-form';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import InventoryIcon from '@mui/icons-material/Inventory';
import { formatPickupDateTime } from '../../../../../utils/datetime';
import { Ride } from '../../../../../api-client';

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
              <Typography className=" font-medium text-[1.375rem] text-blue-500">
                פרטי נסיעה
              </Typography>
              <IconButton size="small" onClick={onClose}>
                <Close />
              </IconButton>
            </div>
          </div>
          <div className="flex flex-col">
            {' '}
            {/* Adjusted to remove unnecessary width */}
            <div className="flex flex-col gap-2.5 m-5">
              <div className="flex items-stretch gap-2">
                <Typography className="mr-2 font-normal text-xs w-20 leading-5 min-w-0 break-words">
                  מועד איסוף:
                </Typography>
                <Typography>
                  {formatPickupDateTime(ride?.pickupDateTime, ride?.relevantTime, true)}
                </Typography>
              </div>
              <div className="flex items-stretch gap-2">
                <Typography className="mr-2 font-normal text-xs w-20  leading-5 min-w-0 break-words">
                  כמות:
                </Typography>
                <Typography>
                  {ride?.serviceType === 'ride' ? <EmojiPeopleIcon /> : <InventoryIcon />}
                  {ride?.passengerCount}
                </Typography>
              </div>
              <div className="flex items-stretch gap-2">
                <Typography className="mr-2 font-normal text-xs w-20  leading-5 min-w-0 break-words">
                  טלפון:
                </Typography>
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
              <div className="flex items-stretch gap-2">
                <Typography className="mr-2 font-normal text-xs w-20  leading-5 min-w-0 break-words">
                  כתובת איסוף:
                </Typography>
                <a
                  className="min-w-0 break-words"
                  href={`https://waze.com/ul?q=${ride?.origin}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  {ride?.origin}
                </a>
              </div>
              <div className="flex items-stretch gap-2">
                <Typography className="mr-2 font-normal text-xs w-20  leading-5 min-w-0 break-words">
                  יעד נסיעה:
                </Typography>
                <a
                  className="min-w-0 break-words"
                  href={`https://waze.com/ul?q=${ride?.destination}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  {ride?.destination}
                </a>
              </div>
              <div className="flex items-stretch gap-2">
                <Typography className="mr-2 font-normal text-xs w-20 leading-5 min-w-0 break-words">
                  תיאור הנסיעה:
                </Typography>
                <Typography className="mr-2 font-bold text-normal min-w-0 break-words">
                  {ride?.comment}
                </Typography>
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <Button
              className="w-280 h-40px m-20px rounded-md gap-8 mr-[0.8125rem] ml-[0.8125rem] mb-[0.8125rem]"
              variant="contained"
              color="primary"
              type="submit"
            >
              בחירת נסיעה
            </Button>
            <Button
              className="mr-[0.8125rem] ml-[0.8125rem] mb-[0.8125rem]"
              variant="outlined"
              color="primary"
              onClick={onClose}
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
