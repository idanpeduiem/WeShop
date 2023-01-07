import Stack from "@mui/material/Stack";
import { Routes } from "../App";

const Home = () => {
  return (
    <>
      <h1>Home Page</h1>
      <Stack>
        <a href={Routes.CART}>cart</a>
        <a href={Routes.PROFILE}>profile</a>
        <a href={Routes.PRODUCT_DETAILS}>product details</a>
      </Stack>
    </>
  );
};

export default Home;
