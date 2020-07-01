import React from "react";
import Container from "@material-ui/core/Container";
import { ThemeProvider, CssBaseline } from "@material-ui/core";
import theme from "./ui/Theme";
import Home from "./ui/Home";
import ChooseCreation from "./ui/ChooseCreation";
import { Switch, Route } from "react-router-dom";
import PosterSetup from "./ui/PosterSetup";
import PosterTemplateWizard from "./ui/PosterTemplateWizard";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <Container>
          <Switch>
            <Route path="/create/poster/template">
              <PosterTemplateWizard />
            </Route>
            <Route path="/create/poster">
              <PosterSetup />
            </Route>
            <Route path="/create">
              <ChooseCreation />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </Container>
      </CssBaseline>
    </ThemeProvider>
  );
}

export default App;
