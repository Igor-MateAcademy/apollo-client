import { useJsApiLoader } from '@react-google-maps/api';

export const useMap = () =>
  useJsApiLoader({
    id: 'google-map',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: ['places'],
  });
