import React, { useContext } from 'react';
import { DataForm } from '../components/form_inputs';
import VideosList from '../containers/VideosList';
import VideosContext from '../contexts/VideosContext';

const VideosListPage = () => {
  const { getVideos } = useContext(VideosContext);

  return (
    <DataForm
      onSubmit={getVideos}
      className="container mx-auto"
    >
      <VideosList />
    </DataForm>
  );
};

export default VideosListPage;
