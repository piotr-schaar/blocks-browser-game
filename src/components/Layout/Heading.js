import { h } from 'preact';
import styled, { css } from 'styled-components';

const baseStyle = css`
  color: ${({ color }) => (color === 'white' ? `var(--color-white)` : `var(--color-main)`)};
  font-weight: ${({ bold }) => (bold ? '700' : '300')};
  text-align: center;
  padding: ${({ smallPadding }) => (smallPadding ? '2rem' : '3rem')};
`;

const Heading1 = styled.h1`
  font-size: 3rem;
  ${baseStyle}
`;
const Heading2 = styled.h2`
  font-size: 2.2rem;
  ${baseStyle}
`;

const Heading = ({ children, color, smallPadding, size, bold }) => {
  switch (size) {
    case 'h1':
      return (
        <Heading1 smallPadding={smallPadding} color={color} bold={bold}>
          {children}
        </Heading1>
      );
    case 'h2':
      return (
        <Heading2 smallPadding={smallPadding} color={color} bold={bold}>
          {children}
        </Heading2>
      );
  }
};

export default Heading;
