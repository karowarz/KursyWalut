import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function BasicInput(props) {
  return (
    <Box
      component='form'
      sx={{
        maxWidth: '100%',
      }}
      noValidate
      autoComplete='off'>
      <TextField
        value={props.amount}
        id='outlined-basic'
        label={props.label}
        variant='outlined'
        onChange={props.onChange}
      />
    </Box>
  );
}
