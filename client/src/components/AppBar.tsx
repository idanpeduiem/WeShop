import {
  Badge,
  FilledInput,
  Grid,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { RoutePaths } from "../App";
import { Logout, Search } from "@mui/icons-material";
import logo from "../assets/logo.png";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PersonIcon from "@mui/icons-material/Person";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";

const Navbar = () => {
  const itemsInCart = 4;

  const navigate = useNavigate();

  const logout = () => {
    signOut(getAuth())
      .then(() => {
        // Sign-out successful.
        navigate(RoutePaths.LOGIN);
      })
      .catch((error) => {
        // An error happened.
        console.log(error);
      });
  };

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
          <Badge badgeContent={itemsInCart} color="secondary">
            <ShoppingCartIcon />
          </Badge>
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
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={logout}
        >
          <Logout />
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default Navbar;
