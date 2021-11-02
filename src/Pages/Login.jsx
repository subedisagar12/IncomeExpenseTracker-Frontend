import React, { useState, useEffect } from "react";
import {
  TextField,
  FormControl,
  Grid,
  Button,
  CircularProgress,
} from "@material-ui/core";
import makeStyles from "@material-ui/styles/makeStyles";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { Alert, AlertTitle } from "@material-ui/lab";
import { Link } from "react-router-dom";
import { LoginContext } from "../Context/LoginContext";
import { useContext } from "react";
const useStyles = makeStyles((theme) => ({
  root: {
    // height: "100vh",

    display: "flex",
    justifyContent: "center",
    marginTop: "6rem",
    // alignItems: "center",
  },

  form: {
    width: "30rem",
  },
  input: {
    width: "100%",
    marginTop: "2rem",
  },

  btn: {
    marginTop: "1rem",
  },

  progress: {
    marginTop: "1rem",
  },

  alert: {
    position: "relative",
  },

  close: {
    position: "absolute",
    right: "10px",
    top: "10px",
    "&:hover": {
      cursor: "pointer",
    },
  },
}));
const Login = () => {
  const styles = useStyles();
  let history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn, loggedUser, setLoggedUser] =
    useContext(LoginContext);
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [response, setResponse] = useState(null);
  const changeCredentials = (e) => {
    setResponse(null);
    setCredentials({ ...credentials, [e.target.id]: e.target.value });
  };

  const LoginUser = () => {
    setIsLoading(true);
    axios({
      method: "post",
      url: "/login",
      data: credentials,
    }).then((res) => {
      setResponse(res.data);
      setLoggedUser(res.data);
      setIsLoading(false);
    });
  };

  useEffect(() => {
    const redirect = async () => {};
    redirect();
  }, []);

  useEffect(() => {
    const redirect = async () => {
      if (loggedUser) {
        if (loggedUser.status === "success") {
          await setIsLoggedIn(true);
          history.push("/dashboard");
        }
      }
    };
    redirect();
  }, [loggedUser]);

  //   const clearError = () => {
  //     setLoggedUser(null);
  //   };

  return (
    <>
      <div className={styles.root}>
        <form className={styles.form}>
          <div>
            <Grid container>
              {response ? (
                response.status === "error" ? (
                  <Grid item sm={12}>
                    <FormControl className={styles.input}>
                      <Alert severity="error" className={styles.alert}>
                        <span className={styles.close}></span>
                        {response.message}
                      </Alert>
                    </FormControl>
                  </Grid>
                ) : null
              ) : null}
              <Grid item sm={12}>
                <FormControl className={styles.input}>
                  <TextField
                    required
                    variant="outlined"
                    size="small"
                    value={credentials.username}
                    id="email"
                    placeholder="Email"
                    onChange={(e) => changeCredentials(e)}
                  />
                </FormControl>
              </Grid>

              <Grid item sm={12}>
                <FormControl className={styles.input}>
                  <TextField
                    id="password"
                    placeholder="Password"
                    required
                    type="password"
                    variant="outlined"
                    size="small"
                    value={credentials.password}
                    onChange={(e) => changeCredentials(e)}
                  />
                </FormControl>
              </Grid>
              <Grid item sm={12}>
                {isLoading ? (
                  <CircularProgress className={styles.progress} />
                ) : (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={LoginUser}
                    className={styles.btn}
                    disabled={isLoading ? true : false}
                  >
                    Login
                  </Button>
                )}
              </Grid>
              <Grid item sm={12}>
                <h6 className="text-center">
                  I don't have an account. <Link to="/register">Register</Link>
                </h6>
              </Grid>
            </Grid>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
