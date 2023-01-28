import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Slider from '@mui/material/Slider';
import debounce from "lodash/debounce";
import { Typography } from '@mui/material';

const CustomSlider = styled(Slider)`
  max-width: 80%;
`;

const callHttpRequest = (eventSrcDesc: string, newValue: number | number[]) => {
    console.log({ eventSrcDesc, newValue });
  };
  const topLevelDebounceCallHttpRequest = debounce(callHttpRequest, 300, {
    leading: false,
    trailing: true
  });

const InputSlider: React.FC = () => {
  const [value, setValue] = React.useState<number | string | Array<number | string>>(
    1000,
  );

  const handleChangeUsingTopLevelDebounce = (event: Event, newValue: number | number[]) => {
    setValue(newValue);
    topLevelDebounceCallHttpRequest("volume-top-level", newValue);
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
            onChange={handleChangeUsingTopLevelDebounce}
            aria-labelledby="input-slider"
          />
        </Grid>
      </Grid>
    </Box>
  );
}

export default InputSlider;