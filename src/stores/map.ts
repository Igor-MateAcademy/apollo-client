import { makeAutoObservable, action } from 'mobx';

class MapStore {
  constructor() {
    makeAutoObservable(this);
  }

  mapInstance: google.maps.Map | null = null;
  coords: google.maps.LatLng | null = null;

  @action initializeMap(map: google.maps.Map) {
    this.mapInstance = map;
  }

  @action setPointedCoords(coords: google.maps.LatLng) {
    this.coords = coords;
  }
}

export default new MapStore();
