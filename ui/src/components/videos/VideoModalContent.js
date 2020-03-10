import React, { useContext } from 'react';
import { PoseGroup } from 'react-pose';
import Loading from '../common/Loading';
import WarningMessage from '../common/WarningMessage';
import VideoPlayer from '../common/video_player/VideoPlayer';
import GridContainer from '../common/grid/GridContainer';
import VideosContext from '../../contexts/VideosContext';

const VideoModalContent = () => {
  const {
    isPlaying, handleAddVideo, handleVideo,
    loadingVideos, videos,
  } = useContext(VideosContext);

  if (loadingVideos) {
    return (
      <Loading />
    );
  }

  if (videos.length === 0) {
    return (
      <WarningMessage>Nenhum Vídeo encontrado :C</WarningMessage>
    );
  }

  return (
    <GridContainer
      columns="2"
    >
      <PoseGroup>
        {videos.map((video, index) => (
          <VideoPlayer
            key={video.id}
            index={index + 1}
            isPlaying={isPlaying}
            video={video}
            onAddVideo={handleAddVideo}
            onChangeVideoStatus={handleVideo}
          />
        ))}
      </PoseGroup>
    </GridContainer>
  );
};

export default VideoModalContent;
