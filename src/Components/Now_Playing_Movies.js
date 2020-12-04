import React, { useEffect, useState } from "react";
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

const Now_Playing_Movies = () => {
  let [page, setPage] = useState(1);
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);

  const { data, error, isLoading } = useAsync({
    promiseFn: fetcNowPlayinghMoviesAndGenres,
    page: page,
    watch: page,
  });

  // page up for trigger the next API call with the next page
  const PageUp = () => {
    setPage((page) => ++page);
  };

  // When data changes set the local states
  useEffect(() => {
    if (data) {
      // set genres on the first time. (but maybe you want this in case genres change)
      if (genres.length === 0) {
        setGenres(data.genresList.genres);
      }
      setMovies((prevMovies) => prevMovies.concat(data.nowPlaying.results));
    }
  }, [data]);

  if (isLoading) return "Loading...";
  if (error) return `Something went wrong: ${error.message}`;
  if (data) {
    return (
      <div>
        <InfiniteScroll
          dataLength={data.nowPlaying.total_pages} //This is important field to render the next data
          next={PageUp}
          hasMore={page == data.nowPlaying.total_pages ? false : true}
          scrollThreshold={0.9}
          loader={<h4>Loading...</h4>}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          <Movies movies={movies} genres={genres} />
        </InfiniteScroll>
      </div>
    );
  }
};

export default Now_Playing_Movies;
