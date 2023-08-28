import { Checkbox, FormControl, InputLabel, ListItemText, MenuItem, Select } from '@mui/material';
import { Controller } from 'react-hook-form';
import { RideRequesterSpecialRequestEnum } from '../../../../../../../../api-client';

const capabilities = Object.keys(RideRequesterSpecialRequestEnum);

const CarCapabilitiesSelect = () => {
  return (
    <div>
      <FormControl>
        <InputLabel id="carCapabilities" />
        <Controller
          name="carCapabilities"
          render={({ field }) => (
            <Select multiple labelId="carCapabilities" {...field} value={[field.value as []]}>
              {capabilities.map((name) => (
                <MenuItem key={name} value={name}>
                  <Checkbox checked={capabilities.indexOf(name) > -1} />
                  <ListItemText primary={name} />
                </MenuItem>
              ))}
            </Select>
          )}
        />
      </FormControl>
    </div>
  );
};

export default CarCapabilitiesSelect;
