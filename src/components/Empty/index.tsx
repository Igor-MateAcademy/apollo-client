import React from 'react';
import { Empty as AntEmpty, EmptyProps } from 'antd';

// icon
import EmptyImage from 'sources/images/empty.jpeg';

// styles
import styles from './styles.module.scss';

const Empty: React.FC<EmptyProps> = ({ ...rest }) => {
  return <AntEmpty image={rest.image || EmptyImage} className={styles.empty} {...rest} />;
};

export default Empty;
