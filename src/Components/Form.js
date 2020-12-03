import React, { useEffect, useState } from "react";
import { useAsync } from "react-async";

// Get Search
// https://api.themoviedb.org/3/search/movie?api_key=172194a84f1627f7745c68590173ac55&query=Jack+Reacher

// fetch results for searching query
const loadData = async ({ query, page }) => {
  const queryParam = query ? `&query=${query}` : '';
  const pageParam = page ? `&page=${page}` : '';
  
  const resp = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=172194a84f1627f7745c68590173ac55&language=en-US&include_adult=false${pageParam}${queryParam}`
  );
  if (!resp.ok) throw new Error(resp.statusText);
  return resp.json();
};

const Form = () => {
  const [text, setText] = useState("");
  const [query, setQuery] = useState("");

  const { data, error, isLoading } = useAsync({
    promiseFn: loadData,
    query: query,
    page: 1,
    watch: query
  });

  const handleInput = (e) => {
    // _.debounce(setText(e.target.value), 200);
  };

  const handleFormSubmition = (e) => {
    e.preventDefault();
    console.log(e.target)
    setQuery(text)
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
      {data && <div>{console.log(data.results)}</div>}
    </div>
  );
};

export default Form;
