import React from "react";
import Spinner from "./spinner";

interface FetchingStateProps {
  isLoading: boolean;
  isError?: boolean;
  isSuccess?: boolean;
  children: React.ReactNode;
}
const FetchingState: React.FunctionComponent<FetchingStateProps> = ({
  isLoading,
  isError = false,
  isSuccess = false,
  children,
}) => {
  if (isError) {
    return <h1> error! </h1>;
  }

  if (isLoading) {
    return <Spinner />;
  }

  if (isSuccess) {
    return <>{children}</>;
  }

  return <h1> משהו בעייתי קרה</h1>;
};
export default FetchingState;
