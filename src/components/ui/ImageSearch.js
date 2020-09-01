import React from "react";
import AutoCompleteSearchBar from "./AutoCompleteSearchBar";
import { useState } from "react";
import ImageWall from "./ImageWall";
import _ from "lodash";
import "../../css/animations.css";
import {
  Grid,
  Typography,
  Card,
  CardContent,
  makeStyles,
  useMediaQuery,
} from "@material-ui/core";
import { CSSTransition } from "react-transition-group";
import { useTheme } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  titleCard: {
    minWidth: 300,
    maxHeight: 60,
    display: "inline-block",
    backgroundColor: theme.palette.common.pastelBlue,
  },
}));

export default function ImageSearch({
  currentStep,
  showOnStep,
  setStep,
  setURL,
  setURLError,
  urlError,
}) {
  const [query, setQuery] = useState("");
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));

  async function loadMoreImages() {
    var url = "https://pixabay.com/api/?key=***REMOVED***";
    const queryAPI = query.replace(" ", "+");
    var otherVars =
      "&image_type=photo&orientation=horizontal&page=" + (page + 1);
    url += "&q=" + queryAPI + otherVars;
    const data = await (await fetch(url)).json();
    const filter = data.hits.map(
      ({
        fullHDURL,
        imageHeight,
        imgeWidth,
        imageURL,
        largeImageURL,
        tags,
        user,
        webformatHeight,
        webformatWidth,
        webformatURL,
        id,
      }) => ({
        fullHDURL,
        imageHeight,
        imgeWidth,
        imageURL,
        largeImageURL,
        tags,
        user,
        webformatHeight,
        webformatWidth,
        webformatURL,
        id,
      })
    );
    setImages([...images, ...filter]);
    console.log(images);
  }

  const loadMoreImagesDebounce = _.debounce(
    (scrollHeight, scrollTop, clientHeight) => {
      if (isLoading) return;
      //console.log(scrollHeight, scrollTop, clientHeight);
      if (scrollHeight - scrollTop === clientHeight) {
        setIsLoading(true);
        setPage(page + 1);
        loadMoreImages();
        setIsLoading(false);
      }
    },
    100
  );

  const onScrollHandler = (e) => {
    loadMoreImagesDebounce(
      e.target.scrollHeight,
      e.target.scrollTop,
      e.target.clientHeight
    );
  };

  const child = (
    <Grid
      item
      container
      direction="column"
      spacing={4}
      justify="center"
      alignItems={matches ? "center" : ""}
      style={{ position: "absolute" }}
      key="loaded"
    >
      <Grid item>
        <Card className={classes.titleCard}>
          <CardContent>
            <Typography variant="h2">
              1. Search for a background image for your poster
            </Typography>
          </CardContent>
        </Card>
        <Typography
          variant="body1"
          style={
            urlError
              ? {
                  color: "#f44336",
                  fontSize: "0.75rem",
                  fontWeight: 400,
                  lineHeight: 1.66,
                }
              : {
                  display: "none",
                }
          }
        >
          Please select an image to use.
        </Typography>
      </Grid>
      <Grid item>
        <AutoCompleteSearchBar
          query={query}
          setQuery={setQuery}
          getImageResults={getImageResults}
          setImages={setImages}
          loadMoreImages={loadMoreImages}
          page={page}
          setPage={setPage}
        />
      </Grid>
      <Grid item>
        <ImageWall
          images={images}
          onScrollHandler={onScrollHandler}
          currentStep={currentStep}
          setImageURL={setURL}
          setStep={setStep}
          setImageURLError={setURLError}
        />
      </Grid>
    </Grid>
  );

  return (
    <CSSTransition
      key={showOnStep}
      in={currentStep == showOnStep}
      timeout={400}
      classNames={"move"}
      unmountOnExit
    >
      {child}
    </CSSTransition>
  );
}

async function getImageResults(query, setImages, page, setPage) {
  setPage(1);
  setImages([]);
  var url = "https://pixabay.com/api/?key=***REMOVED***";
  const queryAPI = query.replace(" ", "+");
  var otherVars =
    "&image_type=photo&safesearch=true&orientation=horizontal&page=" + page;
  url += "&q=" + queryAPI + otherVars;
  const data = await (await fetch(url)).json();
  const filter = data.hits.map(
    ({
      fullHDURL,
      imageHeight,
      imageWidth,
      imageURL,
      largeImageURL,
      tags,
      user,
      webformatHeight,
      webformatWidth,
      webformatURL,
      id,
    }) => ({
      fullHDURL,
      imageHeight,
      imageWidth,
      imageURL,
      largeImageURL,
      tags,
      user,
      webformatHeight,
      webformatWidth,
      webformatURL,
      id,
    })
  );
  console.log(filter);
  setImages(filter);
}
