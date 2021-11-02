import React, { createContext, useState } from "react";

export const LoginContext = createContext();

export const LoginProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedUser, setLoggedUser] = useState(null);

  return (
    <LoginContext.Provider
      value={[isLoggedIn, setIsLoggedIn, loggedUser, setLoggedUser]}
    >
      {props.children}
    </LoginContext.Provider>
  );
};
