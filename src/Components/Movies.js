import React from "react";

const Movies = ({ movies, genres }) => {
  
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

export default Movies;
