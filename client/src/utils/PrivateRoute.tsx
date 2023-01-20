import Login from "../components/Login";
import { useUserContext } from "../controller/userController/userContext";

const PrivateRoute = (Component: any) => {
  const { user } = useUserContext();

  return user ? <Component /> : <Login />;
};
export default PrivateRoute;
