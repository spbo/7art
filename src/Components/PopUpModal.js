import React from "react";
import Modal from "react-modal";
import noPreviewImage from "../noPreview.jpg";

// Accessibility when using Modal
// Warning: react-modal: App element is not defined.
// Please use`Modal.setAppElement(el)` or set`appElement={el}`.
// This is needed so screen readers don't see main content when modal is opened.
// It is not recommended, but you can opt - out by setting`ariaHideApp={false}`.
Modal.setAppElement(document.querySelector("#root"));

const PopUpModal = ({
  movie,
  reviews,
  videos,
  similarMovies,
  modalStatus,
  closeModal,
}) => (
  <Modal
    isOpen={modalStatus}
    onRequestClose={closeModal}
    contentLabel="Pop Up"
    closeTimeoutMS={200}
    className="modal"
    // appElement={this}
  >
    <h3 className="modal__title">More Infos</h3>
    <div className="modal__subtitle">
      Reviews
      {reviews.results.length > 0 ? (
        reviews.results.map((result, idx) => (
          <div className="modal__body" key={result.id}>
            {`${idx + 1}. ${result.content}`}
            <i> - by {result.author}</i>
          </div>
        ))
      ) : (
        <p>
          <i>No reviews available</i>
        </p>
      )}
    </div>
    <div className="modal__subtitle">
      Videos
      {videos.length > 0 ? (
        videos.map((video) => (
          <div key={video.id} className="modal__videos-name">
            <a href={`https://www.youtube.com/watch?v=${video.key}`}>
              {video.name}
            </a>
          </div>
        ))
      ) : (
        <p>
          <i>No videos available</i>
        </p>
      )}
    </div>
    <div className="modal__subtitle">
        Similar Movies
      {similarMovies.length > 0 ? (similarMovies.map(movie => (<img
        key={movie.id}
        className="image"
        src={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w154${movie.poster_path}`
            : noPreviewImage
        }
        alt={movie.title}
      />))) : (
        <p>
          <i>No Similar Movies available</i>
        </p>)}
    </div>
    <button className="button" onClick={closeModal}>
      Okay
    </button>
  </Modal>
);

export default PopUpModal;

// movie.id === reviews.id &&

// {props.selectedOption && <p className="modal__body">{reviews}</p>}
