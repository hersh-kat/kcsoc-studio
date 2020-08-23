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

export default function Hero() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Grid
      container
      direction="column"
      spacing={5}
      alignItems="center"
      style={{
        paddingBottom: "200px",
        minHeight: "100vh",
        position: "absolute",
      }}
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
          <img src={appLogo} />
        </Grid>
        <Grid item>
          <img style={{ WebkitFilter: "invert(100%)" }} src={textLogo} />
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
            style={{ "-webkit-filter": "invert(100%)" }}
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
            variant="contained"
            size="large"
            style={{ backgroundColor: "rgb(226, 242, 251)" }}
            startIcon={<BrushIcon />}
          >
            <Typography>Begin Creating</Typography>
          </Button>
        </Link>
      </Grid>
    </Grid>
  );
}
