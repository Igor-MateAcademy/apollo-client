import { useQuery } from '@apollo/client';

import { weatherApi } from '../config';

import { LatLng } from 'models';
import _ from 'lodash';
import { AxiosError } from 'axios';

export const fetchUserWeather = async ({ lat, lng }: LatLng) => {
  const { data, status } = await weatherApi.get('/forecast', {
    params: {
      lat,
      lon: lng,
      appid: import.meta.env.VITE_WEATHER_API_KEY,
      units: 'metric',
    },
  });

  if (status !== 200) throw new AxiosError('Something went wrong. Please, try again later');

  return data;
};

export const useWeather = async (coords: LatLng | null) => {
  if (coords) {
    return fetchUserWeather(coords);
  }
};
