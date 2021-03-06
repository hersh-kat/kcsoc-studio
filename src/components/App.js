import React from "react";
import Container from "@material-ui/core/Container";
import { ThemeProvider, CssBaseline } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import theme from "./ui/Theme";
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

const useStyles = makeStyles(() => ({
  bgImage: {
    position: "absolute",
    backgroundImage: "url(" + backgroundImage + ")",
    height: "100%",
    width: "100%",
    opacity: 0.1,
  },
}));

function App() {
  const styles = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <div className={styles.bgImage}></div>
        <Container style={{ position: "relative" }}>
          <AppBarHeader />
          <Route
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
          ></Route>
          <Route
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
          ></Route>
          <Route
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
          ></Route>
          <Route exact path="/create/trailer">
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
          </Route>
          <Route exact path="/create/poster/template">
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
          </Route>
          <Route exact path="/create/poster/custom">
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
          </Route>
          <Route exact path="/create/poster">
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
          </Route>
          <Route exact path="/create">
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
    </ThemeProvider>
  );
}

export default App;
