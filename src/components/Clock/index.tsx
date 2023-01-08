import React, { useState, useEffect } from 'react';
import moment from 'moment';
import _ from 'lodash';

interface Props {
  untilFrom: moment.Moment;
  format: string;
  className?: string;
}

const Clock: React.FC<Props> = ({ untilFrom, format, className }) => {
  const [date, setDate] = useState<moment.Moment>(untilFrom);

  let liveTime: NodeJS.Timer;

  useEffect(() => {
    liveTime = setInterval(() => {
      setDate(date.clone().add(1, 'second'));
    }, 1000);

    return () => {
      clearInterval(liveTime);
    };
  }, [moment()]);

  return <span className={className}>{!_.isNull(date) && date.format(format)}</span>;
};

export default Clock;
