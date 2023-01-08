import React from 'react';
import { LineChart, Line, XAxis, YAxis, Legend, Tooltip, ResponsiveContainer } from 'recharts';
import _ from 'lodash';

import CustomTooltip from './Tooltip';
import CustomLegend from './Legend';
import AxisTick from './AxisTick';

import styles from './styles.module.scss';

import { ForecastData } from 'models';

interface Props {
  data: ForecastData[];
  page: number;
  perPage: number;
}

const WeatherGraph: React.FC<Props> = ({ data, page, perPage }) => {
  const chunkedItems = _.chunk(data, perPage);
  const selectedItems = chunkedItems[page - 1];

  return (
    <ResponsiveContainer height={300}>
      <LineChart data={selectedItems}>
        <XAxis dataKey="name" tickLine={false} tick={<AxisTick dy={10} />} />
        <YAxis
          dataKey="temperature"
          tickLine={false}
          tickCount={4}
          allowDecimals={false}
          tick={<AxisTick dx={-10} format={true} />}
        />
        <Line type="monotone" dataKey="temperature" stroke="#8884d8" />
        <Legend
          payload={[
            {
              value: 'Temperature',
              color: '#8884d8',
            },
          ]}
          content={<CustomLegend />}
        />
        <Tooltip content={<CustomTooltip />} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default WeatherGraph;
