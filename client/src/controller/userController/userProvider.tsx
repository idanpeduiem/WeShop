import { useMemo, useState } from "react";
import { UserContext, IUserContext } from "./userContext";
import { UserCredential } from "@firebase/auth-types";

export const UserProvider: React.FC<any> = ({ children }) => {
  const [user, setUser] = useState<UserCredential | undefined>(undefined);
  const memoValue: IUserContext = useMemo(
    () => ({
      user,
      setUser,
    }),
    [user, setUser]
  );
  return (
    <UserContext.Provider value={memoValue}>{children}</UserContext.Provider>
  );
};
