import React, { useState } from "react";
import noPreviewImage from "../noPreview.jpg";
import PopUpModal from "./PopUpModal";

const fetchMovieReviews = async (id) => {
  const [
    reviewsResponse,
    videosResponse,
    similarMoviesResponse,
  ] = await Promise.all([
    fetch(
      `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=172194a84f1627f7745c68590173ac55&language=en-US&page=1`
    ),
    fetch(
      `https://api.themoviedb.org/3/movie/${id}/videos?api_key=172194a84f1627f7745c68590173ac55&language=en-US`
    ),
    fetch(
      `https://api.themoviedb.org/3/movie/${id}/similar?api_key=172194a84f1627f7745c68590173ac55&language=en-US&page=1`
    ),
  ]);

  if (!reviewsResponse.ok) throw new Error(reviewsResponse.statusText);
  if (!videosResponse.ok) throw new Error(videosResponse.statusText);
  if (!similarMoviesResponse.ok)
    throw new Error(similarMoviesResponse.statusText);

  // return response.json();

  const reviewsData = await reviewsResponse.json();
  const videosData = await videosResponse.json();
  const similarMoviesData = await similarMoviesResponse.json();

  return {
    reviews: reviewsData,
    videos: videosData.results,
    similarMovies: similarMoviesData.results,
  };
};

const Movie = ({ movie, genres }) => {
  const [reviews, setReviews] = useState({ id: "", results: [] });
  const [videos, setVideos] = useState([]);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [modalStatus, setModalStatus] = useState(false);

  // When you click on any movie element, make the API call and open Modal
  const handlePopUp = (id) => {
    fetchMovieReviews(id)
      .then((response) => {
        setReviews({
          id: response.reviews.id,
          results: response.reviews.results,
        });
        setVideos(response.videos);
        setSimilarMovies(response.similarMovies);
        setModalStatus(true);
      })
      .catch((error) => `Something went wrong: ${error.message}`);
  };

  const closeModal = () => {
    setModalStatus(false);
  };

  return (
    <div>
      <div
        className="movie"
        key={movie.id}
      >
        <img
          className="image"
          onClick={() => handlePopUp(movie.id)}
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w154${movie.poster_path}`
              : noPreviewImage
          }
          alt={movie.title}
        />
        <div className="otherInfos">
          <div className="otherInfos__title"><b>Title:</b> {movie.title}</div>
          <div className="otherInfos__original-title">
          <b>Original Title:</b> {movie.original_title}
          </div>
          <div className="otherInfos__genres">
          <b>Genre(s):</b>{" "}
            {genres
              .filter((genre) => movie.genre_ids.includes(genre.id))
              .map((genre) => genre.name)
              .join(", ")}
          </div>
          <div className="otherInfos__language"><b>Language:</b> {movie.original_language}</div>
          <div className="otherInfos__votes"><b>Votes:</b> {movie.vote_average}/10 <i>(by </i>{movie.vote_count}<i> voters) </i></div>
          <div className="otherInfos__release-date"><b>Release Date:</b> {movie.release_date}</div>
          <div className="otherInfos__overview"><b>Overview:</b> {movie.overview}</div>
        </div>
      </div>
      <PopUpModal
        reviews={reviews}
        videos={videos}
        similarMovies={similarMovies}
        modalStatus={modalStatus}
        closeModal={closeModal}
      />
    </div>
  );
};

export default Movie;
