import { User } from "firebase/auth";
import React, { useContext } from "react";
export interface IUserContext {
  user: User | undefined;
  setUser: (user: User | undefined) => void;
}
const defaultValue: IUserContext = {
  user: undefined,
  setUser: () => {},
};

export const UserContext = React.createContext(defaultValue);
export const useUserContext = (): IUserContext => useContext(UserContext);
