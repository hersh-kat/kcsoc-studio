import React from "react";
import { Button, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ImageOutlinedIcon from "@material-ui/icons/ImageOutlined";
import MovieCreationOutlinedIcon from "@material-ui/icons/MovieCreationOutlined";
import ScrollableAnchor from "react-scrollable-anchor";

const useStyles = makeStyles((theme) => ({
  pinkButton: {
    color: theme.palette.common.pink,
    borderColor: theme.palette.common.pink,
    borderStyle: "dashed",
    padding: "40px",
    borderWidth: "3px",
  },

  blueButton: {
    color: theme.palette.common.blue,
    borderColor: theme.palette.common.blue,
    borderStyle: "dashed",
    padding: "40px",
    borderWidth: "3px",
  },
}));

export default function ChooseCreation() {
  const styles = useStyles();

  return (
    <ScrollableAnchor id="choose-creation">
      <Grid
        container
        direction="column"
        style={{
          paddingTop: "200px",
          paddingBottom: "200px",
          minHeight: "100vh",
        }}
        spacing={5}
        justify="center"
      >
        <Grid item>
          <Typography variant="h2">Choose your creation:</Typography>
        </Grid>
        <Grid
          container
          item
          direction="row"
          justify="space-evenly"
          alignItems="center"
        >
          <Grid item>
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
          </Grid>
          <Grid item>
            <Button variant="outlined" className={styles.pinkButton}>
              <Grid item container direction="column">
                <Grid item>
                  <MovieCreationOutlinedIcon fontSize="large" />
                </Grid>
                <Typography style={{ fontWeight: 700 }}>
                  Create Trailer
                </Typography>
              </Grid>
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </ScrollableAnchor>
  );
}
