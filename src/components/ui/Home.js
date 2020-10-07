import React from "react";
import appLogo from "../../assets/appLogo.svg";
import textLogo from "../../assets/textLogo.svg";
import {
	Grid,
	Typography,
	Button,
	useMediaQuery,
	useTheme,
} from "@material-ui/core";
import graphicDesignLogo from "../../assets/website-design.png";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
	button: {
		backgroundColor: "rgb(226, 242, 251)",
		[theme.breakpoints.down("md")]: {
			marginTop: "20px",
			marginBottom: "20px",
		},
	},
}));

export default function Hero() {
	const theme = useTheme();
	const matches = useMediaQuery(theme.breakpoints.down("sm"));
	const xsMatches = useMediaQuery(theme.breakpoints.down("xs"));
	const classes = useStyles();
	return (
		<Grid
			container
			direction="column"
			spacing={4}
			alignItems="center"
			justify="center"
			style={{ position: "absolute" }}
		>
			<Grid
				container
				item
				spacing={2}
				direction="row"
				justify="center"
				style={{ paddingTop: "60px" }}
			>
				<Grid item>
					<img alt="App logo" src={appLogo} width={150} />
				</Grid>
				<Grid item>
					<img
						alt="Text logo"
						style={{ WebkitFilter: "invert(100%)" }}
						src={textLogo}
						width={xsMatches ? 380 : 480}
					/>
				</Grid>
			</Grid>
			<Grid
				item
				container
				direction={matches ? "column" : "row"}
				alignItems="center"
				style={{ minHeight: "60vh" }}
			>
				<Grid item xs={12} md={3}>
					<img
						alt="Graphic design icon"
						style={{ WebkitFilter: "invert(100%)" }}
						src={graphicDesignLogo}
					/>
				</Grid>
				<Grid item xs style={{ marginLeft: "40px" }}>
					<Typography>
						Welcome to KCSOC Studio (Version 1.0) - Your online
						marketing assistant! This revolutionary tool will help
						you make professional, high-quality posters and trailers
						for your local KCSOC without you needing to have any
						photo/video editing skills whatsover! New features are
						planned to be added soon. If you come across any bugs or
						have some feedback, please email{" "}
						<a href="mailto:katariahersh@gmail.com">
							hersh@kcsoc.com
						</a>
						. Click the button below to get started!
					</Typography>
				</Grid>
			</Grid>
			<Grid item>
				<Link to="/login" style={{ textDecoration: "none" }}>
					<Button
						className={classes.button}
						variant="contained"
						size="large"
					>
						<Typography>Login</Typography>
					</Button>
				</Link>
			</Grid>
		</Grid>
	);
}
