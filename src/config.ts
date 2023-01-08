import axios from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_GOOGLE_MAPS_HOST,
});

export const weatherApi = axios.create({
  baseURL: import.meta.env.VITE_WEATHER_HOST,
});
