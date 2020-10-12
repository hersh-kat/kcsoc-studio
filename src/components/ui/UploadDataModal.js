import React, { useState } from "react";
import Modal from "react-modal";
import { makeStyles } from "@material-ui/styles";
import { Grid, Typography, Card, CardContent, Button } from "@material-ui/core";
import Loader from "react-loader-spinner";

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
		date,
		time,
		facebookUrl,
		instaHandle,
		locationLine1,
		locationLine2,
		title,
		speaker,
		zoomUrl,
	} = data;
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
						<Typography paragraph variant="p">
							Title: {title}
						</Typography>
						{speaker && (
							<Typography paragraph variant="p">
								Speaker: {speaker}
							</Typography>
						)}
						<Typography paragraph variant="p">
							Date and Time: {`${date}, ${time}`}
						</Typography>
						<Typography paragraph variant="p">
							Location: {`${locationLine1}, ${locationLine2}`}
						</Typography>
						{facebookUrl && (
							<Typography paragraph variant="p">
								Facebook URL: {facebookUrl}
							</Typography>
						)}
						{instaHandle && (
							<Typography paragraph variant="p">
								Instagram Handle: {instaHandle}
							</Typography>
						)}
						{zoomUrl && (
							<Typography paragraph variant="p">
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
								onClick={() => {
									setLoading(true);
									setTimeout(() => {
										setLoading(false);
										setUploaded(true);
									}, 5000);
								}}
								disabled={loading}
							>
								Confirm
							</Button>
						</Grid>
						<Grid item spacing>
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
					<Grid item spacing>
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
					<Typography
						paragraph
						variant="p"
						className={classes.uploaded}
					>
						Uploaded!
					</Typography>
				)}
			</Grid>
		</Modal>
	);
}
