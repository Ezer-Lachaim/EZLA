import { TextField } from "@mui/material";

function NewDriverCarInfo() {
  return (
    <div className="flex gap-4 mb-5">
      <div className="flex flex-col gap-4 flex-1">
        <TextField
          required
          label="יצרן"
          variant="outlined"
          fullWidth
        />
        <TextField
          required
          label=" צבע רכב"
          variant="outlined"
          fullWidth
        />
        <TextField
          label="מספר מושבים ברכב"
          variant="outlined"
          fullWidth
          required
          type="number"
        />
      </div>
      <div className="flex flex-col gap-4 flex-1">
        <TextField
          required
          label="דגם"
          variant="outlined"
          fullWidth
        />
        <TextField
          required
          label="מספר לוחית רכב"
          variant="outlined"
          fullWidth
        />
        <TextField
          required
          label="רכב מותאם"
          variant="outlined"
          fullWidth
        />
      </div>
    </div>
  );
}

export default NewDriverCarInfo;
