import React from "react";
import PropTypes from "prop-types";

export const Modal = ({ children, onClose, onSave, isSaveDisabled }) => (
  <div className="modal">
    <div className="modal__content">
      <h4 className="modal__heading" data-testid="heading">
        Dialog box
      </h4>
      <div className="modal__body" data-testid="children">
        {children}
      </div>
      <div className="modal__footer">
        <button
          className="modal__btn modal__btn-cancel"
          data-testid="close"
          onClick={onClose}
        >
          Cancel
        </button>
        <button
          className="modal__btn modal__btn-save"
          disabled={isSaveDisabled}
          onClick={onSave}
          data-testid="save"
        >
          Save
        </button>
      </div>
    </div>
  </div>
);

Modal.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  isSaveDisabled: PropTypes.bool.isRequired,
};
