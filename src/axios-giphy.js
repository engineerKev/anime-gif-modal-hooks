import axios from 'axios';

export const animeAxios = axios.create({
    baseURL: 'https://api.giphy.com/v1',
});