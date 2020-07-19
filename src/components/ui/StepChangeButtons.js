import React from "react";
import MobileStepper from "@material-ui/core/MobileStepper";
import { ButtonGroup, IconButton, Grid, Button } from "@material-ui/core";
import KeyboardArrowLeftIcon from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    width: 700,
    flexGrow: 1,
  },
  progress: {
    backgroundColor: "rgba(112, 237, 255, 0.4)",
  },
});

export default function StepChangeButtons({ next, prev, currentStep }) {
  const classes = useStyles();

  return (
    <Grid container direction="row" alignItems="center">
      <Grid item>
        <MobileStepper
          variant="progress"
          steps={4}
          position="static"
          activeStep={currentStep - 1}
          classes={{
            root: classes.root,
            progress: classes.progress,
          }}
        />
      </Grid>
      <Grid item>
        <ButtonGroup
          aria-label="outlined secondary button group"
          color="inherit"
          style={{ backgroundColor: "rgb(34,48, 64)", height: 30 }}
        >
          <IconButton
            aria-label="next"
            size="small"
            onClick={prev}
            disabled={currentStep == 1 ? true : false}
          >
            <KeyboardArrowLeftIcon fontSize="inherit" />
          </IconButton>
          <IconButton
            aria-label="prev"
            size="small"
            onClick={next}
            disabled={currentStep == 4 ? true : false}
          >
            <KeyboardArrowRightIcon fontSize="inherit" />
          </IconButton>
        </ButtonGroup>
      </Grid>
    </Grid>
  );
}
