import React from 'react';
import FabAdd from '../components/FabAdd';
import MainLayout from '../layout/MainLayout';

export default function HomePage() {
  return (
    <>
      <MainLayout header='PANTRY' listItems={[]} />
      <FabAdd />
    </>
  );
}
