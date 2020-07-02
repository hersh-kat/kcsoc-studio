import React from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import CardMedia from "@material-ui/core/CardMedia";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    "&:hover": {
      "& $media": {
        "-webkit-filter": "brightness(20%)",
        filter: "brightness(20%)",
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
  },
}));

export default function PosterCard({ src, title, url, setURL, setStep }) {
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
      <CardContent>
        <Typography
          className={classes.title}
          variant="h2"
          component="p"
          align="center"
        >
          {title}
        </Typography>
      </CardContent>
    </Card>
  );
}
