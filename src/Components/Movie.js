import React, { useState } from "react";
import noPreviewImage from "../noPreview.jpg";
import PopUpModal from "./PopUpModal";

const fetchMovieReviews = async (id) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=172194a84f1627f7745c68590173ac55&language=en-US&page=1`
  );

  if (!response.ok) throw new Error(response.statusText);

  return response.json();
};

const Movie = ({ movie, genres }) => {
  const [reviews, setReviews] = useState({ id: "", results: [] });
  const [modalStatus, setModalStatus] = useState(false);

  const handlePopUp = (id) => {
    console.log("Click open");
    fetchMovieReviews(id)
      .then((response) => {
        setReviews({ id: response.id, results: response.results });
        setModalStatus(true);
      })
      .catch((error) => `Something went wrong: ${error.message}`);
  };

  const closeModal = () => {
    console.log("Click close");
    console.log("============")
    setModalStatus(false);
  };

  return (
    <div className="">
      <div
        className="movie"
        key={movie.id}
        onClick={() => handlePopUp(movie.id)}
      >
        <img
          className="image"
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w154${movie.poster_path}`
              : noPreviewImage
          }
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
        <PopUpModal
          movie={movie}
          reviews={reviews}
          modalStatus={modalStatus}
          closeModal={closeModal}
        />
      </div>
    </div>
  );
};

export default Movie;
