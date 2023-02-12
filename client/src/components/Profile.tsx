import { Button, Grid, Paper } from "@mui/material";
import Stack from "@mui/material/Stack";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { RoutePaths } from "../App";

const Profile = () => {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <Grid container alignItems={"stretch"} columnSpacing={2}>
      <Grid item xs={3}>
        <Paper variant={"outlined"}>
          <Stack>
            <Button
              variant={
                location.pathname.split("/")[2] === RoutePaths.PERSONAL_DETAILS
                  ? "contained"
                  : "text"
              }
              onClick={() => navigate(RoutePaths.PERSONAL_DETAILS)}
            >
              Personal Details
            </Button>
            <Button
              sx={{ mt: 1 }}
              variant={
                location.pathname.split("/")[2] === RoutePaths.PERSONAL_ORDER
                  ? "contained"
                  : "text"
              }
              onClick={() => navigate(RoutePaths.PERSONAL_ORDER)}
            >
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
