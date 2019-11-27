import React from 'react';
import useBlocks from 'hooks/blocks/useBlocks';

import Block from 'components/Block';

const BlockElement = ({ id, color, arrayIndex, elementIndex }) => {
  const [blocks, possibleMove, handleClickOnBlock] = useBlocks();

  return <Block color={color} onClick={() => handleClickOnBlock(arrayIndex, elementIndex)} />;
};

export default BlockElement;
