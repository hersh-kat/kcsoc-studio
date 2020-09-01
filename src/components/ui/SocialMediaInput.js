import React from "react";
import {
  Grid,
  Typography,
  Card,
  CardContent,
  useTheme,
  useMediaQuery,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import TextField from "@material-ui/core/TextField";
import { CSSTransition } from "react-transition-group";
import OkayButton from "./OkayButton";

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
    [theme.breakpoints.down("sm")]: {
      minWidth: 400,
    },
    minWidth: 750,
  },
}));

export default function PosterTemplateSocialMedia({
  currentStep,
  showOnStep,
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
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <CSSTransition
      key={showOnStep}
      in={currentStep === showOnStep}
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
        alignItems={matches ? "center" : undefined}
        style={{ position: "absolute" }}
      >
        <Grid item>
          <Card className={classes.titleCard}>
            <CardContent>
              <Typography variant="h2">
                {" "}
                {currentStep}. Enter your KCSOC's social media tags.
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
                error={facebookInputError}
                helperText={facebookInputError ? "Please fill this in." : ""}
                color="secondary"
                id="facebook-handle"
                label="Facebook Handle"
                placeholder="@kcsocnational"
                value={facebookHandle}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(event) => {
                  setFacebookHandle(event.target.value);
                  setFacebookInputError(false);
                }}
                onKeyDown={(event) => {
                  if (event.keyCode === 13) {
                    if (facebookHandle.length === 0)
                      setFacebookInputError(true);
                    if (instaHandle.length === 0) setInstagramInputError(true);
                    if (facebookHandle.length > 0 && instaHandle.length > 0)
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
                error={instagramInputError}
                helperText={instagramInputError ? "Please fill this in." : ""}
                color="secondary"
                id="instagram-handle"
                label="Instagram Handle"
                placeholder="@kcsocnational"
                InputLabelProps={{
                  shrink: true,
                }}
                value={instaHandle}
                onChange={(event) => {
                  setInstaHandle(event.target.value);
                  setInstagramInputError(false);
                }}
                onKeyDown={(event) => {
                  if (event.keyCode === 13) {
                    if (facebookHandle.length === 0)
                      setFacebookInputError(true);
                    if (instaHandle.length === 0) setInstagramInputError(true);
                    if (facebookHandle.length > 0 && instaHandle.length > 0)
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
          in={instaHandle.length > 0 && facebookHandle.length > 0}
          unmountOnExit
        >
          <OkayButton currentStep={currentStep} setStep={setStep} />
        </CSSTransition>
      </Grid>
    </CSSTransition>
  );
}
