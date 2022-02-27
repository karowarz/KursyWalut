import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function BasicSelect(props) {
  const { currencyOptions, selectedCurrency, onChangeCurrency } = props;
  return (
    <Box>
      <FormControl fullWidth>
        <InputLabel id='demo-simple-select-label'>{props.label}</InputLabel>
        <Select value={selectedCurrency} onChange={onChangeCurrency}>
          {currencyOptions.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
