import React from 'react';
import { Routes, Route, Navigate } from 'react-router';

// containers
import { Header, Main, CreateUser } from 'containers';

// styles
import 'sources/styles/styles.scss';
import 'antd/dist/antd';

const App: React.FC = () => {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/users" element={<Main />} />
        <Route path="/create" element={<CreateUser />} />
        <Route path="/update" element={<CreateUser />} />
        <Route path="*" element={<Navigate to="/users" />} />
      </Routes>
    </>
  );
};

export default App;
