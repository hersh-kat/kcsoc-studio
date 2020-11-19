import React, { useState } from "react";
import Dropzone from "react-dropzone";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckSquare } from "@fortawesome/free-solid-svg-icons";
import { makeStyles } from "@material-ui/styles";
import { Grid, Typography, useTheme, useMediaQuery } from "@material-ui/core";
import { CSSTransition } from "react-transition-group";

const useStyles = makeStyles((theme) => ({
	section: {
		border: "5px dashed #05cd51",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		outline: "none",
	},

	imageName: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		marginTop: "2rem",
	},

	icon: {
		margin: "0 1rem",
	},

	errorMessage: {
		color: "red",
	},
}));

export default function DropzoneArea({
	currentStep,
	setStep,
	setImageData,
	setImageName,
}) {
	const classes = useStyles();
	const theme = useTheme();
	const matches = useMediaQuery(theme.breakpoints.down("sm"));

	const [error, setError] = useState(false);
	const [image, setImage] = useState(false);
	return (
		<CSSTransition
			key={1}
			in={currentStep === 1}
			timeout={400}
			classNames={"move"}
			unmountOnExit
		>
			<Grid
				container
				direction="column"
				justify="center"
				spacing={4}
				alignItems={matches ? "center" : undefined}
				style={{
					maxWidth: "500px",
					marginTop: "5rem",
					position: "absolute",
				}}
			>
				<Grid item>
					<Dropzone
						onDropAccepted={(acceptedFiles) => {
							setError(false);
							setImage(acceptedFiles[0]);
							setImageData(acceptedFiles[0]);
							setImageName(acceptedFiles[0].name);
							setTimeout(() => {
								setStep(currentStep + 1);
							}, 250);
						}}
						onDropRejected={() => {
							setError(true);
						}}
						multiple={false}
						accept={["image/png", "image/jpeg", "image/jpg"]}
					>
						{({ getRootProps, getInputProps }) => (
							<section
								className={classes.section}
								{...getRootProps()}
							>
								<input
									{...getInputProps()}
									className={classes.input}
								/>
								<Typography>
									Drag 'n' drop an image file here, or click
									to select file.
								</Typography>
							</section>
						)}
					</Dropzone>
					<Typography className={classes.errorMessage}>
						{error && "Please upload a .jpeg, .jpg or a .png file"}
					</Typography>

					{image && (
						<div className={classes.imageName}>
							<div className={classes.icon}>
								<FontAwesomeIcon
									icon={faCheckSquare}
									size="lg"
									color="#05cd51"
								/>
							</div>

							<Typography> {image.name}</Typography>
						</div>
					)}
				</Grid>
			</Grid>
		</CSSTransition>
	);
}
