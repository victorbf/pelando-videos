import React from 'react';
import './config';
import VideosListPage from './pages/VideosListPage';
import VideosState from './states/VideosState';

const App = () => (
  <VideosState>
    <VideosListPage />
  </VideosState>
);

export default App;
