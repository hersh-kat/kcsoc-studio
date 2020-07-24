import React from "react";
import {
  Grid,
  Typography,
  Button,
  makeStyles,
  useMediaQuery,
} from "@material-ui/core";
import { useTheme } from "@material-ui/styles";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  buttons: {},
}));

export default function PosterStep1() {
  const styles = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Grid
      container
      direction="column"
      style={{
        paddingTop: "200px",
        paddingBottom: "200px",
        minHeight: "100vh",
        position: "absolute",
      }}
      justify="center"
    >
      <Grid item style={{ marginBottom: "100px" }}>
        <Grid item>
          <Typography variant="h2">1. Choose your setup</Typography>
        </Grid>
      </Grid>
      <Grid
        item
        container
        direction={matches ? "column" : "row"}
        justify="space-evenly"
        alignItems="center"
        spacing={matches ? 5 : 0}
      >
        <Grid item>
          <Link to="/create/poster/template" style={{ textDecoration: "none" }}>
            <Button variant="outlined" color="secondary" size="large">
              {/*USE ONCHANGE/ONCLICK TO UPDATE GLOBAL STATE*/}
              Use Poster Template
            </Button>
          </Link>
        </Grid>

        <Grid item>
          <Link to="/create/poster/custom" style={{ textDecoration: "none" }}>
            <Button variant="outlined" color="secondary" size="large">
              Create Custom Poster
            </Button>
          </Link>
        </Grid>
      </Grid>
    </Grid>
  );
}
