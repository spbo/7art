import React, { useState } from "react";
import { useAsync } from "react-async";
import Movies from "./Movies";
import InfiniteScroll from "react-infinite-scroll-component";

// fetch "Now Playing" Movies and Genres
const fetcNowPlayinghMoviesAndGenres = async ({ page }) => {
  const [nowPlayingResponse, genresResponse] = await Promise.all([
    fetch(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=172194a84f1627f7745c68590173ac55&language=en-US&page=${page}`
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

let totalMovies = [];

const Now_Playing_Movies = () => {
  let [page, setPage] = useState(1);
  const [movies, setMovies] = useState([]);
  const { data, error, isLoading } = useAsync({
    promiseFn: fetcNowPlayinghMoviesAndGenres,
    page: page,
    watch: page,
  });

  const PageUp = () => {
    setPage(prevPage => prevPage + 1);
  };

  if (isLoading) return "Loading...";
  if (error) return `Something went wrong: ${error.message}`;
  if (data) {
    if (totalMovies.length === 0) {
      data.nowPlaying.results.forEach(result => totalMovies.push(result))
    } else if (data.nowPlaying.page >= page) {
      data.nowPlaying.results.forEach(result => totalMovies.push(result))
    }

    return (
      <div>
        <button onClick={PageUp}>push</button>
        {console.log(totalMovies)}
        <InfiniteScroll
          dataLength={100} //This is important field to render the next data
          next={() => {}}
          hasMore={true}
          loader={<h4>Loading...</h4>}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          <Movies movies={totalMovies} genres={data.genresList.genres} />
        </InfiniteScroll>
      </div>
    );
  }
};

export default Now_Playing_Movies;

// data.nowPlaying.results.forEach((result) => totalMovies.push(result));
