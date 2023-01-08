import React from 'react';
import { LoadingOutlined } from '@ant-design/icons';

import { Spin, SpinProps } from 'antd';
import { RestTwoTone } from '@ant-design/icons';

import styles from './styles.module.scss';

const Loader: React.FC<SpinProps> = ({ ...rest }) => {
  return (
    <div className={styles.backdrop}>
      <Spin size={'large'} indicator={<LoadingOutlined />} {...RestTwoTone} spinning />
    </div>
  );
};

export default Loader;
