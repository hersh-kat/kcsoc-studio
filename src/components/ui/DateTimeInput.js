import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";

import {
	Grid,
	Typography,
	CardContent,
	Card,
	createMuiTheme,
	useMediaQuery,
	useTheme,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import DateFnsUtils from "@date-io/date-fns";
import lightBlue from "@material-ui/core/colors/lightBlue";
import { ThemeProvider } from "@material-ui/styles";

import { CSSTransition } from "react-transition-group";
import {
	MuiPickersUtilsProvider,
	KeyboardTimePicker,
	KeyboardDatePicker,
} from "@material-ui/pickers";

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

const materialTheme = createMuiTheme({
	overrides: {
		MuiPickersToolbar: {
			toolbar: {
				backgroundColor: "rgb(253, 234, 252)",
			},
		},
		MuiPickersToolbarText: {
			toolbarTxt: {
				color: "grey",
			},
			toolbarBtnSelected: {
				color: "black",
			},
		},
		MuiPickersCalendarHeader: {
			switchHeader: {
				// backgroundColor: lightBlue.A200,
				color: "black",
			},
		},
		MuiPickersDay: {
			day: {
				color: "black",
			},
			daySelected: {
				backgroundColor: "gray",
			},
			dayDisabled: {
				color: lightBlue["100"],
			},
			current: {
				color: lightBlue["900"],
			},
		},
	},
});

export default function DateTimeInput({
	currentStep,
	showOnStep,
	setDate,
	setTime,
	date,
	time,
	speaker,
	setSpeaker,
	generatePosterComponent,
	custom,
}) {
	const [date2, setDate2] = useState(date);
	const [time2, setTime2] = useState(time);
	const classes = useStyles();
	const theme = useTheme();
	const matches = useMediaQuery(theme.breakpoints.down("sm"));
	const mdMatches = useMediaQuery(theme.breakpoints.down("md"));

	return (
		<React.Fragment>
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
					spacing={4}
					justify="center"
					alignItems={matches ? "center" : undefined}
					style={{ position: "absolute" }}
					direction="column"
				>
					<MuiPickersUtilsProvider utils={DateFnsUtils}>
						<Grid item>
							<Card className={classes.titleCard}>
								<CardContent>
									<Typography variant="h2">
										{" "}
										{currentStep}. Enter the date and time
										for your event*
									</Typography>
								</CardContent>
							</Card>
						</Grid>
						<Grid item>
							<Card className={classes.inputCard}>
								<CardContent>
									<ThemeProvider theme={materialTheme}>
										<KeyboardDatePicker
											autoFocus={mdMatches ? false : true}
											format="dd/MM/yyyy"
											value={date2}
											onChange={(newValue) => {
												setDate(newValue);
												setDate2(newValue);
											}}
										/>
									</ThemeProvider>
								</CardContent>
							</Card>
						</Grid>
						<Grid item>
							<Card className={classes.inputCard}>
								<CardContent>
									<ThemeProvider theme={materialTheme}>
										<KeyboardTimePicker
											value={time2}
											onChange={(time) => {
												setTime(time);
												setTime2(time);
											}}
										/>
									</ThemeProvider>
								</CardContent>
							</Card>
						</Grid>

						{!custom && (
							<>
								<Grid item>
									<Card className={classes.titleCard}>
										<CardContent>
											<Typography variant="h2">
												5. Enter the speaker's name.
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
													setSpeaker(
														event.target.value
													);
												}}
											/>
										</CardContent>
									</Card>
								</Grid>
							</>
						)}
					</MuiPickersUtilsProvider>
					<Grid item>{generatePosterComponent}</Grid>
				</Grid>
			</CSSTransition>
		</React.Fragment>
	);
}
