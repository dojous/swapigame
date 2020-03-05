import React, { useState } from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import CardMedia from "@material-ui/core/CardMedia";
import CardActionArea from "@material-ui/core/CardActionArea";
import Zoom from "@material-ui/core/Zoom";

import { withRouter } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  root: {
    width: 360,
    height: 380
  },
  media: {
    height: 140
  },

  rootWin: {
    width: 360,
    height: 380,
    color: "red",
    backgroundColor: "orange"
  }
}));

const GameCard = props => {
  const { item, history, selectResource } = props;

  const [hover, setHover] = useState(false);
  const toggleHover = () => {
    setHover(!hover);
  };

  const checkHover = hover => {
    const linkStyle = {
      cursor: "pointer"
    };

    let nextStyle = hover ? { backgroundColor: "#f0ffff" } : {};
    return (nextStyle = { ...linkStyle, ...nextStyle });
  };

  const classes = useStyles();

  return (
    <Card
      className={item.win ? classes.rootWin : classes.root}
      onClick={() => history.push(`/${item.url.match(/\/api\/(.*)/)[1]}`)}
      style={checkHover(hover)}
      onMouseEnter={toggleHover}
      onMouseLeave={toggleHover}
    >
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image="/swapi.png"
          title="SWAPI LOGO"
        />
        <CardContent>
          <Typography variant="h4" color="textSecondary" component="p">
            {item.name || item.title}
          </Typography>

          <Typography gutterBottom variant="h5" component="h2">
            {selectResource}
          </Typography>

          <Typography variant="h4" color="textSecondary" component="p">
            {item.mass ||
              item.crew ||
              item.diameter ||
              item.average_height | item.episode_id ||
              item.passengers}
          </Typography>

          <Zoom in={item.win} style={{ transitionDelay: "100ms" }}>
            <Typography variant="h4" component="h2">
              WINNER
            </Typography>
          </Zoom>
        </CardContent>
      </CardActionArea>
      <CardActions></CardActions>
    </Card>
  );
};

export default withRouter(GameCard);
