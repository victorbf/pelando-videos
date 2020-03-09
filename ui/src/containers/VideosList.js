import React, { useContext, useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { DataForm } from '../components/form_inputs';
import VideoModal from '../components/videos/VideoModal';
import Button from '../components/common/Button';
import { SelectedVideosList, SearchVideos, FilterVideos } from '../components/videos';
import VideosContext from '../contexts/VideosContext';

const VideosList = ({ history }) => {
  const { getVideos } = useContext(VideosContext);
  const [profile, setProfile] = useState({});

  useEffect(() => {
    setProfile(localStorage.getItem('profile'));
  }, []);

  const logOut = () => {
    localStorage.clear();
    history.push('/login')
  }

  return (
    <DataForm
      onSubmit={getVideos}
      className="container mx-auto"
    >
      <div>
        <h1 className="text-4xl">Playando</h1>
        {console.log(profile)}
        <div>
          <h2>{profile.name}</h2>
          <small>{profile.email}</small>
        </div>
      </div>
      <Button type="button" onClick={logOut}>LogOut</Button>
      <SearchVideos />
      <hr className="mb-2 mt-2 border-orange-600 border-2" />
      <FilterVideos />
      <SelectedVideosList />
      <VideoModal />
    </DataForm>
  );
};

export default withRouter(VideosList);
