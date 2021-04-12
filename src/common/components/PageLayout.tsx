import { Box } from 'grommet';
import React from 'react';

export const PageLayout: React.FC = ({children}) => {
  return (
    <Box  gap="small" pad="xlarge" elevation="none" align="center">
      {children}
    </Box>
  );
}