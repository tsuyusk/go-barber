import React from 'react';
import { AuthContextProvider } from './auth';

const RootProvider: React.FC = ({ children }) => {
  return <AuthContextProvider>{children}</AuthContextProvider>;
};

export default RootProvider;
