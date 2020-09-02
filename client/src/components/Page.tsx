import React, { useContext } from "react";
import { Login } from "./Login";
import { LoginContext } from "../contexts/login/Login";

export const Page: React.FC = ({ children }) => {
  const { isLoggedIn } = useContext(LoginContext);
  return <div>{isLoggedIn ? children : <Login />}</div>;
};
