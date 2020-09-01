import React from "react";
import ImageSearch from "./ImageSearch";
import { useState } from "react";
import { TransitionGroup } from "react-transition-group";
import PosterTemplateSocialMedia from "./SocialMediaInput";
import PosterTemplateLocation from "./LocationInput";
import DateTimeInput from "./DateTimeInput";
import GenerateCustomPosterButton from "./GenerateCustomPosterButton";
import TitleInput from "./TitleInput";
import StepChangeButtons from "./StepChangeButtons";
import { Grid } from "@material-ui/core";

export default function PosterCustomWizard() {
  const [currentStep, setCurrentStep] = useState(1);
  const [url, setURL] = useState("");
  const [urlError, setURLError] = useState(false);
  const [title, setTitle] = useState("");
  const [titleError, setTitleError] = useState(false);
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
    <Grid
      container
      direction="column"
      style={{
        position: "absolute",
        paddingTop: "20vh",
      }}
      justify="center"
      spacing={0}
    >
      <StepChangeButtons
        next={next}
        prev={prev}
        currentStep={currentStep}
        endAt={5}
      />
      <TransitionGroup
        childFactory={(child) => React.cloneElement(child)}
        style={{ position: "relative", marginTop: "20px" }}
      >
        <ImageSearch
          currentStep={currentStep}
          showOnStep={1}
          setURL={setURL}
          setStep={next}
          urlError={urlError}
          setURLError={setURLError}
        />
        <TitleInput
          currentStep={currentStep}
          showOnStep={2}
          title={title}
          setTitle={setTitle}
          setStep={next}
          titleError={titleError}
          setTitleError={setTitleError}
        />
        <PosterTemplateSocialMedia
          currentStep={currentStep}
          showOnStep={3}
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
          showOnStep={4}
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
          showOnStep={5}
          setDate={setDate}
          setTime={setTime}
          generatePosterComponent={
            <GenerateCustomPosterButton
              date={date} //dateFormat(date, "ddd dS mmm")
              time={time} //dateFormat(time, "h:MM TT")
              url={url}
              title={title}
              instaHandle={instaHandle}
              facebookHandle={facebookHandle}
              locationLine1={locationLine1}
              locationLine2={locationLine2}
              setLocationLine1Error={setLocationLine1Error}
              setLocationLine2Error={setLocationLine2Error}
              setInstagramInputError={setInstagramInputError}
              setFacebookInputError={setFacebookInputError}
              setURLError={setURLError}
              setTitleError={setTitleError}
              setStep={setCurrentStep}
            />
          }
        />
      </TransitionGroup>
    </Grid>
  );
}
