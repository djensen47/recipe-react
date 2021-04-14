import React from 'react';
import { grommet, Grommet } from 'grommet'
import { AppRoutes } from './AppRoutes';
import { PageLayout } from '../common/components/PageLayout';
import { deepMerge } from 'grommet/utils';
import './App.css';

export const App: React.FC = () => {
  const theme = {
    global: {
      font: {
        family: 'Roboto',
      },
    },
    layer: {
      overlay: {
        background: "rgba(0, 0, 0, 0.25)"
      }
    },
  };

  return (
    <Grommet theme={deepMerge(grommet, theme)} themeMode="light" full>
      <PageLayout>
        <AppRoutes />
      </PageLayout>
    </Grommet>
  );
}
