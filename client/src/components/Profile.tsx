import { Button, Grid, Paper } from "@mui/material";
import Stack from "@mui/material/Stack";
import { Outlet, useNavigate } from "react-router-dom";
import { RoutePaths } from "../App";

const Profile = () => {
  const navigate = useNavigate();
  return (
    <Grid container alignItems={"stretch"} columnSpacing={2}>
      <Grid item xs={3}>
        <Paper variant={"outlined"}>
          <Stack>
            <Button onClick={() => navigate(RoutePaths.PERSONAL_DETAILS)}>
              Personal Details
            </Button>
            <Button onClick={() => navigate(RoutePaths.PERSONAL_ORDER)}>
              Personal Orders
            </Button>
          </Stack>
        </Paper>
      </Grid>
      <Grid item xs={9}>
        <Outlet />
      </Grid>
    </Grid>
  );
};

export default Profile;
