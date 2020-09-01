import { createMuiTheme } from "@material-ui/core/styles";

const lightBlue = "#70edff";
const lightGreen = "#05cd51";
const lightGreenDisabled = "rgba(5, 205,81, 0.4)";
const lightGrey = "rgb(237, 237, 237)";
const lightPink = "#fca2ff";
const white = "#fff";
const black = "#000000";
const offWhite = "#e5ddd5";
const pastelBlue = "rgb(226, 242, 251)";
const pastelPink = "rgb(253, 234, 252)";
export default createMuiTheme({
  overrides: {
    MuiGrid: {
      container: {
        width: "100% !important",
      },
    },
  },
  palette: {
    common: {
      blue: lightBlue,
      pink: lightPink,
      lightGrey: lightGrey,
      lightGreenDisabled: lightGreenDisabled,
      pastelBlue: pastelBlue,
      pastelPink: pastelPink,
    },
    primary: {
      main: lightGreen,
    },
    secondary: {
      main: black,
    },
    text: {
      primary: black,
      secondary: black,
    },
    action: {
      active: "rgba(255, 255, 255, 0.74)",
      hover: "#05cd51",
    },
    background: {
      paper: white,
      default: offWhite,
    },
  },
  typography: {
    fontFamily: ["Open Sans", "sans-serif"].join(","),
    button: {
      textTransform: "uppercase",
      fontWeight: 500,
      fontSize: "0.8rem",
      letterSpacing: "0.1rem",
    },
    h2: {
      fontSize: "1.3rem",
      fontWeight: 600,
    },
    body1: {
      fontSize: "1.2rem",
      fontWeight: 600,
    },
  },
});
