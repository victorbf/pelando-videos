import React, { useReducer, useEffect } from 'react';
import PropTypes from 'prop-types';
import { debounce, get } from 'lodash';
import VideosContext from '../contexts/VideosContext';
import VideosReducer from '../reducers/videos/VideosReducer';
import {
  SET_VIDEOS, SET_VIDEO_STATUS, SET_IS_URL,
  SET_SELECTED_VIDEO, REMOVE_SELECTED_VIDEO, SET_MODAL,
  SET_SELECTED_VIDEOS,
} from '../reducers/videos/types';
import { fetchVideosSearch, fetchVideos } from '../services/GoogleApis';

const VideosState = ({ children }) => {
  const initialState = {
    isVideosModalOpen: false,
    isUrl: false,
    isFiltering: false,
    isPlaying: null,
    videos: [],
    selectedVideos: [],
  };

  const [state, dispatch] = useReducer(VideosReducer, initialState);

  const {
    isVideosModalOpen,
    videos,
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
    if (!isUrl) {
      dispatch({ type: SET_MODAL });
    }
    const params = {
      key: 'AIzaSyBlGC6Hk-02jCW9vIGCXuqJdEOU4cRxudc',
      q: values.search,
      part: 'id, snippet',
      maxResults: 4,
    };
    const videosData = await fetchVideosSearch(params);
    const videosIds = videosData.items.map((item) => item.id.videoId);
    const videosParams = {
      key: 'AIzaSyBlGC6Hk-02jCW9vIGCXuqJdEOU4cRxudc',
      id: videosIds.join(', '),
      part: 'snippet, player',
    };
    const data = await fetchVideos(videosParams);
    if (isUrl) {
      dispatch({ type: SET_SELECTED_VIDEO, payload: data.items[0] });
      localStorage.setItem('videos', JSON.stringify([...selectedVideos, data.items[0]]));
    } else {
      dispatch({ type: SET_VIDEOS, payload: data });
    }
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
    selectedVideos.filter((selectedVideo) => (
      normalizeString(get(selectedVideo, 'snippet.title', '')).includes(normalizeString(values.filter))));
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
};

export default VideosState;
