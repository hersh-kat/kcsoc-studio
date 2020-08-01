import React from "react";
import { Button } from "@material-ui/core";
import { Redirect } from "react-router-dom";
import { useState } from "react";
import dateFormat from "dateformat";

export default function GenerateCustomPosterButton({
  tags,
  title,
  locationLine1,
  locationLine2,
  setLocationLine1Error,
  setLocationLine2Error,
  setTagsError,
  setTitleError,
  setStep,
  date,
  time,
}) {
  const validateSteps = () => {
    var goToNextPage = true;

    if (isNaN(date)) {
      setStep(4);
      goToNextPage = false;
    }

    if (isNaN(time)) {
      setStep(4);
      goToNextPage = false;
    }

    if (locationLine1 == "") {
      setLocationLine1Error(true);
      setStep(3);
      goToNextPage = false;
    }

    if (locationLine2 == "") {
      setLocationLine2Error(true);
      setStep(3);
      goToNextPage = false;
    }
    if (title == "") {
      setTitleError(true);
      setStep(2);
      goToNextPage = false;
    }

    if (tags == "") {
      setTagsError(true);
      setStep(1);
      goToNextPage = false;
    }

    return goToNextPage;
  };

  const [redirect, setRedirect] = useState(false);

  return (
    <React.Fragment>
      <Button
        variant="outlined"
        color="secondary"
        onClick={() => {
          if (validateSteps()) setRedirect(true);
        }}
      >
        Generate Poster
      </Button>
      {redirect && (
        <Redirect
          to={{
            pathname: "/create/trailer/generate",
            state: {
              date: dateFormat(date, "ddd dS mmm"),
              time: dateFormat(time, "h:MM TT"),
              title: title,
              tags: tags,
              locationLine1: locationLine1,
              locationLine2: locationLine2,
            },
          }}
        />
      )}
    </React.Fragment>
  );
}
