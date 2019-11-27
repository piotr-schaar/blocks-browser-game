import React from 'react';

import Blocks from 'containers/Blocks/BlocksList';
import Heading from 'components/Layout/Heading';

const GamePage = () => {
  return (
    <>
      <Heading bold size="h1">
        Blocks Game
      </Heading>
      <Blocks />
    </>
  );
};

export default GamePage;
