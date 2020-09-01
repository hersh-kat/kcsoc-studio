import React from "react";
import appLogo from "../../assets/appLogo.svg";
import textLogo from "../../assets/textLogo.svg";
import {
  Grid,
  Typography,
  Button,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import graphicDesignLogo from "../../assets/website-design.png";
import BrushIcon from "@material-ui/icons/Brush";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  button: {
    backgroundColor: "rgb(226, 242, 251)",
    [theme.breakpoints.down("md")]: {
      marginTop: "20px",
      marginBottom: "20px",
    },
  },
}));

export default function Hero() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));
  const classes = useStyles();
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
        container
        item
        spacing={2}
        direction="row"
        justify="center"
        style={{ paddingTop: "60px" }}
      >
        <Grid item>
          <img alt="App logo" src={appLogo} width={150} />
        </Grid>
        <Grid item>
          <img
            alt="Text logo"
            style={{ WebkitFilter: "invert(100%)" }}
            src={textLogo}
          />
        </Grid>
      </Grid>
      <Grid
        item
        container
        direction={matches ? "column" : "row"}
        alignItems="center"
        style={{ minHeight: "60vh" }}
      >
        <Grid item xs={12} md={3}>
          <img
            alt="Graphic design icon"
            style={{ WebkitFilter: "invert(100%)" }}
            src={graphicDesignLogo}
          />
        </Grid>
        <Grid item xs style={{ marginLeft: "40px" }}>
          <Typography>
            I'm baby you probably haven't heard of them gluten-free subway tile
            art party deep v lo-fi. Helvetica hammock DIY, brooklyn taiyaki
            scenester asymmetrical put a bird on it chicharrones literally
            brunch celiac. Godard wayfarers vegan, lyft aesthetic fashion axe
            XOXO YOLO snackwave banh mi selfies fingerstache four dollar toast
            blog whatever. Heirloom shaman meh seitan butcher. I'm baby you
            probably haven't heard of them gluten-free subway tile art party
            deep v lo-fi. Helvetica hammock DIY, brooklyn taiyaki scenester
            asymmetrical put a bird on it chicharrones literally brunch celiac.
            Godard wayfarers vegan, lyft aesthetic fashion axe XOXO YOLO
            snackwave banh mi selfies fingerstache four dollar toast blog
            whatever. Heirloom shaman meh seitan butcher.
          </Typography>
        </Grid>
      </Grid>
      <Grid item>
        <Link to="/create" style={{ textDecoration: "none" }}>
          <Button
            className={classes.button}
            variant="contained"
            size="large"
            startIcon={<BrushIcon />}
          >
            <Typography>Begin Creating</Typography>
          </Button>
        </Link>
      </Grid>
    </Grid>
  );
}
