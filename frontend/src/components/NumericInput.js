import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function NumericInput(props) {
  const {
    amount,
    onChangeAmount,
  } = props;
  
  return (
    <Box component='form' noValidate autoComplete='off'>
      <TextField
        type={'number'}
        label={props.label}
        value={amount}
        onChange={onChangeAmount}
      />
    </Box>
  );
}
