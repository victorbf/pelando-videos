import React from 'react';
import PropTypes from 'prop-types';
import VideoTitle from './VideoTitle';

const VideoLabel = ({ number, label }) => (
  <div className="font-bold mt-4 p-3">
    <VideoTitle>
      <span className="text-orange-600 mr-2">
        {number}
        .
      </span>
      {label}
    </VideoTitle>
  </div>
);

VideoLabel.propTypes = {
  number: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
};

export default VideoLabel;
