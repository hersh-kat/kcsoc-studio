import React, { useState } from "react";
import { Grid, Typography, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import TextField from "@material-ui/core/TextField";
import CheckIcon from "@material-ui/icons/Check";
import { CSSTransition } from "react-transition-group";

export default function PosterTemplateSocialMedia({
  currentStep,
  setFacebookHandle,
  setInstaHandle,
  setStep,
  facebookHandle,
  instaHandle,
  setInstagramInputError,
  instagramInputError,
  setFacebookInputError,
  facebookInputError,
}) {
  return (
    <CSSTransition
      key={2}
      in={currentStep == 2}
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
        <Grid item>
          <Typography variant="h2">
            {" "}
            {currentStep}. Enter your KCSOC's social media tags
          </Typography>
        </Grid>
        <Grid item>
          <TextField
            error={facebookInputError}
            helperText={facebookInputError ? "Please fill this in." : ""}
            color="secondary"
            id="facebook-handle"
            label="Facebook Handle"
            placeholder="@kcsocnational"
            value={facebookHandle}
            onChange={(event) => {
              setFacebookHandle(event.target.value);
              setFacebookInputError(false);
            }}
            onKeyDown={(event) => {
              if (event.keyCode == 13) {
                if (facebookHandle.length == 0) setFacebookInputError(true);
                if (instaHandle.length == 0) setInstagramInputError(true);
                if (facebookHandle.length > 0 && instaHandle.length > 0)
                  setStep(currentStep + 1);
              }
            }}
          />
        </Grid>
        <Grid item>
          <TextField
            error={instagramInputError}
            helperText={instagramInputError ? "Please fill this in." : ""}
            color="secondary"
            id="instagram-handle"
            label="Instagram Handle"
            placeholder="@kcsocnational"
            value={instaHandle}
            onChange={(event) => {
              setInstaHandle(event.target.value);
              setInstagramInputError(false);
            }}
            onKeyDown={(event) => {
              if (event.keyCode == 13) {
                if (facebookHandle.length == 0) setFacebookInputError(true);
                if (instaHandle.length == 0) setInstagramInputError(true);
                if (facebookHandle.length > 0 && instaHandle.length > 0)
                  setStep(currentStep + 1);
              }
            }}
          />
        </Grid>
        {instaHandle.length > 0 && facebookHandle.length > 0 && (
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
