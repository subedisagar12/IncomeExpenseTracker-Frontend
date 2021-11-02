import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";

import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import FormTab from "./FormTab";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  bar: {
    padding: "0.8rem 2rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  //   modalPaper: {
  //     width: "1000px",
  //   },
  dialogPaper: {
    width: "50rem",
    height: "40rem",
  },
}));

export default function Navbar({
  Logout,
  isLoggedIn,
  open,
  handleClose,
  handleOpen,
}) {
  const classes = useStyles();

  //   const [modalStyle] = React.useState(getModalStyle);

  return (
    <div className={classes.root}>
      <AppBar position="static">
        {/*<Toolbar variant="dense">*/}
        <div className={classes.bar}>
          <div>
            <Typography variant="p" color="inherit">
              Income Expense Tracker
            </Typography>
          </div>
          {isLoggedIn ? (
            <>
              <div>
                <Typography
                  variant="p"
                  color="inherit"
                  align="right"
                ></Typography>
                <Button
                  variant="contained"
                  color="secondary"
                  className="ml-5"
                  size="small"
                  onClick={handleOpen}
                >
                  Add Transaction
                </Button>
              </div>

              <div>
                <Typography
                  variant="p"
                  color="inherit"
                  align="right"
                ></Typography>
                <Button
                  variant="contained"
                  color="secondary"
                  className="ml-5"
                  size="small"
                  onClick={Logout}
                >
                  Logout
                </Button>
              </div>
            </>
          ) : null}
        </div>
      </AppBar>

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
          <FormTab handleClose={handleClose} />
        </div>
      </Modal>
    </div>
  );
}
