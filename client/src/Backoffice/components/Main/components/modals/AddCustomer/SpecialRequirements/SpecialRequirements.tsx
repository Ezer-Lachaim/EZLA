import Box from '@mui/material/Box';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useState } from 'react';

function SpecialRequirements() {
  const [state, setState] = useState({
    wheelChair: false,
    smallKidChair: false,
    baggageWheelChair: false,
    babyChair: false,
    highCar: false,
    shipment: false
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked
    });
  };

  const { wheelChair, smallKidChair, baggageWheelChair, babyChair, highCar, shipment } = state;

  return (
    <Box sx={{ display: 'flex' }}>
      <FormControl component="fieldset" variant="standard">
        <FormLabel className="mb-2" component="legend">
          בקשות מיוחדות
        </FormLabel>
        <div className="flex gap-24">
          <FormGroup className="mr-2">
            <FormControlLabel
              className="mb-2"
              control={<Checkbox checked={wheelChair} onChange={handleChange} name="wheelChair" />}
              label="התאמה לכסא גלגלים"
            />
            <FormControlLabel
              className="mb-2"
              control={
                <Checkbox checked={smallKidChair} onChange={handleChange} name="smallKidChair" />
              }
              label="מושב בטיחות לילדים (גיל 3-8)"
            />
            <FormControlLabel
              className="mb-2"
              control={
                <Checkbox
                  checked={baggageWheelChair}
                  onChange={handleChange}
                  name="baggageWheelChair"
                />
              }
              label="תא מטען מתאים לכסא גלגלים"
            />
          </FormGroup>
          <FormGroup>
            <FormControlLabel
              className="mb-2"
              control={<Checkbox checked={babyChair} onChange={handleChange} name="babyChair" />}
              label="מושב בטיחות לתינוק"
            />
            <FormControlLabel
              className="mb-2"
              control={<Checkbox checked={highCar} onChange={handleChange} name="highCar" />}
              label="רכב גבוה"
            />
            <FormControlLabel
              className="mb-2"
              control={<Checkbox checked={shipment} onChange={handleChange} name="shipment" />}
              label="משלוחים"
            />
          </FormGroup>
        </div>
      </FormControl>
    </Box>
  );
}

export default SpecialRequirements;
