import React, { useEffect, useState } from "react";
import { useAsync } from "react-async";
import DisplayFetchedData from "./DisplayFetchedData";

// Get Search
// https://api.themoviedb.org/3/search/movie?api_key=172194a84f1627f7745c68590173ac55&query=Jack+Reacher

//fetching results for searching query
const loadData = async ({query}) => {
  const resp = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=172194a84f1627f7745c68590173ac55&language=en-US&query=${query}&page=1&include_adult=false`
  );
  if (!resp.ok) throw new Error(resp.statusText);
  return resp.json();
};

const Form = () => {
  const [text, setText] = useState("");
  const [query, setQuery] = useState("");

  const { data, error, isLoading } = useAsync({
    promiseFn: loadData,
    query: ``,
    watch: query
  });

  const handleInput = (e) => {
    setText(e.target.value);
  };

  const handleFormSubmition = (e) => {
    e.preventDefault();
    console.log(e.target.value)
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
    </div>
  );
};

export default Form;

//------------------------------------------ A standalone working useAsync---------------------------------------------------------------

// import React, { useEffect, useState } from "react";
// import { useAsync } from "react-async";
// import DisplayFetchedData from "./DisplayFetchedData";
// import SearchedMovie from "./SearchedMovie";


// const loadData = async({query}) => {
//   const res = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=172194a84f1627f7745c68590173ac55&language=en-US&query=${query}&page=1&include_adult=false`);
//   if (!res.ok) throw new Error(res.statusText);
//   return res.json();
// };

// const Form = () => {
//   const { data, error, isLoading } = useAsync({ promiseFn: loadData, query: `interstellar`});

  

//   if (isLoading) return "";
//   if (error) return `Something went wrong: ${error.message}`;
//   if (data)
//     return (
//       <div>{console.log(data.results)}</div>
//     )
// };
// export default Form;

//------------------------------------------ A standalone working useAsync---------------------------------------------------------------