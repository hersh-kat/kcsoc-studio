import React, { useState } from "react";
import PosterTemplateStep1 from "./PosterTemplateStep1";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import PosterTemplateLocation from "./LocationInput";
import DateTimeInput from "./DateTimeInput";
import StepChangeButtons from "./StepChangeButtons";
import { TransitionGroup } from "react-transition-group";
import TitleInput from "./TitleInput";
import "../../css/animations.css";
import GenerateVideoButton from "./GenerateVideoButton";
import TagsInput from "./TagsInput";
const useStyles = makeStyles((theme) => ({}));

/*State from all the steps will be stored in here*/
export default function PosterTemplateWizard() {
  const [currentStep, setCurrentStep] = useState(1);
  const [tags, setTags] = useState([]);
  const [tagsError, setTagsError] = useState(false);
  const [locationLine1, setLocationLine1] = useState("");
  const [locationLine2, setLocationLine2] = useState("");
  const [locationLine1Error, setLocationLine1Error] = useState(false);
  const [locationLine2Error, setLocationLine2Error] = useState(false);
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [title, setTitle] = useState("");
  const [titleError, setTitleError] = useState(false);

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
        direction="column"
        spacing={4}
        style={{
          paddingTop: "200px",
          paddingBottom: "200px",
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
          <TagsInput
            currentStep={currentStep}
            showOnStep={1}
            setTags={setURL}
            setStep={next}
            tagsError={tagsError}
            setTagsError={setTagsError}
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
              <GenerateVideoButton
                date={date} //dateFormat(date, "ddd dS mmm")
                time={time} //dateFormat(time, "h:MM TT")
                tags={tags}
                setTagsError={setTagsError}
                locationLine1={locationLine1}
                locationLine2={locationLine2}
                setLocationLine1Error={setLocationLine1Error}
                setLocationLine2Error={setLocationLine2Error}
                setStep={setCurrentStep}
              />
            }
          />
        </TransitionGroup>
      </Grid>
    </React.Fragment>
  );
}
