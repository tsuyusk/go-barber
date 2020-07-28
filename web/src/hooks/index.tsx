import React from 'react';

import { AuthContextProvider } from './auth';
import { ToastProvider } from './toast';

const RootProvider: React.FC = ({ children }) => {
  return (
    <AuthContextProvider>
      <ToastProvider>{children}</ToastProvider>
    </AuthContextProvider>
  );
};

export default RootProvider;
