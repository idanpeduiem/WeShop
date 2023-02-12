import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Slider from '@mui/material/Slider';
import { Typography } from '@mui/material';

interface InputSliderProps {
  maxPriceFilter: number | number[];
  changeMaxPrice: (newMaxPrice: number | number[]) => void;
}

const CustomSlider = styled(Slider)`
  max-width: 80%;
`;

const InputSlider: React.FC<InputSliderProps> = (props) => {
  const {changeMaxPrice, maxPriceFilter} = props;

  const handleChange = (event: Event, newValue: number | number[]) => {
    changeMaxPrice(newValue);
  };

  return (
    <Box sx={{ width: 250 }}>
      <Grid container spacing={2} alignItems="center">
        <Grid item>
            <Typography>{maxPriceFilter}</Typography>
        </Grid>
        <Grid item xs>
          <CustomSlider
            value={typeof maxPriceFilter === 'number' ? maxPriceFilter : 0}
            min={0}
            max={1000}
            onChange={handleChange}
            aria-labelledby="input-slider"
          />
        </Grid>
      </Grid>
    </Box>
  );
}

export default InputSlider;