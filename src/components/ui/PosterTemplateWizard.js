import React, { useState } from "react";
import PosterTemplateStep1 from "./PosterTemplateStep1";
import { Grid } from "@material-ui/core";
import PosterTemplateSocialMedia from "./SocialMediaInput";
import PosterTemplateLocation from "./LocationInput";
import DateTimeInput from "./DateTimeInput";
import StepChangeButtons from "./StepChangeButtons";
import { TransitionGroup } from "react-transition-group";
import "../../css/animations.css";
import GeneratePosterButton from "./GeneratePosterButton";

/*State from all the steps will be stored in here*/
export default function PosterTemplateWizard() {
  const [currentStep, setCurrentStep] = useState(1);
  const [url, setURL] = useState("");
  const [urlError, setURLError] = useState(false);
  const [instaHandle, setInstaHandle] = useState("");
  const [facebookHandle, setFacebookHandle] = useState("");
  const [facebookInputError, setFacebookInputError] = useState(false);
  const [instagramInputError, setInstagramInputError] = useState(false);
  const [locationLine1, setLocationLine1] = useState("");
  const [locationLine2, setLocationLine2] = useState("");
  const [locationLine1Error, setLocationLine1Error] = useState(false);
  const [locationLine2Error, setLocationLine2Error] = useState(false);
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());

  const next = () => {
    setCurrentStep(currentStep + 1);
  };
  const prev = () => {
    setCurrentStep(currentStep - 1);
  };
  return (
    <React.Fragment>
      <Grid
        container
        spacing={4}
        direction="column"
        style={{
          paddingTop: "20vh",
          position: "absolute",
        }}
        justify="center"
      >
        <StepChangeButtons
          next={next}
          prev={prev}
          currentStep={currentStep}
          endAt={4}
        />
        <TransitionGroup
          childFactory={(child) => React.cloneElement(child)}
          style={{ position: "relative", marginTop: "20px" }}
        >
          <PosterTemplateStep1
            currentStep={currentStep}
            showOnStep={1}
            setURL={setURL}
            setStep={next}
            urlError={urlError}
            setURLError={setURLError}
          />
          <PosterTemplateSocialMedia
            currentStep={currentStep}
            showOnStep={2}
            setInstaHandle={setInstaHandle}
            setFacebookHandle={setFacebookHandle}
            setStep={next}
            instaHandle={instaHandle}
            facebookHandle={facebookHandle}
            facebookInputError={facebookInputError}
            setFacebookInputError={setFacebookInputError}
            instagramInputError={instagramInputError}
            setInstagramInputError={setInstagramInputError}
          />
          <PosterTemplateLocation
            currentStep={currentStep}
            showOnStep={3}
            setLocationLine1={setLocationLine1}
            setLocationLine2={setLocationLine2}
            setStep={next}
            locationLine1={locationLine1}
            locationLine2={locationLine2}
            locationLine1Error={locationLine1Error}
            setLocationLine1Error={setLocationLine1Error}
            locationLine2Error={locationLine2Error}
            setLocationLine2Error={setLocationLine2Error}
          />
          <DateTimeInput
            currentStep={currentStep}
            showOnStep={4}
            setDate={setDate}
            setTime={setTime}
            generatePosterComponent={
              <GeneratePosterButton
                date={date} //dateFormat(date, "ddd dS mmm")
                time={time} //dateFormat(time, "h:MM TT")
                url={url}
                instaHandle={instaHandle}
                facebookHandle={facebookHandle}
                locationLine1={locationLine1}
                locationLine2={locationLine2}
                setLocationLine1Error={setLocationLine1Error}
                setLocationLine2Error={setLocationLine2Error}
                setInstagramInputError={setInstagramInputError}
                setFacebookInputError={setFacebookInputError}
                setURLError={setURLError}
                setStep={setCurrentStep}
              />
            }
          />
        </TransitionGroup>
      </Grid>
    </React.Fragment>
  );
}
