import styled from 'styled-components';

const Block = styled.div`
  height: 70px;
  width: 70px;
  background-color: ${({ color }) => color};
  cursor: pointer;
  &:hover,
  &:active {
    border: 2px solid ${({ theme }) => theme.colors.whiteColor};
  }
`;

export default Block;
