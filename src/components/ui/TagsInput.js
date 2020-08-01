import React from "react";
import { Grid, Typography, Button } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import CheckIcon from "@material-ui/icons/Check";
import { CSSTransition } from "react-transition-group";

export default function TagsInput({
  currentStep,
  setTags,
  setStep,
  setTagsError,
  tags,
  tagsError,
  showOnStep,
}) {
  return (
    <CSSTransition
      key={showOnStep}
      in={showOnStep == currentStep}
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
            {currentStep}. Enter up to three tags for your trailer (seperated by
            comma).
          </Typography>
        </Grid>
        <Grid item>
          <TextField
            autoFocus
            error={tagsError}
            helperText={tagsError ? "Please fill this in." : ""}
            color="secondary"
            id="tags"
            label="Tags"
            placeholder="Meditation, yoga, happy"
            value={tags}
            onChange={(event) => {
              setTags(event.target.value);
              setTagsError(false);
            }}
            onKeyDown={(event) => {
              if (event.keyCode == 13) {
                if (tags.length == 0) setTagsError(true);
              }
            }}
          />
        </Grid>
        <CSSTransition
          timeout={400}
          classNames={"flipX"}
          in={tags.length > 0}
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
