import React from "react";
import { Grid, Typography, Button, Card, CardContent } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import CheckIcon from "@material-ui/icons/Check";
import { CSSTransition } from "react-transition-group";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  titleCard: {
    minWidth: 300,
    maxHeight: 60,
    display: "inline-block",
    backgroundColor: theme.palette.common.pastelBlue,
  },
  inputCard: {
    display: "inline-block",
    backgroundColor: theme.palette.common.pastelPink,
    minWidth: 750,
  },
}));

export default function PosterTemplateLocation({
  currentStep,
  showOnStep,
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
  const classes = useStyles();
  return (
    <CSSTransition
      key={3}
      in={currentStep == showOnStep}
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
          <Card className={classes.titleCard}>
            <CardContent>
              <Typography variant="h2">
                {" "}
                {currentStep}. Enter the location details for your event
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item>
          <Card className={classes.inputCard}>
            <CardContent>
              <TextField
                autoFocus
                fullWidth
                error={locationLine1Error}
                helperText={locationLine1Error ? "Please fill this in." : ""}
                color="secondary"
                id="location-line-1"
                label="Building Name"
                placeholder="KCSOC HQ"
                value={locationLine1}
                InputLabelProps={{
                  shrink: true,
                }}
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
            </CardContent>
          </Card>
        </Grid>
        <Grid item>
          <Card className={classes.inputCard}>
            <CardContent>
              <TextField
                fullWidth
                error={locationLine2Error}
                helperText={locationLine2Error ? "Please fill this in." : ""}
                color="secondary"
                id="location-line-2"
                label="Room Number"
                placeholder="Room 108"
                value={locationLine2}
                InputLabelProps={{
                  shrink: true,
                }}
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
            </CardContent>
          </Card>
        </Grid>
        <CSSTransition
          timeout={400}
          classNames={"flipX"}
          in={locationLine1.length > 0 && locationLine2.length > 0}
          unmountOnExit
        >
          <div>
            {
              <Grid
                item
                container
                direction="row"
                spacing={2}
                alignItems="center"
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
            }
          </div>
        </CSSTransition>
      </Grid>
    </CSSTransition>
  );
}
