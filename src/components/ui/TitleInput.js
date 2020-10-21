import React from "react";
import {
	Grid,
	Typography,
	CardContent,
	useTheme,
	useMediaQuery,
} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { CSSTransition } from "react-transition-group";
import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/styles";
import OkayButton from "./OkayButton";

const useStyles = makeStyles((theme) => ({
	titleCard: {
		minWidth: 300,
		maxHeight: 60,
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

export default function TitleInput({
	currentStep,
	setTitle,
	setStep,
	setTitleError,
	title,
	titleError,
	speaker,
	setSpeaker,
}) {
	const classes = useStyles();
	const theme = useTheme();
	const matches = useMediaQuery(theme.breakpoints.down("sm"));
	const mdMatches = useMediaQuery(theme.breakpoints.down("md"));

	return (
		<CSSTransition
			key={2}
			in={currentStep === 2}
			timeout={400}
			classNames={"move"}
			unmountOnExit
		>
			<Grid
				item
				container
				direction="column"
				justify="center"
				spacing={4}
				alignItems={matches ? "center" : undefined}
				style={{ position: "absolute" }}
			>
				<Grid item>
					<Card className={classes.titleCard}>
						<CardContent>
							<Typography variant="h2">
								{currentStep}. Enter the title of your event*
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
								error={titleError}
								helperText={
									titleError ? "Please fill this in." : ""
								}
								color="secondary"
								id="title"
								InputLabelProps={{
									shrink: true,
								}}
								label="Title*"
								placeholder="Event Name"
								value={title}
								onChange={(event) => {
									setTitle(event.target.value);
									setTitleError(false);
								}}
								onKeyDown={(event) => {
									if (event.keyCode === 13) {
										if (title.length === 0)
											setTitleError(true);
										if (title.length === 0)
											setTitleError(true);
										if (title.length > 0)
											setStep(currentStep + 1);
									}
								}}
							/>
						</CardContent>
					</Card>
				</Grid>
				<Grid item>
					<Card className={classes.titleCard}>
						<CardContent>
							<Typography variant="h2">
								Enter the speaker's name.
							</Typography>
						</CardContent>
					</Card>
				</Grid>
				<Grid item>
					<Card className={classes.inputCard}>
						<CardContent>
							<TextField
								fullWidth
								color="secondary"
								id="speaker"
								InputLabelProps={{
									shrink: true,
								}}
								label="Speaker"
								placeholder="Speaker name"
								value={speaker}
								onChange={(event) => {
									setSpeaker(event.target.value);
								}}
								onKeyDown={(event) => {
									if (event.keyCode === 13) {
										if (title.length === 0)
											setTitleError(true);
										if (title.length === 0)
											setTitleError(true);
										if (title.length > 0)
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
					in={title.length > 0}
					unmountOnExit
				>
					<OkayButton currentStep={currentStep} setStep={setStep} />
				</CSSTransition>
			</Grid>
		</CSSTransition>
	);
}
