import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import Heading from 'components/Layout/Heading';
import Block from 'containers/Blocks/BlockElement';

const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
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
  const { blocks, score } = useSelector(({ BlocksReducer }) => BlocksReducer);
  return (
    <MainWrapper>
      <Heading size="h2" bold>
        score: {score}
      </Heading>

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
