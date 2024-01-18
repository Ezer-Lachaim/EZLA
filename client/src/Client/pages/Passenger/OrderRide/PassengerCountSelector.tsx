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

const QuantityInput: React.FC<QuantityInputProps> = ({
  id,
  label,
  error,
  onChange,
}) => {
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
    <div style={{ display: 'flex', flexDirection: 'row',}}>
            <IconButton aria-label="decrement" onClick={handleDecrement}>
        <RemoveCircleOutlineOutlinedIcon />
      </IconButton>
      <TextField
        id={id}
        variant="outlined"
        defaultValue="Normal"
        type="number"
        value={quantity}
        inputProps={{ min: 1 }}
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



// import * as React from 'react';
// import { styled } from '@mui/system';
// import RemoveIcon from '@mui/icons-material/Remove';
// import AddIcon from '@mui/icons-material/Add';
// import {
//   Unstable_NumberInput as BaseNumberInput,
//   NumberInputProps,
// } from '@mui/base/Unstable_NumberInput';

// const blue = {
//   100: '#daecff',
//   200: '#b6daff',
//   300: '#66b2ff',
//   400: '#3399ff',
//   500: '#007fff',
//   600: '#0072e5',
//   700: '#0059B2',
//   800: '#004c99',
// };

// const grey = {
//   50: '#F3F6F9',
//   100: '#E5EAF2',
//   200: '#DAE2ED',
//   300: '#C7D0DD',
//   400: '#B0B8C4',
//   500: '#9DA8B7',
//   600: '#6B7A90',
//   700: '#434D5B',
//   800: '#303740',
//   900: '#1C2025',
// };

// const StyledInputRoot = styled('div')(
//   ({ theme }: { theme: any }) => `
//   font-family: 'IBM Plex Sans', sans-serif;
//   font-weight: 400;
//   color: ${theme.palette.mode === 'dark' ? grey[300] : grey[500]};
//   display: flex;
//   flex-flow: row nowrap;
//   justify-content: center;
//   align-items: center;
// `,
// );

// const StyledInput = styled('input')(
//   ({ theme }: { theme: any }) => `
//   font-size: 0.875rem;
//   font-family: inherit;
//   font-weight: 400;
//   line-height: 1.375;
//   color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
//   background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
//   border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
//   box-shadow: 0px 2px 4px ${
//     theme.palette.mode === 'dark' ? 'rgba(0,0,0, 0.5)' : 'rgba(0,0,0, 0.05)'
//   };
//   border-radius: 8px;
//   margin: 0 8px;
//   padding: 10px 12px;
//   outline: 0;
//   min-width: 0;
//   width: 4rem;
//   text-align: center;

//   &:hover {
//     border-color: ${blue[400]};
//   }

//   &:focus {
//     border-color: ${blue[400]};
//     box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[700] : blue[200]};
//   }

//   &:focus-visible {
//     outline: 0;
//   }
// `,
// );

// const StyledButton = styled('button')(
//   ({ theme }: { theme: any }) => `
//   font-family: 'IBM Plex Sans', sans-serif;
//   font-size: 0.875rem;
//   box-sizing: border-box;
//   line-height: 1.5;
//   border: 1px solid;
//   border-radius: 999px;
//   border-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[200]};
//   background: ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};
//   color: ${theme.palette.mode === 'dark' ? grey[200] : grey[900]};
//   width: 32px;
//   height: 32px;
//   display: flex;
//   flex-flow: row nowrap;
//   justify-content: center;
//   align-items: center;
//   transition-property: all;
//   transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
//   transition-duration: 120ms;

//   &:hover {
//     cursor: pointer;
//     background: ${theme.palette.mode === 'dark' ? blue[700] : blue[500]};
//     border-color: ${theme.palette.mode === 'dark' ? blue[500] : blue[400]};
//     color: ${grey[50]};
//   }

//   &:focus-visible {
//     outline: 0;
//   }

//   &.increment {
//     order: 1;
//   }
// `,
// );



// const NumberInput = React.forwardRef<HTMLDivElement, NumberInputProps>(
//   function CustomNumberInput(props, ref) {
//     return (
//       <BaseNumberInput
//         slots={{
//           root: StyledInputRoot,
//           input: StyledInput,
//           incrementButton: StyledButton,
//           decrementButton: StyledButton,
//         }}
//         slotProps={{
//           incrementButton: {
//             children: <AddIcon fontSize="small" />,
//             className: 'increment',
//           },
//           decrementButton: {
//             children: <RemoveIcon fontSize="small" />,
//           },
//         }}
//         {...props}
//         ref={ref}
//       />
//     );
//   }
// );

// export default NumberInput;

