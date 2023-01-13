import { FilledInput, Grid, IconButton, InputAdornment } from "@mui/material";
import { RoutePaths } from "../App";
import { Search } from "@mui/icons-material";
import logo from "../assets/logo.png";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PersonIcon from "@mui/icons-material/Person";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <Grid
      container
      justifyContent={"space-between"}
      alignItems={"center"}
      sx={(theme) => ({ background: theme.palette.primary.main })}
    >
      <Grid item xs={3}>
        <img
          style={{ height: "10vh", width: "10=7vh" }}
          src={logo}
          alt="fireSpot"
          onClick={() => navigate(RoutePaths.HOME)}
        />
      </Grid>
      <Grid item xs container justifyContent={"center"}>
        <FilledInput
          disableUnderline
          startAdornment={
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          }
        />
      </Grid>
      <Grid item xs={2} container justifyContent={"end"}>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={() => navigate(RoutePaths.CART)}
        >
          <ShoppingCartIcon />
        </IconButton>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={() => navigate(RoutePaths.PROFILE)}
        >
          <PersonIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default Navbar;
