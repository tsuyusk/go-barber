import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import RootProvider from './hooks';
import GlobalStyle from './styles/global';

import Routes from './routes';

const App: React.FC = () => {
  return (
    <>
      <GlobalStyle />
      <RootProvider>
        <Router>
          <Routes />
        </Router>
      </RootProvider>
    </>
  );
};

export default App;
