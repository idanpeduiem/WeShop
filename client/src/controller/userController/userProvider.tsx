import { PropsWithChildren, useMemo, useState } from "react";
import { UserContext, IUserContext } from "./userContext";

export const UserProvider = ({ children }: PropsWithChildren<{}>) => {
  const [user, setUser] = useState<IUserContext["user"] | undefined>();

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
