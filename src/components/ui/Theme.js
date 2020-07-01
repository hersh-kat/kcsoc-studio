import { createMuiTheme } from "@material-ui/core/styles";

const darkNavyBlue = "#0e141b";
const lightBlue = "#70edff";
const lightPink = "#fca2ff";
const white = "#fff";
const lightNavyBlue = "#2a3a4d";

export default createMuiTheme({
  palette: {
    common: {
      blue: lightBlue,
      pink: lightPink,
    },
    primary: {
      main: darkNavyBlue,
    },
    secondary: {
      main: lightBlue,
    },
    text: {
      primary: white,
      secondary: "rgba(255, 255, 255, 0.74)",
    },
    action: {
      hover: lightBlue,
    },
    background: {
      paper: lightNavyBlue,
      default: darkNavyBlue,
    },
  },
  typography: {
    fontFamily: ["Fira Sans", "sans-serif"].join(","),
    button: {
      textTransform: "uppercase",
      fontWeight: 500,
      fontSize: "0.8rem",
      letterSpacing: "0.1rem",
    },
    h2: {
      fontSize: "1.3rem",
      fontWeight: 700,
    },
    body1: {
      fontSize: "1.2rem",
      fontWeight: 600,
    },
  },
});
