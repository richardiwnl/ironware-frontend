import React from 'react';

import IHeader from '../../components/Header';
import Centered from '../Page404/styled';

export default function AdminDashboard() {
  return (
    <>
      <IHeader dashboard />
      <Centered>
        <h1>Dashboard Administrativa</h1>
      </Centered>
    </>
  );
}
