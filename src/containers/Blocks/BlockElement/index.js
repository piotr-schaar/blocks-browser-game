import React from 'react';
import { useDispatch } from 'react-redux';

import Block from 'components/Block';

const BlockElement = ({ id, color, arrayIndex, elementIndex }) => {
  const dispatch = useDispatch();

  // const handleBlockClick = () => dispatch(blockClicked(arrayIndex, elementIndex));
  return <Block color={color} />;
};

export default BlockElement;
