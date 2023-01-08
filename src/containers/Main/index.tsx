import React, { useState } from 'react';

// containers
import { UserList, UserInfo } from 'containers';

import { useUsers } from 'fetchers';

// styles
import styles from './styles.module.scss';

const Main: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState<string | null>(null);

  const handleOnSelect = (id: string | null) => {
    setSelectedUser(id);
  };

  const { data: users, loading, refetch: updateUserList } = useUsers();

  const getUsersByQuery = (q: string) => {
    updateUserList({ q });
  };

  return (
    <main className={styles.main}>
      <UserList
        selectedUserId={selectedUser}
        users={users ? users.data : []}
        update={updateUserList}
        loading={loading}
        onSelect={handleOnSelect}
        onSearch={getUsersByQuery}
      />

      <UserInfo id={selectedUser} />
    </main>
  );
};

export default Main;
