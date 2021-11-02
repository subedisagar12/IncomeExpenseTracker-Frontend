import React, { useState, useEffect, useContext } from "react";
import { Pie } from "react-chartjs-2";
import moment from "moment";
import axios from "axios";
import { LoginContext } from "../Context/LoginContext";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";

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
const PieChart = ({ handleOpen }) => {
  const classes = useStyles();
  const [selectedStartDate, handleStartDateChange] = useState(new Date());
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectedEndDate, handleEndDateChange] = useState(new Date());

  const [selectedDateFilter, setSelectedDateFilter] = useState("Today");
  useEffect(() => {
    setStartDate(selectedStartDate);
    setEndDate(selectedEndDate);
  }, [selectedStartDate, selectedEndDate]);

  const [transactions, setTransactions] = useState([]);

  const [isLoggedIn, setIsLoggedIn, loggedUser, setLoggedUser] =
    useContext(LoginContext);
  const [open, setOpen] = React.useState(false);

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

  useEffect(() => {
    axios({
      method: "get",
      url: `/api/transaction/chart/${startDate}.${endDate}`,
      headers: {
        "auth-token": loggedUser ? loggedUser.other.token : null,
      },
    })
      .then((res) => {
        console.log(res.data.data);
        setTransactions(res.data.data);
      })
      .catch((e) => console.log(e.message));
  }, [startDate, endDate]);

  const data = {
    labels: ["Red", "Blue", "Yellow"],
    datasets: [
      {
        label: "My First Dataset",
        data: [300, 50, 100],
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
        ],
        hoverOffset: 4,
      },
    ],
  };
  return (
    <>
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
      <Pie data={data} />
    </>
  );
};

export default PieChart;
