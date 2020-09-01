import React from "react";
import MobileStepper from "@material-ui/core/MobileStepper";
import {
  ButtonGroup,
  IconButton,
  Grid,
  useMediaQuery,
} from "@material-ui/core";
import KeyboardArrowLeftIcon from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import { makeStyles } from "@material-ui/core/styles";
import { useTheme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 700,
    [theme.breakpoints.down("sm")]: {
      width: 400,
    },
    flexGrow: 1,
  },
  progress: {
    backgroundColor: theme.palette.common.lightGreenDisabled,
  },
  buttonGroup: {
    backgroundColor: theme.palette.common.lightGrey,
    height: 30,
  },
}));

export default function StepChangeButtons({ next, prev, currentStep, endAt }) {
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Grid container direction={matches ? "column" : "row"} alignItems="center">
      <Grid item>
        <MobileStepper
          variant="progress"
          steps={endAt}
          position="static"
          activeStep={currentStep - 1}
          classes={{
            root: classes.root,
          }}
          nextButton={
            <ButtonGroup className={classes.buttonGroup} color="inherit">
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
                disabled={currentStep == endAt ? true : false}
              >
                <KeyboardArrowRightIcon fontSize="inherit" />
              </IconButton>
            </ButtonGroup>
          }
        />
      </Grid>
      <Grid item></Grid>
    </Grid>
  );
}
