import "./WidgetBox.scss";
import React from "react";
import PropTypes from "prop-types";
export const WidgetBox = ({
  title,
  body,
  id,
  handleEditClick,
  widgetIndex,
}) => (
  <div className="widgetBox" data-testid="widgetBox" data-id={id}>
    <hgroup className="widgetBox__hgroup">
      <h3 className="widgetBox__heading" data-testid="title">
        {id}-{title}
      </h3>
      <button
        className="widgetBox__btn"
        data-testid="edit"
        onClick={() => handleEditClick(widgetIndex)}
      >
        <img
          width="15"
          src="https://img.icons8.com/material-outlined/20/999999/edit--v1.png"
          alt="edit"
        />
      </button>
    </hgroup>
    <p className="widgetBox__text" data-testid="body">
      {body}
    </p>
  </div>
);
WidgetBox.propTypes = {
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  handleEditClick: PropTypes.func.isRequired,
  widgetIndex: PropTypes.number.isRequired,
};
WidgetBox.defaultProps = {
  widgetIndex: 1,
};
