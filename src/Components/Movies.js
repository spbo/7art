import React, { useEffect, useState, useContext } from "react";
import Async from "react-async";
import DisplayFetchedData from "./DisplayFetchedData";
import PageData from "../Context/PageData-context";

//fetching Now Playing Movies and Genres
const loadData = async ({ pageNum }) => {
  const [nowPlayingResponse, genresResponse] = await Promise.all([
    fetch(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=172194a84f1627f7745c68590173ac55&language=en-US&page=${pageNum}`
    ),
    fetch(
      "https://api.themoviedb.org/3/genre/movie/list?api_key=172194a84f1627f7745c68590173ac55&language=en-US"
    ),
  ]);

  if (!nowPlayingResponse.ok) throw new Error(nowPlayingResponse.statusText);
  if (!genresResponse.ok) throw new Error(genresResponse.statusText);

  const nowPlaying = await nowPlayingResponse.json();
  const genresList = await genresResponse.json();

  return { nowPlaying, genresList };
};

const Movies = () => {
  const [page, setPage] = useState(1);

  const pageSelection = () => {
    console.log("geia")
  };

  return (
    <Async promiseFn={loadData} pageNum={1} watch={page}>
      <Async.Pending>Loading...</Async.Pending>
      <Async.Rejected>
        {(error) => `Something went wrong: ${error.message}`}
      </Async.Rejected>
      <Async.Fulfilled>
        {(data) => <DisplayFetchedData {...data} pageSelection={pageSelection}/>}
      </Async.Fulfilled>
    </Async>
  );
};

export default Movies;

