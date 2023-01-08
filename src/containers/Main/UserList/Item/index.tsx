import React from 'react';
import stringToColor from 'string-to-color';
import cn from 'classnames';
import { CloseSquareTwoTone, HeartFilled, HeartOutlined, EditTwoTone } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

import { Avatar } from 'antd';

import { User } from 'models';

import styles from './styles.module.scss';

interface Props {
  user: User;
  isSelected: boolean;
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (user: User) => void;
}

const Item: React.FC<Props> = ({ user, isSelected, onSelect, onDelete, onUpdate }) => {
  const navigate = useNavigate();

  const { firstName, lastName, id } = user;

  const handleOnDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onDelete(id);
  };

  const handleOnMarkAsFavorite = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onUpdate({
      ...user,
      isFavorite: !user.isFavorite,
    });
  };

  const handleOnEditUser = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    navigate('/update');
  };

  return (
    <li className={cn(styles.item, isSelected && styles.selected)}>
      <button type="button" onClick={() => onSelect(id)}>
        <div className={styles.info}>
          <Avatar
            shape={'circle'}
            style={{ backgroundColor: stringToColor(firstName + lastName), marginRight: '16px' }}
            key={id}
          >
            {firstName[0] + lastName[0]}
          </Avatar>

          <span>{firstName + ' ' + lastName}</span>
        </div>

        <div className={styles.actions}>
          <button className={styles.action} onClick={handleOnMarkAsFavorite}>
            {user.isFavorite ? <HeartFilled className={styles.icon} /> : <HeartOutlined className={styles.icon} />}
          </button>

          <button className={styles.action} onClick={handleOnEditUser}>
            <EditTwoTone />
          </button>

          <button className={styles.action} onClick={handleOnDelete}>
            <CloseSquareTwoTone />
          </button>
        </div>
      </button>
    </li>
  );
};

export default Item;
