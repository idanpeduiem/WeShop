import { Navigate, useLocation } from "react-router-dom";
import { useUserContext } from "../controller/userController/userContext";
function PrivateRoute({ children }: { children: JSX.Element }) {
  const { user } = useUserContext();

  let location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return children;
}
export default PrivateRoute;
