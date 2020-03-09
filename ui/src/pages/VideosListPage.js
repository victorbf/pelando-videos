import React from 'react';
import VideosList from '../containers/VideosList';
import VideosState from '../states/VideosState';

const VideosListPage = () => (
  <VideosState>
    <VideosList />
  </VideosState>
);

export default VideosListPage;
