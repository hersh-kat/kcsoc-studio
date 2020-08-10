import React from "react";
import { createClient } from "pexels";
import { useState, useEffect } from "react";
import { Typography, Grid, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import HashLoader from "react-spinners/HashLoader";

//Returns an array of video links. Always of size 6.
async function getPexelVideos(tags) {
  const queries = tags.split(",");
  const vidLinks = [];
  const perPage = 25;
  const linksPerWord = 6 / queries.length;
  const client = createClient(
    "***REMOVED***"
  );

  for (var i = 0; i < queries.length; i++) {
    const query = queries[i].trim();

    const response = await client.videos.search({
      query,
      per_page: perPage,
      min_duration: 5,
      min_height: 720,
    });

    var randomNums = [];
    var min = 0;
    var max = perPage - 1;
    //Iterate through each search query
    for (var j = 0; j < linksPerWord; j++) {
      //For each search query, we want X (X = linksPerWord). number of video links. Choose X unique random numbers between 0 and perPage - 1 (inclusive).
      while (randomNums.length < linksPerWord) {
        var r = Math.floor(Math.random() * (max - min + 1)) + min;
        if (randomNums.indexOf(r) === -1) {
          vidLinks.push(response.videos[r]);
          randomNums.push(r);
        }
      }
    }
  }
  //console.log(vidLinks);
  return Promise.all(vidLinks);

  //If we have 3 tags, query the Pexels API 3 times. Choose 2 random videos each time.
  //2 tags, get 3 random videos for each search
  //1 tag, get 6 random videos for the search
}

async function ShotstackAPI(vidLinks, props) {
  let tracks = [];

  const {
    date,
    time,
    title,
    locationLine1,
    locationLine2,
  } = props.location.state;
  let kcsocPresentsClip = {
    asset: {
      type: "title",
      text: "KCSOC Presents",
      style: "marker",
      size: "small",
    },
    start: 0,
    length: 2,
    effect: "zoomIn",
    transition: {
      in: "fade",
      out: "fade",
    },
  };

  let textClip1 = {
    asset: {
      type: "title",
      text: title,
      style: "blockbuster",
      size: "large",
    },
    start: 2,
    length: 5,
    effect: "zoomIn",
  };

  let vidClip1 = {
    asset: {
      type: "video",
      src: vidLinks[0],
      trim: 0,
      volume: 0,
    },
    start: 2,
    length: 5,
    transition: {
      in: "wipeLeft",
      out: "wipeRight",
    },
  };

  let vidClip2 = {
    asset: {
      type: "video",
      src: vidLinks[1],
      trim: 0,
      volume: 0,
    },
    start: 7,
    length: 3,
  };

  let vidClip3 = {
    asset: {
      type: "video",
      src: vidLinks[2],
      trim: 0,
      volume: 0,
    },
    start: 10,
    length: 3,
  };

  let vidClip4 = {
    asset: {
      type: "video",
      src: vidLinks[3],
      trim: 0,
      volume: 0,
    },
    start: 13,
    length: 3,
  };

  let textClip4 = {
    asset: {
      type: "title",
      text: "Ancient Wisdom",
      style: "marker",
      size: "x-large",
    },
    start: 13,
    length: 3,
    transition: {
      in: "reveal",
      out: "reveal",
    },
  };

  let vidClip5 = {
    asset: {
      type: "video",
      src: vidLinks[4],
      trim: 0,
      volume: 0,
    },
    start: 16,
    length: 3,
  };

  let textClip5 = {
    asset: {
      type: "title",
      text: "Meditation",
      style: "marker",
      size: "x-large",
    },
    start: 16,
    length: 3,
    transition: {
      in: "reveal",
      out: "reveal",
    },
  };

  let vidClip6 = {
    asset: {
      type: "video",
      src: vidLinks[5],
      trim: 0,
      volume: 0,
    },
    start: 19,
    length: 3,
  };

  let textClip6 = {
    asset: {
      type: "title",
      text: "Free Food",
      style: "marker",
      size: "x-large",
    },
    start: 19,
    length: 3,
    transition: {
      in: "reveal",
      out: "reveal",
    },
  };

  let textClip7 = {
    asset: {
      type: "title",
      text: date + " | " + time,
      style: "marker",
      size: "x-large",
    },
    start: 22,
    length: 3,
  };

  let textClip8 = {
    asset: {
      type: "title",
      text: locationLine1 + " | " + locationLine2,
      style: "marker",
      size: "x-large",
    },
    start: 25,
    length: 3,
  };

  /*let imageClipEnd = {
    asset: {
      type: "image",
      src:
        "https://dl.dropboxusercontent.com/s/31lhyn53p2s3icy/logoVideo.png?dl=0",
    },
    start: 28,
    length: 2,
  };*/

  tracks[0] = {
    clips: [
      kcsocPresentsClip,
      textClip1,
      textClip4,
      textClip5,
      textClip6,
      textClip7,
      textClip8,
    ],
  };

  tracks[1] = {
    clips: [vidClip1, vidClip2, vidClip3, vidClip4, vidClip5, vidClip6],
  };

  let timeline = {
    soundtrack: {
      src:
        "https://dl.dropboxusercontent.com/s/qqq5q221dodw63p/GoKirtan%2520-%2520Narasimha%2520%28Official%2520Video%29%2520_%252012%252B-2.mp3?dl=0",
      effect: "fadeOut",
    },
    background: "#000000",
    tracks: tracks,
  };

  let output = {
    format: "mp4",
    resolution: "sd",
  };

  let edit = {
    timeline: timeline,
    output: output,
  };

  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    "x-api-key": "***REMOVED***",
  };

  const response = await fetch("https://api.shotstack.io/stage/render", {
    method: "POST",
    body: JSON.stringify(edit),
    headers: headers,
  });

  const responseJSON = await response.json();
  if (responseJSON.success == true) return responseJSON.response.id;
  else throw "An error occured. Video could not be generated";
}

export default function GenerateVideo(props) {
  const [videoLinks, setVideoLinks] = useState([]);
  const [isError, setIsError] = useState(false);
  const [videoURL, setVideoURL] = useState("");
  //const tags = "Meditate, Friends, Happy";

  useEffect(() => {
    async function fetchLinks() {
      if (props.location.state == null) return;

      const tags = props.location.state.tags;
      //Get Videos from Pexels API
      const vidLinks = await getPexelVideos(tags);
      //Get the HD videoLinks from vidLinks
      const vidLinksFinal = vidLinks.map((obj) => {
        let hdVideo =
          obj.video_files.find(
            (file) =>
              file.height === 720 ||
              file.height === 1440 ||
              file.height === 1920
          ) || obj.video_files[0];
        return hdVideo;
      });

      //Create poll function
      const poll = async ({ fn, validate, interval, id, maxAttempts }) => {
        let attempts = 0;

        const executePoll = async (resolve, reject) => {
          const result = await fn(id);
          attempts++;
          const resultJSON = await result.json();
          if (validate(resultJSON)) {
            return resolve(resultJSON);
          } else if (maxAttempts && attempts === maxAttempts) {
            return reject(new Error("Exceeded max attempts"));
          } else {
            setTimeout(executePoll, interval, resolve, reject);
          }
        };

        return new Promise(executePoll);
      };

      //Polling function
      const pollShotstackRender = async (vidID) => {
        const headers = {
          Accept: "application/json",
          "x-api-key": "***REMOVED***",
        };

        //console.log("Polling shotstack API...");

        const response = await fetch(
          "https://api.shotstack.io/stage/render/" + vidID,
          {
            method: "GET",
            headers: headers,
          }
        );
        return response;
      };

      //validation function
      const validateResponse = (result) => {
        //console.log(result);
        if (result.response.status == "done") return true;
        else return false;
      };

      //Call shotstack API
      try {
        const vidID = await ShotstackAPI(
          vidLinksFinal.map((obj) => obj.link),
          props
        );

        const response = await poll({
          fn: pollShotstackRender,
          validate: validateResponse,
          interval: 1500,
          maxAttempts: 30,
          id: vidID,
        });

        //console.log(response);
        setVideoURL(response.response.url);
      } catch (e) {
        //console.log(e);
        setIsError(true);
      }
    }
    // Update the document title using the browser API
    fetchLinks();
  }, []);

  return (
    <React.Fragment>
      {props.location.state == null && (
        <Typography>
          Oops...Something went wrong. Please return home by clicking{" "}
          <Link to="/">here</Link>.
        </Typography>
      )}
      {props.location.state != null && (
        <Grid
          container
          direction="column"
          alignItems="center"
          spacing={2}
          style={{ textAlign: "center" }}
        >
          {videoURL == "" && (
            <React.Fragment>
              <Grid item>
                <Typography>
                  Rendering may take up to 1 - 2 minutes, please wait...
                </Typography>
              </Grid>
              <Grid item style={{ marginTop: "30%" }}>
                <HashLoader size={150} color={"#70edff"} loading={true} />
              </Grid>
            </React.Fragment>
          )}
          {videoURL != "" && (
            <React.Fragment>
              <Grid item>
                <video controls autoPlay src={videoURL} type="video/mp4" />
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  color="secondary"
                  download
                  href={videoURL}
                >
                  Download MP4
                </Button>
              </Grid>
            </React.Fragment>
          )}
        </Grid>
      )}
    </React.Fragment>
  );
}
