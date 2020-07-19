import React, { useState } from "react";
import { Grid, Typography, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import CheckIcon from "@material-ui/icons/Check";
import DateFnsUtils from "@date-io/date-fns";
import dateFormat from "dateformat";
import { CSSTransition } from "react-transition-group";

import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { Redirect } from "react-router-dom";

export default function DateTimeInput({
  currentStep,
  setDate,
  setTime,
  setStep,
  date,
  time,
  url,
  facebookHandle,
  instaHandle,
  locationLine1,
  locationLine2,
  setLocationLine1Error,
  setLocationLine2Error,
  setFacebookInputError,
  setInstagramInputError,
  setURLError,
}) {
  const [redirect, setRedirect] = useState(false);

  const validateSteps = () => {
    var goToNextPage = true;

    if (locationLine1 == "") {
      setLocationLine1Error(true);
      setStep(3);
      goToNextPage = false;
    }

    if (locationLine2 == "") {
      setLocationLine2Error(true);
      setStep(3);
      goToNextPage = false;
    }
    if (facebookHandle == "") {
      setFacebookInputError(true);
      setStep(2);
      goToNextPage = false;
    }

    if (instaHandle == "") {
      setInstagramInputError(true);
      setStep(2);
      goToNextPage = false;
    }

    if (url == "") {
      setURLError(true);
      setStep(1);
      goToNextPage = false;
    }

    return goToNextPage;
  };
  return (
    <React.Fragment>
      <CSSTransition
        key={4}
        in={currentStep == 4}
        timeout={400}
        classNames={"move"}
        unmountOnExit
      >
        <Grid item container direction="column" spacing={4} justify="center">
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid item>
              <Typography variant="h2">
                {" "}
                {currentStep}. Enter the date and time for your event.
              </Typography>
            </Grid>
            <Grid item>
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="dd/MM/yyyy"
                margin="normal"
                id="date-picker-inline"
                label="Date"
                value={date}
                onChange={(date) => {
                  setDate(date);
                }}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
            </Grid>
            <Grid item>
              <KeyboardTimePicker
                margin="normal"
                id="time-picker"
                label="Time"
                value={time}
                onChange={(time) => {
                  setTime(time);
                }}
                KeyboardButtonProps={{
                  "aria-label": "change time",
                }}
              />
            </Grid>
          </MuiPickersUtilsProvider>
          <Grid item>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => {
                if (validateSteps()) setRedirect(true);
              }}
            >
              Generate Poster
            </Button>
          </Grid>
        </Grid>
      </CSSTransition>
      {redirect && (
        <Redirect
          to={{
            pathname: "/create/poster/template/generate",
            state: {
              date: dateFormat(date, "ddd dS mmm"),
              time: dateFormat(time, "h:MM TT"),
              url: url,
              facebookHandle: facebookHandle,
              instaHandle: instaHandle,
              locationLine1: locationLine1,
              locationLine2: locationLine2,
            },
          }}
        />
      )}
    </React.Fragment>
  );
}
