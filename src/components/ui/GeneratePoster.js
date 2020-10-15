import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import dateFormat from "dateformat";
import { Grid, Button, Typography, useMediaQuery } from "@material-ui/core";
import HashLoader from "react-spinners/HashLoader";
import { useTheme, makeStyles } from "@material-ui/styles";
import UploadDataModal from "./UploadDataModal";

function arrayBufferToBase64(buffer) {
	var binary = "";
	var bytes = new Uint8Array(buffer);
	var len = bytes.byteLength;
	for (var i = 0; i < len; i++) {
		binary += String.fromCharCode(bytes[i]);
	}
	return window.btoa(binary);
}

function linkBuilder(props) {
	const {
		unformattedDate,
		unformattedTime,
		url,
		facebookHandle,
		instaHandle,
		locationLine1,
		locationLine2,
	} = props.location.state;

	const date = dateFormat(unformattedDate, "ddd dS mmm");
	const time = dateFormat(unformattedTime, "h:MM TT");

	var link =
		"https://www.photopea.com#%7B%22files%22:%5B%22" + url + "%22%5D";
	var script =
		",%22environment%22:%7B%7D,%22script%22:%22activeDocument.activeLayer%20=%20activeDocument.artLayers.getByName('@kcsoc%20FB%20Tag');%20activeDocument.activeLayer.textItem.contents%20=%20'" +
		facebookHandle +
		"';";
	var script2 =
		"%20activeDocument.activeLayer%20=%20activeDocument.artLayers.getByName('@kcsoc%20Insta%20Tag');%20activeDocument.activeLayer.textItem.contents%20=%20'" +
		instaHandle +
		"';";
	var script3 =
		"%20activeDocument.activeLayer%20=%20activeDocument.artLayers.getByName('Date');%20activeDocument.activeLayer.textItem.contents%20=%20'" +
		date +
		"';";
	var script4 =
		"%20activeDocument.activeLayer%20=%20activeDocument.artLayers.getByName('Time');%20activeDocument.activeLayer.textItem.contents%20=%20'" +
		time +
		" start';";
	var script5 =
		"%20activeDocument.activeLayer%20=%20activeDocument.artLayers.getByName('LocationLine1');%20activeDocument.activeLayer.textItem.contents%20=%20'" +
		locationLine1 +
		"';";
	var script6 =
		"%20activeDocument.activeLayer%20=%20activeDocument.artLayers.getByName('LocationLine2');%20activeDocument.activeLayer.textItem.contents%20=%20'" +
		locationLine2 +
		"';";
	var script7 = "%22%7D";
	var finalLink =
		link +
		script +
		script2 +
		script3 +
		script4 +
		script5 +
		script6 +
		script7;
	finalLink = finalLink.trim();
	//console.log(finalLink);
	return finalLink;
}

const useStyles = makeStyles((theme) => ({
	poster: {
		paddingTop: "30px",
		paddingBottom: "30px",
		width: "65%",
		[theme.breakpoints.down("md")]: {
			width: "85%",
		},
	},
}));

export default function GeneratePoster(props) {
	const iframeRef = useRef(null);
	const [imageData, setImageData] = useState(null);
	const [hidePhotopea, setHidePhotopea] = useState(true);
	const [modalOpen, setModalOpen] = React.useState(false);
	const theme = useTheme();
	const matches = useMediaQuery(theme.breakpoints.down("sm"));
	const classes = useStyles();

	var n = 0;

	useEffect(() => {
		window.addEventListener("message", onMessage);
	});

	console.log(props.location.state);

	function onMessage(e) {
		//console.log("Message from Photopea: " + e.data);
		//console.log(e.data);
		if (e.data instanceof ArrayBuffer) {
			setImageData(arrayBufferToBase64(e.data));
		}
		if (e.data === "done") {
			n++;
			if (n === 1) {
				/* Photopea loaded! */
			}
			if (n === 2 && iframeRef.current != null) {
				/* Image loaded!  Run some script! */
				var x = 'activeDocument.saveToOE("jpg")';
				iframeRef.current.contentWindow.postMessage(x, "*");
			}
		}
	}
	return (
		<React.Fragment>
			{props.location.state == null && (
				<Typography>
					Oops...Something went wrong. Please return home by clicking{" "}
					<Link to="/">here</Link>.
				</Typography>
			)}
			{props.location.state != null && (
				<>
					<UploadDataModal
						modalOpen={modalOpen}
						setModalOpen={setModalOpen}
						data={props.location.state}
					/>
					<Grid
						container
						direction="column"
						alignItems="center"
						spacing={2}
						style={{ textAlign: "center" }}
					>
						{imageData == null && (
							<Grid item style={{ marginTop: "30%" }}>
								<HashLoader
									size={150}
									color={"#70edff"}
									loading={true}
								/>
							</Grid>
						)}
						{imageData && (
							<div>
								<Grid item>
									<img
										alt="Generated KCSOC Poster"
										src={
											"data:image/jpg;base64," + imageData
										}
										className={classes.poster}
									/>
								</Grid>
								<Grid
									item
									container
									direction={matches ? "column" : "row"}
									spacing={3}
									justify="space-around"
								>
									<Grid item>
										<Button
											variant="contained"
											color="secondary"
											download
											href={
												"data:image/jpg;base64," +
												imageData
											}
										>
											Download JPG
										</Button>
									</Grid>
									<Grid item>
										<Button
											variant="contained"
											color="secondary"
											download
											href={props.location.state.url}
										>
											Download PSD
										</Button>
									</Grid>
									<Grid item>
										<Button
											variant="contained"
											color="secondary"
											onClick={() =>
												setHidePhotopea(false)
											}
										>
											Edit in Photopea
										</Button>
									</Grid>
									<Grid item>
										<Button
											variant="contained"
											color="secondary"
											onClick={() => {
												setModalOpen(true);
											}}
										>
											Upload to KCSOC database
										</Button>
									</Grid>
								</Grid>
							</div>
						)}
						<Grid item>
							<iframe
								title="myPoster"
								id="photopea"
								src={linkBuilder(props)}
								ref={iframeRef}
								height={800}
								width={1600}
								style={{ display: hidePhotopea ? "none" : "" }}
							/>
						</Grid>
					</Grid>
				</>
			)}
		</React.Fragment>
	);
}
