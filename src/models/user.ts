export interface LatLng {
  lat: number;
  lng: number;
}

export interface CreateUserDTO {
  firstName: string;
  lastName: string;
  coords: LatLng | null;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  coords: LatLng;
  isFavorite: boolean;
}
