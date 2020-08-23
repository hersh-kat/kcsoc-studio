import React from "react";
import { Grid, Typography, Button, Card, CardContent } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import CheckIcon from "@material-ui/icons/Check";
import { CSSTransition } from "react-transition-group";
import { makeStyles } from "@material-ui/styles";
import ChipInput from "material-ui-chip-input";
import { useState } from "react";

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
          <Card className={classes.titleCard}>
            <CardContent>
              <Typography variant="h2">
                {" "}
                {currentStep}. Enter up to three tags for your trailer
                (seperated by comma). {tags}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item>
          <ChipInput
            value={tags}
            onAdd={(chip) => {
              if (tags.length == 3) setMaxTagsError(true);
              else setTags([...tags, chip]);
            }}
            onDelete={(chip, index) => {
              setTags(tags.filter((p, i) => i !== index));
            }}
            InputProps={{
              error: true,
              helperText: "Please fill this in.",
            }}
          />
        </Grid>
        <Grid item>
          <Card className={classes.inputCard}>
            <CardContent>
              <TextField
                autoFocus
                fullWidth
                error={tagsError}
                helperText={tagsError ? "Please fill this in." : ""}
                color="secondary"
                id="tags"
                label="Tags"
                placeholder="Meditation, yoga, happy"
                value={tags}
                InputLabelProps={{
                  shrink: true,
                }}
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
