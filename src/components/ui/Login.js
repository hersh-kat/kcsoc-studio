import React, { useState } from "react";
import { Grid, TextField, Button, Typography } from "@material-ui/core";

export default function Login() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [helperMessages, setHelperMessages] = useState({
		username: "",
		password: "",
	});
	const [errors, setErrors] = useState({
		username: false,
		password: false,
	});
	const [submitDisabled, setSubmitDisabled] = useState(false);

	const submit = (e) => {
		e.preventDefault();
		console.log(username, password);
		if (!username && !password) {
			setHelperMessages({
				username: "Username is required",
				password: "Password is required",
			});
			setErrors({
				username: true,
				password: true,
			});
			return;
		}
		if (!username) {
			setHelperMessages({
				username: "Username is required",
			});
			setErrors({
				username: true,
			});
			return;
		}
		if (!password) {
			setHelperMessages({
				password: "Password is required",
			});
			setErrors({
				password: true,
			});
			return;
		}
		setErrors({ username: false, password: false });
		setHelperMessages({ username: "", password: "" });
		setSubmitDisabled(true);
	};
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
				<TextField
					id="filled-required"
					label="Username"
					onChange={(e) => {
						return setUsername(e.target.value);
					}}
					helperText={helperMessages.username}
					error={errors.username}
				/>
			</Grid>

			<Grid item style={{ paddingTop: "60px" }}>
				<TextField
					id="filled-password-input"
					label="Password"
					type="password"
					autoComplete="current-password"
					onChange={(e) => {
						return setPassword(e.target.value);
					}}
					helperText={helperMessages.password}
					error={errors.password}
				/>
			</Grid>

			<Grid item style={{ paddingTop: "60px" }}>
				<Button
					variant="contained"
					color="primary"
					onClick={submit}
					disabled={submitDisabled}
				>
					Login
				</Button>
			</Grid>
		</Grid>
	);
}
