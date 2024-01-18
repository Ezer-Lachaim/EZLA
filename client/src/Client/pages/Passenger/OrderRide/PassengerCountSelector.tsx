import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined';

interface QuantityInputProps {
  id: string;
  label?: string;
  error: boolean;
  onChange?: (value: number) => void;
}

const QuantityInput: React.FC<QuantityInputProps> = ({ id, label, error, onChange }) => {
  const [quantity, setQuantity] = useState<number>(1);

  const handleIncrement = () => {
    if (quantity < 12) {
      setQuantity((prevQuantity) => prevQuantity + 1);
      if (onChange) {
        onChange(quantity + 1);
      }
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
      if (onChange) {
        onChange(quantity - 1);
      }
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <IconButton aria-label="decrement" onClick={handleDecrement}>
        <RemoveCircleOutlineOutlinedIcon />
      </IconButton>
      <TextField
        id={id}
        variant="outlined"
        defaultValue="Normal"
        value={quantity}
        inputProps={{ min: 1, max: 12, inputMode: 'numeric' }}
        label={label}
        error={error}
        onChange={() => {}}
        onBlur={() => {}}
        ref={() => {}}
      />

      <IconButton aria-label="increment" onClick={handleIncrement}>
        <AddCircleOutlineOutlinedIcon />
      </IconButton>
    </div>
  );
};

export default QuantityInput;
