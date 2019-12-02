import styled from 'styled-components';

const Block = styled.div`
  height: 70px;
  width: 70px;
  position: relative;
  background-color: ${({ color }) => color};
  cursor: pointer;
  transition: top 0.5s;
  &:hover,
  &:active {
    border: 2px solid ${({ theme }) => theme.colors.whiteColor};
  }
`;

export default Block;
