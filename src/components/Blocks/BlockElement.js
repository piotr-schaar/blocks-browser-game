import { useEffect, useState } from 'preact/hooks';

import styled, { keyframes } from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { checkBoxesMatches } from '../../store/blocks/Blocks.actions';

import Block from '../Layout/Block';

const animationFadeOut = keyframes`
  to {
    top: 30%;
    opacity: 0.2;
  }
`;
const PointDecor = styled.p`
  position: absolute;
  font-size: 2rem;
  top: 50%;
  left: 50%;
  font-weight: 700;
  transform: translate(-50%, -50%);
  animation: ${animationFadeOut} 0.7s ease-in;
  animation-fill-mode: forwards;
`;

const BlockElement = ({ id, color, arrayIndex, elementIndex }) => {
  const dispatch = useDispatch();
  const { matches } = useSelector(({ BlocksReducer }) => BlocksReducer);

  const [showPointAdded, setShowPointAdded] = useState(false);

  useEffect(() => {
    if (matches.length) {
      const findMatches = matches.find(
        element => element.row === arrayIndex && element.column === elementIndex,
      );
      if (findMatches) {
        setShowPointAdded(true);
        setTimeout(() => {
          setShowPointAdded(false);
        }, 700);
      }
    }
  }, [matches]);

  const handleBlockClick = () => dispatch(checkBoxesMatches(arrayIndex, elementIndex));

  return (
    <Block color={color} onClick={handleBlockClick}>
      {showPointAdded && <PointDecor>+1</PointDecor>}
    </Block>
  );
};

export default BlockElement;
