import React from 'react';
import { SunIcon, MoonIcon, CalendarDaysIcon, CloudIcon, EyeIcon } from '@heroicons/react/24/outline';
import cn from 'classnames';
import _ from 'lodash';

import styles from './styles.module.scss';

const CustomTooltip: React.FC<any> = props => {
  const data = props.payload[0];

  return (
    <>
      {data && (
        <div className={styles.card}>
          <h4 className={styles.title}>{data.payload.weather.main}</h4>

          <h5 className={styles.subtitle}>{_.capitalize(data.payload.weather.description)}</h5>

          <div className={styles.box}>
            <CalendarDaysIcon className={styles.svg} />

            <span className={styles.text}>{data.payload.date.format('ll LT')}</span>
          </div>

          <div className={styles.box}>
            {data.payload.mode === 'd' ? (
              <SunIcon className={cn(styles.svg, styles.day)} />
            ) : (
              <MoonIcon className={cn(styles.svg, styles.night)} />
            )}

            <span className={styles.text}>{data.payload.temperature}&#8451;</span>
          </div>

          <div className={styles.box}>
            <CloudIcon className={styles.svg} />

            <span className={styles.text}>{data.payload.clouds + '%'}</span>
          </div>

          <div className={styles.box}>
            <EyeIcon className={styles.svg} />

            <span className={styles.text}>{+(data.payload.visibility / 1000).toFixed(2) + ' km'}</span>
          </div>

          <div className={styles.text}>{`Humidity: ${data.payload.humidity}%`}</div>

          <div className={styles.text}>{`Wind: ${data.payload.wind.speed} m/s`}</div>

          <div className={styles.text}>{`Wind gust: ${data.payload.wind.gust} m/s`}</div>
        </div>
      )}
    </>
  );
};

export default CustomTooltip;
