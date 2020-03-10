import React, { useContext } from 'react';
import { PoseGroup } from 'react-pose';
import GridContainer from '../common/grid/GridContainer';
import VideoPlayer from '../common/video_player/VideoPlayer';
import VideosContext from '../../contexts/VideosContext';
import WarningMessage from '../common/WarningMessage';
import Loading from '../common/Loading';

const SelectedVideosList = () => {
  const {
    isPlaying, selectedVideos, handleRemoveVideo, handleVideo,
    loadingVideos, isUrl,
  } = useContext(VideosContext);

  if (isUrl && loadingVideos) {
    return (
      <Loading />
    );
  }

  if (selectedVideos.length === 0) {
    return (
      <WarningMessage>Nenhum vídeo adicionado. Pesquise seus vídeos favoritos</WarningMessage>
    );
  }

  return (
    <GridContainer
      columns="2"
      className="mt-3"
    >
      <PoseGroup animateOnMount>
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
      </PoseGroup>
    </GridContainer>
  );
};

export default SelectedVideosList;
