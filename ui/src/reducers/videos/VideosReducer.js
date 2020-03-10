import {
  SET_VIDEOS, SET_MODAL,
  SET_IS_URL, SET_SELECTED_VIDEO,
  REMOVE_SELECTED_VIDEO, SET_SELECTED_VIDEOS,
  SET_VIDEOS_FILTER, SET_VIDEO_STATUS,
  SET_VIDEO_LOADING,
} from './types';

const VideosReducer = (state, action) => {
  const { payload, type } = action;
  const { selectedVideos, isVideosModalOpen } = state;

  switch (type) {
    case SET_VIDEOS:
      return {
        ...state,
        videos: payload.items,
        loadingVideos: false,
      };

    case SET_SELECTED_VIDEOS:
      return {
        ...state,
        selectedVideos: payload,
      };

    case SET_MODAL:
      return {
        ...state,
        isVideosModalOpen: !isVideosModalOpen,
      };

    case SET_IS_URL:
      return {
        ...state,
        isUrl: payload,
      };

    case SET_SELECTED_VIDEO:
      return {
        ...state,
        selectedVideos: [...selectedVideos, payload],
        isUrl: false,
      };

    case REMOVE_SELECTED_VIDEO:
      return {
        ...state,
        selectedVideos: selectedVideos.filter((selectedVideo) => selectedVideo.id !== payload),
      };

    case SET_VIDEOS_FILTER:
      return {
        ...state,
        isFiltering: payload,
      };

    case SET_VIDEO_STATUS:
      return {
        ...state,
        isPlaying: payload,
      };

    case SET_VIDEO_LOADING:
      return {
        ...state,
        loadingVideos: payload,
      };

    default: return state;
  }
};

export default VideosReducer;
