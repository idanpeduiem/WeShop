import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import {
  Button,
  FilledInput,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Toolbar,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { Routes } from "../App";
import { Image, Search } from "@mui/icons-material";
import AspectRatio from "@mui/joy/AspectRatio";
import Stack from "@mui/material/Stack";
import logo from "../assets/logo.png";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PersonIcon from "@mui/icons-material/Person";

const Navbar = () => {
  return (
    <Grid
      container
      justifyContent={"space-between"}
      alignItems={"center"}
      sx={(theme) => ({ background: theme.palette.primary.main })}
    >
      <Grid item xs={3}>
        <a href={Routes.HOME}>
          <img
            style={{ height: "10vh", width: "10=7vh" }}
            src={logo}
            alt="fireSpot"
          />
        </a>
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
          href={Routes.CART}
        >
          <ShoppingCartIcon />
        </IconButton>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          href={Routes.PROFILE}
        >
          <PersonIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default Navbar;
