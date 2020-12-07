import React from "react";
import Modal from "react-modal";

// Accessibility when using Modal
// Warning: react-modal: App element is not defined.
// Please use`Modal.setAppElement(el)` or set`appElement={el}`.
// This is needed so screen readers don't see main content when modal is opened.
// It is not recommended, but you can opt - out by setting`ariaHideApp={false}`.
Modal.setAppElement(document.querySelector("#root"));

const PopUpModal = ({ movie, reviews, modalStatus, closeModal }) => (
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
          <i>No reviews</i>
        </p>
      )}
    </div>
    <div className="modal__subtitle">
      Videos
       {}
    </div>
    <button className="button" onClick={closeModal}>
      Okay
    </button>
  </Modal>
);

export default PopUpModal;

// movie.id === reviews.id &&

// {props.selectedOption && <p className="modal__body">{reviews}</p>}
