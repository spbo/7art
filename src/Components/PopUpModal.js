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
  >
    <h3 className="modal__title">More Infos</h3>
    <div className="modal__subtitle">
      <h4>Reviews</h4>
      {reviews.results.length > 0 ? (
        reviews.results.map((result, idx) => (
          <div className="modal__reviews" key={result.id}>
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
      <h4>Videos</h4>
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
      <h4>Similar Movies</h4>
      <div className="modal__similarMovies">
        {similarMovies.length > 0 ? (
          similarMovies.map((movie) => (
            <div>
              <img
                key={movie.id}
                className="modal__similarMovies-pictures"
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w154${movie.poster_path}`
                    : noPreviewImage
                }
                alt={movie.title}
              />
              <div className="modal__similarMovies-titles">{movie.title}</div>
            </div>
          ))
        ) : (
          <p>
            <i>No Similar Movies available</i>
          </p>
        )}
      </div>
    </div>
    <button className="modal__button" onClick={closeModal}>
      Close
    </button>
  </Modal>
);

export default PopUpModal;
