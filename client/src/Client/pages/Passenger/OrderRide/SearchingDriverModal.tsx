import React from 'react';
import { Box, Button } from '@mui/material';
import { Cancel } from '@mui/icons-material';
import car from '../../../../assets/car.png';
import ConfirmCancelRideModal from '../../../components/ConfirmCancelRideModal/ConfirmCancelRideModal.tsx';

const style = {
  position: 'fixed' as const,
  top: '60px',
  left: '0',
  width: '100vw',
  height: 'calc(100vh - 60px)',
  bgcolor: 'background.paper',
  p: 2.5,
  zIndex: '10'
};

const SearchingDriverModal = ({
  open,
  onClose
}: {
  open: boolean;
  onClose: () => Promise<void>;
}) => {
  const [confirmClose, setConfirmClose] = React.useState(false);

  return (
    // <Modal open={open} disablePortal disableEscapeKeyDown>
    open && (
      <>
        <Box sx={style}>
          <div className="flex flex-col w-full h-full">
            <div className="flex flex-col justify-center flex-grow items-center">
              <img src={car} alt="car" className="w-20 animate-bounce" />
              <h1 className="text-center">פנייתכם נקלטה</h1>
              <h1 className="text-center">אנא העזרו בסבלנות, זה עשוי לקחת מספר דקות</h1>
              <h1 className="text-center">
                במידה ואין מתנדבים זמינים כרגע, אנחנו ניצור אתכם קשר לפני שיצאו לדרך
              </h1>
            </div>
            <Button
              variant="outlined"
              color="error"
              className="flex gap-2"
              onClick={() => setConfirmClose(true)}
            >
              <Cancel color="error" fontSize="small" />
              ביטול נסיעה
            </Button>
          </div>
          {/* <IconButton */}
          {/*  size="small" */}
          {/*  className="absolute left-2 top-1" */}
          {/*  onClick={() => setConfirmClose(true)} */}
          {/* > */}
          {/*  <Close /> */}
          {/* </IconButton> */}
        </Box>

        <ConfirmCancelRideModal
          open={confirmClose}
          onCancel={async () => {
            await onClose();
            setConfirmClose(false);
          }}
          onContinue={() => setConfirmClose(false)}
        />
      </>
    )
    // </Modal>
  );
};

export default SearchingDriverModal;
