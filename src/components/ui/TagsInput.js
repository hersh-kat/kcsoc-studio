import React from "react";
import { Grid, Typography, Button, Card, CardContent } from "@material-ui/core";
import CheckIcon from "@material-ui/icons/Check";
import { CSSTransition } from "react-transition-group";
import { makeStyles } from "@material-ui/styles";
import ChipInput from "material-ui-chip-input";
import { useState } from "react";

const useStyles = makeStyles((theme) => ({
  titleCard: {
    minWidth: 300,
    maxHeight: 60,
    [theme.breakpoints.down("md")]: {
      maxHeight: 80,
    },
    display: "inline-block",
    backgroundColor: theme.palette.common.pastelBlue,
  },
  inputCard: {
    display: "inline-block",
    backgroundColor: theme.palette.common.pastelPink,
    [theme.breakpoints.down("sm")]: {
      minWidth: 400,
    },
    minWidth: 750,
  },
  ".WAMuiChipInput-underline-20.after": {
    "border-bottom": "2px solid black",
  },
}));

export default function TagsInput({
  currentStep,
  setTags,
  setStep,
  setTagsError,
  tags,
  tagsError,
  showOnStep,
}) {
  const classes = useStyles();
  const [maxTagsError, setMaxTagsError] = useState(false);

  return (
    <CSSTransition
      key={showOnStep}
      in={showOnStep === currentStep}
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
                {currentStep}. Enter up to three tags for your trailer
                (seperated by commas)
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item>
          <Card className={classes.inputCard}>
            <CardContent>
              <ChipInput
                autoFocus
                fullWidth
                color="secondary"
                placeholder="Meditation, yoga, happy"
                error={maxTagsError || tagsError}
                helperText={
                  maxTagsError
                    ? "You have entered the maximum number of tags."
                    : tagsError
                    ? "Please enter atleast one tag."
                    : ""
                }
                value={tags}
                newChipKeys={[","]}
                newChipKeyCodes={[188]}
                onAdd={(chip) => {
                  if (tags.length === 3) setMaxTagsError(true);
                  else {
                    setTags([...tags, chip]);
                    setMaxTagsError(false);
                    setTagsError(false);
                  }
                }}
                onDelete={(chip, index) => {
                  setTags(tags.filter((p, i) => i !== index));
                }}
                label="Tags"
                InputLabelProps={{
                  shrink: true,
                }}
                onKeyDown={(event) => {
                  if (event.keyCode === 13) {
                    if (tags.length === 0) setTagsError(true);
                    else setStep(currentStep + 1);
                  }
                }}
              />
            </CardContent>
          </Card>
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
                    style={{ backgroundColor: "rgb(237, 237, 237)" }}
                    onClick={() => {
                      setStep(currentStep + 1);
                    }}
                  >
                    Ok
                  </Button>
                </Grid>
                <Grid item>
                  <Typography variant="body1" style={{ fontSize: 16 }}>
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
