import React from "react";
import PropTypes from "prop-types";
export const TextArea = ({ hasError, message, value, handleChange }) => (
  <div className="textArea">
    <textarea
      defaultValue={value}
      data-testid="textArea"
      className={`textArea__input textArea__input-${hasError ? "error" : ""}`}
      onChange={({ currentTarget }) => handleChange(currentTarget.value)}
    />
    {hasError ? (
      <div data-testid="error" className="textArea__error">
        {message}
      </div>
    ) : null}
  </div>
);

TextArea.propTypes = {
  hasError: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};
TextArea.defaultProps = {
  value: "",
};
