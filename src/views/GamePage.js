import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createBlocks, checkAllBocksForPossibleMatches } from 'store/blocks/Blocks.actions';

import Blocks from 'containers/Blocks/BlocksList';
import Heading from 'components/Layout/Heading';

const GamePage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(createBlocks('startGame'));
    dispatch(checkAllBocksForPossibleMatches());
  }, []);

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
