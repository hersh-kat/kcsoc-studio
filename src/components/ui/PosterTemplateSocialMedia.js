import React from "react";
import { Grid, Typography, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import TextField from "@material-ui/core/TextField";
import CheckIcon from "@material-ui/icons/Check";

export default function PosterTemplateSocialMedia({
  currentStep,
  setFacebookHandle,
  setInstaHandle,
  setStep,
  facebookHandle,
  instaHandle,
}) {
  if (currentStep != 2) return null;

  return (
    <Grid container direction="column" spacing={4} justify="center">
      <Grid item>
        <Typography variant="h2">
          {" "}
          2. Enter your KCSOC's social media tags
        </Typography>
      </Grid>
      <Grid item>
        <TextField
          color="secondary"
          id="facebook-handle"
          label="Facebook Handle"
          placeholder="@kcsocnational"
          value={facebookHandle}
          onChange={(event) => {
            setFacebookHandle(event.target.value);
          }}
          onKeyDown={(event) => {
            if (event.keyCode == 13) setStep(currentStep + 1);
          }}
        />
      </Grid>
      <Grid item>
        <TextField
          color="secondary"
          id="instagram-handle"
          label="Instagram Handle"
          placeholder="@kcsocnational"
          value={instaHandle}
          onChange={(event) => {
            setInstaHandle(event.target.value);
          }}
          onKeyDown={(event) => {
            if (event.keyCode == 13) setStep(currentStep + 1);
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
  );
}
