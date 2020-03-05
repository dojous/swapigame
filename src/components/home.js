/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import Button from "@material-ui/core/Button";

import { makeStyles } from "@material-ui/core/styles";

import { withRouter } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  root: {
    height: 250,
    width: 250
  }
}));

const Home = props => {
  const { history } = props;

  const classes = useStyles();

  return (
    <div className="flex-container">
      <div className="row">
        <div className="flex-item">
          {" "}
          <Button
            className={classes.root}
            variant="contained"
            color="primary"
            onClick={() => history.push("/oneplayer")}
          >
            1 player
          </Button>
        </div>
      </div>
      <div className="row">
        <div className="flex-item">
          <Button
            className={classes.root}
            variant="contained"
            color="primary"
            onClick={() => history.push("/twoplayer")}
          >
            2 players -{" "}
            <p style={{ color: "red", fontWeight: "900" }}>BONUS!</p>
          </Button>{" "}
        </div>
      </div>
    </div>
  );
};

export default withRouter(Home);
