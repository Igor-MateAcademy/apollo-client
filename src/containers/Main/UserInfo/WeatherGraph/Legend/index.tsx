import React from 'react';
import { ArrowTrendingUpIcon } from '@heroicons/react/24/outline';

import styles from './styles.module.scss';

const CustomLegend: React.FC<any> = props => {
  const { value, color } = props.payload[0];

  return (
    <div className={styles.wrapper}>
      <ArrowTrendingUpIcon className={styles.arrow} style={{ stroke: color }} />

      <span style={{ color }}>{value}</span>
    </div>
  );
};

export default CustomLegend;
