import React, { useContext } from "react";
import { User } from "firebase/auth";

export interface IUserContext {
  user: User | undefined;
  setUser: (user: User) => void;
}
const defaultValue: IUserContext = {
  user: undefined,
  setUser: () => {},
};

export const UserContext = React.createContext(defaultValue);
export const useUserContext = (): IUserContext => useContext(UserContext);
