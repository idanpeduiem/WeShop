import Stack from "@mui/material/Stack";
import { RoutePaths } from "../App";

const Home = () => {
  return (
    <>
      <h1>Home Page</h1>
      <Stack>
        <a href={RoutePaths.CART}>cart</a>
        <a href={RoutePaths.PROFILE}>profile</a>
        <a href={RoutePaths.PRODUCT_DETAILS}>product details</a>
      </Stack>
    </>
  );
};

export default Home;
