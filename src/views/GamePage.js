import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createBlocks } from 'store/blocks/Blocks.actions';

const GamePage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(createBlocks());
  }, []);

  return (
    <div>
      <h1>hello from game page</h1>
    </div>
  );
};

export default GamePage;
