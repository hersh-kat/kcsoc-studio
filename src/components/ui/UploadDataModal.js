import React, { useState, useContext } from "react";
import Modal from "react-modal";
import moment from "moment";
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
	loading: {
		color: "black",
		fontSize: "8px",
		marginTop: "1rem",
	},
	error: {
		color: "red",
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
		imageData,
		imageName,
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
	const [error, setError] = useState(false);

	const { userData } = useContext(UserContext);

	const upload = async () => {
		setLoading(true);
		setError(false);
		setUploaded(false);

		const fd = new FormData();
		fd.append(
			"jsonData",
			JSON.stringify({
				name: title,
				speaker,
				location: `${locationLine2}, ${locationLine1}`,
				dateAndTime: timestamp,
				facebookUrl,
				instagramUrl: instaHandle,
				zoomUrl,
			})
		);
		if (imageData instanceof ArrayBuffer) {
			fd.append("file", new Blob([imageData], { type: "image/jpg" }));
		} else if (imageData instanceof File) {
			fd.append("file", imageData);
		}

		fetch(`${process.env.REACT_APP_KCSOC_SERVER_URL}/events/create`, {
			method: "POST",
			headers: {
				"x-auth-token": userData.token,
			},
			body: fd,
		}).then((res) => {
			if (res.status === 201) {
				setLoading(false);
				setUploaded(true);
			} else {
				setLoading(false);
				setError(true);
			}
		});
	};

	return (
		<Modal
			isOpen={modalOpen}
			onRequestClose={() => {
				setModalOpen(false);
			}}
			style={customStyles}
			contentLabel="Upload Modal"
			shouldCloseOnOverlayClick={!loading}
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
						{imageName && (
							<Typography paragraph>
								Image file: {imageName}
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
						<Typography paragraph className={classes.loading}>
							This may take a while...
						</Typography>
					</div>
				)}
				{uploaded && (
					<Typography paragraph className={classes.uploaded}>
						Uploaded!
					</Typography>
				)}
				{error && (
					<Typography paragraph className={classes.error}>
						Oops! There was an error!
					</Typography>
				)}
			</Grid>
		</Modal>
	);
}
