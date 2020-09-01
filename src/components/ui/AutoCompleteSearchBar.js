import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { useState } from "react";
import jsonp from "jsonp";
import { makeStyles } from "@material-ui/styles";
import { Card, CardContent } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  inputCard: {
    display: "inline-block",
    backgroundColor: theme.palette.common.pastelPink,
    [theme.breakpoints.down("sm")]: {
      minWidth: 400,
    },
    minWidth: 750,
  },
}));

export default function AutoCompleteSearchBar({
  query,
  setQuery,
  getImageResults,
  setImages,
  page,
  setPage,
}) {
  const [results, setResults] = useState([]);
  const classes = useStyles();

  return (
    <React.Fragment>
      <Card className={classes.inputCard}>
        <CardContent>
          <Autocomplete
            freeSolo
            options={results.map((option) => option.term)}
            renderInput={(params) => (
              <TextField
                autoFocus
                fullWidth
                {...params}
                label="Search"
                margin="normal"
                variant="standard"
                color="secondary"
                value={query}
                onKeyDown={(e) => {
                  if (e.key === "Enter")
                    getImageResults(query, setImages, page, setPage);
                }}
                onChange={(event) => {
                  setQuery(event.target.value);
                  getResults(event.target.value, setResults);
                }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            )}
          />
        </CardContent>
      </Card>
    </React.Fragment>
  );
}

function getResults(query, setResults) {
  if (query == "") return;

  jsonp(
    "https://autocomplete.fotolia.com/?callback=getData&language_id=2&query=" +
      query,
    { name: "getData" },
    (error, data) => {
      if (error) {
        console.log(error);
      } else {
        setResults(data.hits);
      }
    }
  );
}
