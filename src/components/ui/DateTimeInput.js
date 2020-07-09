import React from "react";
import { Grid, Typography, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import CheckIcon from "@material-ui/icons/Check";
import DateFnsUtils from "@date-io/date-fns";

import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";

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
  if (currentStep != 4) return null;

  const validateSteps = () => {
    if (locationLine1 == "") {
      setLocationLine1Error(true);
      setStep(3);
    }

    if (locationLine2 == "") {
      setLocationLine2Error(true);
      setStep(3);
    }
    if (facebookHandle == "") {
      setFacebookInputError(true);
      setStep(2);
    }

    if (instaHandle == "") {
      setInstagramInputError(true);
      setStep(2);
    }

    if (url == "") {
      setURLError(true);
      setStep(1);
    }
  };
  return (
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
          onClick={() => validateSteps()}
        >
          Generate Poster
        </Button>
      </Grid>
    </Grid>
  );
}
