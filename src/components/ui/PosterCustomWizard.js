import React from "react";
import ImageSearch from "./ImageSearch";

export default function PosterCustomWizard() {
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

  return <ImageSearch />;
}
