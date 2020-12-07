import React, { useEffect, useState } from "react";
import { useAsync } from "react-async";
import Movie from "./Movie";
import InfiniteScroll from "react-infinite-scroll-component";

// fetch results for a searching query
const loadMovies = async ({ query, page, isSearch }) => {
  const queryParam = query ? `&query=${query}` : "";
  const pageParam = page ? `&page=${page}` : 1;
  const moviesLoadURL = isSearch
    ? `https://api.themoviedb.org/3/search/movie?api_key=172194a84f1627f7745c68590173ac55&language=en-US&include_adult=false${pageParam}${queryParam}`
    : `https://api.themoviedb.org/3/movie/now_playing?api_key=172194a84f1627f7745c68590173ac55&language=en-US&page=${pageParam}`;

  const [moviesResponse, genresResponse] = await Promise.all([
    fetch(moviesLoadURL),
    fetch(
      "https://api.themoviedb.org/3/genre/movie/list?api_key=172194a84f1627f7745c68590173ac55&language=en-US"
    ),
  ]);

  if (!genresResponse.ok) throw new Error(genresResponse.statusText);

  const moviesInfo = await moviesResponse.json();
  const genresData = await genresResponse.json();

  return {
    movies: moviesInfo.results,
    total_pages: moviesInfo.total_pages,
    genres: genresData.genres,
  };
};

const MoviesList = () => {
  const [page, setPage] = useState(1);
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [text, setText] = useState("");
  const [query, setQuery] = useState("");

  const { data, error, isLoading } = useAsync({
    promiseFn: loadMovies,
    query: query,
    page: page,
    isSearch: query.length > 0,
    watch: `${query}#${page}`,
  });

  const handleInput = (e) => {
    // _.debounce(setText(e.target.value), 200);
    setText(e.target.value);
  };

  const handleFormSubmission = (e) => {
    e.preventDefault();
    setQuery(text);
    setText("");
  };

  // page up for trigger the next API call with the next page
  const PageUp = () => {
    setPage(page+1);
  };

  // When data changes set the local states
  useEffect(() => {
    if (data) {
      // set genres on the first time. (but maybe you want this in case genres change)
      if (data.genres.length === 0) {
        setGenres(data.genres);
      }
      setMovies((prevMovies) => prevMovies.concat(data.movies));
      // setMovies(movies.push(data.movies))
    }
  }, [data]);

  if (isLoading) return "Loading...";
  if (error) return `Something went wrong: ${error.message}`;
  if (data) {
    return (
      <div className="content-container">
        <div>
          <form className="" onSubmit={handleFormSubmission}>
            <input
              type="text"
              placeholder="Search for a movie"
              name="search"
              value={text}
              onChange={(e) => handleInput(e)}
            />
            <button className="">Search</button>
          </form>
        </div>
        <h4>Now Playing Movies</h4>
        <InfiniteScroll
          dataLength={data.total_pages} //This is important field to render the next data
          next={PageUp}
          hasMore={page == data.total_pages ? false : true}
          scrollThreshold={0.9}
          loader={<h4>Loading...</h4>}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          {movies.map((movie) => (
            <Movie key={movie.id} movie={movie} genres={genres} />
          ))}
        </InfiniteScroll>
      </div>
    );
  }
};

export default MoviesList;

// <div>
// <form className="" onSubmit={handleFormSubmition}>
//   <input
//     type="text"
//     placeholder="Search for a movie"
//     name="search"
//     value={text}
//     onChange={(e) => handleInput(e)}
//   />
//   <button className="">Search</button>
// </form>
// </div>
// <h4>Now Playing Movies</h4>
// <InfiniteScroll
// dataLength={data.nowPlaying.total_pages} //This is important field to render the next data
// next={PageUp}
// hasMore={page == data.nowPlaying.total_pages ? false : true}
// scrollThreshold={0.9}
// loader={<h4>Loading...</h4>}
// endMessage={
//   <p style={{ textAlign: "center" }}>
//     <b>Yay! You have seen it all</b>
//   </p>
// }
// >
// {movies.map((movie) => (
//   <Movie movie={movie} genres={genres} />
// ))}
// </InfiniteScroll>