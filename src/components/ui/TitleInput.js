import React from "react";
import { Grid, Typography, Button } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import CheckIcon from "@material-ui/icons/Check";
import { CSSTransition } from "react-transition-group";

export default function TitleInput({
  currentStep,
  setTitle,
  setStep,
  setTitleError,
  title,
  titleError,
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
            {currentStep}. Enter the title for your event poster.
          </Typography>
        </Grid>
        <Grid item>
          <TextField
            autoFocus
            error={titleError}
            helperText={titleError ? "Please fill this in." : ""}
            color="secondary"
            id="title"
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
                    style={{ backgroundColor: "rgb(34,48, 64)" }}
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
