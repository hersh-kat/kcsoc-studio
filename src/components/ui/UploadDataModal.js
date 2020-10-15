import React, { useState, useContext } from "react";
import Modal from "react-modal";
import moment from "moment";
import axios from "axios";
import dateFormat from "dateformat";
import { makeStyles } from "@material-ui/styles";
import { Grid, Typography, Card, CardContent, Button } from "@material-ui/core";
import Loader from "react-loader-spinner";
import UserContext from "../contexts/UserContext";

const useStyles = makeStyles((theme) => ({
	modalCard: {
		display: "inline-block",
		backgroundColor: theme.palette.common.pastelBlue,
	},
	modalText: {
		marginTop: "100px",
	},
	uploaded: {
		color: "green",
		marginTop: "1rem",
	},
}));

export default function UploadDataModal({ modalOpen, setModalOpen, data }) {
	const {
		unformattedDate,
		unformattedTime,
		facebookUrl,
		instaHandle,
		locationLine1,
		locationLine2,
		title,
		speaker,
		zoomUrl,
	} = data;
	const date = dateFormat(unformattedDate, "ddd dS mmm");
	const time = dateFormat(unformattedTime, "h:MM TT");

	const dateISO = moment(unformattedDate).toISOString();
	const timeISO = moment(unformattedTime).toISOString();
	const timestamp = dateISO.split("T")[0] + "T" + timeISO.split("T")[1];

	const customStyles = {
		content: {
			top: "50%",
			left: "50%",
			right: "auto",
			bottom: "auto",
			marginRight: "-50%",
			transform: "translate(-50%, -50%)",
			maxWidth: "90vw",
		},
	};

	const classes = useStyles();

	const [loading, setLoading] = useState(false);
	const [uploaded, setUploaded] = useState(false);

	const { userData } = useContext(UserContext);

	const upload = async () => {
		setLoading(true);
		const res = await axios.post(
			"http://localhost:5000/events/create",
			{
				name: title,
				speaker,
				location: `${locationLine2}, ${locationLine1}`,
				dateAndTime: timestamp,
				facebookUrl,
				instagramUrl: instaHandle,
				zoomUrl,
			},
			{
				headers: { "x-auth-token": userData.token },
			}
		);
		console.log(res.status);
		if (res.status === 201) {
			setTimeout(() => {
				setLoading(false);
				setUploaded(true);
			}, 5000);
		}
	};

	return (
		<Modal
			isOpen={modalOpen}
			onRequestClose={() => {
				setModalOpen(false);
			}}
			style={customStyles}
			contentLabel="Example Modal"
		>
			<Grid item>
				<Card className={classes.modalCard}>
					<CardContent>
						<Typography paragraph variant="h2">
							Please confirm
						</Typography>
						<Typography paragraph>Title: {title}</Typography>
						{speaker && (
							<Typography paragraph>
								Speaker: {speaker}
							</Typography>
						)}
						<Typography paragraph>
							Date and Time: {`${date}, ${time}`}
						</Typography>
						<Typography paragraph>
							Location: {`${locationLine1}, ${locationLine2}`}
						</Typography>
						{facebookUrl && (
							<Typography paragraph>
								Facebook URL: {facebookUrl}
							</Typography>
						)}
						{instaHandle && (
							<Typography paragraph>
								Instagram Handle: {instaHandle}
							</Typography>
						)}
						{zoomUrl && (
							<Typography paragraph>
								Zoom URL: {zoomUrl}
							</Typography>
						)}
					</CardContent>
				</Card>
			</Grid>
			<Grid
				container
				direction="row"
				justify="space-evenly"
				alignItems="center"
			>
				{!uploaded ? (
					<>
						<Grid item>
							<Button
								variant="contained"
								color="primary"
								onClick={upload}
								disabled={loading}
							>
								Confirm
							</Button>
						</Grid>
						<Grid item>
							<Button
								variant="contained"
								color="secondary"
								onClick={() => {
									setModalOpen(false);
								}}
								disabled={loading}
							>
								Cancel
							</Button>
						</Grid>
					</>
				) : (
					<Grid item>
						<Button
							variant="contained"
							color="secondary"
							onClick={() => {
								setModalOpen(false);
							}}
						>
							Close
						</Button>
					</Grid>
				)}
			</Grid>
			<Grid
				container
				direction="row"
				justify="space-evenly"
				alignItems="center"
			>
				{loading && (
					<div>
						<Loader
							type="Rings"
							color="#00BFFF"
							height={80}
							width={80}
						/>
					</div>
				)}
				{uploaded && (
					<Typography paragraph className={classes.uploaded}>
						Uploaded!
					</Typography>
				)}
			</Grid>
		</Modal>
	);
}
