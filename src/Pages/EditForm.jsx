import React, { useContext, useState, useEffect } from "react";
import {
  Grid,
  TextField,
  FormControl,
  Paper,
  FormControlLabel,
  Checkbox,
  Button,
} from "@material-ui/core";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns"; // import
import makeStyles from "@material-ui/styles/makeStyles";
import axios from "axios";
import { Alert } from "@material-ui/lab";
import { useHistory, Link } from "react-router-dom";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import AddIcon from "@material-ui/icons/Add";
import { LoginContext } from "../Context/LoginContext";
import moment from "moment";
const useStyles = makeStyles((theme) => ({
  input: {
    width: "100%",
  },

  form: {
    width: "100%",
  },

  //   formContainer: {
  //     padding: "1rem 2rem	",
  //   },

  header: {
    // width: "100%",
    // height: "2.5rem",
    // display: "flex",
    // justifyContent: "center",
    // alignItems: "center",
    // // backgroundColor: theme.palette.primary.main,
    // color: "white",
    // marginBottom: "1.5rem",
  },
}));

const EditForm = ({ dataToBeEdited, closeEditModal }) => {
  const [isLoggedIn, setIsLoggedIn, loggedUser, setLoggedUser] =
    useContext(LoginContext);
  const [response, setResponse] = useState(null);
  const classes = useStyles();
  const [selectedDate, handleDateChange] = useState(new Date());
  const [editMode, setEditMode] = useState(false);
  const initialState = {
    category: "",
    amount: "",
    date: new Date(),
    note: "",
  };

  const [formValues, setFormValues] = useState(initialState);
  const changeFormValue = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    axios({
      method: "get",
      url: `/api/transaction/${dataToBeEdited.id}`,
      headers: {
        "auth-token": loggedUser ? loggedUser.other.token : null,
      },
    }).then((res) => {
      //   console.log(res.data.data);
      handleDateChange(res.data.data.date);
      setFormValues({
        category: res.data.data.category,
        amount: res.data.data.amount,

        note: res.data.data.note,
      });
    });
  }, [dataToBeEdited]);

  const editData = () => {
    axios({
      method: "put",
      url: `/api/transaction/${dataToBeEdited.id}`,
      headers: {
        "auth-token": loggedUser ? loggedUser.other.token : null,
      },
      data: {
        category: formValues.category,
        amount: formValues.amount,
        date: selectedDate,
        note: formValues.note,
        userId: loggedUser ? loggedUser.data.id : null,
        type: dataToBeEdited.type,
      },
    })
      .then((res) => {
        console.log(res.data.data);
        if (res.data.status === "success") {
          closeEditModal();
        }
        setResponse(res.data);
      })
      .catch((e) => console.log(e.message));
  };

  const deleteTransaction = () => {
    let confirm = window.confirm("Do you want to delete this transaction?");
    if (confirm) {
      axios({
        method: "delete",
        url: `/api/transaction/${dataToBeEdited.id}`,
        headers: {
          "auth-token": loggedUser ? loggedUser.other.token : null,
        },
      })
        .then((res) => {
          if (res.data.status === "success") {
            closeEditModal();
          }
          setResponse(res.data);
        })
        .catch((e) => console.log(e.message));
    }
  };

  return (
    <div className="form">
      {/* <Paper elevation={3} className={classes.paper}> */}
      <div className={classes.header}>
        {/* <h6 className={classes.heading}>Add New Product</h6> */}
      </div>
      <Grid container spacing={3} className={classes.formContainer}>
        {response ? (
          response.status === "error" ? (
            <Grid item sm={12}>
              <Alert severity="error">{response.message} </Alert>
            </Grid>
          ) : null
        ) : null}

        {response ? (
          response.status === "success" ? (
            <Grid item sm={12}>
              <Alert severity="success">{response.message} </Alert>
            </Grid>
          ) : null
        ) : null}

        {dataToBeEdited.type === "Income" ? (
          <Grid item sm={12}>
            <FormControl
              variant="outlined"
              className={classes.input}
              size="small"
            >
              <Select
                native
                value={formValues.category}
                onChange={changeFormValue}
                // label="Parent"
                name="category"
                placeholder="Category"
                disabled={!editMode}
              >
                <option value="Salary">Salary</option>
                <option value="Interest">Interest</option>

                <option value="Other Income">Other Income</option>

                <option value="Incoming Transfers">Incoming Transfers</option>
              </Select>
            </FormControl>
          </Grid>
        ) : (
          <Grid item sm={12}>
            <FormControl
              variant="outlined"
              className={classes.input}
              size="small"
            >
              {/* <InputLabel htmlFor="parent">Category</InputLabel> */}
              <Select
                native
                value={formValues.category}
                onChange={changeFormValue}
                // label="Parent"
                name="category"
                placeholder="Category"
                disabled={!editMode}
              >
                <option value="Food & Beverages">Food & Beverages</option>
                <option value="Transportation">Transportation</option>

                <option value="Rentals">Rentals</option>

                <option value="Water Bill">Water Bill</option>

                <option value="Electricity Bill">Electricity Bill</option>
                <option value="Fuel Expenses">Fuel Expenses</option>
                <option value="Grocery">Grocery</option>
                <option value="Internet & Communication">
                  Internet & Communication
                </option>
                <option value="Maintenance">Maintenance</option>
                <option value="Education">Education</option>
                <option value="Miscellaneous">Miscellaneous</option>
              </Select>
            </FormControl>
          </Grid>
        )}

        <Grid item sm={12}>
          <FormControl className={classes.input}>
            <React.Fragment>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DatePicker
                  disableFuture
                  openTo="year"
                  format="dd/MM/yyyy"
                  label="Date"
                  views={["year", "month", "date"]}
                  value={selectedDate}
                  onChange={handleDateChange}
                  disabled={!editMode}
                />
              </MuiPickersUtilsProvider>
            </React.Fragment>
          </FormControl>
        </Grid>

        <Grid item md={12}>
          <FormControl className={classes.input}>
            <TextField
              type="Number"
              variant="outlined"
              value={formValues.amount}
              name="amount"
              onChange={(e) => changeFormValue(e)}
              placeholder="Amount"
              size="small"
              disabled={!editMode}
            />
          </FormControl>
        </Grid>

        <Grid item md={12}>
          <FormControl className={classes.input}>
            <TextField
              variant="outlined"
              value={formValues.note}
              name="note"
              onChange={(e) => changeFormValue(e)}
              //   label="Rate"
              size="small"
              placeholder="Note"
              disabled={!editMode}
            />
          </FormControl>
        </Grid>

        <Grid item md={2}>
          {!editMode ? (
            <Button
              className="mr-2 mt-3"
              variant="outlined"
              color="primary"
              onClick={() => setEditMode(!editMode)}
            >
              Edit
            </Button>
          ) : (
            <Button
              className="mr-3 mt-3"
              variant="outlined"
              color="primary"
              onClick={editData}
            >
              Save
            </Button>
          )}
        </Grid>
        <Grid item md={2}>
          <Button
            className="mt-3"
            variant="contained"
            color="primary"
            onClick={deleteTransaction}
          >
            Delete
          </Button>
        </Grid>
      </Grid>
      {/* </Paper> */}
    </div>
  );
};

export default EditForm;
