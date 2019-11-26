import React from 'react';
import { useDispatch } from 'react-redux';

import { checkBoxesMatches } from 'store/blocks/Blocks.actions';

import Block from 'components/Block';

const BlockElement = ({ id, color, arrayIndex, elementIndex }) => {
  const dispatch = useDispatch();

  const handleBlockClick = () => dispatch(checkBoxesMatches(arrayIndex, elementIndex));

  return <Block color={color} onClick={handleBlockClick} />;
};

export default BlockElement;
