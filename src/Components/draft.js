// Movies
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
    )
  ]);

  if (!nowPlayingResponse.ok) throw new Error(nowPlayingResponse.statusText);
  if (!genresResponse.ok) throw new Error(genresResponse.statusText);

  const nowPlaying = await nowPlayingResponse.json();
  const genresList = await genresResponse.json();

  return { nowPlaying, genresList };
};

const Movies = () => {
  const [page, setPage] = useState(1);
  console.log(`page from movies component: ${page}`)

  return (
    <PageData.Provider value={[page, setPage]}>
      <PageData.Consumer>
        {(value) => (
          <Async promiseFn={loadData} pageNum={value[0]}>
            <Async.Pending>Loading...</Async.Pending>
            <Async.Rejected>
              {(error) => `Something went wrong: ${error.message}`}
            </Async.Rejected>
            <Async.Fulfilled>
              {(data) => <DisplayFetchedData {...data} />}
            </Async.Fulfilled>
          </Async>
        )}
      </PageData.Consumer>
    </PageData.Provider>
  );
};

export default Movies;

// return (
//   <PageData.Provider value={[page, setPage]}>
//     <PageData.Consumer>
//       {(value) => (
//         <Async promiseFn={loadData} pageNum={value[0]}>
//           <Async.Pending>Loading...</Async.Pending>
//           <Async.Rejected>
//             {(error) => `Something went wrong: ${error.message}`}
//           </Async.Rejected>
//           <Async.Fulfilled>
//             {(data) => <DisplayFetchedData {...data} />}
//           </Async.Fulfilled>
//         </Async>
//       )}
//     </PageData.Consumer>
//   </PageData.Provider>
// );
// };


//================================================================================================================

// Displayed Movies
// import React, { useState, useContext, useEffect } from "react";
// import InfiniteScroll from "react-infinite-scroll-component";
// import PageData from "../Context/PageData-context";

// const DisplayFetchedData = ({ nowPlaying, genresList, value }) => {
//   const [genres, setGenres] = useState(genresList.genres);
//   const [movies, setMovies] = useState(nowPlaying.results);

//   // const [hasMorePages, sethasMorePages] = useState(true);

//   let [page, setPage] = useContext(PageData);

//   return (
//     <InfiniteScroll
//       dataLength={100} //This is important field to render the next data
//       next={() => {
//         setPage(page++);
//       }}
//       hasMore={true}
//       loader={<h4>Loading...</h4>}
//       endMessage={
//         <p style={{ textAlign: "center" }}>
//           <b>Yay! You have seen it all</b>
//         </p>
//       }
//     >
//       <div className="Movie-List">
//         {movies.map((movie) => (
//           <div className="movie" key={movie.id}>
//             <div>{movie.title}</div>
//             <div>{movie.original_title}</div>
//             <div>{movie.original_language}</div>
//             <div>{movie.vote_average}</div>
//             <div>{movie.popularity}</div>
//             <div>{movie.vote_count}</div>
//             <div>{movie.release_date}</div>
//             <div>{`${movie.adult}`}</div>
//             <div>{movie.vote_average}</div>
//             <div>{movie.overview}</div>
//             <div>
//               {genres
//                 .filter((genre) => movie.genre_ids.includes(genre.id))
//                 .map((genre) => genre.name)
//                 .join(", ")}
//             </div>
//           </div>
//         ))}
//       </div>
//     </InfiniteScroll>
//   );
// };

// export default DisplayFetchedData;

