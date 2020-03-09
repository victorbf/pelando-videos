import React, { useContext } from 'react'
import CommonModal from '../common/modal/CommonModal';
import GridContainer from '../common/grid/GridContainer';
import VideoPlayer from '../common/videoplayer/VideoPlayer';
import VideosContext from '../../contexts/VideosContext';

const VideoModal = () => {
  const {
    videos, isVideosModalOpen, handleModal,
    isPlaying, handleAddVideo, handleVideo,
  } = useContext(VideosContext);

  return (
    <CommonModal
      title="Selecione os vídeos que deseja salvar"
      isModalOpen={isVideosModalOpen}
      onCloseModal={handleModal}
    >
      <GridContainer
        columns="2"
      >
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
      </GridContainer>
    </CommonModal>
  )
}

export default VideoModal;
