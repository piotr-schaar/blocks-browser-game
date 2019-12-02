import { h } from 'preact';
import styled, { css } from 'styled-components';

const baseStyle = css`
  color: ${({ color }) => (color === 'white' ? `var(--color-white)` : `var(--color-main)`)};
  font-weight: ${({ bold }) => (bold ? '700' : '300')};
  text-align: center;
  padding: ${({ noPadding }) => (noPadding ? '0rem' : '3rem')};
`;

const Heading1 = styled.h1`
  font-size: 3rem;
  ${baseStyle}
`;
const Heading2 = styled.h2`
  font-size: 2.2rem;
  ${baseStyle}
`;

const Heading = ({ children, color, noPadding, size, bold }) => {
  if (size === 'h1')
    return (
      <Heading1 noPadding={noPadding} color={color} bold={bold}>
        {children}
      </Heading1>
    );
  if (size === 'h2')
    return (
      <Heading2 noPadding={noPadding} color={color} bold={bold}>
        {children}
      </Heading2>
    );
};

export default Heading;
