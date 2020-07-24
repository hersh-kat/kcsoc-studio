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
  const [date2, setDate2] = useState(date);
  const [time2, setTime2] = useState(time);

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
                autoFocus
                format="dd/MM/yyyy"
                value={date2}
                onChange={(newValue) => {
                  setDate(newValue);
                  setDate2(newValue);
                }}
              />
            </Grid>
            <Grid item>
              <KeyboardTimePicker
                value={time2}
                onChange={(time) => {
                  setTime(time);
                  setTime2(time);
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
