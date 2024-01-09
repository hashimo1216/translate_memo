import axios from 'axios';

const baseURL = 'https://translate-memo-api.onrender.com:10000'

export default axios.create({
  baseURL,
  withCredentials: true,
});