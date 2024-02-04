import * as React from 'react';
import { Theme, useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};

export const menuHours = ['שעה', 'שעתיים', '3 שעות', '4 שעות', '5 שעות', '6 שעות', '7 שעות'];

export function getStyles(name: string, personName: string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium
  };
}

const defaultSelectedTime = ['3 שעות'];

export default function ChoiceHoursMenu() {
  const theme = useTheme();
  const [selectedTime, setSelectedTime] = React.useState<string[]>(defaultSelectedTime);

  const handleChange = (event: SelectChangeEvent<typeof selectedTime>) => {
    const {
      target: { value }
    } = event;
    setSelectedTime(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value
    );
  };

  return (
    <div>
      <FormControl sx={{ width: '100%' }} required>
        <InputLabel id="demo-multiple-name-label" required>
          כמה זמן רלוונטי
        </InputLabel>
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          value={selectedTime}
          onChange={handleChange}
          input={<OutlinedInput label="כמה זמן רלוונטי" />}
          MenuProps={MenuProps}
          required
        >
          {menuHours.map((hour) => (
            <MenuItem key={hour} value={hour} style={getStyles(hour, selectedTime, theme)}>
              {hour}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
