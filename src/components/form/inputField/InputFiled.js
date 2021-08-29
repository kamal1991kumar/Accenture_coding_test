import React from "react";
import PropTypes from "prop-types";

export const InputField = ({ hasError, message, value, handleChange }) => (
  <div className="inputFiled">
    <input
      data-testid="input"
      type="text"
      defaultValue={value}
      className={`inputFiled__input inputFiled__input-${
        hasError ? "error" : ""
      }`}
      onChange={({ currentTarget }) => handleChange(currentTarget.value)}
    />
    {hasError ? (
      <div data-testid="error" className="inputFiled__error">
        {message}
      </div>
    ) : null}
  </div>
);

InputField.propTypes = {
  hasError: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};

InputField.defaultProps = {
  value: "",
};
