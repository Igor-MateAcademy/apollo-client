import React, { useCallback } from 'react';
import { GoogleMap, Marker } from '@react-google-maps/api';
import { observer } from 'mobx-react';
import { FieldErrors, Control, Controller } from 'react-hook-form';

import { useStore } from 'stores';

import { CreateUserDTO } from 'models';

import styles from './styles.module.scss';

interface Props {
  marker: google.maps.LatLngLiteral | null;
  onSelect: (coords: google.maps.LatLngLiteral | null) => void;
  errors: FieldErrors<CreateUserDTO>;
  control: Control<CreateUserDTO>;
}

const Map: React.FC<Props> = ({ marker, errors, control, onSelect }) => {
  const { mapStore } = useStore();

  const center = {
    lat: 50.4516908,
    lng: 30.5310137,
  };

  const onLoad = useCallback((map: google.maps.Map) => {
    const bounds = new window.google.maps.LatLngBounds(center);

    map.fitBounds(bounds);
    mapStore.initializeMap(map);
  }, []);

  const onClick = (e: any) => {
    const { latLng } = e;

    latLng && onSelect({ lat: latLng.lat(), lng: latLng.lng() });
  };

  return (
    <div className={styles.box}>
      <Controller
        control={control}
        name="coords"
        render={() => (
          <GoogleMap
            onLoad={onLoad}
            mapContainerStyle={{ width: '100%', height: '100%' }}
            options={{ maxZoom: 12 }}
            zoom={4}
            onClick={onClick}
          >
            {marker && <Marker position={marker} onClick={() => onSelect(null)} />}
          </GoogleMap>
        )}
      />

      {errors.coords?.message && <span className={styles.error}>{errors.coords.message}</span>}
    </div>
  );
};

export default observer(Map);
