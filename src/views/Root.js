import React from 'react';
import { Provider } from 'react-redux';

import GamePage from 'views/GamePage';
import MainTemplate from 'templates/MainTemplate';
import store from 'store';

const Root = () => {
  return (
    <MainTemplate>
      <GamePage />
    </MainTemplate>
  );
};

export default Root;
