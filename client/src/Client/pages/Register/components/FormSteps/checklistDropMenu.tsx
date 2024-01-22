import * as React from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const SpecialRequests = [
  "התאמה לכסא גלגלים",
  "מושב בטיחות לתינוק",
  "מושב בטיחות לילדים (גיל 3-8)",
  "רכב גבוה",
  "תא מטען מתאים לכסא גלגלים",
];

export default function MultipleSelectCheckmarks() {
  const [personName, setPersonName] = React.useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-checkbox-label">בקשות מיוחדות</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput label="בקשות מיוחדות" />}
          renderValue={(selected) => selected.join(", ")}
          MenuProps={MenuProps}
        >
          {SpecialRequests.map((Request) => (
            <MenuItem key={Request} value={Request}>
              <Checkbox checked={personName.indexOf(Request) > -1} />
              <ListItemText primary={Request} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
