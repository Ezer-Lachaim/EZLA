// Assuming this is in your PrivacyPolicyPopup.jsx or similar file
import { useState } from 'react';
import { Modal, Box, Button } from '@mui/material';
import Terms from './Terms';

function TermsPolicyPopup() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    overflowY: 'auto',
    maxHeight: '90vh'
  };

  return (
    <>
      <Button onClick={handleOpen} className="underline p-0">
        תנאי השימוש
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="privacy-policy-title"
        aria-describedby="privacy-policy-description"
      >
        <Box sx={style}>
          <Button
            onClick={handleClose}
            sx={{
              backgroundColor: 'primary.main',
              color: 'white',
              fontWeight: 'bold',
              py: 1,
              px: 2,
              borderRadius: 'default',
              '&:hover': {
                backgroundColor: 'primary.light'
              }
            }}
          >
            סגור
          </Button>
          <Terms />
        </Box>
      </Modal>
    </>
  );
}

export default TermsPolicyPopup;
