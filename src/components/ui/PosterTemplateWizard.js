import React, { useState } from "react";
import PosterTemplateStep1 from "./PosterTemplateStep1";
import { ButtonGroup, Button, IconButton } from "@material-ui/core";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  stepButtons: {
    backgroundColor: "white",
    color: "white",
    cursor: "progress",
  },
}));

/*State from all the steps will be stored in here*/
export default function PosterTemplateWizard() {
  const classes = useStyles();
  const [currentStep, setCurrentStep] = useState(1);
  const [url, setURL] = useState("");

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
      <PosterTemplateStep1
        currentStep={currentStep}
        setState={setURL}
        setStep={next}
      />
      <ButtonGroup
        aria-label="outlined secondary button group"
        color="inherit"
        classes={{ backgroundColor: "blue", color: "blue" }}
      >
        <IconButton
          aria-label="next"
          size="medium"
          onClick={next}
          disabled={currentStep == 4 ? true : false}
          classes={{ backgroundColor: "blue", color: "blue" }}
        >
          <KeyboardArrowUpIcon fontSize="inherit" />
        </IconButton>
        <IconButton
          aria-label="prev"
          size="medium"
          fontSize="inherit"
          onClick={prev}
          disabled={currentStep == 1 ? true : false}
          classes={{ backgroundColor: "blue", color: "blue" }}
        >
          <KeyboardArrowDownIcon />
        </IconButton>
      </ButtonGroup>
    </React.Fragment>
  );
}
