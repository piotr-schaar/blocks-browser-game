import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import Block from 'containers/Blocks/BlockElement';

const MainWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const BlocksWrapper = styled.div`
  display: flex;
`;

const BlocksList = () => {
  const { blocks } = useSelector(({ BlocksReducer }) => BlocksReducer);
  return (
    <MainWrapper>
      <BlocksWrapper>
        {blocks.map((item, index) => {
          const idx = index;
          return (
            <div key={idx}>
              {item.map(({ color, id }, i) => (
                <Block key={id} color={color} id={id} arrayIndex={idx} elementIndex={i} />
              ))}
            </div>
          );
        })}
      </BlocksWrapper>
    </MainWrapper>
  );
};

export default BlocksList;
