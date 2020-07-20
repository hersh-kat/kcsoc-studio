import React, { useState } from "react";
import { Grid, Typography, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import CheckIcon from "@material-ui/icons/Check";
import DateFnsUtils from "@date-io/date-fns";
import { CSSTransition } from "react-transition-group";

import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";

export default function DateTimeInput({
  currentStep,
  setDate,
  setTime,
  date,
  time,
  generatePosterComponent,
}) {
  return (
    <React.Fragment>
      <CSSTransition
        key={4}
        in={currentStep == 4}
        timeout={400}
        classNames={"move"}
        unmountOnExit
      >
        <Grid
          item
          container
          direction="column"
          spacing={4}
          justify="center"
          style={{ position: "absolute" }}
        >
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
          <Grid item>{generatePosterComponent}</Grid>
        </Grid>
      </CSSTransition>
    </React.Fragment>
  );
}
