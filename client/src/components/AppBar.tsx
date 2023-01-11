import { FilledInput, Grid, IconButton, InputAdornment } from "@mui/material";
import { Routes } from "../App";
import { Search } from "@mui/icons-material";
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
