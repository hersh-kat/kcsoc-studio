import React from "react";
import { Button, Typography } from "@material-ui/core";
import { Redirect } from "react-router-dom";
import { useState } from "react";

export default function GenerateCustomPosterButton({
	url,
	title,
	speaker,
	facebookUrl,
	instaHandle,
	zoomUrl,
	locationLine1,
	locationLine2,
	setLocationLine1Error,
	setLocationLine2Error,
	setFacebookInputError,
	setInstagramInputError,
	setTitleError,
	setURLError,
	setStep,
	date,
	time,
}) {
	const validateSteps = () => {
		var goToNextPage = true;

		if (isNaN(date)) {
			setStep(5);
			goToNextPage = false;
		}

		if (isNaN(time)) {
			setStep(5);
			goToNextPage = false;
		}

		if (locationLine1 === "") {
			setLocationLine1Error(true);
			setStep(4);
			goToNextPage = false;
		}

		if (locationLine2 === "") {
			setLocationLine2Error(true);
			setStep(4);
			goToNextPage = false;
		}

		if (title === "") {
			setTitleError(true);
			setStep(2);
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
						pathname: "/create/poster/custom/generate",
						state: {
							unformattedDate: date,
							unformattedTime: time,
							url: url,
							facebookUrl: facebookUrl,
							instaHandle: instaHandle,
							zoomUrl: zoomUrl,
							locationLine1: locationLine1,
							locationLine2: locationLine2,
							title: title,
							speaker: speaker,
						},
					}}
				/>
			)}
		</React.Fragment>
	);
}
