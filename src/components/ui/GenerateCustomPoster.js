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
	const { url } = props.location.state;

	var link = `https://www.photopea.com#%7B%22files%22:%5B%22${url}%22,%22https://dl.dropboxusercontent.com/s/36tx1d55hjakdo4/CustomPosterTemplate.psd?dl=0%22%5D,%22environment%22:%7B%7D%7D`;

	return link;
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

export default function GenerateCustomPoster(props) {
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

	function onMessage(e) {
		// console.log("Message from Photopea: " + e.data);
		// console.log(e.data);
		if (e.data instanceof ArrayBuffer) {
			setImageData(arrayBufferToBase64(e.data));
		}
		if (e.data === "done") {
			n++;
			if (n === 1) {
				/* Photopea loaded! */
			}
			if (n === 3 && iframeRef.current != null) {
				const {
					unformattedDate,
					unformattedTime,
					facebookUrl,
					instaHandle,
					locationLine1,
					locationLine2,
					title,
				} = props.location.state;
				const date = dateFormat(unformattedDate, "ddd dS mmm");
				const time = dateFormat(unformattedTime, "h:MM TT");

				/* Image loaded!  Run some script! */
				var x = `var doc1 = app.documents[1]; var doc2 = app.documents[0]; app.activeDocument = doc2; doc2.activeLayer.copy(true); app.activeDocument = doc1; app.activeDocument.activeLayer = app.activeDocument.artLayers.getByName('Empty'); doc1.paste(); app.activeDocument.activeLayer = app.activeDocument.artLayers.getByName('Empty'); app.activeDocument.activeLayer.remove(); var doc = app.activeDocument; app.activeDocument.activeLayer = app.activeDocument.artLayers.getByName('Layer 1'); var layer = app.activeDocument.artLayers.getByName('Layer 1'); var width = doc.width; var height =doc.height; var bounds = app.activeDocument.activeLayer.bounds; var layerWidth = bounds[2]-bounds[0]; var layerHeight = bounds[3]-bounds[1]; layer.translate(-1 * (0 - bounds[0]), -1 * (0 - bounds[1])); var canvasRatio = width / height; var layerRatio = layerWidth / layerHeight; if (layerRatio < canvasRatio) { var newWidth = width; var newHeight = ((1.0 * width) / layerRatio); var MoveY = -1 * ((newHeight - height) / 2); var MoveX = 0; } else { layerRatio = layerHeight / layerWidth; var newHeight = height; var newWidth = ((1.0 * height) / layerRatio); var MoveX = -1 * ((newWidth - width) / 2); var MoveY = 0; } var resizePercent = newHeight/layerHeight*100; app.activeDocument.activeLayer.resize(resizePercent,resizePercent,AnchorPosition.TOPLEFT); layer.translate(MoveX, MoveY);  activeDocument.activeLayer = activeDocument.artLayers.getByName('Title'); activeDocument.activeLayer.textItem.contents = '${title}'; activeDocument.activeLayer = activeDocument.artLayers.getByName('@kcsoc FB Tag'); activeDocument.activeLayer.textItem.contents = '${facebookUrl}'; activeDocument.activeLayer = activeDocument.artLayers.getByName('@kcsoc Insta Tag'); activeDocument.activeLayer.textItem.contents = '${instaHandle}'; activeDocument.activeLayer = activeDocument.artLayers.getByName('Date'); activeDocument.activeLayer.textItem.contents = '${date}'; activeDocument.activeLayer = activeDocument.artLayers.getByName('Time'); activeDocument.activeLayer.textItem.contents = '${time}'; activeDocument.activeLayer = activeDocument.artLayers.getByName('LocationLine1'); activeDocument.activeLayer.textItem.contents = '${locationLine1}'; activeDocument.activeLayer = activeDocument.artLayers.getByName('LocationLine2'); activeDocument.activeLayer.textItem.contents = '${locationLine2}'; activeDocument.saveToOE("jpg")`;
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
										className={classes.poster}
										src={
											"data:image/jpg;base64," + imageData
										}
										alt="Generated KCSOC Poster"
									/>
								</Grid>
								<Grid
									item
									container
									justify="space-around"
									spacing={3}
									direction={matches ? "column" : "row"}
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
