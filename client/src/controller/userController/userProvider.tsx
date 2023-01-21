import { onAuthStateChanged } from "firebase/auth";
import { PropsWithChildren, useEffect, useMemo, useState } from "react";
import { firebase } from "../../utils/firebase";
import { UserContext, IUserContext } from "./userContext";

export const UserProvider = ({ children }: PropsWithChildren<{}>) => {
  const [user, setUser] = useState<IUserContext["user"] | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const auth = firebase.getFirebaseAuth();
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
      setIsLoading(false);
    });
  }, []);
  const memoValue: IUserContext = useMemo(
    () => ({
      user,
      setUser,
      isLoading,
      setIsLoading,
    }),
    [user, setUser, isLoading, setIsLoading]
  );
  return (
    <UserContext.Provider value={memoValue}>{children}</UserContext.Provider>
  );
};
