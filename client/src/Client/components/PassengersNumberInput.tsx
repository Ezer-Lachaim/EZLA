import * as React from 'react';
import { IconButton, TextField } from '@mui/material';
import { RemoveCircleOutlineOutlined } from '@mui/icons-material';
import AddCircleOutlineOutlined from '@mui/icons-material/AddCircleOutlineOutlined';

interface QuantityInputProps {
  id: string;
  label?: string;
  error: boolean;
  onChange?: (value: number) => void;
}


const QuantityInput: React.FC<QuantityInputProps> = ({
  id,
  label,
  error,
  onChange,
}) => {
  const [quantity, setQuantity] = React.useState<number>(1);

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
        <RemoveCircleOutlineOutlined />
      </IconButton>
      <TextField
        id={id}
        variant="outlined"
        value={quantity}
        inputProps={{ min: 1, max: 12, inputMode: 'numeric' }}
        label={label}
        error={error}
        onChange={() => {}}
        onBlur={() => {}}
        ref={() => {}}
      />
      <IconButton aria-label="increment" onClick={handleIncrement}>
        <AddCircleOutlineOutlined />
      </IconButton>
    </div>
  );
};

export default QuantityInput;