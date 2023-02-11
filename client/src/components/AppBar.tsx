import {
  Badge,
  FilledInput,
  Grid,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { RoutePaths } from "../App";
import { Logout, Search } from "@mui/icons-material";
import BarChartIcon from "@mui/icons-material/BarChart";
import logo from "../assets/logo.png";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PersonIcon from "@mui/icons-material/Person";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useNavigate } from "react-router-dom";
import { firebase } from "../utils/firebase";
import { useCartContext } from "../controller/cartController/cartContext";
import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { getAllItemsDesc } from "../queries";
import { useWishlistContext } from "../controller/wishlistController/wishlistContext";
import useDebounce from "../hooks/useDebounce";

interface Item {
  _id: string;
  description: string;
}

const Navbar = () => {
  const { cartItems } = useCartContext();
  const { wishlistItems } = useWishlistContext();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const debouncedValue = useDebounce<string>(searchInput, 500);
  const { data, isLoading, isError, isSuccess } = useQuery<Item[] | undefined>(
    ["itemsDesc", debouncedValue],
    () => getAllItemsDesc(debouncedValue)
  );
  const [options, setOptions] = useState<readonly Item[] | undefined>([]);

  useEffect(() => {
    if (data) {
      setOptions([...data]);
    }
    if (!open) {
      setOptions([]);
    }
  }, [open, data]);

  const logout = async () => {
    try {
      await firebase.signOut();
      navigate(RoutePaths.LOGIN);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Grid
      container
      justifyContent={"space-between"}
      alignItems={"center"}
      sx={(theme) => ({
        background: theme.palette.primary.main,
        height: "10%",
        position: "sticky",
        top: 0,
        zIndex: 100,
      })}
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
        <Autocomplete
          id="asynchronous-demo"
          sx={{ width: 300 }}
          open={open}
          onChange={(e, value) => {
            value?._id
              ? navigate(RoutePaths.PRODUCT_DETAILS_NO_ID + "/" + value?._id)
              : navigate(RoutePaths.HOME);
          }}
          onOpen={() => {
            setOpen(true);
          }}
          onClose={() => {
            setOpen(false);
          }}
          onInputChange={(event, newInputValue) => {
            setSearchInput(newInputValue);
          }}
          isOptionEqualToValue={(option, value) =>
            option.description === value.description
          }
          getOptionLabel={(option) => option.description}
          options={options ? options : [{ _id: "", description: "No Data" }]}
          loading={isLoading}
          renderInput={(params) => (
            <TextField
              {...params}
              InputProps={{
                ...params.InputProps,
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
                endAdornment: (
                  <React.Fragment>
                    {isLoading ? (
                      <CircularProgress color="inherit" size={20} />
                    ) : null}
                    {params.InputProps.endAdornment}
                  </React.Fragment>
                ),
              }}
            />
          )}
        />
      </Grid>
      <Grid item xs={2} container justifyContent={"end"}>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={() => navigate(RoutePaths.GRAPH)}
        >
          <BarChartIcon />
        </IconButton>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={() => navigate(RoutePaths.CART)}
        >
          <Badge badgeContent={cartItems.length} color="secondary">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={() => navigate(RoutePaths.WISHLIST)}
        >
          <Badge badgeContent={wishlistItems.length} color="secondary">
            <FavoriteIcon />
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
