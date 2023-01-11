import React, { useContext } from "react";
import { UserCredential } from "@firebase/auth-types";
export interface IUserContext {
  user: UserCredential | undefined;
  setUser: (user: UserCredential) => void;
}
const defaultValue: IUserContext = {
  user: undefined,
  setUser: () => {},
};
export const UserContext = React.createContext(defaultValue);
export const useUserContext = (): IUserContext => useContext(UserContext);
