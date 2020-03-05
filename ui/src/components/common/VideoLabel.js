import React from 'react';
import PropTypes from 'prop-types';

const VideoLabel = ({ number, label }) => (
  <p className="font-bold">
    <span className="text-orange-200">{number}</span>
    <span>{label}</span>
  </p>
);

VideoLabel.propTypes = {
  number: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
};

export default VideoLabel;
