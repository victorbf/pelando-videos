import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { get } from 'lodash';
import ReactPlayer from 'react-player';
import EnterAnimation from '../animations/Animations';
import VideoPlayerContainer from './VideoPlayerContainer';
import ActionButton from '../ActionButton';
import VideoLabel from './VideoLabel';
import VideosContext from '../../../contexts/VideosContext';

const VideoPlayer = ({
  isPlaying, video, onRemoveVideo,
  onChangeVideoStatus, index, onAddVideo,
  ...props
}) => {
  const { selectedVideos } = useContext(VideosContext);
  const isSelected = selectedVideos.some((selectedVideo) => selectedVideo.id === video.id);
  return (
    <EnterAnimation {...props}>
      <VideoPlayerContainer>
        <ReactPlayer
          url={`https://www.youtube.com/watch?v=${video.id}`}
          playing={isPlaying === video.id}
          width="250"
        />
        <ActionButton
          left
          absolute
          color="primary"
          type="button"
          onClick={() => onChangeVideoStatus(isPlaying === video.id ? null : video.id)}
        >
          {isPlaying === video.id ? (
            <FontAwesomeIcon icon="pause" />
          ) : (
            <FontAwesomeIcon icon="play" />
          )}
        </ActionButton>
        {
      onRemoveVideo
        ? (
          <ActionButton
            right
            absolute
            type="button"
            onClick={() => onRemoveVideo(video)}
          >
            <FontAwesomeIcon icon="times" />
          </ActionButton>
        ) : (
          <ActionButton
            right
            absolute
            color="success"
            type="button"
            onClick={() => onAddVideo(video)}
            disabled={isSelected}
          >
            <FontAwesomeIcon icon={isSelected ? 'minus' : 'plus'} />
          </ActionButton>
        )
    }
        <VideoLabel
          number={index}
          label={get(video, 'snippet.title')}
        />
      </VideoPlayerContainer>
    </EnterAnimation>
  );
};

VideoPlayer.propTypes = {
  isPlaying: PropTypes.string,
  video: PropTypes.objectOf(PropTypes.any).isRequired,
  onRemoveVideo: PropTypes.func,
  onChangeVideoStatus: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  onAddVideo: PropTypes.func,
};

VideoPlayer.defaultProps = {
  isPlaying: null,
  onRemoveVideo: null,
  onAddVideo: () => {},
};

export default VideoPlayer;
