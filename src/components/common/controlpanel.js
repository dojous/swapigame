import React from "react";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import { withRouter } from "react-router-dom";

import SelectResources from "./resourceselect";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    height: 250,
    width: 250
  }
}));
const ControlPanel = props => {
  const {
    resources,
    handleSelect,
    checkTheWinner,
    selectResource,
    history
  } = props;
  const classes = useStyles();

  return (
    <Box display="flex" justifyContent="flex-start" m={1} p={1}>
      <Button
        className={classes.root}
        variant="contained"
        color="secondary"
        onClick={() => history.push("/")}
      >
        Back to main page
      </Button>
      <SelectResources resources={resources} onHandleSelect={handleSelect} />

      <Button
        className={classes.root}
        variant="contained"
        color="primary"
        onClick={checkTheWinner}
        disabled={!selectResource && true}
      >
        Play
      </Button>
    </Box>
  );
};

export default withRouter(ControlPanel);
