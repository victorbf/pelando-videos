import React, { useContext } from 'react';
import { useFormikContext } from 'formik';
import VideoPlayer from '../components/common/VideoPlayer/VideoPlayer';
import Button from '../components/common/Button';
import { Input } from '../components/form_inputs';
import GridContainer from '../components/common/grid/GridContainer';
import CommonModal from '../components/common/modal/CommonModal';
import VideosContext from '../contexts/VideosContext';

const VideosList = () => {
  const {
    selectedVideos, videos, isVideosModalOpen,
    isUrl, isValueURL, getVideos, isPlaying,
    handleAddVideo, handleRemoveVideo, handleVideo,
    handleModal, handleFilter,
  } = useContext(VideosContext);

  const { setFieldValue, values } = useFormikContext();

  const urlVideoSearch = () => {
    setFieldValue('search', '');
    getVideos(values);
  };

  return (
    <div>
      <h1 className="text-4xl">Playando</h1>
      <div className="flex items-center">
        <Input
          onChange={isValueURL}
          type="text"
          name="search"
          placeholder="link ou título do vídeo"
        />
        {isUrl ? (
          <Button
            type="button"
            onClick={urlVideoSearch}
          >
            Adicionar
          </Button>
        ) : (
          <Button type="submit">
            Buscar
          </Button>
        )}
      </div>
      <hr className="mb-2 mt-2 border-orange-600 border-2" />
      <div className="flex items-center">
        <Input
          type="text"
          name="filter"
          placeholder="palavras-chave"
        />
        <Button type="button" onClick={() => handleFilter(values)}>Filtrar</Button>
      </div>
      <GridContainer
        columns="2"
        className="mt-3"
      >
        {selectedVideos.map((selectedVideo, index) => (
          <VideoPlayer
            index={index + 1}
            isPlaying={isPlaying}
            video={selectedVideo}
            onRemoveVideo={handleRemoveVideo}
            onChangeVideoStatus={handleVideo}
          />
        ))}
      </GridContainer>
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
              index={index + 1}
              isPlaying={isPlaying}
              video={video}
              onAddVideo={handleAddVideo}
              onChangeVideoStatus={handleVideo}
            />
          ))}
        </GridContainer>
      </CommonModal>
    </div>
  );
};

export default VideosList;
