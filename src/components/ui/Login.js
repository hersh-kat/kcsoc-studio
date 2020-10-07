import React from "react";
import { Grid, TextField, Button, Typography } from "@material-ui/core";

export default function Login() {
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
				item
				spacing={2}
				direction="row"
				justify="center"
				style={{ paddingTop: "60px" }}
			>
				<Typography>
					<h1>Log in</h1>
				</Typography>
			</Grid>
			<Grid
				item
				spacing={2}
				direction="row"
				justify="center"
				style={{ paddingTop: "60px" }}
			>
				<TextField required id="filled-required" label="Username" />
			</Grid>

			<Grid item style={{ paddingTop: "60px" }}>
				<TextField required id="filled-required" label="Password" />
			</Grid>

			<Grid item style={{ paddingTop: "60px" }}>
				<Button variant="contained" color="primary">
					Login
				</Button>
			</Grid>
		</Grid>
	);
}
