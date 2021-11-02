import React, { useEffect, useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import moment from "moment";
import axios from "axios";
import Modal from "@material-ui/core/Modal";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { Grid, Paper, Button } from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns"; // import
import { LoginContext } from "../Context/LoginContext";
import EditForm from "../Pages/EditForm";
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    // maxWidth: "36ch",
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: "inline",
  },

  dialogPaper: {
    width: "50rem",
    height: "40rem",
  },
  paper: {
    padding: "2rem 3rem",
  },
  input: {
    width: "100%",
  },
  listItem: {
    "&:hover": {
      cursor: "pointer",
      background: "#f3f3f3",
    },
  },
  modal1Paper: {
    width: "50rem",
  },
}));

export default function ItemsList({ addOpen }) {
  const classes = useStyles();
  const [transactions, setTransactions] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectedDateFilter, setSelectedDateFilter] = useState("Today");
  const [open, setOpen] = React.useState(false);
  const [editOpen, setEditOpen] = React.useState(false);

  //   const [modalStyle] = React.useState(getModalStyle);
  const [selectedStartDate, handleStartDateChange] = useState(new Date());
  const [selectedEndDate, handleEndDateChange] = useState(new Date());
  const [isLoggedIn, setIsLoggedIn, loggedUser, setLoggedUser] =
    useContext(LoginContext);

  const [dataToBeEdited, setDataToBeEdited] = useState({
    id: null,
    type: null,
  });
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEditOpen = (id, type) => {
    setDataToBeEdited({
      id: id,
      type: type,
    });
    setEditOpen(true);
  };

  const handleEditClose = () => {
    setEditOpen(false);
  };

  useEffect(() => {
    setStartDate(selectedStartDate);
    setEndDate(selectedEndDate);
  }, [selectedStartDate, selectedEndDate]);

  const getDateFilter = async () => {
    const date = new Date();

    switch (selectedDateFilter) {
      case "All":
        setStartDate(null);
        setEndDate(null);
        break;

      case "Today":
        setStartDate(
          moment
            .parseZone(
              Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
            )
            .utc()
            .format()
        );
        setEndDate(
          moment
            .parseZone(
              Date.UTC(date.getFullYear(), date.getMonth() + 1, date.getDate())
            )
            .utc()
            .format()
        );
        break;

      case "Yesterday":
        setStartDate(
          moment
            .parseZone(
              Date.UTC(date.getFullYear(), date.getMonth(), date.getDate() - 1)
            )
            .utc()
            .format()
        );
        setEndDate(
          moment
            .parseZone(
              Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
            )
            .utc()
            .format()
        );
        break;

      case "This Week":
        var firstday = new Date(
          date.setDate(date.getDate() - date.getDay() + 1)
        ).toUTCString();
        var lastday = new Date(
          date.setDate(date.getDate() - date.getDay() + 7)
        ).toUTCString();

        setStartDate(moment.parseZone(firstday).utc().format());
        setEndDate(moment.parseZone(lastday).utc().format());
        break;

      case "Last Week":
        var firstday = new Date(
          date.setDate(date.getDate() - date.getDay() - 6)
        ).toUTCString();
        var lastday = new Date(
          date.setDate(date.getDate() - date.getDay() + 7)
        ).toUTCString();

        setStartDate(moment.parseZone(firstday).utc().format());
        setEndDate(moment.parseZone(lastday).utc().format());
        break;

      case "This Month":
        setStartDate(
          moment
            .parseZone(Date.UTC(date.getFullYear(), date.getMonth(), 1))
            .utc()
            .format()
        );
        setEndDate(
          moment
            .parseZone(Date.UTC(date.getFullYear(), date.getMonth(), 31))
            .utc()
            .format()
        );
        break;

      case "Last Month":
        setStartDate(
          moment
            .parseZone(Date.UTC(date.getFullYear(), date.getMonth() - 1, 1))
            .utc()
            .format()
        );
        setEndDate(
          moment
            .parseZone(Date.UTC(date.getFullYear(), date.getMonth() - 1, 31))
            .utc()
            .format()
        );
        break;

      case "This Year":
        setStartDate(
          moment.parseZone(Date.UTC(date.getFullYear(), 0, 1)).utc().format()
        );
        setEndDate(
          moment.parseZone(Date.UTC(date.getFullYear(), 11, 31)).utc().format()
        );
        break;

      case "Last Year":
        setStartDate(
          moment
            .parseZone(Date.UTC(date.getFullYear() - 1, 0, 1))
            .utc()
            .format()
        );
        setEndDate(
          moment
            .parseZone(Date.UTC(date.getFullYear() - 1, 11, 31))
            .utc()
            .format()
        );
        break;
      default:
        setStartDate(null);
        setEndDate(null);
        break;
    }
  };

  useEffect(() => {
    getDateFilter();
  }, [selectedDateFilter]);
  // console.log(loggedUser.other.token);

  // To get total income and expense of user in given time
  const getTotalValue = () => {
    let data = {
      income: 0,
      expense: 0,
    };
    for (let i = 0; i < transactions.length; i++) {
      if (transactions[i].type === "Income") {
        data.income += transactions[i].amount;
      } else {
        data.expense += transactions[i].amount;
      }
    }

    return data;
  };

  useEffect(() => {
    axios({
      method: "get",
      url: `/api/transaction/${startDate}.${endDate}`,
      headers: {
        "auth-token": loggedUser ? loggedUser.other.token : null,
      },
    })
      .then((res) => {
        // console.log(res.data.data);
        setTransactions(res.data.data);
      })
      .catch((e) => console.log(e.message));
  }, [startDate, endDate, editOpen, addOpen]);

  return (
    <>
      <Grid container spacing={2} className="mb-5">
        <Grid item md={5}>
          <h5>
            Total Income:{" "}
            <span style={{ color: "green" }}>
              {loggedUser ? loggedUser.data.preferredCurrency : null}
              {getTotalValue().income}
            </span>
          </h5>
        </Grid>

        <Grid item md={2}>
          <FormControl className={classes.input}>
            <Select
              native
              value={selectedDateFilter}
              onChange={(e) => setSelectedDateFilter(e.target.value)}
            >
              <option value="All">All</option>
              <option value="Today">Today</option>
              <option value="Yesterday">Yesterday</option>
              <option value="This Week">This Week</option>
              <option value="Last Week">Last Week</option>
              <option value="This Month">This Month</option>
              <option value="Last Month">Last Month</option>
              <option value="This Year">This Year</option>
              <option value="Last Year">Last Year</option>
              <option value="Custom" onClick={handleOpen}>
                Custom
              </option>
            </Select>
          </FormControl>
        </Grid>

        <Grid item md={5}>
          <h5 className="text-end">
            Total Expense:{" "}
            <span style={{ color: "red" }}>
              {loggedUser ? loggedUser.data.preferredCurrency : null}
              {getTotalValue().expense}
            </span>
          </h5>
        </Grid>
      </Grid>

      {/* Listing section */}
      <List className={classes.root}>
        {transactions ? (
          transactions.map((item, id) =>
            item.type === "Income" ? (
              <>
                <ListItem
                  alignItems="flex-start"
                  className={classes.listItem}
                  onClick={() => handleEditOpen(item.id, item.type)}
                >
                  <ListItemText
                    primary={item.category}
                    style={{ color: "green" }}
                    secondary={
                      <React.Fragment>
                        <Typography
                          component="span"
                          variant="body2"
                          className={classes.inline}
                          color="textPrimary"
                        >
                          {moment(item.date).format("DD-MMM-YYYY")}
                        </Typography>
                        <br />
                        {item.note}
                      </React.Fragment>
                    }
                  />
                  <div className={classes.amount}>
                    <span style={{ color: "green" }}>
                      +{loggedUser ? loggedUser.data.preferredCurrency : null}
                      {item.amount}
                    </span>
                  </div>
                </ListItem>
                <Divider component="li" />
              </>
            ) : (
              <>
                <ListItem
                  alignItems="flex-start"
                  className={classes.listItem}
                  onClick={() => handleEditOpen(item.id, item.type)}
                >
                  <ListItemText
                    primary={item.category}
                    style={{ color: "red" }}
                    secondary={
                      <React.Fragment>
                        <Typography
                          component="span"
                          variant="body2"
                          className={classes.inline}
                          color="textPrimary"
                        >
                          {moment(item.date).format("DD-MMM-YYYY")}
                        </Typography>
                        <br />
                        {item.note}
                      </React.Fragment>
                    }
                  />
                  <div className={classes.amount}>
                    <span style={{ color: "red" }}>
                      -{loggedUser ? loggedUser.data.preferredCurrency : null}
                      {item.amount}
                    </span>
                  </div>
                </ListItem>
                <Divider component="li" />
              </>
            )
          )
        ) : (
          <h5>No Transactions has been added</h5>
        )}
      </List>

      <Modal
        open={open}
        classes={{
          root: classes.dialogPaper,
        }}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div className={classes.modalPaper}>
          <Paper elevation={3} className={classes.paper}>
            <Grid container spacing={3} className={classes.formContainer}>
              <Grid item sm={12}>
                <FormControl className={classes.input}>
                  <React.Fragment>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <DatePicker
                        disableFuture
                        openTo="year"
                        format="dd/MM/yyyy"
                        label="Start Date"
                        views={["year", "month", "date"]}
                        value={selectedStartDate}
                        onChange={handleStartDateChange}
                      />
                    </MuiPickersUtilsProvider>
                  </React.Fragment>
                </FormControl>
              </Grid>

              <Grid item sm={12}>
                <FormControl className={classes.input}>
                  <React.Fragment>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <DatePicker
                        disableFuture
                        openTo="year"
                        format="dd/MM/yyyy"
                        label="End Date"
                        views={["year", "month", "date"]}
                        value={selectedEndDate}
                        onChange={handleEndDateChange}
                      />
                    </MuiPickersUtilsProvider>
                  </React.Fragment>
                </FormControl>
              </Grid>

              <Grid item md={12}>
                <Button
                  className="mr-3 mt-3"
                  variant="outlined"
                  color="primary"
                  onClick={handleClose}
                >
                  Filter
                </Button>
              </Grid>
            </Grid>
          </Paper>
          {/* <FormTab handleClose={handleClose} /> */}
        </div>
      </Modal>

      {/* Edit Modal */}
      <Modal
        open={editOpen}
        classes={{
          root: classes.dialogPaper,
        }}
        onClose={handleEditClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div className={classes.modal1Paper}>
          <Paper elevation={3} className={classes.paper}>
            <EditForm
              dataToBeEdited={dataToBeEdited}
              closeEditModal={handleEditClose}
            />
          </Paper>
        </div>
      </Modal>
    </>
  );
}
