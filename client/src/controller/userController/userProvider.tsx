import { getAuth, onAuthStateChanged } from "firebase/auth";
import { PropsWithChildren, useEffect, useMemo, useState } from "react";
import { UserContext, IUserContext } from "./userContext";

export const UserProvider = ({ children }: PropsWithChildren<{}>) => {
  const [user, setUser] = useState<IUserContext["user"] | undefined>();
  const auth = getAuth();
  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      console.log("onAuthStateChanged");
      if (user) {
        setUser(user);
        console.log(user);
      } else {
        console.log("User not logged in");
        setUser(undefined);
      }
    });
  }, []);
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
