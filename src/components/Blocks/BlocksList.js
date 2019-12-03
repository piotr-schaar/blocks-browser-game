import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'preact/hooks';

import styled from 'styled-components';
import { createBlocks, checkAllBlocksForPossibleMatches } from '../../store/blocks/Blocks.actions';

import { Heading } from '../Layout';
import Block from './BlockElement';

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
  const dispatch = useDispatch();
  const { blocks, score } = useSelector(({ BlocksReducer }) => BlocksReducer);

  useEffect(() => {
    dispatch(createBlocks());
  }, []);

  useEffect(() => {
    dispatch(checkAllBlocksForPossibleMatches());
  }, [blocks]);

  return (
    <MainWrapper>
      <Heading smallPadding size="h2" bold>
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
