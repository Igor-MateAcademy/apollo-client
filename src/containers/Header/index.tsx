import React from 'react';
import { useLocation, useNavigate } from 'react-router';

import { LogoIcon } from 'components';
import { Button } from 'antd';

// styles
import styles from './styles.module.scss';

const Header: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isCreateUserPage = location.pathname.includes('/create');

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <LogoIcon />

        <span>Weather App</span>
      </div>

      {!isCreateUserPage && (
        <Button type={'primary'} onClick={() => navigate('/create')}>
          Create user
        </Button>
      )}
    </header>
  );
};

export default Header;
