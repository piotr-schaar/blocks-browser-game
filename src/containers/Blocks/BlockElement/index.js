import React from 'react';
import { useDispatch } from 'react-redux';

import { blockClicked } from 'store/blocks/Blocks.actions';

import Block from 'components/Block';

const BlockElement = ({ id, color, arrayIndex, elementIndex }) => {
  const dispatch = useDispatch();

  const handleBlockClick = () => dispatch(blockClicked(arrayIndex, elementIndex));
  return <Block color={color} onClick={handleBlockClick} />;
};

export default BlockElement;
