import React, { useState } from "react";
import { Grid, Typography, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import TextField from "@material-ui/core/TextField";
import CheckIcon from "@material-ui/icons/Check";
import { CSSTransition } from "react-transition-group";

export default function PosterTemplateLocation({
  currentStep,
  setLocationLine1,
  setLocationLine2,
  setStep,
  locationLine1,
  locationLine2,
  locationLine1Error,
  locationLine2Error,
  setLocationLine1Error,
  setLocationLine2Error,
}) {
  return (
    <CSSTransition
      key={3}
      in={currentStep == 3}
      timeout={400}
      classNames={"move"}
      unmountOnExit
    >
      <Grid item container direction="column" spacing={4} justify="center">
        <Grid item>
          <Typography variant="h2">
            {" "}
            {currentStep}. Enter the location details for your event.
          </Typography>
        </Grid>
        <Grid item>
          <TextField
            error={locationLine1Error}
            helperText={locationLine1Error ? "Please fill this in." : ""}
            color="secondary"
            id="location-line-1"
            label="Building Name"
            placeholder="KCSOC HQ"
            value={locationLine1}
            onChange={(event) => {
              setLocationLine1(event.target.value);
              setLocationLine1Error(false);
            }}
            onKeyDown={(event) => {
              if (event.keyCode == 13) {
                if (locationLine1.length == 0) setLocationLine1Error(true);
                if (locationLine2.length == 0) setLocationLine2Error(true);
                if (locationLine1.length > 0 && locationLine2.length > 0)
                  setStep(currentStep + 1);
              }
            }}
          />
        </Grid>
        <Grid item>
          <TextField
            error={locationLine2Error}
            helperText={locationLine2Error ? "Please fill this in." : ""}
            color="secondary"
            id="location-line-2"
            label="Room Number"
            placeholder="Room 108"
            value={locationLine2}
            onChange={(event) => {
              setLocationLine2(event.target.value);
              setLocationLine2Error(false);
            }}
            onKeyDown={(event) => {
              if (event.keyCode == 13) {
                if (locationLine1.length == 0) setLocationLine1Error(true);
                if (locationLine2.length == 0) setLocationLine2Error(true);
                if (locationLine1.length > 0 && locationLine2.length > 0)
                  setStep(currentStep + 1);
              }
            }}
          />
        </Grid>
        {locationLine1.length > 0 && locationLine2.length > 0 && (
          <Grid item container direction="row" spacing={2} alignItems="center">
            <Grid item>
              <Button
                variant="contained"
                startIcon={<CheckIcon />}
                color="inherit"
                style={{ backgroundColor: "rgb(34,48, 64)" }}
                onClick={(event) => {
                  setStep(currentStep + 1);
                }}
              >
                Ok
              </Button>
            </Grid>
            <Grid item>
              <Typography variant="p">
                Press <b>Enter ↵</b>
              </Typography>
            </Grid>
          </Grid>
        )}
      </Grid>
    </CSSTransition>
  );
}
