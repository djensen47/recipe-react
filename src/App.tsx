import React from 'react';
import { grommet, Grommet } from 'grommet'
import { AppRoutes } from './AppRoutes';
import './App.css';
import { PageLayout } from './common/components/PageLayout';

export const App: React.FC = () => {
  const theme = {
    global: {
      font: {
        family: 'Roboto',
        size: '14px',
        height: '20px',
      },
    },
  };

  return (
    <Grommet theme={grommet} themeMode="light" full>
      <PageLayout>
        <AppRoutes/>
      </PageLayout>
    </Grommet>
  );
}
