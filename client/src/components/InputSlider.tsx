import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Slider from '@mui/material/Slider';
import debounce from "lodash/debounce";
import { Typography } from '@mui/material';

interface InputSliderProps {
  changeMaxPrice: (newMaxPrice: number | number[]) => void;
}

const CustomSlider = styled(Slider)`
  max-width: 80%;
`;

const InputSlider: React.FC<InputSliderProps> = (props) => {
  const {changeMaxPrice} = props;
  
  const [value, setValue] = React.useState<number | string | Array<number | string>>(
    1000,
    );
    
    const [stateDebounceCallHttpRequest] = React.useState(() =>
    debounce(changeMaxPrice, 300, {
      leading: false,
      trailing: true
    })
  );

  const handleChangeUsingStateDebounce = (event: Event, newValue: number | number[]) => {
    setValue(newValue);
    stateDebounceCallHttpRequest(newValue);
  };

  return (
    <Box sx={{ width: 250 }}>
      <Grid container spacing={2} alignItems="center">
        <Grid item>
            <Typography>{value}</Typography>
        </Grid>
        <Grid item xs>
          <CustomSlider
            value={typeof value === 'number' ? value : 0}
            min={0}
            max={1000}
            onChange={handleChangeUsingStateDebounce}
            aria-labelledby="input-slider"
          />
        </Grid>
      </Grid>
    </Box>
  );
}

export default InputSlider;