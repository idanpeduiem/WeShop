import {Button, Grid, Paper} from "@mui/material";
import Stack from "@mui/material/Stack";
import { Outlet , Link, redirect} from "react-router-dom"
import {RoutePaths} from "../App";

const Profile = () => {
    redirect(RoutePaths.PERSONAL_DETAILS);

  return (
    <Grid container alignItems={'stretch'} columnSpacing={2}>
      <Grid item xs={3}>
        <Paper>
          <Stack>
            <Button href={`${RoutePaths.PERSONAL_DETAILS}`}>
                Personal Details
            </Button>
            <Button href={`${RoutePaths.PERSONAL_ORDER}`}>
                Personal Orders
            </Button>
          </Stack>
        </Paper>
      </Grid>
      <Grid item xs={9}>
        <Paper>
            <Outlet/>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Profile;
