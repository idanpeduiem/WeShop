import Stack from "@mui/material/Stack";
import { RoutePaths } from "../App";
import { useUserContext } from "../controller/userController/userContext";
import AxiosInstance from "../utils/axiosInstance";
import { approveService } from "../utils/services";

const Home = () => {
  const { user } = useUserContext();
  console.log(user);
  console.log("callApi");
  const { data, isSuccess, isLoading, isError } = approveService.getExample();
  console.log(data);
  const getData = async () => {
    try {
      const data = await AxiosInstance.get("/");
      return data;
    } catch (error) {
      console.log(error);
    }
  };
  getData();
  return (
    <>
      <h1>Home Page</h1>
      <Stack>
        <a href={RoutePaths.CART}>cart</a>
        <a href={RoutePaths.LOGIN}>login</a>
        <a href={RoutePaths.PROFILE}>profile</a>
        <a href={RoutePaths.PRODUCT_DETAILS}>product details</a>
      </Stack>
    </>
  );
};

export default Home;
