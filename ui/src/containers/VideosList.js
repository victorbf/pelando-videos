import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ProfilePic, ProfileInfo } from '../components/common/Profile';
import { DataForm } from '../components/form_inputs';
import VideoModal from '../components/videos/VideoModal';
import ActionButton from '../components/common/ActionButton';
import { SelectedVideosList, SearchVideos, FilterVideos } from '../components/videos';
import VideosContext from '../contexts/VideosContext';
import Logo from '../assets/images/pelando-icon.png';

const VideosList = ({ history }) => {
  const { getVideos } = useContext(VideosContext);
  const [profile, setProfile] = useState({});

  useEffect(() => {
    setProfile(JSON.parse(localStorage.getItem('profile')));
  }, []);

  const logOut = () => {
    localStorage.clear();
    history.push('/login');
  };

  return (
    <DataForm
      onSubmit={getVideos}
      className="container mx-auto p-4"
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <img src={Logo} width="50px" className="mr-2" alt="pelando-logo" />
          <h1 className="text-4xl">Playando</h1>
        </div>
        <div className="flex items-center">
          <ProfilePic
            src={profile.imageUrl}
            alt="profile-pic"
            className="mr-3"
          />
          <ProfileInfo>
            <h2>{profile.name}</h2>
            <small>{profile.email}</small>
          </ProfileInfo>
          <ActionButton type="button" onClick={logOut}>
            <FontAwesomeIcon icon="sign-out-alt" />
          </ActionButton>
        </div>
      </div>
      <SearchVideos />
      <hr className="mb-2 mt-2 border-orange-600 border-2" />
      <FilterVideos />
      <SelectedVideosList />
      <VideoModal />
    </DataForm>
  );
};

VideosList.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default withRouter(VideosList);
