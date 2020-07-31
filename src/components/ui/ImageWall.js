import React from "react";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    //backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: (640 / 2) * 3,
    height: 420 * 3,
  },

  gridListTile: {
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

  imgFullWidth: {
    top: "50%",
    width: "100%",
    position: "relative",
    transform: "translateY(0%)",
  },

  media: {
    transition: "all 0.2s",
    "-webkit-transition": "all 0.2s",
    cursor: "pointer",
  },
  text: {
    position: "relative",
    bottom: "135px",
    height: "0px",
    opacity: 0,
    cursor: "pointer",
    textAlign: "center",
  },
}));

export default function ImageWall({
  images,
  onScrollHandler,
  setStep,
  setImageURL,
  setImageURLError,
}) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <GridList
        cellHeight={426 / 2}
        className={classes.gridList}
        cols={3}
        onScroll={onScrollHandler}
      >
        {images.map((tile) => (
          <GridListTile
            classes={{
              root: classes.gridListTile,
              imgFullWidth: classes.imgFullWidth,
            }}
            key={tile.id}
            cols={1}
            spacing={1}
            onClick={() => {
              setImageURL(tile.fullHDURL);
              setImageURLError(false);
              setStep();
            }}
          >
            <img
              className={classes.media}
              src={tile.webformatURL}
              alt={tile.tags}
            />
            <Typography className={classes.text}>Use Image</Typography>
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}
