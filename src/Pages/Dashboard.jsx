import React from "react";
import Sidebar from "../Components/Sidebar";
import Transaction from "./Transaction";
import { Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import Navbar from "../Components/Navbar";
import { Switch, Route } from "react-router-dom";
import PieChart from "../Components/PieChart";
const styles = makeStyles(() => ({
  paper: {
    padding: "2rem 3rem",
    margin: "2rem 2.5rem 2rem 1.5rem",
  },
}));

const Dashboard = ({ open }) => {
  const classes = styles();
  return (
    <>
      {/* <Navbar /> */}
      <div className="row g-0">
        <div className="col-md-1">
          <Sidebar />
        </div>

        <div className="col-md-11">
          <Paper elevation={3} className={classes.paper}>
            <Switch>
              <Route path="/dashboard" exact>
                {/* <PieChart /> */}
              </Route>
              <Route path="/dashboard/transactions" exact>
                <Transaction addOpen={open} />
              </Route>
            </Switch>
          </Paper>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
