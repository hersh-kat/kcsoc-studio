import React from "react";
import { Grid, Typography, Button, CardContent } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import CheckIcon from "@material-ui/icons/Check";
import { CSSTransition } from "react-transition-group";
import Card from "@material-ui/core/Card";
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

export default function TitleInput({
  currentStep,
  setTitle,
  setStep,
  setTitleError,
  title,
  titleError,
}) {
  const classes = useStyles();
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
          <Card className={classes.titleCard}>
            <CardContent>
              <Typography variant="h2">
                {" "}
                {currentStep}. Enter the title of your event.
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
                error={titleError}
                helperText={titleError ? "Please fill this in." : ""}
                color="secondary"
                id="title"
                InputLabelProps={{
                  shrink: true,
                }}
                label="Title"
                placeholder="Event Name"
                value={title}
                onChange={(event) => {
                  setTitle(event.target.value);
                  setTitleError(false);
                }}
                onKeyDown={(event) => {
                  if (event.keyCode == 13) {
                    if (title.length == 0) setTitleError(true);
                    if (title.length == 0) setTitleError(true);
                    if (title.length > 0) setStep(currentStep + 1);
                  }
                }}
              />
            </CardContent>
          </Card>
        </Grid>
        <CSSTransition
          timeout={400}
          classNames={"flipX"}
          in={title.length > 0}
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
