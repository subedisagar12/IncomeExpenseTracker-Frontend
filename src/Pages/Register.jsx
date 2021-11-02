import React, { useState, useEffect } from "react";
import {
  TextField,
  FormControl,
  Grid,
  Button,
  CircularProgress,
  Select,
} from "@material-ui/core";
import makeStyles from "@material-ui/styles/makeStyles";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { Alert, AlertTitle } from "@material-ui/lab";
import { Link, Redirect } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  root: {
    // height: "100vh",

    display: "flex",
    justifyContent: "center",
    marginTop: "4rem",
    // alignItems: "center",
  },

  form: {
    width: "30rem",
  },
  input: {
    width: "100%",
    // marginTop: "2rem",
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
const Register = () => {
  const styles = useStyles();
  let history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [credentials, setCredentials] = useState({
    firstName: "",
    lastName: "",

    email: "",
    password: "",
    preferredCurrency: "",
  });

  const changeCredentials = (e) => {
    setResponse(null);
    setCredentials({ ...credentials, [e.target.id]: e.target.value });
  };

  console.log(credentials.preferredCurrency);

  const RegisterUser = () => {
    setIsLoading(true);
    axios({
      method: "post",
      url: "/api/user",
      data: credentials,
    }).then((res) => {
      setResponse(res.data);
      setIsLoading(false);
      if (res.data.status === "success") {
        history.push("/");
      }
    });
  };

  useEffect(() => {
    const redirect = async () => {};
    redirect();
  }, []);

  return (
    <>
      <div className={styles.root}>
        <form className={styles.form}>
          <div>
            <Grid container spacing="3">
              {response ? (
                response.status === "error" ? (
                  <Grid item sm={12}>
                    <FormControl className={styles.input}>
                      <Alert severity="error" className={styles.alert}>
                        <span className={styles.close}>&#10008;</span>
                        {response.message}
                      </Alert>
                    </FormControl>
                  </Grid>
                ) : null
              ) : null}
              <Grid item sm={6}>
                <FormControl className={styles.input}>
                  <TextField
                    required
                    variant="outlined"
                    size="small"
                    value={credentials.firstname}
                    id="firstName"
                    placeholder="First Name"
                    onChange={(e) => changeCredentials(e)}
                  />
                </FormControl>
              </Grid>

              <Grid item sm={6}>
                <FormControl className={styles.input}>
                  <TextField
                    required
                    variant="outlined"
                    size="small"
                    value={credentials.lastName}
                    id="lastName"
                    placeholder="Last Name"
                    onChange={(e) => changeCredentials(e)}
                  />
                </FormControl>
              </Grid>

              <Grid item sm={12}>
                <FormControl className={styles.input}>
                  <TextField
                    required
                    variant="outlined"
                    size="small"
                    value={credentials.email}
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
                <FormControl
                  variant="outlined"
                  className={styles.input}
                  size="small"
                >
                  {/* <InputLabel htmlFor="parent">Category</InputLabel> */}
                  <Select
                    id="preferredCurrency"
                    native
                    value={credentials.preferredCurrency}
                    onChange={(e) => changeCredentials(e)}
                    name="preferredCurrency"
                    placeholder="Preferred Currency"
                  >
                    <option value="">Preferred Currency</option>
                    <option value="Rs.">Rs.</option>
                    <option value="$">USD($)</option>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item sm={12}>
                {isLoading ? (
                  <CircularProgress className={styles.progress} />
                ) : (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={RegisterUser}
                    className={styles.btn}
                    disabled={isLoading ? true : false}
                  >
                    Register
                  </Button>
                )}
              </Grid>
              <Grid item sm={12}>
                <h6 className="text-center">
                  I already have an account. <Link to="/">Login</Link>
                </h6>
              </Grid>
            </Grid>
          </div>
        </form>
      </div>
    </>
  );
};

export default Register;
