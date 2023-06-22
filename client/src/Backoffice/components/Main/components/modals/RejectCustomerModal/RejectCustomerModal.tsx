import { Box, Button, Modal, TextField, Typography } from '@mui/material';
import { useState } from 'react';

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  borderRadius: '4px',
  boxShadow: 24,
  p: 2
};
interface RejectCustomerModalProps {
  open: boolean;
  handleModal: (shouldOpen: boolean) => void;
}
function RejectCustomerModal({ open, handleModal }: RejectCustomerModalProps) {
  const [reason, setReason] = useState('');
  console.log(reason);
  
  return (
    <Modal
      open={open}
      onClose={() => handleModal(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          סירוב נוסע חדש
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2, mb: 2 }}>
          יש לכתוב את הסיבה לסירוב
        </Typography>
        <TextField
          id="outlined-multiline-static"
          label="סיבה לסירוב"
          multiline
          rows={2}
          className="w-full"
          required
          placeholder="יש לכתוב את הסיבה לסירוב"
          onChange={(e) => setReason(e.target.value)}
          value={reason}
        />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'end',
            gap: '10px',
            marginTop: '15px'
          }}
        >
          <Button
            variant="outlined"
            className="bg-red-500 text-white"
            onClick={() => handleModal(false)}
          >
            ביטול
          </Button>
          <Button disabled={!reason} variant="contained" className="bg-red-500 text-white">
            שליחה
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default RejectCustomerModal;
