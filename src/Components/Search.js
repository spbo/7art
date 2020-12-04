import React, { useEffect, useState } from "react";
import { useAsync } from "react-async";
import Movies from "./Movies";

// Get Search
// https://api.themoviedb.org/3/search/movie?api_key=172194a84f1627f7745c68590173ac55&query=Jack+Reacher

// fetch results for a searching query
const fetcSearchMoviesAndGenres = async ({ query, page }) => {
  const queryParam = query ? `&query=${query}` : '';
  const pageParam = page ? `&page=${page}` : '';
  
  const [movieResponse, genresResponse] = await Promise.all([
    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=172194a84f1627f7745c68590173ac55&language=en-US&include_adult=false${pageParam}${queryParam}`
    ),
    fetch(
      "https://api.themoviedb.org/3/genre/movie/list?api_key=172194a84f1627f7745c68590173ac55&language=en-US"
    )
  ]);
  
  if (!movieResponse.ok) throw new Error(movieResponse.statusText);
  if (!genresResponse.ok) throw new Error(genresResponse.statusText);

  const moviesList = await movieResponse.json();
  const genresList = await genresResponse.json();

  return { moviesList, genresList };
};

const Form = () => {
  const [text, setText] = useState("");
  const [query, setQuery] = useState("");

  const { data, error, isLoading } = useAsync({
    promiseFn: fetcSearchMoviesAndGenres,
    query: query,
    page: 1,
    watch: query
  });

  const handleInput = (e) => {
    // _.debounce(setText(e.target.value), 200);
    setText(e.target.value);
  };

  const handleFormSubmition = (e) => {
    e.preventDefault();
    setQuery(text);
    setText("");
  };

  return (
    <div>
      <form className="" onSubmit={handleFormSubmition}>
        <input
          type="text"
          placeholder="Search for a movie"
          name="search"
          value={text}
          onChange={(e) => handleInput(e)}
        />
        <button className="">Search</button>
      </form>
      {data && <Movies movies={data.moviesList.results} genres={data.genresList.genres} />}
    </div>
  );
};

export default Form;
