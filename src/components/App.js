import React from "react";
import Container from "@material-ui/core/Container";
import { ThemeProvider, CssBaseline } from "@material-ui/core";
import theme from "./ui/Theme";
import Hero from "./ui/Hero";
import ChooseCreation from "./ui/ChooseCreation";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <Container>
          <Hero />
          <ChooseCreation />
        </Container>
      </CssBaseline>
    </ThemeProvider>
  );
}

export default App;
