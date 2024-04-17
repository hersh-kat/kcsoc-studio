import React, { useState } from "react";
import {
  Grid,
  Typography,
  makeStyles,
  useMediaQuery,
  MenuItem,
  InputLabel,
  Card,
  CardContent,
  GridList,
  GridListTile,
} from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
//import { Dropbox } from "dropbox";
import PosterCard from "./PosterCard";
import Select from "@material-ui/core/Select";
import { CSSTransition } from "react-transition-group";
import HashLoader from "react-spinners/HashLoader";
import "../../css/animations.css";
import _24_hours_img from "../../assets/posters/term_1/24_hours.jpeg";
import googled_happiness from "../../assets/posters/term_1/googled_happiness.jpeg";
import habits from "../../assets/posters/term_1/habits.jpeg";
import inside_the_mind from "../../assets/posters/term_1/inside_the_mind.jpeg";
import karma from "../../assets/posters/term_1/karma.jpeg";
import under_the_skin from "../../assets/posters/term_1/under_the_skin.jpeg";
import _7_secrets from "../../assets/posters/term_2/7_secrets.jpeg";
import confidence from "../../assets/posters/term_2/confidence.jpeg";
import fake_news from "../../assets/posters/term_2/fake_news.jpeg";
import learn_anything from "../../assets/posters/term_2/learn_anything.jpeg";
import procrastination from "../../assets/posters/term_2/procrastination.jpeg";
import thank_you_next from "../../assets/posters/term_2/thank_you_next.jpeg";
import blank_template from "../../assets/posters/other/blank_template.jpeg";
import diwali from "../../assets/posters/other/diwali.jpeg";
import meditation_101 from "../../assets/posters/other/meditation_101.jpeg";
import the_god_debate from "../../assets/posters/other/the_god_debate.jpeg";
import the_sacred_activist from "../../assets/posters/other/the_sacred_activist.jpeg";
import unigita from "../../assets/posters/other/unigita.jpeg";

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
  titleCard: {
    minWidth: 300,
    maxHeight: 60,
    display: "inline-block",
    backgroundColor: theme.palette.common.pastelBlue,
  },
  inputCard: {
    display: "inline-block",
    backgroundColor: theme.palette.common.pastelPink,
    minWidth: 750,
  },
  root: {
    display: "flex",
    alignItems: "center",
    overflow: "hidden",
    flexWrap: "wrap",
  },
}));

/*function blobToImage(blob) {
  return new Promise((resolve, reject) => {
    var reader = new FileReader();
    reader.onloadend = function () {
      resolve(reader.result);
    };
    reader.readAsDataURL(blob.split(",")[1]);
  });
}

async function getSharedLinkFromFilePath(path, dbx, retries = 3) {
  try {
    var response = await dbx.sharingCreateSharedLink({
      path: path,
      short_url: false,
    });
    console.log(response);
    // If the response is OK, return the parsed JSON (or adjust as necessary)
    return response;
  } catch (resp) {
    if (retries < 0) throw resp;
    const retryAfter = 10;

    // Ensure we have a numeric value for retryAfter and calculate wait time in milliseconds
    const waitTime = retryAfter ? parseInt(retryAfter, 10) * 1000 : 5000; // Default to 5 seconds if missing

    console.log(`Rate limit hit, retrying in ${waitTime / 1000} seconds...`);

    // Wait for the specified time before retrying the request
    await new Promise((resolve) => setTimeout(resolve, waitTime));

    // Decrement retries and recursively call the function to try again
    return getSharedLinkFromFilePath(path, dbx, retries - 1);
  }
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

  //posters.push(await getPostersFromDropbox("/kcsoc studio/psds/term 1"));
  //posters.push(await getPostersFromDropbox("/kcsoc studio/psds/term 2"));
  //posters.push(await getPostersFromDropbox("/kcsoc studio/psds/other"));

  return Promise.all(posters);
}*/

//We want to get: downloadble URL. File name (path_display). Thumbnail.
/*async function getPostersFromDropbox(path) {
  var dbx = new Dropbox({
    accessToken: ``,
  });

  var files = await dbx.filesListFolder({ path: path });
  console.log(files);
  var posters = files.result.entries.map(async ({ path_lower }) => {
    //Get the dropbox URL
    var { result } = await getSharedLinkFromFilePath(path_lower, dbx);
    console.log(result.url);
    //Format the URL accordingly
    var dl_link = "https://dl.dropboxusercontent.com/";
    var new_link = dl_link + result.url.slice(24);

    //Get the Thumbnail
    var thumbnail = await getThumbnail(path_lower, dbx);
    console.log(thumbnail);
    var fileName = thumbnail.result.name.slice(0, -4);
    var blob = thumbnail.result.fileBlob;
    var src = await blobToImage(blob);
    console.log(src);

    const poster = {
      name: fileName,
      file_path: new_link,
      jpeg_path: src,
    };

    return poster; //This is an implicit promise. Posters will be filled with this promise.
  });

  //This async function only returns when all the promises in posters array has been resolved
  return Promise.all(posters);
}*/

export default function PosterStep1({
  currentStep,
  setURL,
  setStep,
  urlError,
  setURLError,
  showOnStep,
}) {
  const classes = useStyles();
  const files = [
    [
      {
        name: "24 Hours To Live",
        imageSrc: _24_hours_img,
        url: "https://dl.dropboxusercontent.com/s/5qozk2clzg55vqy/24%20Hours%20To%20Live.psd?dl=0",
      },
      {
        name: "Have You Ever Googled Happiness",
        imageSrc: googled_happiness,
        url: "https://dl.dropboxusercontent.com/s/o3j4yg004behdlm/Have%20You%20Ever%20Googled%20Happiness.psd?dl=0",
      },
      {
        name: "Habits",
        imageSrc: habits,
        url: "https://dl.dropboxusercontent.com/s/e77kq3kzwbuivj9/Habits.psd?dl=0",
      },
      {
        name: "Inside The Mind",
        imageSrc: inside_the_mind,
        url: "https://dl.dropboxusercontent.com/s/0no7qqbp1c03rmb/Inside%20The%20Mind.psd?dl=0",
      },
      {
        name: "Karma",
        imageSrc: karma,
        url: "https://dl.dropboxusercontent.com/s/2r1yefn4tlv2bvp/Karma.psd?dl=0",
      },
      {
        name: "Under The Skin",
        imageSrc: under_the_skin,
        url: "https://dl.dropboxusercontent.com/s/6ntprcmm1r0vo5g/Under%20The%20Skin.psd?dl=0",
      },
    ],
    [
      {
        name: "7 Secrets To Happiness",
        imageSrc: _7_secrets,
        url: "https://dl.dropboxusercontent.com/s/01fxavwvhyh88yt/7%20Secrets%20To%20Happiness.psd?dl=0",
      },
      {
        name: "Confidence Level",
        imageSrc: confidence,
        url: "https://dl.dropboxusercontent.com/s/ot4dwqi7qj62jos/Confidence%20Level.psd?dl=0",
      },
      {
        name: "Fake News",
        imageSrc: fake_news,
        url: "https://dl.dropboxusercontent.com/s/mt6kmd9bu47kzkx/Fake%20News.psd?dl=0",
      },
      {
        name: "How To Learn Anything Fast",
        imageSrc: learn_anything,
        url: "https://dl.dropboxusercontent.com/s/akl6sij4a912s8p/How%20To%20Learn%20Anything%20Fast.psd?dl=0",
      },
      {
        name: "Procrastination",
        imageSrc: procrastination,
        url: "https://dl.dropboxusercontent.com/s/z4li0wrf2gv35dz/Procrastination.psd?dl=0",
      },
      {
        name: "Thank You Next",
        imageSrc: thank_you_next,
        url: "https://dl.dropboxusercontent.com/s/df87923enriinrg/Thank%20You%20Next.psd?dl=0",
      },
    ],
    [
      {
        name: "Blank Template",
        imageSrc: blank_template,
        url: "https://dl.dropboxusercontent.com/s/s/36tx1d55hjakdo4/Blank%20Template.psd?dl=0",
      },
      {
        name: "Diwali",
        imageSrc: diwali,
        url: "https://dl.dropboxusercontent.com/s/mj9y3ksronkspya/Diwali.psd?dl=0",
      },
      {
        name: "Meditation 101",
        imageSrc: meditation_101,
        url: "https://dl.dropboxusercontent.com/s/7czwwekzk1p5aa4/Meditation%20101.psd?dl=0",
      },
      {
        name: "The God Debate",
        imageSrc: the_god_debate,
        url: "https://dl.dropboxusercontent.com/s/rcw4al3i3g36vgf/The%20God%20Debate.psd?dl=0",
      },
      {
        name: "The Sacred Activist",
        imageSrc: the_sacred_activist,
        url: "https://dl.dropboxusercontent.com/s/7otpg79pecnax96/The%20Sacred%20Activist.psd?dl=0",
      },
      {
        name: "UniGita",
        imageSrc: unigita,
        url: "https://dl.dropboxusercontent.com/s/wd5wv6hfzusxup8/UniGita.psd?dl=0",
      },
    ],
  ];
  const [folderIndex, setFolderIndex] = useState(0);
  const theme = useTheme();
  const mdMatch = useMediaQuery(theme.breakpoints.down("md"));
  const smMatch = useMediaQuery(theme.breakpoints.down("sm"));

  const handleFolders = (event) => {
    setFolderIndex(event.target.value);
  };

  let child = null;

  if (files[0].length === 0) {
    child = (
      <Grid
        container
        direction="row"
        justify="center"
        key={"loading"}
        style={{ position: "absolute" }}
        spacing={4}
      >
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
        alignItems={mdMatch ? "center" : undefined}
        style={{ position: "absolute", overflowY: "auto" }}
        key="loaded"
      >
        <Grid item>
          <Card className={classes.titleCard}>
            <CardContent>
              <Typography variant="h2">1. Choose your KCSOC event</Typography>
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
        <Grid item>
          <GridList
            cols={smMatch ? 1 : mdMatch ? 2 : 3}
            cellHeight="auto"
            style={{
              marginLeft: mdMatch || smMatch ? "100px" : "0px",
            }}
          >
            {files[folderIndex].map(({ imageSrc, name, url }) => {
              return (
                <GridListTile
                  cols={1}
                  spacing={3}
                  key={name}
                  style={{ marginBottom: "15px" }}
                >
                  <PosterCard
                    src={imageSrc}
                    title={name}
                    url={url}
                    setURL={setURL}
                    setStep={setStep}
                    setURLError={setURLError}
                  />
                </GridListTile>
              );
            })}
          </GridList>
        </Grid>
      </Grid>
    );
  }

  /*useEffect(() => {
    getPostersFromAllFolders().then((results) => setFiles(results));
  }, []);*/

  return (
    <CSSTransition
      key={showOnStep}
      in={currentStep === showOnStep}
      timeout={400}
      classNames={"move"}
      unmountOnExit
    >
      {child}
    </CSSTransition>
  );
}
