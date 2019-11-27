import React from 'react';
import styled from 'styled-components';
import useBlocks from 'hooks/blocks/useBlocks';

import Block from 'containers/Blocks/BlockElement';

const MainWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const BlocksWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledBlockList = styled.div`
  display: flex;
  flex-direction: row;
`;

const BlocksList = () => {
  const [blocks] = useBlocks();

  return (
    <MainWrapper>
      <BlocksWrapper>
        {blocks.map((item, index) => {
          const idx = index;
          return (
            <StyledBlockList key={idx}>
              {item.map(({ color, id }, i) => (
                <Block key={id} color={color} id={id} arrayIndex={idx} elementIndex={i} />
              ))}
            </StyledBlockList>
          );
        })}
      </BlocksWrapper>
    </MainWrapper>
  );
};

export default BlocksList;
