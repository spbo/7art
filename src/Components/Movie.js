import React, { useState } from "react";

const fetchMovieReviews = async (id) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=172194a84f1627f7745c68590173ac55&language=en-US&page=1`
  );

  if (!response.ok) throw new Error(response.statusText);

  return response.json();
};

const Movie = ({ movie, genres }) => {
  const [reviews, setReviews] = useState({ id: "", results: [] });
  // const [popUpStatus, setPopUpStatus] = useState(false);

  const handleClick = (id, e) => {
    e.preventDefault();
    console.log("The link was clicked.");
    fetchMovieReviews(id)
      .then((response) => {
        setReviews({ id: response.id, results: response.results });
        // handlePopUpStatus(true);
      })
      .catch((error) => `Something went wrong: ${error.message}`);
  };

  // const handlePopUpStatus = (status) => {
  //   if (status) {
  //     setPopUpStatus(true);
  //   } else {
  //     setPopUpStatus(false);
  //   }
  // };

  // onClick={(e) => handleClick(movie.id, e)}
  return (
    <div className="">
      <div
        className="movie"
        key={movie.id}
        onClick={() => console.log(movie.id)}
      >
        <img
          className="image"
          src={`https://image.tmdb.org/t/p/w154${movie.poster_path}`}
          alt={movie.title}
        />
        <div className="otherInfos">
          <div className="title">Title: {movie.title}</div>
          <div className="original__title">
            Original Title: {movie.original_title}
          </div>
          <div>
            {" "}
            Genre(s) :
            {genres
              .filter((genre) => movie.genre_ids.includes(genre.id))
              .map((genre) => genre.name)
              .join(", ")}
          </div>
          <div>Language: {movie.original_language}</div>
          <div>Votes: {movie.vote_average} / 10</div>
          <div>{movie.vote_count} voters</div>
          <div>Release Date: {movie.release_date}</div>
          <div>Overview: {movie.overview}</div>
        </div>
        <div className="overlay">
          <div className="overlay--after-open popup">
            {movie.id === reviews.id &&
              reviews.results.map((result) => <div>{result.author}</div>)}
            <a className="close__popup" href="#">
              &times;
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Movie;

// {popUpStatus ? (
//   <div className="overlay--after-open popup">
//     {movie.id === reviews.id &&
//       reviews.results.map((result) => <div>{result.author}</div>)}
//     <a
//       className="close__popup"
//       href="#"
//       onclick={handlePopUpStatus(false)}
//     >
//       &times;
//     </a>
//   </div>
// ) : (
//   <div className="overlay--before-close"></div>
// )}
