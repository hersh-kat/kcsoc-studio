import React from "react";
import { Button, Grid, Typography, useMediaQuery } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ImageOutlinedIcon from "@material-ui/icons/ImageOutlined";
import MovieCreationOutlinedIcon from "@material-ui/icons/MovieCreationOutlined";
import { useTheme } from "@material-ui/styles";
import { Link } from "react-router-dom";

const useStyles = makeStyles(() => ({
  pinkButton: {
    color: "black",
    borderColor: "black",
    borderStyle: "dashed",
    padding: "40px",
    borderWidth: "3px",
  },

  blueButton: {
    color: "black",
    borderColor: "black",
    borderStyle: "dashed",
    padding: "40px",
    borderWidth: "3px",
    width: 260,
    height: 173,
  },
}));

export default function ChooseCreation() {
  const styles = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Grid
      container
      direction="column"
      style={{
        minHeight: "90vh",
        position: "absolute",
      }}
      spacing={5}
      justify="center"
    >
      <Grid
        container
        item
        direction={matches ? "column" : "row"}
        justify="space-evenly"
        alignItems="center"
        spacing={matches ? 5 : 0}
      >
        <Grid item>
          <Link to="/create/poster" style={{ textDecoration: "none" }}>
            <Button className={styles.blueButton} variant="outlined">
              <Grid item container direction="column">
                <Grid item>
                  <ImageOutlinedIcon fontSize="large" />
                </Grid>
                <Grid item>
                  <Typography style={{ fontWeight: 700 }}>
                    Create Poster
                  </Typography>
                </Grid>
              </Grid>
            </Button>
          </Link>
        </Grid>
        <Grid item>
          <Link to="/create/trailer" style={{ textDecoration: "none" }}>
            <Button variant="outlined" className={styles.pinkButton}>
              <Grid item container direction="column">
                <Grid item>
                  <MovieCreationOutlinedIcon fontSize="large" />
                </Grid>
                <Typography style={{ fontWeight: 700 }}>
                  Create Trailer
                </Typography>
                <Typography style={{ fontSize: 12, color: "red" }}>
                  (Beta)
                </Typography>
              </Grid>
            </Button>
          </Link>
        </Grid>
      </Grid>
    </Grid>
  );
}
