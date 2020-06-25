import React from "react";
import appLogo from "../../assets/appLogo.svg";
import textLogo from "../../assets/textLogo.svg";
import { Grid, Typography, Button } from "@material-ui/core";
import graphicDesignLogo from "../../assets/website-design.png";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import ScrollableAnchor from "react-scrollable-anchor";

export default function Hero() {
  return (
    <ScrollableAnchor id="hero">
      <Grid container direction="column" spacing={5} alignItems="center">
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
            <img src={textLogo} />
          </Grid>
        </Grid>
        <Grid
          item
          container
          direction="row"
          alignItems="center"
          style={{ minHeight: "60vh" }}
        >
          <Grid item>
            <img src={graphicDesignLogo} />
          </Grid>
          <Grid item xs style={{ marginLeft: "40px" }}>
            <Typography>
              I'm baby you probably haven't heard of them gluten-free subway
              tile art party deep v lo-fi. Helvetica hammock DIY, brooklyn
              taiyaki scenester asymmetrical put a bird on it chicharrones
              literally brunch celiac. Godard wayfarers vegan, lyft aesthetic
              fashion axe XOXO YOLO snackwave banh mi selfies fingerstache four
              dollar toast blog whatever. Heirloom shaman meh seitan butcher.
              I'm baby you probably haven't heard of them gluten-free subway
              tile art party deep v lo-fi. Helvetica hammock DIY, brooklyn
              taiyaki scenester asymmetrical put a bird on it chicharrones
              literally brunch celiac. Godard wayfarers vegan, lyft aesthetic
              fashion axe XOXO YOLO snackwave banh mi selfies fingerstache four
              dollar toast blog whatever. Heirloom shaman meh seitan butcher.
            </Typography>
          </Grid>
        </Grid>
        <Grid item>
          <Button
            variant="outlined"
            color="secondary"
            startIcon={<KeyboardArrowDownIcon />}
            href="#choose-creation"
          >
            Begin Creating
          </Button>
        </Grid>
      </Grid>
    </ScrollableAnchor>
  );
}
