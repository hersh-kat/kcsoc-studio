import React, { useState, useEffect } from "react";
import {
  Grid,
  Typography,
  Button,
  makeStyles,
  useMediaQuery,
  MenuItem,
  InputLabel,
} from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import { Dropbox, DropboxBase } from "dropbox";
import fetch from "isomorphic-fetch";
import { Link } from "react-router-dom";
import PosterCard from "./PosterCard";
import Select from "@material-ui/core/Select";
import { CSSTransition } from "react-transition-group";
import { css } from "@emotion/core";
import HashLoader from "react-spinners/HashLoader";
import "../../css/animations.css";

const useStyles = makeStyles((theme) => ({
  select: {
    "&:before": {
      borderColor: "white",
    },
    "&:after": {
      borderColor: "white",
    },
  },
  icon: {
    fill: "white",
  },
}));

function blobToImage(blob) {
  return new Promise((resolve, reject) => {
    var reader = new FileReader();
    reader.onloadend = function () {
      resolve(reader.result);
    };
    reader.readAsDataURL(blob);
  });
}

async function getSharedLinkFromFilePath(path, dbx) {
  var link = await dbx.sharingCreateSharedLink({
    path: path,
    short_url: false,
  });

  return link;
}

async function getThumbnail(path, dbx) {
  var image = await dbx.filesGetThumbnail({
    path: path,
    format: {
      ".tag": "png",
    },
    size: {
      ".tag": "w480h320",
    },
    mode: {
      ".tag": "strict",
    },
  });

  return image;
}

async function getPostersFromAllFolders() {
  var posters = [];
  posters.push(await getPostersFromDropbox("/kcsoc studio/psds/term 1"));
  posters.push(await getPostersFromDropbox("/kcsoc studio/psds/term 2"));
  posters.push(await getPostersFromDropbox("/kcsoc studio/psds/other"));

  return Promise.all(posters);
}

//We want to get: downloadble URL. File name (path_display). Thumbnail.
async function getPostersFromDropbox(path) {
  var dbx = new Dropbox({
    fetch: fetch,
    accessToken:
      "***REMOVED***",
  });

  var files = await dbx.filesListFolder({ path: path });

  var posters = files.entries.map(async ({ path_lower }) => {
    //Get the dropbox URL
    var { url } = await getSharedLinkFromFilePath(path_lower, dbx);
    //Format the URL accordingly
    var dl_link = "https://dl.dropboxusercontent.com/";
    var new_link = dl_link + url.slice(24);

    //Get the Thumbnail
    var thumbnail = await getThumbnail(path_lower, dbx);

    var fileName = thumbnail.name.slice(0, -4);
    var blob = thumbnail.fileBlob;
    var src = await blobToImage(blob);

    const poster = {
      name: fileName,
      url: new_link,
      imageSrc: src,
    };

    return poster; //This is an implicit promise. Posters will be filled with this promise.
  });

  //This async function only returns when all the promises in posters array has been resolved
  return Promise.all(posters);
}

export default function PosterStep1({
  currentStep,
  setURL,
  setStep,
  urlError,
  setURLError,
}) {
  const classes = useStyles();
  const [files, setFiles] = useState([[]]);
  const [folderIndex, setFolderIndex] = useState(0);

  const handleFolders = (event) => {
    setFolderIndex(event.target.value);
  };

  let child = null;
  if (files[0].length == 0) {
    child = (
      <Grid container direction="row" justify="center" key={"loading"}>
        <Grid item style={{ marginTop: "60px" }}>
          <HashLoader size={150} color={"#70edff"} loading={true} />
        </Grid>
      </Grid>
    );
  } else {
    child = (
      <Grid
        item
        container
        direction="column"
        spacing={4}
        justify="center"
        style={{ position: "absolute" }}
        key="loaded"
      >
        <Grid item>
          <Typography variant="h2">1. Choose your event</Typography>
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
            Please select a poster template to use.
          </Typography>
        </Grid>
        <Grid item>
          <InputLabel id="folder-label">Folder</InputLabel>
          <Select
            labelId="folder-index-label"
            className={classes.select}
            inputProps={{
              classes: {
                icon: classes.icon,
              },
            }}
            id="demo-simple-select"
            value={folderIndex}
            onChange={handleFolders}
          >
            <MenuItem value={0}>Term 1</MenuItem>
            <MenuItem value={1}>Term 2</MenuItem>
            <MenuItem value={2}>Other</MenuItem>
          </Select>
        </Grid>
        <Grid container direction="row" spacing={2}>
          {files[folderIndex].map(({ imageSrc, name, url }) => {
            return (
              <Grid key={name} item>
                <PosterCard
                  src={imageSrc}
                  title={name}
                  url={url}
                  setURL={setURL}
                  setStep={setStep}
                  setURLError={setURLError}
                />
              </Grid>
            );
          })}
        </Grid>
      </Grid>
    );
  }

  useEffect(() => {
    getPostersFromAllFolders().then((results) => setFiles(results));
  }, []);

  return (
    <CSSTransition
      key={1}
      in={currentStep == 1}
      timeout={400}
      classNames={"move"}
      unmountOnExit
    >
      {child}
    </CSSTransition>
  );
}
