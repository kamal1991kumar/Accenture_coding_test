import React from "react";
import PropTypes from "prop-types";
export const Pagination = ({ start, total, threshold }) => (
  <div className="pagination" data-testid="pagination">
    {start + threshold} out of {total}
  </div>
);
Pagination.propTypes = {
  start: PropTypes.number.isRequired,
  total: PropTypes.number,
  threshold: PropTypes.number.isRequired,
};
