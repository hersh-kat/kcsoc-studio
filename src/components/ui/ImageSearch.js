import React from "react";
import AutoCompleteSearchBar from "./AutoCompleteSearchBar";
import { useState } from "react";
import ImageWall from "./ImageWall";
import _ from "lodash";

export default function ImageSearch() {
  const [query, setQuery] = useState("");
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);

  async function loadMoreImages() {
    console.log("loading page: " + (page + 1));
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

  return (
    <React.Fragment>
      <AutoCompleteSearchBar
        query={query}
        setQuery={setQuery}
        getImageResults={getImageResults}
        setImages={setImages}
        loadMoreImages={loadMoreImages}
        page={page}
        setPage={setPage}
      />
      <ImageWall images={images} onScrollHandler={onScrollHandler} />
    </React.Fragment>
  );
}

async function getImageResults(query, setImages, page, setPage) {
  setPage(1);
  setImages([]);
  var url = "https://pixabay.com/api/?key=***REMOVED***";
  const queryAPI = query.replace(" ", "+");
  var otherVars = "&image_type=photo&orientation=horizontal&page=" + page;
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
  setImages(filter);
}
