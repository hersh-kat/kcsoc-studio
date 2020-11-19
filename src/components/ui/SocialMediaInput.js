import React from "react";
import {
	Grid,
	Typography,
	Card,
	CardContent,
	useTheme,
	useMediaQuery,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import TextField from "@material-ui/core/TextField";
import { CSSTransition } from "react-transition-group";
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

export default function PosterTemplateSocialMedia({
	currentStep,
	showOnStep,
	setFacebookUrl,
	setInstaHandle,
	setStep,
	facebookUrl,
	instaHandle,
	setInstagramInputError,
	instagramInputError,
	setFacebookInputError,
	facebookInputError,
	zoomUrl,
	setZoomUrl,
}) {
	const classes = useStyles();
	const theme = useTheme();
	const matches = useMediaQuery(theme.breakpoints.down("sm"));
	const mdMatches = useMediaQuery(theme.breakpoints.down("md"));
	return (
		<CSSTransition
			key={showOnStep}
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
								{" "}
								{currentStep}. Enter your KCSOC event's online
								information.
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
								error={facebookInputError}
								helperText={
									facebookInputError
										? "Please fill this in."
										: ""
								}
								color="secondary"
								id="facebook-url"
								label="Facebook Event URL"
								placeholder="www.facebook.com/events/..."
								value={facebookUrl}
								InputLabelProps={{
									shrink: true,
								}}
								onChange={(event) => {
									setFacebookUrl(event.target.value);
									setFacebookInputError(false);
								}}
								onKeyDown={(event) => {
									if (event.keyCode === 13) {
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
								error={instagramInputError}
								helperText={
									instagramInputError
										? "Please fill this in."
										: ""
								}
								color="secondary"
								id="instagram-handle"
								label="Your KCSOC's Instagram Handle"
								placeholder="@kcsocnational"
								InputLabelProps={{
									shrink: true,
								}}
								value={instaHandle}
								onChange={(event) => {
									setInstaHandle(event.target.value);
									setInstagramInputError(false);
								}}
								onKeyDown={(event) => {
									if (event.keyCode === 13) {
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
								color="secondary"
								id="zoom-url"
								label="Zoom URL"
								placeholder="bit.ly/24hourstolive"
								InputLabelProps={{
									shrink: true,
								}}
								value={zoomUrl}
								onChange={(event) => {
									setZoomUrl(event.target.value);
								}}
								onKeyDown={(event) => {
									if (event.keyCode === 13) {
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
					in
					unmountOnExit
				>
					<OkayButton currentStep={currentStep} setStep={setStep} />
				</CSSTransition>
			</Grid>
		</CSSTransition>
	);
}
