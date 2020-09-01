import React from "react";
import { Grid, Button, Typography, useMediaQuery } from "@material-ui/core";
import CheckIcon from "@material-ui/icons/Check";
import { useTheme } from "@material-ui/styles";

export default function OkayButton({ setStep, currentStep }) {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Grid
      item
      container
      direction="row"
      spacing={2}
      alignItems="center"
      justify={matches ? "center" : ""}
    >
      <Grid item>
        <Button
          variant="contained"
          startIcon={<CheckIcon />}
          color="inherit"
          style={{ backgroundColor: "rgb(237, 237, 237)" }}
          onClick={() => {
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
  );
}
