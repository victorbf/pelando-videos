import React, { useContext } from 'react';
import CommonModal from '../common/modal/CommonModal';
import VideoModalContent from './VideoModalContent';
import VideosContext from '../../contexts/VideosContext';

const VideoModal = () => {
  const {
    isVideosModalOpen, handleModal,
  } = useContext(VideosContext);

  return (
    <CommonModal
      title="Selecione os vídeos que deseja salvar"
      isModalOpen={isVideosModalOpen}
      onCloseModal={handleModal}
    >
      <VideoModalContent />
    </CommonModal>
  );
};

export default VideoModal;
