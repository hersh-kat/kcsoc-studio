import React, { useState } from "react";
import PosterTemplateStep1 from "./PosterTemplateStep1";
import { ButtonGroup, Button, IconButton, Grid } from "@material-ui/core";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import { makeStyles } from "@material-ui/styles";
import { purple } from "@material-ui/core/colors";
import PosterTemplateSocialMedia from "./PosterTemplateSocialMedia";

const useStyles = makeStyles((theme) => ({
  stepButtons: {
    backgroundColor: "rgb(34,48, 64)",
  },
}));

/*State from all the steps will be stored in here*/
export default function PosterTemplateWizard() {
  const classes = useStyles();
  const [currentStep, setCurrentStep] = useState(1);
  const [url, setURL] = useState("");
  const [instaHandle, setInstaHandle] = useState("");
  const [facebookHandle, setFacebookHandle] = useState("");

  const next = () => {
    setCurrentStep(currentStep + 1);
  };
  const prev = () => {
    setCurrentStep(currentStep - 1);
  };

  return (
    <React.Fragment>
      <p>{currentStep}</p>
      <p>{url}</p>
      <p>{instaHandle}</p>
      <p>{facebookHandle}</p>
      <Grid
        container
        direction="column"
        spacing={4}
        style={{
          paddingTop: "200px",
          paddingBottom: "200px",
          minHeight: "100vh",
        }}
        justify="center"
      >
        <Grid item>
          <PosterTemplateStep1
            currentStep={currentStep}
            setURL={setURL}
            setStep={next}
          />
        </Grid>

        <Grid item>
          <PosterTemplateSocialMedia
            currentStep={currentStep}
            setInstaHandle={setInstaHandle}
            setFacebookHandle={setFacebookHandle}
            setStep={next}
            instaHandle={instaHandle}
            facebookHandle={facebookHandle}
          />
        </Grid>

        <Grid item>
          <ButtonGroup
            aria-label="outlined secondary button group"
            color="inherit"
            className={classes.stepButtons}
          >
            <IconButton
              aria-label="next"
              size="medium"
              onClick={next}
              disabled={currentStep == 4 ? true : false}
            >
              <KeyboardArrowUpIcon fontSize="inherit" />
            </IconButton>
            <IconButton
              aria-label="prev"
              size="medium"
              fontSize="inherit"
              onClick={prev}
              disabled={currentStep == 1 ? true : false}
            >
              <KeyboardArrowDownIcon />
            </IconButton>
          </ButtonGroup>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
