import React from "react";
import PropTypes from "prop-types";
import InputField from "./inputField";
import TextArea from "./textArea";

export const FromElements = (props) => {
  const { type } = props;
  let View = InputField;
  if (type === "textarea") {
    View = TextArea;
  }
  return <View {...props} />;
};

FromElements.propTypes = {
  type: PropTypes.string.isRequired,
};
