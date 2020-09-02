import React, { createContext, useState } from "react";
import { Role } from "../../models/AuthRole";

interface iLogin {
  authRole: Role;
  isLoggedIn: boolean;
  authenticate: (authRole: Role) => void;
  logout: () => void;
}

const startingValue: iLogin = {
  authRole: "unauthorised",
  isLoggedIn: false,
  authenticate: (authRole: Role) => {},
  logout: () => {}
};

export const LoginContext = createContext(startingValue);

export const LoginContextProvider: React.FC = ({ children }) => {
  const authStatus = localStorage["admin"]
    ? "admin"
    : localStorage["reader"]
    ? "reader"
    : "unauthorised";
  const [authRole, setAuthRole] = useState<Role>(authStatus);

  const loginStatus = localStorage["admin"] || localStorage["reader"] || false;
  const [isLoggedIn, setIsLoggedIn] = useState(loginStatus);

  const authenticate = (authRole: Role) => {
    setIsLoggedIn(true);
    setAuthRole(authRole);
  };

  const logout = () => {
    localStorage.removeItem(authRole);
    setIsLoggedIn(false);
    setAuthRole("unauthorised");
  };

  const valuesToPass: iLogin = {
    isLoggedIn,
    authRole,
    authenticate,
    logout
  };

  return (
    <LoginContext.Provider value={{ ...valuesToPass }}>
      {children}
    </LoginContext.Provider>
  );
};
