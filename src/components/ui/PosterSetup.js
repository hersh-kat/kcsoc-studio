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
        minHeight: "90vh",
        position: "absolute",
      }}
      justify="center"
    >
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
            <Button
              variant="contained"
              size="large"
              style={{ backgroundColor: "rgb(226, 242, 251)" }}
            >
              <Typography>Use Poster Template</Typography>
            </Button>
          </Link>
        </Grid>

        <Grid item>
          <Link to="/create/poster/custom" style={{ textDecoration: "none" }}>
            <Button
              variant="contained"
              size="large"
              style={{ backgroundColor: "rgb(226, 242, 251)" }}
            >
              <Typography>Create Custom Poster</Typography>
            </Button>
          </Link>
        </Grid>
      </Grid>
    </Grid>
  );
}
