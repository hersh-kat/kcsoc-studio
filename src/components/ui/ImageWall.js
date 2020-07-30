import React from "react";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import { makeStyles } from "@material-ui/core";

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
}));

export default function ImageWall({ images, onScrollHandler }) {
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
          <GridListTile key={tile.id} cols={1} spacing={1}>
            <img src={tile.webformatURL} alt={tile.tags} />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}
