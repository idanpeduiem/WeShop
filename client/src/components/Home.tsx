import Stack from "@mui/material/Stack";
import { Routes } from "../App";
import { useUserContext } from "../controller/userController/userContext";

const Home = () => {
  const { user } = useUserContext();
  console.log(user);
  return (
    <>
      <h1>Home Page</h1>
      <Stack>
        <a href={Routes.CART}>cart</a>
        <a href={Routes.LOGIN}>login</a>
        <a href={Routes.PROFILE}>profile</a>
        <a href={Routes.PRODUCT_DETAILS}>product details</a>
      </Stack>
    </>
  );
};

export default Home;
