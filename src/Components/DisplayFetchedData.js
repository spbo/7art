import React, { useState, useContext, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import PageData from "../Context/PageData-context";

const DisplayFetchedData = ({ nowPlaying, genresList }) => {
  const [genres, setGenres] = useState(genresList.genres);
  const [movies, setMovies] = useState(nowPlaying.results);
  const [page, setPage] = useState(PageData);
  const [hasMorePages, sethasMorePages] = useState(true);


  return (
      <div className="Movie-List">
        {movies.map((movie) => (
          <div className="movie" key={movie.id}>
            <div>{movie.title}</div>
            <div>{movie.original_title}</div>
            <div>{movie.original_language}</div>
            <div>{movie.vote_average}</div>
            <div>{movie.popularity}</div>
            <div>{movie.vote_count}</div>
            <div>{movie.release_date}</div>
            <div>{`${movie.adult}`}</div>
            <div>{movie.vote_average}</div>
            <div>{movie.overview}</div>
            <div>
              {genres
                .filter((genre) => movie.genre_ids.includes(genre.id))
                .map((genre) => genre.name)
                .join(", ")}
            </div>
          </div>
        ))}
      </div>
  );
};

export default DisplayFetchedData;

// return (
//   <InfiniteScroll
//     dataLength={100} //This is important field to render the next data
//     next={() => {
//       setPage(page++);
//     }}
//     hasMore={true}
//     loader={<h4>Loading...</h4>}
//     endMessage={
//       <p style={{ textAlign: "center" }}>
//         <b>Yay! You have seen it all</b>
//       </p>
//     }
//   >
//     <div className="Movie-List">
//       {movies.map((movie) => (
//         <div className="movie" key={movie.id}>
//           <div>{movie.title}</div>
//           <div>{movie.original_title}</div>
//           <div>{movie.original_language}</div>
//           <div>{movie.vote_average}</div>
//           <div>{movie.popularity}</div>
//           <div>{movie.vote_count}</div>
//           <div>{movie.release_date}</div>
//           <div>{`${movie.adult}`}</div>
//           <div>{movie.vote_average}</div>
//           <div>{movie.overview}</div>
//           <div>
//             {genres
//               .filter((genre) => movie.genre_ids.includes(genre.id))
//               .map((genre) => genre.name)
//               .join(", ")}
//           </div>
//         </div>
//       ))}
//     </div>
//   </InfiniteScroll>
// );
// };

// export default DisplayFetchedData;
