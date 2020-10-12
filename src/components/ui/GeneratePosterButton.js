import React from "react";
import { Button, Typography } from "@material-ui/core";
import { Redirect } from "react-router-dom";
import { useState } from "react";
import dateFormat from "dateformat";

export default function GeneratePosterButton({
  url,
  speaker,
  zoomUrl,
	facebookHandle,
	instaHandle,
	locationLine1,
	locationLine2,
	setLocationLine1Error,
	setLocationLine2Error,
	setFacebookInputError,
	setInstagramInputError,
	setURLError,
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

		if (locationLine1 === "") {
			setLocationLine1Error(true);
			setStep(3);
			goToNextPage = false;
		}

		if (locationLine2 === "") {
			setLocationLine2Error(true);
			setStep(3);
			goToNextPage = false;
		}

		if (url === "") {
			setURLError(true);
			setStep(1);
			goToNextPage = false;
		}

		return goToNextPage;
	};

	const [redirect, setRedirect] = useState(false);

	return (
		<React.Fragment>
			<Button
				variant="contained"
				size="medium"
				style={{ backgroundColor: "#b4ecb4" }}
				onClick={() => {
					if (validateSteps()) setRedirect(true);
				}}
			>
				<Typography style={{ fontSize: 16 }}>
					Generate Poster
				</Typography>
			</Button>
			{redirect && (
				<Redirect
					to={{
						pathname: "/create/poster/template/generate",
						state: {
							date: dateFormat(date, "ddd dS mmm"),
							time: dateFormat(time, "h:MM TT"),
							url: url,
							speaker: speaker,
							zoomUrl: zoomUrl,
							facebookHandle: facebookHandle,
							instaHandle: instaHandle,
							locationLine1: locationLine1,
							locationLine2: locationLine2,
						},
					}}
				/>
			)}
		</React.Fragment>
	);
}
