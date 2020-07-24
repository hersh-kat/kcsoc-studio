import React from "react";
import Container from "@material-ui/core/Container";
import { ThemeProvider, CssBaseline } from "@material-ui/core";
import theme from "./ui/Theme";
import Home from "./ui/Home";
import ChooseCreation from "./ui/ChooseCreation";
import { Switch, Route } from "react-router-dom";
import PosterSetup from "./ui/PosterSetup";
import PosterTemplateWizard from "./ui/PosterTemplateWizard";
import GeneratePoster from "./ui/GeneratePoster";
import { CSSTransition } from "react-transition-group";
import "../css/animations.css";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <Container style={{ position: "relative" }}>
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
