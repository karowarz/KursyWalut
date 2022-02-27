import axios from 'axios';

import authHeader from './auth-header';
const API_URL = 'http://localhost:8080/api/app/';

const getPublicContent = () => {
  return axios.get(API_URL + 'all');
};

const getUserBoard = (userId) => {
  return axios.get(API_URL + `user/${userId}`, { headers: authHeader() });
};

const createBoard = (userId, data) => {
  if (data.currencies === '') {
    return axios.get(API_URL + `user/${userId}`, { headers: authHeader() });
  } else {
    return axios.patch(API_URL + `user/${userId}`, data, {
      headers: authHeader(),
    });
  }
};

export default {
  getPublicContent,
  getUserBoard,
  create: createBoard,
};
