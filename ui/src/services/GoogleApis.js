import axios from 'axios';
import { API_HOST } from '../utils';

export const fetchVideosSearch = async (params) => {
  const res = await axios.get(`${API_HOST}/search`, { params });
  return res.data;
};

export const fetchVideos = async (params) => {
  const res = await axios.get(`${API_HOST}/videos`, { params });
  return res.data;
};
