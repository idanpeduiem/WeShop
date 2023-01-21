import { User } from "firebase/auth";
import React, { useContext } from "react";
export interface IUserContext {
  user: User | undefined;
  setUser: (user: User | undefined) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}
const defaultValue: IUserContext = {
  user: undefined,
  setUser: () => {},
  isLoading: true,
  setIsLoading: () => {},
};

export const UserContext = React.createContext(defaultValue);
export const useUserContext = (): IUserContext => useContext(UserContext);
