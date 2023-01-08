import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import { tz } from 'moment-timezone';
import moment from 'moment';

import { Clock } from 'components';
import WeatherGraph from './WeatherGraph';
import { message, Pagination } from 'antd';

import { useGetUser, fetchUserWeather } from 'fetchers';

import { ForecastData, User } from 'models';

import { CalendarOutlined, ConsoleSqlOutlined, FieldTimeOutlined, UserOutlined } from '@ant-design/icons';

// styles
import styles from './styles.module.scss';

interface Props {
  id: string | null;
}

const PAGE_SIZE = 10;

const UserInfo: React.FC<Props> = ({ id }) => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [location, setLocation] = useState<string>('');
  const [localeDate, setLocaleDate] = useState<moment.Moment | null>(null);
  const [forecast, setForecast] = useState<ForecastData[]>([]);
  const [page, setPage] = useState<number>(1);

  const userResponse = useGetUser({
    variables: { id },
    skip: _.isNull(id),
    onCompleted: (data: { User: User }) => {
      setSelectedUser(data.User);
    },
  });

  const init = async () => {
    if (!selectedUser) return;

    try {
      const weather = await fetchUserWeather(selectedUser.coords);
      const timezones = tz.zonesForCountry(weather.city.country);

      if (timezones.length < 1) return;

      const timezoneByCountryName = timezones[0];

      const weatherData = weather.list.map((forecast: any) => {
        const offset = tz(timezoneByCountryName).utcOffset();

        return {
          name: moment(forecast.dt_txt).utcOffset(offset).format('LT'),
          date: moment(forecast.dt_txt).utcOffset(offset),
          temperature: Math.trunc(forecast.main.feels_like),
          humidity: forecast.main.humidity,
          mode: forecast.sys.pod,
          wind: {
            speed: forecast.wind.speed,
            gust: forecast.wind.gust,
          },
          clouds: forecast.clouds.all,
          weather: forecast.weather[0],
          visibility: forecast.visibility,
        };
      }) as ForecastData[];

      setForecast(weatherData);
      setLocaleDate(tz(timezoneByCountryName));
      setLocation(weather.city.country);
      setPage(1);
    } catch (e) {
      if (e instanceof Error) message.error(e.message);
    }
  };

  useEffect(() => {
    init();
  }, [selectedUser]);

  return (
    <div className={styles.info}>
      {selectedUser && id && (
        <>
          <div className={styles.top}>
            <div className={styles.item}>
              <UserOutlined />

              <span className={styles.name}>{selectedUser.firstName + ' ' + selectedUser.lastName}</span>

              <span className={styles.location}>{location}</span>
            </div>

            <div className={styles.date}>
              <div className={styles.item}>
                <CalendarOutlined />

                {localeDate && <Clock key={localeDate.unix()} untilFrom={localeDate} format={'LL'} />}
              </div>

              <div className={styles.item}>
                <FieldTimeOutlined />

                {localeDate && <Clock key={localeDate.unix()} untilFrom={localeDate} format={'LT'} />}
              </div>
            </div>
          </div>

          {forecast.length > 0 && (
            <div className={styles.graph}>
              <WeatherGraph data={forecast} page={page} perPage={PAGE_SIZE} />

              <Pagination
                current={page}
                pageSize={PAGE_SIZE}
                total={forecast.length}
                onChange={setPage}
                simple={true}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default UserInfo;
