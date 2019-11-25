import React from 'react';
import { Provider } from 'react-redux';

import GamePage from 'views/GamePage';
import store from 'store';

const Root = () => {
  return (
    <Provider store={store}>
      <GamePage />
    </Provider>
  );
};

export default Root;
