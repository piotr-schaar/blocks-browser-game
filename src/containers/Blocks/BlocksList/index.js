import React from 'react';
import { useSelector } from 'react-redux';

const BlocksList = () => {
  const store = useSelector(({ BlocksReducer }) => BlocksReducer);
  return (
    <div>
      <h1>hello from blocksList</h1>
    </div>
  );
};

export default BlocksList;
