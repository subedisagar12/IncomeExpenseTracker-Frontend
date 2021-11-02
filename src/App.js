import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import Login from "./Pages/Login";
import Navbar from "./Components/Navbar";
import Register from "./Pages/Register";
import { LoginContext } from "./Context/LoginContext";

function App() {
  const [isLoggedIn, setIsLoggedIn, loggedUser, setLoggedUser] =
    useContext(LoginContext);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const Logout = () => {
    setIsLoggedIn(false);
    setLoggedUser(null);
  };

  // console.log(loggedUser.data);
  return (
    <>
      <Navbar
        Logout={Logout}
        isLoggedIn={isLoggedIn}
        loggedInUser={loggedUser ? loggedUser : null}
        open={open}
        handleOpen={handleOpen}
        handleClose={handleClose}
      />
      <Router>
        <Switch>
          <Route path="/" exact>
            <Login />
          </Route>

          <Route path="/register" exact>
            <Register />
          </Route>

          {isLoggedIn ? (
            <Route path="/dashboard">
              <Dashboard open={open} />
            </Route>
          ) : (
            <Redirect to="/" />
          )}
        </Switch>
      </Router>
    </>
  );
}

export default App;
