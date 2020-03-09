import React from 'react';
import PropTypes from 'prop-types';

const VideoLabel = ({ number, label }) => (
  <p className="font-bold mt-4">
    <span className="text-orange-600 mr-2">
      {number}
      .
    </span>
    <span>{label}</span>
  </p>
);

VideoLabel.propTypes = {
  number: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
};

export default VideoLabel;
