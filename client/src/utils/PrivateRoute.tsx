import { Navigate, Route, useLocation } from "react-router-dom";
import { useUserContext } from "../controller/userController/userContext";
const PrivateRoute = ({ children }: { children: JSX.Element }): any => {
  const { user, isLoading } = useUserContext();
  let location = useLocation();
  return (
    <>
      {!isLoading ? (
        !user ? (
          <Navigate to="/login" state={{ from: location }} />
        ) : (
          { ...children }
        )
      ) : (
        <h1>loading...</h1>
      )}
    </>
  );
};
export default PrivateRoute;
