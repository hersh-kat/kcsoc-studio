import React from "react";
import {
	Grid,
	Typography,
	Card,
	CardContent,
	useMediaQuery,
} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { CSSTransition } from "react-transition-group";
import { makeStyles, useTheme } from "@material-ui/styles";
import OkayButton from "./OkayButton";

const useStyles = makeStyles((theme) => ({
	titleCard: {
		minWidth: 300,
		maxHeight: 60,
		[theme.breakpoints.down("md")]: {
			maxHeight: 80,
		},
		[theme.breakpoints.down("sm")]: {
			maxWidth: 260,
			maxHeight: 100,
		},
		display: "inline-block",
		backgroundColor: theme.palette.common.pastelBlue,
	},
	inputCard: {
		display: "inline-block",
		backgroundColor: theme.palette.common.pastelPink,
		[theme.breakpoints.down("sm")]: {
			minWidth: 400,
		},
		[theme.breakpoints.down("xs")]: {
			minWidth: 350,
		},
		minWidth: 750,
	},
}));

export default function PosterTemplateLocation({
	currentStep,
	showOnStep,
	setLocationLine1,
	setLocationLine2,
	setStep,
	locationLine1,
	locationLine2,
	locationLine1Error,
	locationLine2Error,
	setLocationLine1Error,
	setLocationLine2Error,
}) {
	const classes = useStyles();
	const theme = useTheme();
	const matches = useMediaQuery(theme.breakpoints.down("sm"));
	const mdMatches = useMediaQuery(theme.breakpoints.down("md"));
	return (
		<CSSTransition
			key={3}
			in={currentStep === showOnStep}
			timeout={400}
			classNames={"move"}
			unmountOnExit
		>
			<Grid
				item
				container
				direction="column"
				spacing={4}
				justify="center"
				alignItems={matches ? "center" : undefined}
				style={{ position: "absolute" }}
			>
				<Grid item>
					<Card className={classes.titleCard}>
						<CardContent>
							<Typography variant="h2">
								{currentStep}. Enter the location details for
								your event
							</Typography>
						</CardContent>
					</Card>
				</Grid>
				<Grid item>
					<Card className={classes.inputCard}>
						<CardContent>
							<TextField
								autoFocus={mdMatches ? false : true}
								fullWidth
								error={locationLine1Error}
								helperText={
									locationLine1Error
										? "Please fill this in."
										: ""
								}
								color="secondary"
								id="location-line-1"
								label="Building Name"
								placeholder="Let's be honest, it's probably on Zoom..."
								value={locationLine1}
								InputLabelProps={{
									shrink: true,
								}}
								onChange={(event) => {
									setLocationLine1(event.target.value);
									setLocationLine1Error(false);
								}}
								onKeyDown={(event) => {
									if (event.keyCode === 13) {
										if (locationLine1.length === 0)
											setLocationLine1Error(true);
										if (locationLine2.length === 0)
											setLocationLine2Error(true);
										if (
											locationLine1.length > 0 &&
											locationLine2.length > 0
										)
											setStep(currentStep + 1);
									}
								}}
							/>
						</CardContent>
					</Card>
				</Grid>
				<Grid item>
					<Card className={classes.inputCard}>
						<CardContent>
							<TextField
								fullWidth
								error={locationLine2Error}
								helperText={
									locationLine2Error
										? "Please fill this in."
										: ""
								}
								color="secondary"
								id="location-line-2"
								label="Room Number"
								placeholder="...and it's probably online."
								value={locationLine2}
								InputLabelProps={{
									shrink: true,
								}}
								onChange={(event) => {
									setLocationLine2(event.target.value);
									setLocationLine2Error(false);
								}}
								onKeyDown={(event) => {
									if (event.keyCode === 13) {
										if (locationLine1.length === 0)
											setLocationLine1Error(true);
										if (locationLine2.length === 0)
											setLocationLine2Error(true);
										if (
											locationLine1.length > 0 &&
											locationLine2.length > 0
										)
											setStep(currentStep + 1);
									}
								}}
							/>
						</CardContent>
					</Card>
				</Grid>
				<CSSTransition
					timeout={400}
					classNames={"flipX"}
					in={locationLine1.length > 0 && locationLine2.length > 0}
					unmountOnExit
				>
					<OkayButton currentStep={currentStep} setStep={setStep} />
				</CSSTransition>
			</Grid>
		</CSSTransition>
	);
}
