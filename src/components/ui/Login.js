import React, { useState, useContext } from "react";
import { Grid, TextField, Button, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import axios from "axios";
import { useHistory } from "react-router-dom";
import UserContext from "../contexts/UserContext";

const useStyles = makeStyles((theme) => ({
	loginError: {
		fontSize: "15px",
		color: "red",
	},
}));

export default function Login(props) {
	const classes = useStyles();
	const history = useHistory();
	const { setUserData } = useContext(UserContext);

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
	const [loginError, setLoginError] = useState("");

	const submit = async (e) => {
		e.preventDefault();
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
		try {
			const loginRes = await axios.post(
				`${process.env.REACT_APP_KCSOC_SERVER_URL}/users/login`,
				{
					username,
					password,
				}
			);
			setUserData({
				token: loginRes.data.token,
			});

			localStorage.setItem("auth-token", loginRes.data.token);
			if (!props.private) {
				history.push("/create");
			}
		} catch (e) {
			if (e.response) {
				e.response.data.msg && setLoginError(e.response.data.msg);
			}
		}
		setUsername("");
		setPassword("");
		setSubmitDisabled(false);
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
					value={username}
					onKeyDown={(e) => {
						if (e.key === "Enter") {
							submit(e);
						}
					}}
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
					value={password}
					onKeyDown={(e) => {
						if (e.key === "Enter") {
							submit(e);
						}
					}}
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
			<Grid item>
				<Typography className={classes.loginError}>
					<p>{loginError}</p>
				</Typography>
			</Grid>
		</Grid>
	);
}
