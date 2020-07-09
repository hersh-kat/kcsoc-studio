import React from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import CardMedia from "@material-ui/core/CardMedia";
import { makeStyles } from "@material-ui/styles";
import { Grid } from "@material-ui/core";
import CreateIcon from "@material-ui/icons/Create";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    "&:hover": {
      "& $media": {
        "-webkit-filter": "brightness(20%)",
        filter: "brightness(20%)",
      },
      "& $text": {
        opacity: 1,
      },
    },
  },
  media: {
    transition: "all 0.2s",
    "-webkit-transition": "all 0.2s",
    cursor: "pointer",
  },
  title: {
    textTransform: "uppercase",
    fontWeight: 700,
    fontSize: "0.8rem",
    letterSpacing: "0.1rem",
    paddingTop: "10px",
  },
  text: {
    position: "relative",
    bottom: "135px",
    height: "0px",
    opacity: 0,
    cursor: "pointer",
  },
}));

export default function PosterCard({
  src,
  title,
  url,
  setURL,
  setStep,
  setURLError,
}) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.media}
        component="img"
        src={src}
        onClick={() => {
          setURL(url);
          setStep();
        }}
      />
      <Grid
        container
        direction="row"
        className={classes.text}
        onClick={() => {
          setURL(url);
          setURLError(false);
          setStep();
        }}
        justify="center"
        spacing={1}
      >
        <Grid item>
          <CreateIcon htmlColor="white" />
        </Grid>
        <Grid item>
          <Typography>Use Template</Typography>
        </Grid>
      </Grid>
      <CardContent>
        <Typography className={classes.title} component="p" align="center">
          {title}
        </Typography>
      </CardContent>
    </Card>
  );
}
