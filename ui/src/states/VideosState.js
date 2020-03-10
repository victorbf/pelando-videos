import React, { useReducer, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';
import { debounce, get } from 'lodash';
import VideosContext from '../contexts/VideosContext';
import VideosReducer from '../reducers/videos/VideosReducer';
import {
  SET_VIDEOS, SET_VIDEO_STATUS, SET_IS_URL,
  SET_SELECTED_VIDEO, REMOVE_SELECTED_VIDEO, SET_MODAL,
  SET_SELECTED_VIDEOS,
  SET_VIDEO_LOADING,
  SET_VIDEOS_FILTER,
} from '../reducers/videos/types';
import { fetchVideosSearch, fetchVideos } from '../services/GoogleApis';

const VideosState = ({ children, history }) => {
  const initialState = {
    isVideosModalOpen: false,
    isUrl: false,
    isFiltering: false,
    loadingVideos: false,
    isPlaying: null,
    videos: [],
    selectedVideos: [],
  };

  const [state, dispatch] = useReducer(VideosReducer, initialState);

  const {
    isVideosModalOpen,
    videos,
    loadingVideos,
    isUrl,
    selectedVideos,
    isFiltering,
    isPlaying,
  } = state;

  useEffect(() => {
    const localStorageVideos = JSON.parse(localStorage.getItem('videos')) || [];
    dispatch({ type: SET_SELECTED_VIDEOS, payload: localStorageVideos });
  }, []);

  const getVideos = async (values) => {
    dispatch({ type: SET_VIDEO_LOADING, payload: true });
    if (!isUrl) {
      dispatch({ type: SET_MODAL });
    }
    try {
      const token = localStorage.getItem('token');
      const params = {
        access_token: token,
        token_type: 'Bearer',
        expires_in: 3920,
        scope: 'https://www.googleapis.com/auth/youtube, https://www.googleapis.com/auth/youtube.readonly, https://www.googleapis.com/auth/youtube.upload, https://www.googleapis.com/auth/youtubepartner-channel-audit',
        q: values.search,
        part: 'id, snippet',
        maxResults: 4,
      };
      const videosData = await fetchVideosSearch(params);
      const videosIds = videosData.items.map((item) => item.id.videoId);
      const videosParams = {
        access_token: token,
        token_type: 'Bearer',
        expires_in: 3920,
        scope: 'https://www.googleapis.com/auth/drive.file',
        id: videosIds.join(', '),
        part: 'snippet, player',
      };
      const data = await fetchVideos(videosParams);
      if (isUrl) {
        if (selectedVideos.some((selectedVideo) => data.items[0].id === selectedVideo.id)) {
          toast.warn('Opa! Você já adicionou esse vídeo');
          dispatch({ type: SET_IS_URL, payload: false });
        } else {
          dispatch({ type: SET_SELECTED_VIDEO, payload: data.items[0] });
          localStorage.setItem('videos', JSON.stringify([...selectedVideos, data.items[0]]));
        }
      } else {
        dispatch({ type: SET_VIDEOS, payload: data });
      }
    } catch (error) {
      if (!isUrl) {
        dispatch({ type: SET_MODAL });
      }
      const { status } = error.response;
      if (status === 401 || status === 403) {
        toast.error('Suas credenciais não são validas. Faça login novamente.');
        history.push('/login');
      } else {
        toast.error('Ocorreu um erro inesperado. Tente Novamente.');
      }
    }
    dispatch({ type: SET_VIDEO_LOADING, payload: false });
  };

  const handleModal = () => {
    dispatch({ type: SET_MODAL });
  };

  const isValueURL = debounce((value) => {
    const regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/;
    dispatch({ type: SET_IS_URL, payload: regexp.test(value) });
  }, 100);

  const normalizeString = (value) => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

  const handleFilter = (values) => {
    if (isFiltering) {
      const localStorageVideos = JSON.parse(localStorage.getItem('videos'));
      dispatch({ type: SET_SELECTED_VIDEOS, payload: localStorageVideos });
      dispatch({ type: SET_VIDEOS_FILTER, payload: false });
    } else {
      const filteredVideos = selectedVideos.filter((selectedVideo) => (
        normalizeString(get(selectedVideo, 'snippet.title', '')).split(' ').includes(...normalizeString(values.filter).split(' '))));
      dispatch({ type: SET_SELECTED_VIDEOS, payload: filteredVideos });
      dispatch({ type: SET_VIDEOS_FILTER, payload: true });
    }
  };

  const handlePlay = () => {
    dispatch({ type: SET_VIDEO_STATUS, payload: true });
  };

  const handlePause = () => {
    dispatch({ type: SET_VIDEO_STATUS, payload: false });
  };

  const handleAddVideo = (video) => {
    dispatch({ type: SET_SELECTED_VIDEO, payload: video });
    localStorage.setItem('videos', JSON.stringify([...selectedVideos, video]));
  };

  const handleRemoveVideo = (video) => {
    dispatch({ type: REMOVE_SELECTED_VIDEO, payload: video.id });
    const removeSelectedVideo = selectedVideos.filter(
      (selectedVideo) => selectedVideo.id !== video.id,
    );
    localStorage.setItem('videos', JSON.stringify(removeSelectedVideo));
  };

  const handleVideo = (videoId) => {
    dispatch({ type: SET_VIDEO_STATUS, payload: videoId });
  };

  return (
    <VideosContext.Provider
      value={{
        isVideosModalOpen,
        videos,
        isUrl,
        selectedVideos,
        isFiltering,
        isPlaying,
        loadingVideos,
        handlePlay,
        handlePause,
        getVideos,
        isValueURL,
        handleAddVideo,
        handleRemoveVideo,
        handleVideo,
        handleModal,
        handleFilter,
      }}
    >
      {children}
    </VideosContext.Provider>
  );
};

VideosState.propTypes = {
  children: PropTypes.node.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default withRouter(VideosState);
