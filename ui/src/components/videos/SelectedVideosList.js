import React, { useContext } from 'react'
import GridContainer from '../common/grid/GridContainer';
import VideoPlayer from '../common/videoplayer/VideoPlayer';
import VideosContext from '../../contexts/VideosContext';

const SelectedVideosList = () => {
  const {
    isPlaying, selectedVideos, handleRemoveVideo, handleVideo,
  } = useContext(VideosContext)
  
  return (
    <GridContainer
      columns="2"
      className="mt-3"
    >
      {selectedVideos.map((selectedVideo, index) => (
        <VideoPlayer
          key={selectedVideo.id}
          index={index + 1}
          isPlaying={isPlaying}
          video={selectedVideo}
          onRemoveVideo={handleRemoveVideo}
          onChangeVideoStatus={handleVideo}
        />
      ))}
    </GridContainer>
  )
}

export default SelectedVideosList;
