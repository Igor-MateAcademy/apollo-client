import React, { useState } from 'react';
import _ from 'lodash';
import { SearchOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { observer } from 'mobx-react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

// components
import Map from './Map';
import Form from './Form';
import { Input, Button, message } from 'antd';

import { useCreateUser } from 'fetchers';

import { GET_USERS } from 'graphql';

import { useStore } from 'stores';

import { CreateUserDTO } from 'models';

import { client } from 'utils/apolloClient';

import { schema } from './config';

// styles
import styles from './styles.module.scss';

const ZOOM = 12;

const CreateUser: React.FC = () => {
  const navigate = useNavigate();
  const { mapStore } = useStore();

  const [marker, setMarker] = useState<google.maps.LatLngLiteral | null>(null);

  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm<CreateUserDTO>({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    resolver: yupResolver(schema),
  });

  const [createUser] = useCreateUser();

  const onSelect = (coords: google.maps.LatLngLiteral | null) => {
    setMarker(coords);
    setValue('coords', coords);
  };

  const handleOnFind = (result: google.maps.places.PlaceResult[] | null) => {
    if (!(mapStore.mapInstance && result)) return;

    const res = result[0].geometry!.location!;

    mapStore.mapInstance.setCenter(res);
    mapStore.mapInstance.setZoom(ZOOM);
    setMarker(res.toJSON());
    setValue('coords', res.toJSON());
  };

  const back = () => navigate(-1);

  const searchByQuery = async (value: string) => {
    if (!mapStore.mapInstance) return;

    const placesService = new google.maps.places.PlacesService(mapStore.mapInstance);
    const query = value.trim();

    if (query.length === 0) return;

    placesService.findPlaceFromQuery(
      {
        query: query,
        fields: ['name', 'geometry'],
      },
      handleOnFind
    );
  };

  const handleOnSubmit = (data: CreateUserDTO) => {
    createUser({
      variables: {
        ...data,
        isFavorite: false,
      },
      onCompleted: async () => {
        message.success('User was successfully created');
        back();
        await client.refetchQueries({
          include: [GET_USERS],
        });
      },
    });
  };

  return (
    <div className={styles.content}>
      <div className={styles.back}>
        <Button shape={'circle'} size={'large'} type={'primary'} onClick={back}>
          <ArrowLeftOutlined />
        </Button>
      </div>

      <div className={styles.wrapper}>
        <Input.Search
          className={styles.search}
          placeholder="City"
          enterButton={<SearchOutlined />}
          onSearch={searchByQuery}
          allowClear
          autoComplete={'off'}
        />
      </div>

      <div className={styles.container}>
        <div className={styles.form}>
          <Form errors={errors} control={control} onSubmit={handleSubmit(handleOnSubmit)} />
        </div>

        <div className={styles.map}>
          <Map control={control} errors={errors} marker={marker} onSelect={onSelect} />
        </div>
      </div>
    </div>
  );
};

export default observer(CreateUser);
