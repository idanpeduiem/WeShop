import { getAuth } from "firebase/auth";
import { Navigate, Route, useLocation } from "react-router-dom";
const PrivateRoute = ({ children }: { children: JSX.Element }): any => {
  const auth = getAuth();
  const user = auth.currentUser;
  let location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} />;
  }
  return children;
};
export default PrivateRoute;
