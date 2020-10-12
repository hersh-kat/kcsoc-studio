import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-modal";
import Container from "@material-ui/core/Container";
import { ThemeProvider, CssBaseline } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import theme from "./ui/Theme";
import Login from "./ui/Login";
import Home from "./ui/Home";
import ChooseCreation from "./ui/ChooseCreation";
import { Route } from "react-router-dom";
import PosterSetup from "./ui/PosterSetup";
import PosterTemplateWizard from "./ui/PosterTemplateWizard";
import GeneratePoster from "./ui/GeneratePoster";
import GenerateCustomPoster from "./ui/GenerateCustomPoster";
import { CSSTransition } from "react-transition-group";
import "../css/animations.css";
import PosterCustomWizard from "./ui/PosterCustomWizard";
import GenerateVideo from "./ui/GenerateVideo";
import VideoWizard from "./ui/VideoWizard";
import backgroundImage from "../assets/background.png";
import AppBarHeader from "./ui/AppBarHeader";
import UserContext from "./contexts/UserContext";
import PrivateRoute from "./routers/PrivateRoute";

const useStyles = makeStyles(() => ({
	bgImage: {
		position: "absolute",
		backgroundImage: "url(" + backgroundImage + ")",
		height: "100%",
		width: "100%",
		opacity: 0.1,
	},
}));

Modal.setAppElement("#root");

function App() {
	const styles = useStyles();

	const [userData, setUserData] = useState({
		token: undefined,
	});

	useEffect(() => {
		const checkLoggedIn = async () => {
			let token = localStorage.getItem("auth-token");

			if (token === null) {
				localStorage.setItem("auth-token", "");
				token = "";
			}
			const tokenRes = await axios.post(
				"http://localhost:5000/users/tokenIsValid",
				null,
				{ headers: { "x-auth-token": token } }
			);
			if (tokenRes.data) {
				setUserData({
					token,
				});
			}
		};

		checkLoggedIn();
	}, []);

	return (
		<ThemeProvider theme={theme}>
			<UserContext.Provider value={{ userData, setUserData }}>
				<CssBaseline>
					<div className={styles.bgImage}></div>
					<Container style={{ position: "relative" }}>
						<AppBarHeader />
						<PrivateRoute
							exact
							path="/create/poster/custom/generate"
							render={(props) => (
								<CSSTransition
									in={props.match != null}
									timeout={300}
									classNames="page"
									unmountOnExit
								>
									<GenerateCustomPoster {...props} />
								</CSSTransition>
							)}
						></PrivateRoute>
						<PrivateRoute
							exact
							path="/create/poster/template/generate"
							render={(props) => (
								<CSSTransition
									in={props.match != null}
									timeout={300}
									classNames="page"
									unmountOnExit
								>
									<GeneratePoster {...props} />
								</CSSTransition>
							)}
						></PrivateRoute>
						<PrivateRoute
							exact
							path="/create/trailer/generate"
							render={(props) => (
								<CSSTransition
									in={props.match != null}
									timeout={300}
									classNames="page"
									unmountOnExit
								>
									<GenerateVideo {...props} />
								</CSSTransition>
							)}
						></PrivateRoute>
						<PrivateRoute exact path="/create/trailer">
							{({ match }) => (
								<CSSTransition
									in={match != null}
									timeout={300}
									classNames="page"
									unmountOnExit
								>
									<VideoWizard />
								</CSSTransition>
							)}
						</PrivateRoute>
						<PrivateRoute exact path="/create/poster/template">
							{({ match }) => (
								<CSSTransition
									in={match != null}
									timeout={300}
									classNames="page"
									unmountOnExit
								>
									<PosterTemplateWizard />
								</CSSTransition>
							)}
						</PrivateRoute>
						<PrivateRoute exact path="/create/poster/custom">
							{({ match }) => (
								<CSSTransition
									in={match != null}
									timeout={300}
									classNames="page"
									unmountOnExit
								>
									<PosterCustomWizard />
								</CSSTransition>
							)}
						</PrivateRoute>
						<PrivateRoute exact path="/create/poster">
							{({ match }) => (
								<CSSTransition
									in={match != null}
									timeout={300}
									classNames="page"
									unmountOnExit
								>
									<PosterSetup />
								</CSSTransition>
							)}
						</PrivateRoute>
						<PrivateRoute exact path="/create">
							{({ match }) => (
								<CSSTransition
									in={match != null}
									timeout={300}
									classNames="page"
									unmountOnExit
								>
									<ChooseCreation />
								</CSSTransition>
							)}
						</PrivateRoute>
						<Route exact path="/login">
							{({ match }) => (
								<CSSTransition
									in={match != null}
									timeout={300}
									classNames="page"
									unmountOnExit
								>
									<Login />
								</CSSTransition>
							)}
						</Route>

						<Route exact path="/">
							{({ match }) => (
								<CSSTransition
									in={match != null}
									timeout={300}
									classNames="page"
									unmountOnExit
								>
									<Home />
								</CSSTransition>
							)}
						</Route>
					</Container>
				</CssBaseline>
			</UserContext.Provider>
		</ThemeProvider>
	);
}

export default App;
