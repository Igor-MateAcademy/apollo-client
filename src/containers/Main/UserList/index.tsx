import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import cn from 'classnames';

// components
import { Empty, Button, Loader } from 'components';
import { message, Input } from 'antd';
import Item from './Item';

import { useDeleteUser, useUpdateUser } from 'fetchers';

import { User } from 'models';

// styles
import styles from './styles.module.scss';
import { SearchOutlined } from '@ant-design/icons';
import { OperationVariables } from '@apollo/client';

interface Props {
  users: User[];
  update: (variables?: Partial<OperationVariables>) => void;
  loading: boolean;
  selectedUserId: string | null;
  onSelect: (id: string | null) => void;
  onSearch: (query: string) => void;
}

const UserList: React.FC<Props> = ({ users, update, loading, selectedUserId, onSelect, onSearch }) => {
  const navigate = useNavigate();

  const [deleteUser] = useDeleteUser();

  const [updateUser] = useUpdateUser();

  const redirectToCreateUser = () => {
    navigate('/create');
  };

  const handleOnDelete = (id: string) => {
    deleteUser({
      variables: {
        id,
      },
      onCompleted: () => {
        message.success('User was successfully deleted');
        update();
        onSelect(null);
      },
    });
  };

  const handleOnUpdateUser = (user: User) => {
    updateUser({
      variables: { ...user },
      onCompleted: () => {
        message.success('User was successfully updated');
        update();
      },
    });
  };

  return (
    <div className={cn(styles.bar, users.length <= 0 && styles.aligned)}>
      {loading && <Loader />}

      <Input.Search
        placeholder="Search"
        enterButton={<SearchOutlined />}
        onSearch={onSearch}
        allowClear
        autoComplete={'off'}
      />

      {users.length > 0 ? (
        <ul className={styles.list}>
          {users.map(user => (
            <Item
              user={user}
              key={user.id}
              onDelete={handleOnDelete}
              onUpdate={handleOnUpdateUser}
              onSelect={onSelect}
              isSelected={user.id === selectedUserId}
            />
          ))}
        </ul>
      ) : (
        <div className={styles.placeholder}>
          <Empty description="Hmm... We didn't find any user" />

          <Button onClick={redirectToCreateUser}>Create a new user</Button>
        </div>
      )}
    </div>
  );
};

export default UserList;
